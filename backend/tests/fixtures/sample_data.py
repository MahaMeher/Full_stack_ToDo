from src.models.task import TaskCreate, TaskUpdate
from uuid import uuid4


# Sample user IDs for testing
SAMPLE_USER_ID_1 = "user_123"
SAMPLE_USER_ID_2 = "user_456"

# Sample task data for testing
SAMPLE_TASK_DATA = {
    "title": "Test Task",
    "description": "This is a test task",
    "completed": False
}

SAMPLE_TASK_DATA_2 = {
    "title": "Another Test Task",
    "description": "This is another test task",
    "completed": True
}

# Sample updated task data
SAMPLE_UPDATED_TASK_DATA = {
    "title": "Updated Test Task",
    "description": "This is an updated test task",
    "completed": True
}

# Sample task creation objects
SAMPLE_TASK_CREATE = TaskCreate(
    title="Test Task",
    description="This is a test task",
    completed=False
)

SAMPLE_TASK_UPDATE = TaskUpdate(
    title="Updated Test Task",
    description="This is an updated test task",
    completed=True
)

# Sample invalid task data for testing validation
INVALID_TASK_DATA = {
    "title": "",  # Empty title
    "description": "This task has an invalid title",
    "completed": False
}

TOO_LONG_TITLE_TASK_DATA = {
    "title": "A" * 201,  # Title longer than 200 characters
    "description": "This task has a title that is too long",
    "completed": False
}