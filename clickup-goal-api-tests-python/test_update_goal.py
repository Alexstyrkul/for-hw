import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("API_TOKEN")
TEAM_ID = os.getenv("TEAM_ID")
BASE_URL = os.getenv("BASE_URL")

headers = {
    "Authorization": API_TOKEN,
    "Content-Type": "application/json"
}


def test_update_goal():
    
    create_url = f"{BASE_URL}/team/{TEAM_ID}/goal"
    create_payload = {
        "name": "Goal to Update",
        "description": "Initial Description"
    }
    create_response = requests.post(create_url, json=create_payload, headers=headers)
    assert create_response.status_code == 200, f"Create failed: {create_response.text}"
    goal_id = create_response.json()["goal"]["id"]

   
    update_url = f"{BASE_URL}/goal/{goal_id}"
    update_payload = {
        "name": "Goal Updated",
        "description": "Updated Description"
    }
    update_response = requests.put(update_url, json=update_payload, headers=headers)
    assert update_response.status_code == 200, f"Update failed: {update_response.text}"

    
    get_url = f"{BASE_URL}/goal/{goal_id}"
    get_response = requests.get(get_url, headers=headers)
    assert get_response.status_code == 200
    assert get_response.json()["goal"]["name"] == "Goal Updated"

    
    delete_url = f"{BASE_URL}/goal/{goal_id}"
    delete_response = requests.delete(delete_url, headers=headers)
    assert delete_response.status_code == 200
