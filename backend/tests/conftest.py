import pytest
from fastapi.testclient import TestClient
from sqlmodel import Session, create_engine
from sqlmodel.pool import StaticPool
from src.main import app  # Import the app instance from main.py
from src.config.database import engine
from src.models.task import Task


@pytest.fixture(name="engine")
def engine_fixture():
    # Create an in-memory SQLite database for testing
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    yield engine


@pytest.fixture(name="session")
def session_fixture(engine):
    # Create tables and provide a session for testing
    from src.models import SQLModel
    SQLModel.metadata.create_all(bind=engine)
    with Session(engine) as session:
        yield session


@pytest.fixture(name="client")
def client_fixture():
    # Create a test client
    with TestClient(app) as client:
        yield client