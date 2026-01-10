import logging
from fastapi import Request, HTTPException, status
from fastapi.security.http import HTTPBearer, HTTPAuthorizationCredentials
from .jwt_handler import verify_token

logger = logging.getLogger(__name__)


# Security headers for enhanced protection
SECURITY_HEADERS = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains"
}


class JWTAuth:
    """
    JWT Authentication middleware class to verify tokens in requests.
    """

    def __init__(self):
        self.scheme = HTTPBearer(auto_error=True)

    async def __call__(self, request: Request):
        """
        Verify JWT token from the Authorization header.

        Args:
            request: FastAPI request object

        Returns:
            bool: True if token is valid, raises HTTPException otherwise
        """
        authorization_header = request.headers.get("Authorization")
        client_ip = request.client.host if request.client else "unknown"

        if not authorization_header or not authorization_header.startswith("Bearer "):
            logger.warning(f"Authentication failed for IP {client_ip}: Missing or invalid Authorization header")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authorization header missing or invalid format",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = authorization_header[7:]  # Remove "Bearer " prefix

        if not verify_token(token):
            logger.warning(f"Authentication failed for IP {client_ip}: Invalid or expired token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        logger.info(f"Successful authentication for IP {client_ip}")
        return True


# Create a reusable instance
jwt_auth = JWTAuth()


def get_current_user_id_from_request(request: Request) -> str:
    """
    Extract user ID from JWT token in the request header.

    Args:
        request: FastAPI request object

    Returns:
        str: User ID extracted from the token

    Raises:
        HTTPException: If token is invalid or user ID cannot be extracted
    """
    from .jwt_handler import extract_user_id_from_token

    authorization_header = request.headers.get("Authorization")

    if not authorization_header or not authorization_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header missing or invalid format",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = authorization_header[7:]  # Remove "Bearer " prefix

    user_id = extract_user_id_from_token(token)

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user_id