import requests
import random
import json

# Define the new service ID to be used
service_id = "bdd7e6c9-5508-48a0-ad16-fb2f3939485f"

# Endpoints for each entity
endpoints = {
    "reading_schedule": "http://127.0.0.1:4000/reading_schedule",
    "special_prayers": "http://127.0.0.1:4000/special_prayers",
    "hymns": "http://127.0.0.1:4000/hymns",
    "notices": "http://127.0.0.1:4000/notices",
    "members": "http://127.0.0.1:4000/members"
}

# Headers for the POST request
headers = {
    'Content-Type': 'application/json'
}

# Data for ReadingSchedule
reading_schedule_data = {
    "service_id": service_id,
    "lesson": random.randint(1, 5),
    "book_name": random.choice(["Isaiah", "Luke", "John"]),
    "chapter_and_verse": random.choice(["7:14-25", "2:1-20", "3:16"]),
    "reading_type": random.choice(["First Reading", "Second Reading", "Gospel"])
}

# Data for SpecialPrayers
special_prayers_data = {
    "service_id": service_id,
    "prayer_name": "Christmas Prayer",
    "prayer_text": "Heavenly Father, we thank you for the gift of your son Jesus Christ. Guide us in peace and love this season."
}

# Data for Hymns
hymns_data = {
    "service_id": service_id,
    "hymn_number": random.choice(["110", "220", "330"]),
    "hymn_title": random.choice(["Hark! The Herald Angels Sing", "O Come All Ye Faithful"]),
    "category": random.choice(["Processional", "Communion", "Closing"])
}

# Data for Notices
notices_data = {
    "service_id": service_id,
    "notice_text": "Christmas services and charity events scheduled for the upcoming week.",
    "priority_level": "Medium"
}

# Data for Members
members_data = {
    "first_name": random.choice(["Alice", "Benjamin", "Catherine"]),
    "title": random.choice(["Dr", "Rev", "Elder"]),
    "last_name": random.choice(["Johnson", "Williams", "Anderson"]),
    "group_name": random.choice(["Children's Ministry", "Ushering Team", "Media Team"])
}

# Function to post the data
def post_data(data, endpoint):
    response = requests.post(endpoint, headers=headers, data=json.dumps(data))
    print(f"Response from {endpoint}: {response.status_code}, {response.text}")

# Posting the data to each respective endpoint
post_data(reading_schedule_data, endpoints['reading_schedule'])
post_data(special_prayers_data, endpoints['special_prayers'])
post_data(hymns_data, endpoints['hymns'])
post_data(notices_data, endpoints['notices'])
post_data(members_data, endpoints['members'])
