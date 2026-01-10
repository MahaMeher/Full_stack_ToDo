"""
Comprehensive test for all API endpoints with JWT tokens
"""
import jwt
from datetime import datetime, timedelta
import tempfile
import os
from unittest.mock import patch
import requests
from src.main import app
from src.config.settings import settings
from sqlmodel import create_engine, SQLModel
from fastapi.testclient import TestClient


def create_test_token(user_id: str = "test_user_123", email: str = "test@example.com"):
    """Create a test JWT token similar to what Better Auth would generate"""
    payload = {
        "id": user_id,
        "email": email,
        "name": "Test User",
        "exp": int((datetime.utcnow() + timedelta(hours=1)).timestamp()),  # Use timestamp for compatibility
        "iat": int(datetime.utcnow().timestamp()),
        "tokenType": "access"
    }
    return jwt.encode(payload, settings.better_auth_secret, algorithm="HS256")


def test_api_endpoints_with_tokens():
    print("Testing all API endpoints with JWT tokens...")

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

            # Create a valid token for user 1
            user1_token = create_test_token("user_123", "user1@example.com")
            user1_headers = {"Authorization": f"Bearer {user1_token}"}

            # Create a valid token for user 2 (to test cross-user access)
            user2_token = create_test_token("user_456", "user2@example.com")
            user2_headers = {"Authorization": f"Bearer {user2_token}"}

            print("\n1. Testing public endpoints (no auth required)...")

            # Test root endpoint
            response = client.get("/")
            print(f"  GET / -> {response.status_code}")
            if response.status_code == 200:
                print("    OK: Root endpoint accessible")
            else:
                print(f"    ERROR: Root endpoint failed with {response.status_code}")

            # Test health endpoint
            response = client.get("/health")
            print(f"  GET /health -> {response.status_code}")
            if response.status_code == 200:
                print("    OK: Health endpoint accessible")
            else:
                print(f"    ERROR: Health endpoint failed with {response.status_code}")

            print("\n2. Testing authentication-requiring endpoints...")

            # Define all API endpoints that require authentication
            auth_endpoints = [
                ("/api/tasks", "GET"),
                ("/api/tasks", "POST"),
            ]

            all_auth_tests_passed = True
            for endpoint, method in auth_endpoints:
                if method == "GET":
                    response = client.get(endpoint)
                elif method == "POST":
                    response = client.post(endpoint, json={"title": "test"})
                elif method == "PUT":
                    response = client.put(endpoint, json={"title": "test"})
                elif method == "DELETE":
                    response = client.delete(endpoint)

                if response.status_code != 401:
                    print(f"    ERROR: {method} {endpoint} should require authentication but returned {response.status_code}")
                    all_auth_tests_passed = False
                else:
                    print(f"    OK: {method} {endpoint} properly requires authentication")

            if all_auth_tests_passed:
                print("    OK: All authentication-required endpoints enforce auth properly")
            else:
                print("    ERROR: Some endpoints don't properly enforce authentication")

            print("\n3. Testing task management endpoints with valid JWT...")

            # Test getting tasks (should be empty initially)
            response = client.get("/api/tasks", headers=user1_headers)
            print(f"  GET /api/tasks -> {response.status_code}")
            if response.status_code == 200:
                tasks = response.json()
                print(f"    OK: Got {len(tasks)} tasks initially")
            else:
                print(f"    ERROR: Failed to get tasks: {response.text}")

            # Test creating a task
            task_data = {
                "title": "Integration Test Task",
                "description": "This task was created during integration testing",
                "completed": False
            }
            response = client.post("/api/tasks", json=task_data, headers=user1_headers)
            print(f"  POST /api/tasks -> {response.status_code}")
            task_id = None
            if response.status_code in [200, 201]:
                try:
                    created_task = response.json()
                    task_id = created_task.get('id')
                    if task_id:
                        print(f"    OK: Created task with ID {task_id}")
                    else:
                        print(f"    ERROR: Task created but no ID returned: {created_task}")
                except Exception as e:
                    print(f"    ERROR: Could not parse created task: {e}")
            else:
                print(f"    ERROR: Failed to create task: {response.text}")

            if task_id:
                # Test getting the specific task
                response = client.get(f"/api/tasks/{task_id}", headers=user1_headers)
                print(f"  GET /api/tasks/{task_id} -> {response.status_code}")
                if response.status_code == 200:
                    print(f"    OK: Successfully retrieved task {task_id}")
                else:
                    print(f"    ERROR: Failed to retrieve task {task_id}: {response.text}")

                # Test updating the task
                update_data = {
                    "title": "Updated Integration Test Task",
                    "description": "This task was updated during integration testing",
                    "completed": True
                }
                response = client.put(f"/api/tasks/{task_id}", json=update_data, headers=user1_headers)
                print(f"  PUT /api/tasks/{task_id} -> {response.status_code}")
                if response.status_code == 200:
                    print(f"    OK: Successfully updated task {task_id}")
                else:
                    print(f"    ERROR: Failed to update task {task_id}: {response.text}")

                # Test toggling completion status
                response = client.patch(f"/api/tasks/{task_id}/complete", headers=user1_headers)
                print(f"  PATCH /api/tasks/{task_id}/complete -> {response.status_code}")
                if response.status_code == 200:
                    print(f"    OK: Successfully toggled completion for task {task_id}")
                else:
                    print(f"    ERROR: Failed to toggle completion for task {task_id}: {response.text}")

                # Test deleting the task
                response = client.delete(f"/api/tasks/{task_id}", headers=user1_headers)
                print(f"  DELETE /api/tasks/{task_id} -> {response.status_code}")
                if response.status_code in [200, 204]:
                    print(f"    OK: Successfully deleted task {task_id}")
                else:
                    print(f"    ERROR: Failed to delete task {task_id}: {response.text}")

            print("\n4. Testing cross-user access prevention...")

            # Create a task with user 1
            task_data = {
                "title": "User 1 Private Task",
                "description": "This belongs to user 1",
                "completed": False
            }
            response = client.post("/api/tasks", json=task_data, headers=user1_headers)
            if response.status_code in [200, 201]:
                try:
                    private_task = response.json()
                    private_task_id = private_task.get('id')
                    if private_task_id:
                        # Try to access this task with user 2 (should be denied)
                        response = client.get(f"/api/tasks/{private_task_id}", headers=user2_headers)
                        print(f"  User 2 accessing User 1's task {private_task_id} -> {response.status_code}")

                        # The response should be 404 (Not Found) or 403 (Forbidden) to prevent user enumeration
                        if response.status_code in [403, 404]:
                            print(f"    OK: Cross-user access properly blocked (returned {response.status_code})")
                        elif response.status_code == 200:
                            print(f"    ERROR: Cross-user access NOT blocked! User 2 accessed User 1's task!")
                        else:
                            print(f"    INFO: Cross-user access returned {response.status_code} (may be OK depending on implementation)")

                        # Clean up: delete the test task
                        client.delete(f"/api/tasks/{private_task_id}", headers=user1_headers)
                    else:
                        print("    WARNING: Could not get private task ID for cross-user test")
                except Exception as e:
                    print(f"    ERROR: Exception during cross-user test: {e}")
            else:
                print(f"    ERROR: Could not create private task for cross-user test: {response.status_code}")

            print("\n5. Testing JWT token validation...")

            # Test with invalid token format
            invalid_headers = {"Authorization": "Invalid Token Format"}
            response = client.get("/api/tasks", headers=invalid_headers)
            print(f"  Invalid auth header -> {response.status_code}")
            if response.status_code == 401:
                print("    OK: Invalid auth header properly rejected")
            else:
                print("    ERROR: Invalid auth header should be rejected")

            # Test with malformed JWT
            malformed_headers = {"Authorization": "Bearer malformed.token.string"}
            response = client.get("/api/tasks", headers=malformed_headers)
            print(f"  Malformed JWT -> {response.status_code}")
            if response.status_code == 401:
                print("    OK: Malformed JWT properly rejected")
            else:
                print("    ERROR: Malformed JWT should be rejected")

            # Test with expired token
            expired_payload = {
                "id": "expired_user",
                "exp": int((datetime.utcnow() - timedelta(hours=1)).timestamp())  # Expired 1 hour ago
            }
            expired_token = jwt.encode(expired_payload, settings.better_auth_secret, algorithm="HS256")
            expired_headers = {"Authorization": f"Bearer {expired_token}"}
            response = client.get("/api/tasks", headers=expired_headers)
            print(f"  Expired JWT -> {response.status_code}")
            if response.status_code == 401:
                print("    OK: Expired JWT properly rejected")
            else:
                print("    ERROR: Expired JWT should be rejected")

            # Test with wrong secret
            wrong_secret_token = jwt.encode({"id": "any_user"}, "wrong_secret", algorithm="HS256")
            wrong_secret_headers = {"Authorization": f"Bearer {wrong_secret_token}"}
            response = client.get("/api/tasks", headers=wrong_secret_headers)
            print(f"  Wrong secret JWT -> {response.status_code}")
            if response.status_code == 401:
                print("    OK: Wrong secret JWT properly rejected")
            else:
                print("    ERROR: Wrong secret JWT should be rejected")

            print("\n6. Testing API endpoint availability...")

            # Check all registered routes
            routes = [route.path for route in app.routes]
            api_routes = [route for route in routes if route.startswith('/api/')]

            print(f"    Found {len(api_routes)} API routes:")
            for route in sorted(api_routes):
                route_obj = next((r for r in app.routes if r.path == route), None)
                methods = getattr(route_obj, 'methods', ['UNKNOWN']) if route_obj else ['UNKNOWN']
                print(f"      - {route} {sorted(list(methods))}")

            print("\nAll API endpoint tests completed!")

    except Exception as e:
        print(f"\nError during testing: {e}")
        import traceback
        traceback.print_exc()

    finally:
        # Clean up temporary database
        if os.path.exists(temp_db_path):
            os.unlink(temp_db_path)


if __name__ == "__main__":
    test_api_endpoints_with_tokens()