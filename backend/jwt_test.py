"""
Test script to verify JWT functionality with Better Auth integration
"""
import jwt
from datetime import datetime, timedelta
from src.auth.jwt_handler import decode_token, extract_user_id_from_token, verify_token
from src.config.settings import settings

def test_jwt_functionality():
    print("Testing JWT functionality with Better Auth integration...")
    print(f"Using secret: {settings.better_auth_secret}")
    print(f"Using auth URL: {settings.better_auth_url}")

    # Create a test token similar to what Better Auth might generate
    payload = {
        "id": "test_user_123",
        "email": "test@example.com",
        "exp": datetime.utcnow() + timedelta(hours=1),  # Token expires in 1 hour
        "iat": datetime.utcnow()  # Issued at
    }

    # Encode the token with the same secret used by the app
    test_token = jwt.encode(payload, settings.better_auth_secret, algorithm="HS256")
    print(f"Generated test token: {test_token}")

    # Test token verification
    print("\n1. Testing token verification...")
    is_valid = verify_token(test_token)
    print(f"Token verification result: {is_valid}")

    # Test token decoding
    print("\n2. Testing token decoding...")
    decoded_payload = decode_token(test_token)
    if decoded_payload:
        print(f"Decoded payload: {decoded_payload}")
    else:
        print("Failed to decode token")

    # Test user ID extraction
    print("\n3. Testing user ID extraction...")
    user_id = extract_user_id_from_token(test_token)
    print(f"Extracted user ID: {user_id}")

    # Test with invalid token
    print("\n4. Testing with invalid token...")
    invalid_token = "invalid.token.here"
    is_valid_invalid = verify_token(invalid_token)
    print(f"Invalid token verification result: {is_valid_invalid}")

    # Test with wrong secret
    print("\n5. Testing with token created with wrong secret...")
    wrong_secret_token = jwt.encode(payload, "wrong_secret", algorithm="HS256")
    is_valid_wrong = verify_token(wrong_secret_token)
    print(f"Wrong secret token verification result: {is_valid_wrong}")

    # Test expired token
    print("\n6. Testing with expired token...")
    expired_payload = {
        "id": "test_user_123",
        "exp": datetime.utcnow() - timedelta(hours=1),  # Expired 1 hour ago
    }
    expired_token = jwt.encode(expired_payload, settings.better_auth_secret, algorithm="HS256")
    is_valid_expired = verify_token(expired_token)
    print(f"Expired token verification result: {is_valid_expired}")

    print("\nJWT functionality test completed!")

if __name__ == "__main__":
    test_jwt_functionality()