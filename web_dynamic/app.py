from flask import redirect, url_for, session
from flask import request, jsonify
from flask import Flask, render_template, request
from jinja2 import Environment, select_autoescape
from datetime import datetime, time, timedelta
from werkzeug.utils import secure_filename
import os
import uuid
from models import storage
from flask import flash, abort, redirect, url_for, make_response
import subprocess
from models.service import *
from models.engine.auth import Auth
from sqlalchemy.orm.exc import NoResultFound
from models.admin import Admin
import requests
from bs4 import BeautifulSoup
import re

AUTH = Auth()

app = Flask(__name__)
app.jinja_env.globals.update(datetime=datetime)
# Configure upload folder and allowed extensions
UPLOAD_FOLDER = os.path.join(os.pardir, 'St-Philip-s', 'web_dynamic',
                             'static', 'images', 'upload')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 20 * 1024 * 1024  # Limit file size to 16 MB

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()

@app.route('/upload-event', methods=['POST'])
def upload_event():
    if 'eventImage' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['eventImage']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)  # Save the file to server

        return jsonify({
            'message': 'File uploaded successfully',
            'filePath': filename  # Send back the filename for database reference
        })

    return jsonify({'error': 'Failed to save file'}), 500



@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/')
def index():
    all_services = get_services().json
    events = get_upcoming_event_list().json
    
    # Parse the service_date into datetime objects for accurate sorting
    for service in all_services:
        service['parsed_date'] = ' '.join(service['service_date'].split()[:4])

    for event in events:
        event['parsed_date'] = ' '.join(event['event_date'].split()[:4])

    # Sort services by parsed_date
    all_sorted_services = sorted(
    all_services,
    key=lambda service: datetime.strptime(service['parsed_date'], '%a, %d %b %Y'),
    reverse=True)



    today = datetime.today().date()

    # Filter and sort events to include only those that are today or in the future
    all_sorted_events = sorted(
    (event for event in events if datetime.strptime(event['parsed_date'], "%a, %d %b %Y").date() >= today),
    key=lambda event: event['parsed_date'],
    reverse=True)
    
    service_count = len(all_sorted_services)
    
    latst_service = latest_service().json
    meditations = get_prayers().json
    

    # Find the meditation associated with the latest service
    mediPrayer = next((m for m in meditations if m['service_id'] == latst_service['id']), None)

    dailyprayer = dailyPrayer().json

    return render_template('index.html', services=all_sorted_services, mediPrayer=mediPrayer, events=all_sorted_events, service_count=service_count, dailyPrayer=dailyprayer)


@app.route('/history', strict_slashes=False)
def history():
    return render_template('history.html')


@app.route('/admin', strict_slashes=False)
def adminpage():
    admin_count = len(storage.all(Admin).values())
    return render_template('adminLogin.html', admin_count=admin_count)



@app.route('/admins', methods=['POST'], strict_slashes=False)
def RegAdmins():
    """Register admin and then login automatically"""
    try:
        email = request.form.get('email')
        password = request.form.get('password')
        username = request.form.get('username')

        if not email or not password or not username:
            return jsonify({"message": "Missing email, password, or username"}), 400

        # Register the admin
        if AUTH.register_admin(email, password, username):
            return jsonify({"message": "admin created"}) 
    except ValueError:
        return jsonify({"message": "Email already registered"}), 400


@app.route('/sessions', methods=['POST'], strict_slashes=False)
def login_a():
    """Login admin route (can also be called directly for login)"""
    try:
        email = request.form.get('email')
        password = request.form.get('password')

        if not email or not password:
            return jsonify({"message": "Missing email or password"}), 400

        if AUTH.valid_login_a(email, password):
            session_id = AUTH.create_session_a(email)

            # Set the session ID as a cookie in the response
            response = make_response(
                jsonify({"email": email, "message": "Logged in successfully"}))
            response.set_cookie("session_id", session_id)

            # Redirect to the admin page after successful login
            return jsonify({"session_id": session_id})  # Redirecting to admin page

        # Incorrect login information
        return jsonify({"message": "Wrong Login Details"}), 401

    except NoResultFound:
        # Admin not found
        return jsonify({"message": "Admin not found"}), 401




