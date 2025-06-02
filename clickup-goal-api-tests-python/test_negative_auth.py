import os
import requests
from dotenv import load_dotenv

load_dotenv()

TEAM_ID = os.getenv("TEAM_ID")
BASE_URL = os.getenv("BASE_URL")


def test_get_goals_without_token():
    url = f"{BASE_URL}/team/{TEAM_ID}/goal"
    
    bad_headers = {
       
        "Authorization": "Bearer invalid_token"
    }

    response = requests.get(url, headers=bad_headers)

   
    assert response.status_code in [401, 403], f"Expected 401 or 403, got {response.status_code}"
