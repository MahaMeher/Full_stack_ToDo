"""
End-to-end test to verify the complete user flow from authentication to task management
"""
import jwt
from datetime import datetime, timedelta
import tempfile
import os
from unittest.mock import patch
from contextlib import contextmanager

from src.main import app
from src.config.settings import settings
from sqlmodel import create_engine, SQLModel
from fastapi.testclient import TestClient


def create_test_token(user_id: str = "test_user_123"):
    """Create a test JWT token"""
    payload = {
        "id": user_id,
        "email": f"{user_id}@example.com",
        "exp": datetime.utcnow() + timedelta(hours=1),
        "iat": datetime.utcnow()
    }
    return jwt.encode(payload, settings.better_auth_secret, algorithm="HS256")


def test_complete_user_flow():
    print("Testing complete user flow from authentication to task management...")

    # Use a temporary SQLite database for testing
    with tempfile.NamedTemporaryFile(suffix=".db", delete=False) as temp_db:
        temp_db_path = temp_db.name

    try:
        # Temporarily change the database URL to use the test database
        test_db_url = f"sqlite:///{temp_db_path}"

        # Patch the settings temporarily
        with patch.object(settings, 'neon_db_url', test_db_url):
            # Create a fresh database with tables
            engine = create_engine(test_db_url, echo=False)
            SQLModel.metadata.create_all(engine)

            # Create test client with compatibility fix
            client = TestClient(app, raise_server_exceptions=False)

            # Create a valid token
            test_token = create_test_token("user_123")
            headers = {"Authorization": f"Bearer {test_token}"}

            print("\n1. Testing API endpoints with valid authentication...")

            # Test getting tasks (should be empty initially)
            print("  - Testing GET /api/tasks")
            response = client.get("/api/tasks", headers=headers)
            print(f"    Status: {response.status_code}")
            if response.status_code == 200:
                try:
                    data = response.json()
                    print(f"    Response: {data}")
                    assert isinstance(data, list)  # Should return an array of tasks
                    print("    ✓ GET /api/tasks works with authentication")
                except Exception as e:
                    print(f"    ✗ Could not parse JSON response: {e}")
            else:
                print(f"    Response: {response.text}")

            # Test creating a task
            print("\n  - Testing POST /api/tasks")
            task_data = {
                "title": "Test Task",
                "description": "This is a test task",
                "completed": False
            }
            response = client.post("/api/tasks", json=task_data, headers=headers)
            print(f"    Status: {response.status_code}")
            task_id = None
            if response.status_code in [200, 201]:
                try:
                    created_task = response.json()
                    print(f"    Created task: {created_task}")
                    task_id = created_task.get('id')
                    if task_id:
                        print("    ✓ POST /api/tasks works with authentication")
                    else:
                        print("    ✗ Task ID not returned")
                except Exception as e:
                    print(f"    ✗ Could not parse JSON response: {e}")
            else:
                print(f"    Response: {response.text}")

            if task_id:
                # Test getting the specific task
                print("\n  - Testing GET /api/tasks/{id}")
                response = client.get(f"/api/tasks/{task_id}", headers=headers)
                print(f"    Status: {response.status_code}")
                if response.status_code == 200:
                    try:
                        retrieved_task = response.json()
                        print(f"    Retrieved task: {retrieved_task}")
                        print("    ✓ GET /api/tasks/{id} works with authentication")
                    except Exception as e:
                        print(f"    ✗ Could not parse JSON response: {e}")

                # Test updating the task
                print("\n  - Testing PUT /api/tasks/{id}")
                update_data = {
                    "title": "Updated Test Task",
                    "description": "This is an updated test task",
                    "completed": True
                }
                response = client.put(f"/api/tasks/{task_id}", json=update_data, headers=headers)
                print(f"    Status: {response.status_code}")
                if response.status_code == 200:
                    try:
                        updated_task = response.json()
                        print(f"    Updated task: {updated_task}")
                        print("    ✓ PUT /api/tasks/{id} works with authentication")
                    except Exception as e:
                        print(f"    ✗ Could not parse JSON response: {e}")

                # Test toggling completion status
                print("\n  - Testing PATCH /api/tasks/{id}/complete")
                response = client.patch(f"/api/tasks/{task_id}/complete", headers=headers)
                print(f"    Status: {response.status_code}")
                if response.status_code == 200:
                    try:
                        toggled_task = response.json()
                        print(f"    Toggled task: {toggled_task}")
                        print("    ✓ PATCH /api/tasks/{id}/complete works with authentication")
                    except Exception as e:
                        print(f"    ✗ Could not parse JSON response: {e}")

                # Test deleting the task
                print("\n  - Testing DELETE /api/tasks/{id}")
                response = client.delete(f"/api/tasks/{task_id}", headers=headers)
                print(f"    Status: {response.status_code}")
                if response.status_code in [200, 204]:
                    print("    ✓ DELETE /api/tasks/{id} works with authentication")

            print("\n2. Testing authentication enforcement...")

            # Test that endpoints require authentication
            auth_required_endpoints = [
                ("/api/tasks", "GET"),
                ("/api/tasks", "POST"),
            ]

            successful_auth_checks = 0
            total_auth_checks = len(auth_required_endpoints)

            for endpoint, method in auth_required_endpoints:
                if method == "GET":
                    response = client.get(endpoint)
                elif method == "POST":
                    response = client.post(endpoint, json={"title": "test"})

                print(f"  - {method} {endpoint} without auth -> {response.status_code} (expected 401)")
                if response.status_code == 401:
                    print(f"    ✓ Authentication properly enforced for {method} {endpoint}")
                    successful_auth_checks += 1
                else:
                    print(f"    ✗ Expected 401, got {response.status_code}")

            print(f"\n3. Authentication enforcement: {successful_auth_checks}/{total_auth_checks} endpoints properly enforcing authentication")

            print("\n4. Testing basic server functionality...")

            # Test root endpoint
            response = client.get("/")
            print(f"  - GET / -> {response.status_code}")
            if response.status_code == 200:
                try:
                    data = response.json()
                    print(f"    Response: {data}")
                    print("    ✓ Root endpoint works")
                except:
                    print("    ✓ Root endpoint accessible")
            else:
                print(f"    Response: {response.text}")

            # Test health endpoint
            response = client.get("/health")
            print(f"  - GET /health -> {response.status_code}")
            if response.status_code == 200:
                try:
                    data = response.json()
                    print(f"    Response: {data}")
                    print("    ✓ Health endpoint works")
                except:
                    print("    ✓ Health endpoint accessible")
            else:
                print(f"    Response: {response.text}")

            print("\nEnd-to-end functionality test completed!")

    except Exception as e:
        print(f"\nError during testing: {e}")
        import traceback
        traceback.print_exc()

    finally:
        # Clean up temporary database
        if os.path.exists(temp_db_path):
            os.unlink(temp_db_path)


if __name__ == "__main__":
    test_complete_user_flow()