@app.route('/mainadmin/<sessionId>', strict_slashes=False)
def mainadmin(sessionId):
    if AUTH.get_admin_from_session_id(sessionId):
        all_services = get_services().json
        events = get_upcoming_event_list().json
        members = get_members().json


        for event in events:
            event['parsed_date'] = ' '.join(event['event_date'].split()[:4])
        
        # Parse the service_date into datetime objects for accurate sorting
        for service in all_services:
                    service['service_date'] = ' '.join(service['service_date'].split()[:4])

        # Sort services by parsed_date
        all_sorted_services = sorted(all_services, key=lambda service: service['service_date'], reverse=True)
        all_sorted_events = sorted(events, key=lambda event: event['parsed_date'], reverse=True)
        return render_template('admin.html', services=all_sorted_services, events=all_sorted_events, members=members, sessionId=sessionId)
    return render_template('adminLogin.html')

@app.route('/logout/<session_id>', strict_slashes=False)
def logout(session_id):
    if session_id:
        admin = AUTH.get_admin_from_session_id(session_id)
        if admin:
            AUTH.destroy_session_a(admin.id)
            return redirect(url_for('adminpage'))
    abort(403)
@app.route('/dailyprayer', strict_slashes=False)
def dailyPrayer():
    url = "https://flatimes.com/anglican-communion/"

    try:
        # Send an HTTP GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception if the request fails

        # Parse the HTML content
        soup = BeautifulSoup(response.content, "html.parser")

        # Find the first article
        first_article = soup.find("article", class_="post")

        # Extract relevant information
        article_title = first_article.find("h2", class_="post-title").text.strip()
        article_date = first_article.find("span", class_="updated").text.strip()
        article_link = first_article.find("a", class_="read-more-button")["href"]

        # Follow the "Read More" link to fetch the article details
        res = requests.get(article_link)
        res.raise_for_status()
        soup_article = BeautifulSoup(res.content, "html.parser")

        # Extract topic and reading
        topic = soup_article.find("strong", string="TOPIC:").next_sibling.strip()
        read = soup_article.find("strong", string="READ: ").next_sibling.strip()
        prayer = soup_article.find("strong", string="PRAYER: ").next_sibling.strip()

        # Extract the starting number dynamically from the "Read" string
        start_number_match = re.search(r":\s*(\d+)", read)
        start_number = int(start_number_match.group(1)) if start_number_match else 1

        # Extract the readings in the <ol> list
        readings_list = soup_article.find("ol", class_="wp-block-list")
        readings = [li.get_text(strip=True) for li in readings_list.find_all("li")]

        devotional_heading = soup_article.find("h2", class_="wp-block-heading has-text-align-center")
        devotional_heading_text = devotional_heading.get_text(strip=True) if devotional_heading else "No devotional heading found."

        # Extract the message
        message_tag = soup_article.find("p", text=lambda t: t and "THE MESSAGE:" in t)
        if message_tag:
            # Extract paragraphs of the message
            message_siblings = message_tag.find_next_siblings("p", limit=2)
            message_content = " ".join(p.get_text(strip=True) for p in message_siblings)

            # Find the next <ol> tag after the message
            next_ol_tag = message_tag.find_next("ol")
            if next_ol_tag:
                prayers = [li.get_text(strip=True) for li in next_ol_tag.find_all("li")]
            else:
                prayers = []
        else:
            message_content = "No message found."
            prayers = []

        # Extract the next <p> tag after "PRAYER:"
        prayer_tag = soup_article.find("strong", text=lambda t: t and "PRAYER:" in t)
        next_prayer_paragraph = (
            prayer_tag.find_next("strong").get_text(strip=True) if prayer_tag else "No additional prayer paragraph found."
        )


        return jsonify({'Article_Title': article_title, 'Publication_Date': article_date, 'Read_More_Link': article_link, 'Topic': topic, 'Read': read, 'Message': message_content, 'Prayer': prayer, 'Additional_Prayer_Paragraph': next_prayer_paragraph, 'Prayers': prayers, 'Readings': readings, 'Start_number': start_number, 'Devotional_Heading': devotional_heading_text})

    except requests.RequestException as e:
        print(f"Error fetching the page: {e}")
    except AttributeError as e:
        print(f"Error parsing the content: {e}")


