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


def test_goal_lifecycle():
   
    create_url = f"{BASE_URL}/team/{TEAM_ID}/goal"
    payload = {
        "name": "Test Goal",
        "team_id": str(TEAM_ID),
        "description": "Created via automated test",
        "due_date": None
    }
    create_response = requests.post(create_url, json=payload, headers=headers)
    assert create_response.status_code == 200, f"Create failed: {create_response.text}"
    goal_id = create_response.json()["goal"]["id"]

   
    get_url = f"{BASE_URL}/goal/{goal_id}"
    get_response = requests.get(get_url, headers=headers)
    assert get_response.status_code == 200, f"Get failed: {get_response.text}"
    assert get_response.json()["goal"]["name"] == "Test Goal"

    
    delete_url = f"{BASE_URL}/goal/{goal_id}"
    delete_response = requests.delete(delete_url, headers=headers)
    assert delete_response.status_code == 200, f"Delete failed: {delete_response.text}"

   
    get_after_delete = requests.get(get_url, headers=headers)
    assert get_after_delete.status_code == 404, "Goal was not deleted!"