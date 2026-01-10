from sqlmodel import create_engine, Session
from sqlalchemy import event
from contextlib import contextmanager
import os
from .settings import settings


# Create the database engine
engine = create_engine(
    settings.neon_db_url,
    echo=settings.debug,  # Log SQL queries in debug mode
    pool_pre_ping=True,   # Verify connections before use
)


def get_session():
    """Dependency to get database session"""
    with Session(engine) as session:
        yield session


# Optional: Add connection pooling settings
@event.listens_for(engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    """Set SQLite-specific pragmas if using SQLite"""
    if 'sqlite' in settings.neon_db_url:
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()