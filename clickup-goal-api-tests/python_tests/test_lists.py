import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_URL = "https://api.clickup.com/api/v2"
TOKEN = os.getenv("CLICKUP_TOKEN")
LIST_ID = os.getenv("LIST_ID")

HEADERS = {
    "Authorization": TOKEN,
    "Content-Type": "application/json"
}


def test_task_lifecycle():
    # 1. Create task
    create_response = requests.post(
        f"{API_URL}/list/{LIST_ID}/task",
        headers=HEADERS,
        json={
            "name": "Task from Python test",
            "description": "Created via API test",
            "status": "to do"
        }
    )
    assert create_response.status_code == 200
    task_id = create_response.json()["id"]

    # 2. Get task
    get_response = requests.get(f"{API_URL}/task/{task_id}", headers=HEADERS)
    assert get_response.status_code == 200
    assert get_response.json()["name"] == "Task from Python test"

    # 3. Update task
    update_response = requests.put(
        f"{API_URL}/task/{task_id}",
        headers=HEADERS,
        json={"name": "Updated Task from Python"}
    )
    assert update_response.status_code == 200

    # 4. Delete task
    delete_response = requests.delete(f"{API_URL}/task/{task_id}", headers=HEADERS)
    assert delete_response.status_code == 204
