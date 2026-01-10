from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from typing import List
import uuid
from ...models.task import Task, TaskCreate, TaskUpdate
from ...schemas.task import (
    TaskCreate as TaskCreateSchema,
    TaskUpdate as TaskUpdateSchema,
    TaskResponse,
    TaskListResponse,
    TaskToggleCompleteResponse
)
from ...services.task_service import TaskService
from ...api.deps import get_current_user_id, get_db_session
from ...utils.exceptions import TaskNotFoundException, UnauthorizedUserException, TaskValidationException


router = APIRouter()


@router.get("/tasks", response_model=TaskListResponse)
def list_tasks(
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    List all tasks for the authenticated user.
    """
    tasks = TaskService.get_tasks_by_user_id(session, current_user_id)
    task_responses = [
        TaskResponse(
            id=task.id,
            user_id=task.user_id,
            title=task.title,
            description=task.description,
            completed=task.completed,
            created_at=task.created_at,
            updated_at=task.updated_at
        )
        for task in tasks
    ]
    return TaskListResponse(tasks=task_responses)


@router.post("/tasks", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreateSchema,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Create a new task for the authenticated user.
    """
    # Validate task title length
    if not (1 <= len(task_data.title) <= 200):
        raise TaskValidationException("Title must be between 1 and 200 characters")

    # Create the task
    task_create = TaskCreate(
        title=task_data.title,
        description=task_data.description,
        completed=task_data.completed
    )
    created_task = TaskService.create_task(session, current_user_id, task_create)

    return TaskResponse(
        id=created_task.id,
        user_id=created_task.user_id,
        title=created_task.title,
        description=created_task.description,
        completed=created_task.completed,
        created_at=created_task.created_at,
        updated_at=created_task.updated_at
    )


@router.get("/tasks/{task_id}", response_model=TaskResponse)
def get_task(
    task_id: str,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Get details of a specific task by ID.
    """
    # Validate UUID format
    try:
        uuid.UUID(task_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID format"
        )

    task = TaskService.get_task_by_id_and_user_id(session, task_id, current_user_id)
    if not task:
        raise TaskNotFoundException(task_id)

    return TaskResponse(
        id=task.id,
        user_id=task.user_id,
        title=task.title,
        description=task.description,
        completed=task.completed,
        created_at=task.created_at,
        updated_at=task.updated_at
    )


@router.put("/tasks/{task_id}", response_model=TaskResponse)
def update_task(
    task_id: str,
    task_data: TaskUpdateSchema,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Update an existing task.
    """
    # Validate UUID format
    try:
        uuid.UUID(task_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID format"
        )

    # Validate title length if provided
    if task_data.title is not None and not (1 <= len(task_data.title) <= 200):
        raise TaskValidationException("Title must be between 1 and 200 characters")

    updated_task = TaskService.update_task(session, task_id, current_user_id, TaskUpdate(**task_data.dict(exclude_unset=True)))
    if not updated_task:
        raise TaskNotFoundException(task_id)

    return TaskResponse(
        id=updated_task.id,
        user_id=updated_task.user_id,
        title=updated_task.title,
        description=updated_task.description,
        completed=updated_task.completed,
        created_at=updated_task.created_at,
        updated_at=updated_task.updated_at
    )


@router.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: str,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Delete a task.
    """
    # Validate UUID format
    try:
        uuid.UUID(task_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID format"
        )

    success = TaskService.delete_task(session, task_id, current_user_id)
    if not success:
        raise TaskNotFoundException(task_id)

    # Return 204 No Content on successful deletion
    return


@router.patch("/tasks/{task_id}/complete", response_model=TaskResponse)
def toggle_task_completion(
    task_id: str,
    current_user_id: str = Depends(get_current_user_id),
    session: Session = Depends(get_db_session)
):
    """
    Toggle the completion status of a task.
    """
    # Validate UUID format
    try:
        uuid.UUID(task_id)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid task ID format"
        )

    task = TaskService.toggle_task_completion(session, task_id, current_user_id)
    if not task:
        raise TaskNotFoundException(task_id)

    return TaskResponse(
        id=task.id,
        user_id=task.user_id,
        title=task.title,
        description=task.description,
        completed=task.completed,
        created_at=task.created_at,
        updated_at=task.updated_at
    )