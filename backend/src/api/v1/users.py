from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import datetime, timedelta
import jwt

from ...models.user import User, UserCreate, UserLogin
from ...schemas.user import UserRegisterResponse, TokenResponse, UserPublic
from ...services.user_service import UserService
from ...api.deps import get_db_session, get_current_user  # Added get_current_user import
from ...config.settings import settings
from ...utils.exceptions import InvalidCredentialsException, UserAlreadyExistsException

router = APIRouter()


def generate_jwt_token(user_id: str, email: str) -> str:
    """
    Generate a JWT token for the authenticated user.

    Args:
        user_id: The user's ID
        email: The user's email

    Returns:
        JWT token string
    """
    payload = {
        "id": user_id,
        "email": email,
        "iat": datetime.utcnow(),
        "exp": datetime.utcnow() + timedelta(days=7)  # Token expires in 7 days
    }
    token = jwt.encode(payload, settings.better_auth_secret, algorithm="HS256")
    return token


@router.post("/register", response_model=UserRegisterResponse, status_code=status.HTTP_201_CREATED)
def register_user(
    user_data: UserCreate,
    session: Session = Depends(get_db_session)
):
    """
    Register a new user account.
    """
    user_service = UserService()

    try:
        created_user = user_service.create_user(session, user_data)

        return UserRegisterResponse(
            id=created_user.id,
            email=created_user.email,
            name=created_user.name,
            created_at=created_user.created_at
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except UserAlreadyExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists"
        )


@router.post("/login", response_model=TokenResponse)
def login_user(
    login_data: UserLogin,
    session: Session = Depends(get_db_session)
):
    """
    Authenticate user and return JWT token.
    """
    user_service = UserService()

    try:
        user = user_service.authenticate_user(session, login_data)

        token = generate_jwt_token(user.id, user.email)

        return TokenResponse(
            access_token=token,
            token_type="bearer",
            user_id=user.id,
            email=user.email
        )
    except InvalidCredentialsException:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


@router.get("/profile", response_model=UserPublic)
def get_profile(
    current_user: User = Depends(get_current_user)
):
    """
    Get current user's profile information.
    """
    # Return the user object that was already retrieved by the dependency
    return UserPublic(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        is_active=current_user.is_active,
        created_at=current_user.created_at,
        updated_at=current_user.updated_at,
        last_login=current_user.last_login
    )