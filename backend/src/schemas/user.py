from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel


class UserBase(BaseModel):
    """Base schema for User with common fields"""
    email: EmailStr
    name: Optional[str] = None
    is_active: bool = True


class UserCreate(UserBase):
    """Schema for creating a new user"""
    password: str
    password_confirm: str

    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "name": "John Doe",
                "password": "securePassword123",
                "password_confirm": "securePassword123"
            }
        }


class UserUpdate(SQLModel):
    """Schema for updating user information"""
    name: Optional[str] = None
    email: Optional[str] = None
    is_active: Optional[bool] = None


class UserLogin(BaseModel):
    """Schema for user login"""
    email: EmailStr
    password: str

    class Config:
        schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "securePassword123"
            }
        }


class UserPublic(UserBase):
    """Schema for public user information"""
    id: str
    created_at: datetime
    updated_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        orm_mode = True


class UserRegisterResponse(BaseModel):
    """Response schema for user registration"""
    id: str
    email: EmailStr
    name: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True


class TokenResponse(BaseModel):
    """Response schema for authentication tokens"""
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str

    class Config:
        orm_mode = True