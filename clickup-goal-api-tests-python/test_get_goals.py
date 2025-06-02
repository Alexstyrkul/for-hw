import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv("API_TOKEN")
TEAM_ID = os.getenv("TEAM_ID")
BASE_URL = os.getenv("BASE_URL")

headers = {
    "Authorization": API_TOKEN
}


def test_get_all_goals():
    url = f"{BASE_URL}/team/{TEAM_ID}/goal"

    response = requests.get(url, headers=headers)

    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    data = response.json()
    assert "goals" in data, "Response does not contain 'goals'"