@app.route('/groups', strict_slashes=False)
def groups():
    Dorcas = group('Dorcas').json
    Joy = group('Joy').json
    Esther = group('Esther').json
    Deborah = group('Deborah').json
    Love = group('Love').json
    Ruth = group('Ruth').json
    Lydia = group('Lydia').json
    Group1 = group('Group1').json
    Group2 = group('Group2').json
    Group3 = group('Group3').json
    Group4 = group('Group4').json
    Group5 = group('Group5').json
    Group6 = group('Group6').json
    return render_template('group.html', Dorcas=Dorcas, Joy=Joy, Esther=Esther, Deborah=Deborah, Ruth=Ruth, Lydia=Lydia, Love=Love, Group1=Group1, Group2=Group2, Group3=Group3, Group4=Group4, Group5=Group5, Group6=Group6)

@app.route('/all_bulletins')
def all_bulletins():
    services = get_services().json  # Replace this with the correct call to fetch all services
    
    # Ensure each service has a formatted date
    for service in services:
        service['parsed_date'] = ' '.join(service['service_date'].split()[:4])

    # Sort services by parsed_date
    all_sorted_services = sorted(services, key=lambda service: service['parsed_date'], reverse=True)
    
    
    if not services:
        abort(404)

    return render_template('bulletin.html', services=all_sorted_services)


@app.route('/update/<id>', strict_slashes=False)
def update_Admin_service(id):
    service = get_service(id).json
    # Convert the string to a datetime object
    service_date_str = service['service_date']

    # Parse the string to a datetime object
    service_date = datetime.strptime(service_date_str, '%a, %d %b %Y %H:%M:%S %Z')

    # Format the date to 'yyyy-MM-dd'
    service['service_date'] = service_date.strftime('%Y-%m-%d')
    if not service:
        abort(404)
    def returnData(cls):
        for cl in cls:
            if cl['service_id'] == service['id']:
                return cl
    mHymn = returnData(get_hymns().json)
    reading = returnData(get_lessons().json)
    meditation = returnData(get_prayers().json)
    notice = returnData(get_notices().json)
    aob1 = returnData(get_aobs().json)
    thanks = returnData(get_thanksgivings().json)

    def noticeData(cls):
        Conta = []
        for cl in cls:
            if cl['notice_id'] == notice['id']:
                Conta.append(cl)
        return Conta

    dailySchedules = noticeData(get_notice_schedules().json)
    resources = noticeData(get_church_resources_list().json)
    prayerLists = noticeData(get_prayerlists().json)
    marriagebanns = noticeData(get_marriagebanns().json)
    print(service)


    return render_template('update.html', service=service, Hymn=mHymn, Reading=reading, meditation=meditation, notice=notice, aob1=aob1,thanks=thanks, dailySchedules=dailySchedules, resources=resources, prayerLists=prayerLists, marriagebanns=marriagebanns)

def binary_search_members(query, members):
    exact_matches = []
    partial_matches = []
    query = query.lower().split()  # Split query into words

    for member in members:
        first_name = member["first_name"].lower()
        last_name = member["last_name"].lower()
        full_name = f"{first_name} {last_name}"

        # Check for exact match with full name
        if len(query) == 2 and query[0] == first_name and query[1] == last_name:
            exact_matches.append(member)
        # Check for partial match with each word in the query
        elif any(word in first_name or word in last_name for word in query):
            partial_matches.append(member)

    # Return exact matches first, followed by partial matches
    return exact_matches + partial_matches


