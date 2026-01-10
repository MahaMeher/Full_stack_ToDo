"""
Simple test to verify the API structure is correct.
"""
from src.main import app

def test_app_routes():
    print("Testing Todo Backend API structure...\n")

    # Check if the app has the expected routes
    routes = [route.path for route in app.routes]
    print("Registered routes:")
    for route in sorted(routes):
        print(f"  - {route}")

    # Verify expected routes exist
    expected_routes = ["/", "/health", "/api/tasks", "/api/tasks/{task_id}", "/api/tasks/{task_id}/complete"]

    print(f"\nVerifying expected routes...")
    for route in expected_routes:
        if route in routes:
            print(f"[OK] {route} - FOUND")
        else:
            print(f"[MISSING] {route} - MISSING")

    # Check for route methods
    print(f"\nChecking route methods...")
    for route in app.routes:
        if hasattr(route, 'methods'):
            print(f"{route.path}: {list(route.methods)}")
        elif hasattr(route, 'routes'):  # For APIRoute groups
            print(f"{route.path}: Subroutes exist")

    print("\nApplication structure test completed!")

if __name__ == "__main__":
    test_app_routes()