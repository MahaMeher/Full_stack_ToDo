import pytest
from unittest.mock import Mock, patch
from sqlmodel import Session
from src.services.task_service import TaskService
from src.models.task import Task
from tests.fixtures.sample_data import SAMPLE_USER_ID_1, SAMPLE_USER_ID_2, SAMPLE_TASK_CREATE


def test_create_task():
    """Test creating a task using TaskService."""
    # Mock the session
    mock_session = Mock(spec=Session)
    mock_task = Task(
        user_id=SAMPLE_USER_ID_1,
        title=SAMPLE_TASK_CREATE.title,
        description=SAMPLE_TASK_CREATE.description,
        completed=SAMPLE_TASK_CREATE.completed
    )

    # Configure the mock to simulate adding and refreshing
    def mock_add_side_effect(obj):
        obj.id = "mocked-uuid"

    def mock_commit_side_effect():
        pass

    def mock_refresh_side_effect(obj):
        # Simulate refresh populating the ID and other fields
        pass

    mock_session.add.side_effect = mock_add_side_effect
    mock_session.commit.side_effect = mock_commit_side_effect
    mock_session.refresh.side_effect = mock_refresh_side_effect

    # Call the service method
    result = TaskService.create_task(mock_session, SAMPLE_USER_ID_1, SAMPLE_TASK_CREATE)

    # Assertions
    assert result.user_id == SAMPLE_USER_ID_1
    assert result.title == SAMPLE_TASK_CREATE.title
    assert result.description == SAMPLE_TASK_CREATE.description
    assert result.completed == SAMPLE_TASK_CREATE.completed
    mock_session.add.assert_called_once()
    mock_session.commit.assert_called_once()
    mock_session.refresh.assert_called_once()


def test_get_tasks_by_user_id():
    """Test getting tasks for a specific user."""
    # Mock the session and query result
    mock_session = Mock(spec=Session)
    mock_task1 = Mock(spec=Task)
    mock_task1.user_id = SAMPLE_USER_ID_1
    mock_task1.id = "task-1"
    mock_task2 = Mock(spec=Task)
    mock_task2.user_id = SAMPLE_USER_ID_1
    mock_task2.id = "task-2"

    mock_tasks = [mock_task1, mock_task2]

    # Mock the exec method to return our mock tasks
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.all.return_value = mock_tasks

        result = TaskService.get_tasks_by_user_id(mock_session, SAMPLE_USER_ID_1)

        assert len(result) == 2
        assert all(task.user_id == SAMPLE_USER_ID_1 for task in result)


def test_get_task_by_id_and_user_id_found():
    """Test getting a specific task that exists and belongs to the user."""
    # Mock the session and query result
    mock_session = Mock(spec=Session)
    mock_task = Mock(spec=Task)
    mock_task.id = "existing-task-id"
    mock_task.user_id = SAMPLE_USER_ID_1

    # Mock the exec method to return our mock task
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = mock_task

        result = TaskService.get_task_by_id_and_user_id(mock_session, "existing-task-id", SAMPLE_USER_ID_1)

        assert result == mock_task
        assert result.id == "existing-task-id"
        assert result.user_id == SAMPLE_USER_ID_1


def test_get_task_by_id_and_user_id_not_found():
    """Test getting a specific task that doesn't exist or doesn't belong to the user."""
    # Mock the session
    mock_session = Mock(spec=Session)

    # Mock the exec method to return None
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = None

        result = TaskService.get_task_by_id_and_user_id(mock_session, "nonexistent-task-id", SAMPLE_USER_ID_1)

        assert result is None


def test_update_task_success():
    """Test updating an existing task."""
    # Mock the session and existing task
    mock_session = Mock(spec=Session)
    mock_existing_task = Mock(spec=Task)
    mock_existing_task.id = "existing-task-id"
    mock_existing_task.user_id = SAMPLE_USER_ID_1
    mock_existing_task.title = "Old Title"
    mock_existing_task.description = "Old Description"
    mock_existing_task.completed = False

    # Mock the exec method to return the existing task
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = mock_existing_task

        from src.models.task import TaskUpdate
        update_data = TaskUpdate(
            title="New Title",
            description="New Description",
            completed=True
        )

        result = TaskService.update_task(mock_session, "existing-task-id", SAMPLE_USER_ID_1, update_data)

        assert result == mock_existing_task
        assert result.title == "New Title"
        assert result.description == "New Description"
        assert result.completed is True
        mock_session.add.assert_called_once()
        mock_session.commit.assert_called_once()


def test_update_task_not_found():
    """Test updating a task that doesn't exist or doesn't belong to the user."""
    # Mock the session
    mock_session = Mock(spec=Session)

    # Mock the exec method to return None
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = None

        from src.models.task import TaskUpdate
        update_data = TaskUpdate(title="New Title")

        result = TaskService.update_task(mock_session, "nonexistent-task-id", SAMPLE_USER_ID_1, update_data)

        assert result is None
        mock_session.add.assert_not_called()
        mock_session.commit.assert_not_called()


def test_delete_task_success():
    """Test deleting an existing task."""
    # Mock the session and existing task
    mock_session = Mock(spec=Session)
    mock_existing_task = Mock(spec=Task)
    mock_existing_task.id = "existing-task-id"
    mock_existing_task.user_id = SAMPLE_USER_ID_1

    # Mock the exec method to return the existing task
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = mock_existing_task

        result = TaskService.delete_task(mock_session, "existing-task-id", SAMPLE_USER_ID_1)

        assert result is True
        mock_session.delete.assert_called_once_with(mock_existing_task)
        mock_session.commit.assert_called_once()


def test_delete_task_not_found():
    """Test deleting a task that doesn't exist or doesn't belong to the user."""
    # Mock the session
    mock_session = Mock(spec=Session)

    # Mock the exec method to return None
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = None

        result = TaskService.delete_task(mock_session, "nonexistent-task-id", SAMPLE_USER_ID_1)

        assert result is False
        mock_session.delete.assert_not_called()
        mock_session.commit.assert_not_called()


def test_toggle_task_completion_success():
    """Test toggling the completion status of an existing task."""
    # Mock the session and existing task
    mock_session = Mock(spec=Session)
    mock_existing_task = Mock(spec=Task)
    mock_existing_task.id = "existing-task-id"
    mock_existing_task.user_id = SAMPLE_USER_ID_1
    mock_existing_task.completed = False  # Initially not completed

    # Mock the exec method to return the existing task
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = mock_existing_task

        result = TaskService.toggle_task_completion(mock_session, "existing-task-id", SAMPLE_USER_ID_1)

        assert result == mock_existing_task
        assert result.completed is True  # Should be toggled to True
        mock_session.add.assert_called_once()
        mock_session.commit.assert_called_once()


def test_toggle_task_completion_not_found():
    """Test toggling completion of a task that doesn't exist or doesn't belong to the user."""
    # Mock the session
    mock_session = Mock(spec=Session)

    # Mock the exec method to return None
    with patch('src.services.task_service.select') as mock_select:
        mock_query = Mock()
        mock_select.return_value.where.return_value = mock_query
        mock_session.exec.return_value.first.return_value = None

        result = TaskService.toggle_task_completion(mock_session, "nonexistent-task-id", SAMPLE_USER_ID_1)

        assert result is None
        mock_session.add.assert_not_called()
        mock_session.commit.assert_not_called()