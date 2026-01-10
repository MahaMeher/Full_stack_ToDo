# Todo Backend API

A secure, production-ready FastAPI backend that provides a RESTful API for a multi-user todo application.

## Features

- JWT-based authentication and authorization
- Secure CRUD operations for tasks
- User-based data isolation
- PostgreSQL database with SQLModel ORM
- Docker and Docker Compose support

## Prerequisites

- Python 3.11+
- PostgreSQL database (or use Docker Compose for local development)
- Better Auth service for JWT generation

## Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
pip install -r requirements.txt
```

## Configuration

Create a `.env` file in the backend root directory with the following variables:

```env
NEON_DB_URL=postgresql://username:password@host:port/database
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=https://your-domain.better-auth.com
DEBUG=false
LOG_LEVEL=info
```

## Running Locally

### Direct execution:

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### With Docker:

```bash
docker-compose up --build
```

## API Documentation

The API documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`
- OpenAPI JSON: `http://localhost:8000/openapi.json`

## API Endpoints

### Authentication
All API endpoints require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <jwt_token>
```

### Task Management

- `GET /api/tasks` - List user's tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get task details
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `PATCH /api/tasks/{id}/complete` - Toggle task completion status

## Security Features

- JWT-based authentication with Better Auth integration
- User data isolation (users can only access their own tasks)
- Input validation and sanitization
- Proper error handling without information disclosure

## Environment Variables

- `NEON_DB_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret for JWT verification
- `BETTER_AUTH_URL`: Origin for CORS configuration
- `DEBUG`: Enable/disable debug mode
- `LOG_LEVEL`: Logging level (info, debug, warning, error)

## Testing

To run the tests:

```bash
pytest tests/ -v
```

## Deployment

For production deployment:

1. Set `DEBUG=false`
2. Use a production-grade PostgreSQL database
3. Configure proper SSL certificates
4. Set up a reverse proxy (nginx, Apache)
5. Monitor application logs

## Health Check

The application provides a health check endpoint:
- `GET /health` - Returns application status

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 204: No Content
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 500: Internal Server Error