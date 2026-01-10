from fastapi import Depends, HTTPException, status, Request
from sqlmodel import Session
from typing import Generator
from ..config.database import get_session
from ..auth.jwt_handler import extract_user_id_from_token
from ..utils.exceptions import TokenValidationException


def get_current_user_id(request: Request) -> str:
    """
    Extract and verify the current user ID from the JWT token in the request headers.

    Args:
        request: FastAPI request object containing the authorization header

    Returns:
        str: The user ID extracted from the JWT token

    Raises:
        TokenValidationException: If no token is provided or if the token is invalid
    """
    authorization_header = request.headers.get("Authorization")

    if not authorization_header or not authorization_header.startswith("Bearer "):
        raise TokenValidationException("Authorization header missing or invalid format")

    token = authorization_header[7:]  # Remove "Bearer " prefix

    user_id = extract_user_id_from_token(token)

    if not user_id:
        raise TokenValidationException("Invalid or expired token")

    return user_id


def get_db_session() -> Generator[Session, None, None]:
    """
    Dependency to get database session.

    Yields:
        Database session for use in API endpoints
    """
    session = next(get_session())
    try:
        yield session
    finally:
        session.close()


# Convenience dependency that provides both user ID and database session
def get_current_user_and_session(
    user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Convenience dependency that provides both the current user ID and database session.

    Args:
        user_id: The authenticated user's ID (from JWT)
        session: Database session

    Returns:
        Tuple of (user_id, session)
    """
    return user_id, session