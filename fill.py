import requests
import random
import json

# Define the new service ID to be used
service_id = "a7259b76-728c-41e9-a2ff-a17b868cdf1c"

# Endpoints for each entity
endpoints = {
    "reading_schedule": "http://127.0.0.1:4000/reading_schedule",
    "special_prayers": "http://127.0.0.1:4000/special_prayers",
    "hymns": "http://127.0.0.1:4000/hymns",
    "weddings": "http://127.0.0.1:4000/wedding",
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
    "prayer_name": "weekly_meditation",
    "prayer_note": "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God. For just as we share abundantly in the sufferings of Christ, so also our comfort abounds through Christ. 2 Corinthians 1:3–5, NIV. Praise be to the God and Father of our Lord our God, Father of compassion and the God of all comfort, who encourages and strengthens us in all distress, we thank you for turning our suffering into a pathway to life, so that we may be thankful and trusting through everything. You can change what we find hardest into what is best for us. Praise to your name that a way through sin and death is given to us. Praise to your name that you have shown us a way through all evil, a way that is blest. Amen.",
    "prayer_topic": "Working for the masters will",
    "prayer_text": "Luke 19: 11-26; 1Corinthians 1: 3-5"


}

# Data for Hymns
hymns_data = {
    "service_id": service_id,
    "hymn_number": random.choice(["110", "220", "330"]),
    "hymn_title": random.choice(["Hark! The Herald Angels Sing", "O Come All Ye Faithful"]),
    "category": random.choice(["Processional", "Communion", "Closing"])
}

# Data for Notices
wedding_data = {
    "service_id": service_id,
    "text": "<b> THIS IS THE 2ND AND LAST TIME OF ASKING</b>",
    "message": "I here by publish the Bans of marriage between <b>Akunne Obi William</b> and <b>Abadom Kosisochukwu</b>. if any know any just cause why they will not marry each other delcare it now or forever remain silent. ",
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
post_data(wedding_data, endpoints['weddings'])
post_data(members_data, endpoints['members'])
