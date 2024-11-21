import requests
from bs4 import BeautifulSoup
import re

# URL of the target page
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

    # Print the extracted information
    print(f"Article Title: {article_title}")
    print(f"Publication Date: {article_date}")
    print(f"Read More Link: {article_link}")
    print(f"Topic: {topic}")
    print(f"Read: {read}")
    print(f"Devotional Heading: {devotional_heading_text}")

    print("\nReadings:")
    for i, reading in enumerate(readings, start=start_number):
        print(f"{i}. {reading}")

    print("\nMessage:")
    print(message_content)

    print("\nPrayer:")
    print(prayer)

    print("\nAdditional Prayer Paragraph:")
    print(next_prayer_paragraph)

    if prayers:
        print("\nPrayers:")
        for i, pray in enumerate(prayers, start=1):
            print(f"{i}. {pray}")
    else:
        print("\nNo prayers found.")

except requests.RequestException as e:
    print(f"Error fetching the page: {e}")
except AttributeError as e:
    print(f"Error parsing the content: {e}")
