from flask import redirect, url_for, session
from flask import request, jsonify
from flask import Flask, render_template, request
from jinja2 import Environment, select_autoescape
from datetime import datetime, time, timedelta
import os
import uuid
from models import storage
from flask import flash, abort, redirect, url_for, make_response
import subprocess
from models.service import *

app = Flask(__name__)
app.jinja_env.globals.update(datetime=datetime)

@app.teardown_appcontext
def close_db(error):
    """ Remove the current SQLAlchemy Session """
    storage.close()


@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/')
def index():
    all_services = get_services().json
    
    # Parse the service_date into datetime objects for accurate sorting
    for service in all_services:
        service['parsed_date'] = datetime.strptime(service['service_date'], '%a, %d %b %Y %H:%M:%S %Z')

    # Sort services by parsed_date
    all_sorted_services = sorted(all_services, key=lambda service: service['parsed_date'], reverse=True)
    
    print("Sorted services:", all_sorted_services)
    print("All services:", all_services)
    
    latst_service = latest_service().json
    meditations = get_prayers().json
    events = get_upcoming_event_list().json

    # Find the meditation associated with the latest service
    mediPrayer = next((m for m in meditations if m['service_id'] == latst_service['id']), None)

    return render_template('index.html', services=all_sorted_services, mediPrayer=mediPrayer, events=events)


@app.route('/history', strict_slashes=False)
def history():
    return render_template('history.html')

@app.route('/admin', strict_slashes=False)
def admin():
    return render_template('admin.html')

@app.route('/groups', strict_slashes=False)
def groups():
    Favour = groupFavour().json
    Joy = groupJoy().json
    Faith = groupFaith().json
    Love = groupLove().json
    return render_template('groups.html', Favour=Favour, Joy=Joy, Faith=Faith, Love=Love)

def groupFavour():
    Allmembers = get_members().json
    groupList = []
    for member in Allmembers:
        if member['group_name'] == 'Favour':
            groupList.append(member)
    return jsonify(groupList)


def groupJoy():
    Allmembers = get_members().json
    groupList = []
    for member in Allmembers:
        if member['group_name'] == 'Joy':
            groupList.append(member)
    return jsonify(groupList)


def groupFaith():
    Allmembers = get_members().json
    groupList = []
    for member in Allmembers:
        if member['group_name'] == 'Faith':
            groupList.append(member)
    return jsonify(groupList)


def groupLove():
    Allmembers = get_members().json
    groupList = []
    for member in Allmembers:
        if member['group_name'] == 'Love':
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

    print(list_services)
    
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