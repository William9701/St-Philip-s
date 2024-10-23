from flask import redirect, url_for, session
from flask import request, jsonify
from flask import Flask, render_template, request
from jinja2 import Environment, select_autoescape
from datetime import datetime, timedelta
import os
import uuid
from models import storage
from flask import flash, abort, redirect, url_for, make_response
import subprocess
from models.service import ServiceInfo
from models.service import ReadingSchedule
from models.service import SpecialPrayers
from models.service import Hymns
from models.service import Notices
from models.service import Members


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
    latest = latest_service()
    Latest_service = latest.json
    all_services = get_services()
    All_services = all_services.json
    return render_template('index.html', service=Latest_service, services=All_services)





def latest_service():
    """Returns the service object with the latest date."""
    services = storage.all(ServiceInfo).values()  # Get all service objects
    
    # Sort the services by service_date in descending order 
    services = sorted(services, key=lambda x: x.service_date, reverse=True) 
    
    # The first element in the sorted list will be the service with the latest date
    latest_service = services[0]
    # print(latest_service.to_dict())
    return jsonify(latest_service.to_dict())

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
    return jsonify(instance.to_dict())

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
    return jsonify(instance.to_dict())


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
    for prayer in instance.prayers:
        storage.delete(prayer)
    

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
        list_services.append(service_dict)
    
    return jsonify(list_services)

# end service





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







# special_prayers Routes
@app.route('/special_prayers', methods=['POST'], strict_slashes=False)
def create_specialPrayer():
    """
    Creates a specialPrayer
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = SpecialPrayers(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)

@app.route('/special_prayers/<id>', methods=['GET'], strict_slashes=False)
def get_prayer(id):
    """
    Gets a prayer
    """
    instance = storage.get(SpecialPrayers, id)
    if not instance:
        abort(404)
    return jsonify(instance.to_dict())

@app.route('/special_prayers/<id>', methods=['PUT'], strict_slashes=False)
def update_prayer(id):
    """
    Updates a  prayer
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    data = request.get_json()
    instance = storage.get(SpecialPrayers, id)
    if not instance:
        abort(404)
    for key, value in data.items():
        setattr(instance, key, value)
    instance.save()
    return jsonify(instance.to_dict())

@app.route('/special_prayers', methods=['GET'], strict_slashes=False)
def get_prayers():
    """
    Gets all prayers
    """
    services = storage.all(SpecialPrayers).values()
    list_services = []
    
    for service in services:
        service_dict = service.to_dict()
        list_services.append(service_dict)
    
    return jsonify(list_services)

@app.route('/special_prayers/<id>', methods=['DELETE'], strict_slashes=False)
def delete_prayer(id):
    """
    Deletes a prayer
    """
    instance = storage.get(SpecialPrayers, id)
    if not instance:
        abort(404)

    storage.delete(instance)
    storage.save()

    return make_response(jsonify({}), 200)

# end special_prayers




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



if __name__ == "__main__":
    """ Main Function """
    app.run(host='0.0.0.0', port=4000, debug=True)