@app.route('/search_members')
def search_members():
    query = request.args.get("query", "").strip()
    members_data = get_members().json
    results = binary_search_members(query, members_data)
    
    return jsonify({"members": results})




def group(Name):
    Allmembers = get_members().json
    groupList = []
    for member in Allmembers:
        if member['group_name'] == Name:
            groupList.append(member)
    return jsonify(groupList)






@app.route('/latest_service')
def latest_service():
    """Returns the latest service object based on the service_date."""
    services = storage.all(ServiceInfo).values()  # Retrieve all service objects

    # Check if there are any services and sort by date
    if services:
        latest_service = max(services, key=lambda x: x.service_date)  # Get the latest service by date
        latest_service_dict = latest_service.to_dict()
        
        
        
        return jsonify(latest_service_dict)
    
    # Return empty JSON object if no services found
    return jsonify({})








################################################################################
# services Routes
@app.route('/service', methods=['POST'], strict_slashes=False)
def create_service():
    """
    Creates a service
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = ServiceInfo(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/service/<id>', methods=['GET'], strict_slashes=False)
def get_service(id):
    """
    Gets a service
    """
    instance = storage.get(ServiceInfo, id)
    if not instance:
        abort(404)

    instance = instance.to_dict()
    # instance["service_time"] = instance["service_time"].strftime(('%H:%M'))
    return jsonify(instance)

@app.route('/service/<id>', methods=['PUT'], strict_slashes=False)
def update_service(id):
    """
    Updates a service
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(ServiceInfo, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()

    # Convert the service_time to string (if it's a time object)
    instance_dict = instance.to_dict()

    if isinstance(instance_dict.get("service_time"), time):  # If service_time exists and is a time object
        instance_dict["service_time"] = instance_dict["service_time"].strftime('%H:%M')

    # Return the updated instance as JSON
    return jsonify(instance_dict)


@app.route('/service/<id>', methods=['DELETE'], strict_slashes=False)
def delete_service(id):
    """
    Deletes a service
    """
    instance = storage.get(ServiceInfo, id)
    if not instance:
        abort(404)

    for hymn in instance.hymns:
        storage.delete(hymn)
    for notice in instance.notices:
        storage.delete(notice)
    for reading in instance.readings:
        storage.delete(reading)
    for meditation in instance.meditations:
        storage.delete(meditation)
    for thanks in instance.thanksgiving:
        storage.delete(thanks)
    for ao in instance.aob:
        storage.delete(ao)
    

    # Delete the service and save changes
    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)


@app.route('/service', methods=['GET'], strict_slashes=False)
def get_services():
    """
    Gets all services
    """
    services = storage.all(ServiceInfo).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        # Format the time without seconds
        # service_dict["service_time"] = service_dict["service_time"].strftime(('%H:%M'))
        list_services.append(service_dict)
    
    return jsonify(list_services)

# end service
################################################################################



