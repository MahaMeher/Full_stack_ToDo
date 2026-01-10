import pytest
from datetime import datetime
from src.models.task import Task, TaskCreate, TaskUpdate
from tests.fixtures.sample_data import SAMPLE_USER_ID_1, SAMPLE_TASK_DATA


def test_task_creation():
    """Test creating a Task instance."""
    task = Task(
        user_id=SAMPLE_USER_ID_1,
        title=SAMPLE_TASK_DATA["title"],
        description=SAMPLE_TASK_DATA["description"],
        completed=SAMPLE_TASK_DATA["completed"]
    )

    assert task.title == SAMPLE_TASK_DATA["title"]
    assert task.description == SAMPLE_TASK_DATA["description"]
    assert task.completed == SAMPLE_TASK_DATA["completed"]
    assert task.user_id == SAMPLE_USER_ID_1
    assert task.created_at is not None
    assert task.updated_at is not None
    assert isinstance(task.created_at, datetime)
    assert isinstance(task.updated_at, datetime)


def test_task_default_values():
    """Test that Task has correct default values."""
    task = Task(
        user_id=SAMPLE_USER_ID_1,
        title="Test Task"
    )

    assert task.title == "Test Task"
    assert task.description is None
    assert task.completed is False  # Default value
    assert task.user_id == SAMPLE_USER_ID_1


def test_task_update():
    """Test updating a Task instance."""
    task = Task(
        user_id=SAMPLE_USER_ID_1,
        title="Original Title",
        description="Original Description",
        completed=False
    )

    # Update task properties
    task.title = "Updated Title"
    task.description = "Updated Description"
    task.completed = True

    assert task.title == "Updated Title"
    assert task.description == "Updated Description"
    assert task.completed is True


def test_task_create_schema():
    """Test TaskCreate schema validation."""
    task_create = TaskCreate(
        title="Test Task",
        description="Test Description",
        completed=True
    )

    assert task_create.title == "Test Task"
    assert task_create.description == "Test Description"
    assert task_create.completed is True


def test_task_create_required_fields():
    """Test that TaskCreate requires title."""
    with pytest.raises(ValueError):
        TaskCreate(
            title="",  # Empty title should fail validation
            description="Test Description"
        )


def test_task_create_title_length_validation():
    """Test TaskCreate title length validation."""
    # Test with title that is too long
    with pytest.raises(ValueError):
        TaskCreate(
            title="A" * 201,  # More than 200 characters
            description="Test Description"
        )

    # Test with title that is within limits
    task_create = TaskCreate(
        title="A" * 200,  # Exactly 200 characters
        description="Test Description"
    )
    assert len(task_create.title) == 200


def test_task_update_schema():
    """Test TaskUpdate schema flexibility."""
    task_update = TaskUpdate(
        title="Updated Title",
        description="Updated Description",
        completed=True
    )

    assert task_update.title == "Updated Title"
    assert task_update.description == "Updated Description"
    assert task_update.completed is True

    # Test with partial update (only some fields)
    partial_update = TaskUpdate(title="Only Title Updated")
    assert partial_update.title == "Only Title Updated"
    assert partial_update.description is None
    assert partial_update.completed is None