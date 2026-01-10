from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uuid


class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TaskCreate(TaskBase):
    title: str
    description: Optional[str] = None
    completed: bool = False


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None


class TaskResponse(TaskBase):
    id: uuid.UUID
    user_id: str
    created_at: datetime
    updated_at: datetime


class TaskToggleCompleteResponse(BaseModel):
    id: uuid.UUID
    user_id: str
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime


class TaskListResponse(BaseModel):
    tasks: List[TaskResponse]