###############################################################################
# reading_schedule Routes
@app.route('/reading_schedule', methods=['POST'], strict_slashes=False)
def create_lesson():
    """
    Creates a lesson
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = ReadingSchedule(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/reading_schedule/<id>', methods=['GET'], strict_slashes=False)
def get_lesson(id):
    """
    Gets a lesson
    """
    instance = storage.get(ReadingSchedule, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/reading_schedule/<id>', methods=['PUT'], strict_slashes=False)
def update_lesson(id):
    """
    Updates a lesson
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(ReadingSchedule, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/reading_schedule', methods=['GET'], strict_slashes=False)
def get_lessons():
    """
    Gets all lessons
    """
    services = storage.all(ReadingSchedule).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/reading_schedule/<id>', methods=['DELETE'], strict_slashes=False)
def delete_lesson(id):
    """
    Deletes a lesson
    """
    instance = storage.get(ReadingSchedule, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end reading_schedule
##############################################################################





################################################################################
# meditation Routes
@app.route('/meditation', methods=['POST'], strict_slashes=False)
def create_specialPrayer():
    """
    Creates a meditation
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = Meditation(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/meditation/<id>', methods=['GET'], strict_slashes=False)
def get_prayer(id):
    """
    Gets a meditation
    """
    instance = storage.get(Meditation, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/meditation/<id>', methods=['PUT'], strict_slashes=False)
def update_prayer(id):
    """
    Updates a  meditation
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(Meditation, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/meditation', methods=['GET'], strict_slashes=False)
def get_prayers():
    """
    Gets all meditation
    """
    services = storage.all(Meditation).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/meditation/<id>', methods=['DELETE'], strict_slashes=False)
def delete_prayer(id):
    """
    Deletes a meditation
    """
    instance = storage.get(Meditation, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end meditation
############################################################################


############################################################################
# hymns Routes
@app.route('/hymns', methods=['POST'], strict_slashes=False)
def create_hymn():
    """
    Creates a hymn
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = Hymns(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/hymns/<id>', methods=['GET'], strict_slashes=False)
def get_hymn(id):
    """
    Gets a lesson
    """
    instance = storage.get(Hymns, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/hymns/<id>', methods=['PUT'], strict_slashes=False)
def update_hymn(id):
    """
    Updates a lesson
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(Hymns, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/hymns', methods=['GET'], strict_slashes=False)
def get_hymns():
    """
    Gets all lessons
    """
    services = storage.all(Hymns).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/hymns/<id>', methods=['DELETE'], strict_slashes=False)
def delete_hymn(id):
    """
    Deletes a lesson
    """
    instance = storage.get(Hymns, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end hymns
############################################################################



#############################################################################
# notices Routes
@app.route('/notices', methods=['POST'], strict_slashes=False)
def create_notice():
    """
    Creates a notice
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = Notices(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/notices/<id>', methods=['GET'], strict_slashes=False)
def get_notice(id):
    """
    Gets a notice
    """
    instance = storage.get(Notices, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/notices/<id>', methods=['PUT'], strict_slashes=False)
def update_notice(id):
    """
    Updates a notice
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(Notices, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/notices', methods=['GET'], strict_slashes=False)
def get_notices():
    """
    Gets all notices
    """
    services = storage.all(Notices).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/notices/<id>', methods=['DELETE'], strict_slashes=False)
def delete_notice(id):
    """
    Deletes a notice
    """
    instance = storage.get(Notices, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end notices
#########################################################################


#########################################################################
# marriagebanns Routes
@app.route('/marriagebann', methods=['POST'], strict_slashes=False)
def create_marriagebann():
    """
    Creates a marriagebann
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = MarriageBann(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/marriagebann/<id>', methods=['GET'], strict_slashes=False)
def get_marriagebann(id):
    """
    Gets a marriagebann
    """
    instance = storage.get(MarriageBann, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/marriagebann/<id>', methods=['PUT'], strict_slashes=False)
def update_marriagebann(id):
    """
    Updates a marriagebann
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(MarriageBann, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/marriagebann', methods=['GET'], strict_slashes=False)
def get_marriagebanns():
    """
    Gets all marriagebann
    """
    services = storage.all(MarriageBann).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/marriagebann/<id>', methods=['DELETE'], strict_slashes=False)
def delete_marriagebann(id):
    """
    Deletes a marriagebann
    """
    instance = storage.get(MarriageBann, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end marriagebanns
###############################################################################




################################################################################
# members Routes
@app.route('/members', methods=['POST'], strict_slashes=False)
def create_member():
    """
    Creates a member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = Members(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/members/<id>', methods=['GET'], strict_slashes=False)
def get_member(id):
    """
    Gets a member
    """
    instance = storage.get(Members, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/members/<id>', methods=['PUT'], strict_slashes=False)
def update_member(id):
    """
    Updates a member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(Members, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/members', methods=['GET'], strict_slashes=False)
def get_members():
    """
    Gets all members
    """
    services = storage.all(Members).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()    
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/members/<id>', methods=['DELETE'], strict_slashes=False)
def delete_member(id):
    """
    Deletes a member
    """
    instance = storage.get(Members, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end members
###############################################################################




################################################################################
# Special Thanksgiving
@app.route('/thanksgiving', methods=['POST'], strict_slashes=False)
def create_thanksgiving():
    """
    Creates a member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = SpecialThanksgiving(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/thanksgiving/<id>', methods=['GET'], strict_slashes=False)
def get_thanksgiving(id):
    """
    Gets a member
    """
    instance = storage.get(SpecialThanksgiving, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/thanksgiving/<id>', methods=['PUT'], strict_slashes=False)
def update_thanksgiving(id):
    """
    Updates a thanks giving
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(SpecialThanksgiving, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/thanksgiving', methods=['GET'], strict_slashes=False)
def get_thanksgivings():
    """
    Gets all thanksgivings
    """
    services = storage.all(SpecialThanksgiving).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()    
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/thanksgiving/<id>', methods=['DELETE'], strict_slashes=False)
def delete_thanksgiving(id):
    """
    Deletes a member
    """
    instance = storage.get(SpecialThanksgiving, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end thanksgiving
###############################################################################




################################################################################
# AOB Routes
@app.route('/aob', methods=['POST'], strict_slashes=False)
def create_aob():
    """
    Creates an aob
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = AOB(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/aob/<id>', methods=['GET'], strict_slashes=False)
def get_aob(id):
    """
    Gets an aob
    """
    instance = storage.get(AOB, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/aob/<id>', methods=['PUT'], strict_slashes=False)
def update_aob(id):
    """
    Updates an Aob
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(AOB, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/aob', methods=['GET'], strict_slashes=False)
def get_aobs():
    """
    Gets all aobs
    """
    services = storage.all(AOB).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()    
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/aob/<id>', methods=['DELETE'], strict_slashes=False)
def delete_aob(id):
    """
    Deletes a member
    """
    instance = storage.get(AOB, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end aob
###############################################################################


###############################################################################
# NoticeSchedule Routes
@app.route('/notice_schedule', methods=['POST'], strict_slashes=False)
def create_notice_schedule():
    """
    Creates a notice schedule
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = NoticeSchedule(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/notice_schedule/<id>', methods=['GET'], strict_slashes=False)
def get_notice_schedule(id):
    """
    Gets a notice schedule
    """
    instance = storage.get(NoticeSchedule, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/notice_schedule/<id>', methods=['PUT'], strict_slashes=False)
def update_notice_schedule(id):
    """
    Updates a notice schedule
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(NoticeSchedule, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/notice_schedule', methods=['GET'], strict_slashes=False)
def get_notice_schedules():
    """
    Gets all notice schedules
    """
    schedules = storage.all(NoticeSchedule).values()
    list_schedules = []
    
    for schedule in schedules:
        schedule_dict = schedule.to_dict()    
        list_schedules.append(schedule_dict)
    
    return jsonify(list_schedules)

@app.route('/notice_schedule/<id>', methods=['DELETE'], strict_slashes=False)
def delete_notice_schedule(id):
    """
    Deletes a notice schedule
    """
    instance = storage.get(NoticeSchedule, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end notice_schedule
###############################################################################


###############################################################################
# ChurchResource Routes
@app.route('/church_resources', methods=['POST'], strict_slashes=False)
def create_church_resources():
    """
    Creates a church resource
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = ChurchResource(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/church_resources/<id>', methods=['GET'], strict_slashes=False)
def get_church_resources(id):
    """
    Gets a church resource
    """
    instance = storage.get(ChurchResource, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/church_resources/<id>', methods=['PUT'], strict_slashes=False)
def update_church_resources(id):
    """
    Updates a church resource
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(ChurchResource, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/church_resources', methods=['GET'], strict_slashes=False)
def get_church_resources_list():
    """
    Gets all church resources
    """
    resources = storage.all(ChurchResource).values()
    list_resources = []
    
    for resource in resources:
        resource_dict = resource.to_dict()    
        list_resources.append(resource_dict)
    
    return jsonify(list_resources)

@app.route('/church_resources/<id>', methods=['DELETE'], strict_slashes=False)
def delete_church_resources(id):
    """
    Deletes a church resource
    """
    instance = storage.get(ChurchResource, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end church_resources
###############################################################################


###############################################################################
# Prayerlist Routes
@app.route('/prayerlist', methods=['POST'], strict_slashes=False)
def create_prayerlist():
    """
    Creates a prayer list
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = PrayerList(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/prayerlist/<id>', methods=['GET'], strict_slashes=False)
def get_prayerlist(id):
    """
    Gets a prayer list
    """
    instance = storage.get(PrayerList, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/prayerlist/<id>', methods=['PUT'], strict_slashes=False)
def update_prayerlist(id):
    """
    Updates a prayer list
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(PrayerList, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/prayerlist', methods=['GET'], strict_slashes=False)
def get_prayerlists():
    """
    Gets all prayer lists
    """
    prayers = storage.all(PrayerList).values()
    list_prayers = []
    
    for prayer in prayers:
        prayer_dict = prayer.to_dict()    
        list_prayers.append(prayer_dict)
    
    return jsonify(list_prayers)

@app.route('/prayerlist/<id>', methods=['DELETE'], strict_slashes=False)
def delete_prayerlist(id):
    """
    Deletes a prayer list
    """
    instance = storage.get(PrayerList, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end prayerlist
###############################################################################



###############################################################################
# SubscribedMembers Routes
@app.route('/subscribed_members', methods=['POST'], strict_slashes=False)
def create_subscribed_members():
    """
    Creates a subscribed member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = SubScribed_Members(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/subscribed_members/<id>', methods=['GET'], strict_slashes=False)
def get_subscribed_members(id):
    """
    Gets a subscribed member
    """
    instance = storage.get(SubScribed_Members, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/subscribed_members/<id>', methods=['PUT'], strict_slashes=False)
def update_subscribed_members(id):
    """
    Updates a subscribed member
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(SubScribed_Members, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/subscribed_members', methods=['GET'], strict_slashes=False)
def get_subscribed_members_list():
    """
    Gets all subscribed members
    """
    members = storage.all(SubScribed_Members).values()
    list_members = []
    
    for member in members:
        member_dict = member.to_dict()    
        list_members.append(member_dict)
    
    return jsonify(list_members)

@app.route('/subscribed_members/<id>', methods=['DELETE'], strict_slashes=False)
def delete_subscribed_members(id):
    """
    Deletes a subscribed member
    """
    instance = storage.get(SubScribed_Members, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end subscribed_members
###############################################################################


###############################################################################
# UpcomingEvent Routes
@app.route('/upcoming_event', methods=['POST'], strict_slashes=False)
def create_upcoming_event():
    """
    Creates an upcoming event
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = UpcomingEvent(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/upcoming_event/<id>', methods=['GET'], strict_slashes=False)
def get_upcoming_event(id):
    """
    Gets an upcoming event
    """
    instance = storage.get(UpcomingEvent, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/upcoming_event/<id>', methods=['PUT'], strict_slashes=False)
def update_upcoming_event(id):
    """
    Updates an upcoming event
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(UpcomingEvent, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify

@app.route('/upcoming_event', methods=['GET'], strict_slashes=False)
def get_upcoming_event_list():
    """
    Gets all upcoming events
    """
    events = storage.all(UpcomingEvent).values()
    list_events = []
    
    for event in events:
        event_dict = event.to_dict()    
        list_events.append(event_dict)
    
    return jsonify(list_events)

@app.route('/upcoming_event/<id>', methods=['DELETE'], strict_slashes=False)
def delete_upcoming_event(id):
    """
    Deletes an upcoming event
    """
    instance = storage.get(UpcomingEvent, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end upcoming_event
###############################################################################



if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=4000, debug=True)