# FastAPI Backend Development Skill

## Overview
This skill provides expertise in developing backend services using FastAPI for the Todo application. The system implements RESTful APIs with JWT authentication, SQLModel ORM for database operations, and Neon PostgreSQL as the database provider. The backend follows modern Python development practices with type hints and async/await patterns.

## Capabilities
- Design and implement RESTful APIs using FastAPI framework
- Configure JWT authentication and authorization for protected endpoints
- Utilize SQLModel ORM for database operations with Neon PostgreSQL
- Implement proper error handling with appropriate HTTP status codes
- Create efficient database models and relationships for Todo app functionality
- Handle request validation and response serialization
- Configure API documentation with automatic OpenAPI generation
- Implement async database operations for optimal performance

## FastAPI Role in This Project
- **Primary API Framework**: Serves as the main backend framework for the Todo application
- **Async Processing**: Leverages async/await for efficient concurrent request handling
- **Automatic Documentation**: Generates interactive API documentation (Swagger UI/ReDoc)
- **Request Validation**: Provides automatic request validation with Pydantic models
- **Dependency Injection**: Implements clean dependency injection patterns
- **Middleware Integration**: Handles authentication, logging, and error processing
- **Route Organization**: Structures API endpoints in a modular, maintainable way

## REST API Design Principles
- **Resource-based URLs**: Use noun-based endpoints (e.g., `/todos`, `/users`)
- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE for CRUD operations
- **Status Codes**: Consistent use of standard HTTP status codes
- **JSON Responses**: All API responses in JSON format with consistent structure
- **Versioning**: API versioning through URL paths or headers
- **Pagination**: Implement pagination for collection endpoints
- **Filtering and Sorting**: Support query parameters for data filtering and sorting
- **HATEOAS**: Include relevant links in responses where appropriate

## JWT-Protected Endpoints Implementation
- **Authentication Middleware**: Implement JWT token verification middleware
- **Route Dependencies**: Use FastAPI dependencies for authentication checks
- **Token Validation**: Verify token signature and expiration using shared secrets
- **User Context**: Extract user information from JWT claims for request context
- **Protected Resources**: Secure endpoints requiring user authentication
- **Token Refresh**: Implement refresh token mechanisms for extended sessions
- **Role-Based Access**: Support different user roles and permissions

## SQLModel ORM Usage
- **Model Definition**: Define database models using SQLModel with Pydantic integration
- **Relationships**: Implement proper foreign key relationships between entities
- **CRUD Operations**: Create, read, update, delete operations using SQLModel
- **Async Sessions**: Use async database sessions for non-blocking operations
- **Migration Support**: Handle database schema migrations with Alembic
- **Query Building**: Utilize SQLModel's query building capabilities
- **Validation**: Leverage Pydantic validation within SQLModel models
- **Connection Pooling**: Configure efficient database connection pooling

## Error Handling and HTTP Status Codes
- **Standard Status Codes**:
  - 200 OK: Successful GET, PUT requests
  - 201 Created: Successful POST requests
  - 400 Bad Request: Invalid request data
  - 401 Unauthorized: Missing or invalid authentication
  - 403 Forbidden: Insufficient permissions
  - 404 Not Found: Resource doesn't exist
  - 422 Unprocessable Entity: Validation errors
  - 500 Internal Server Error: Server-side errors
- **Custom Exceptions**: Define application-specific exception classes
- **Error Responses**: Consistent error response format with message and details
- **Logging**: Implement comprehensive error logging for debugging
- **Graceful Degradation**: Handle database and external service failures appropriately

## Database Configuration (Neon PostgreSQL)
- **Connection Management**: Configure connection pooling and timeouts
- **Environment Variables**: Secure database credentials through environment variables
- **SSL Configuration**: Enable SSL connections for production environments
- **Performance Optimization**: Index configuration and query optimization
- **Backup and Recovery**: Neon-specific backup and point-in-time recovery
- **Connection Monitoring**: Monitor and log database connection metrics

## Todo App Specific Endpoints
- **User Management**: `/api/users` - registration, profile management
- **Todo Operations**: `/api/todos` - create, read, update, delete todos
- **Authentication**: `/api/auth` - login, register, token refresh
- **User Todos**: `/api/users/{user_id}/todos` - user-specific todo lists
- **Todo Categories**: `/api/categories` - todo categorization features
- **Search and Filter**: `/api/todos/search` - advanced todo search capabilities

## Security Implementation
- **Input Validation**: Automatic validation through Pydantic models
- **SQL Injection Prevention**: Parameterized queries through SQLModel
- **Authentication**: JWT-based authentication for all protected routes
- **Rate Limiting**: Implement request rate limiting to prevent abuse
- **CORS Configuration**: Proper CORS settings for frontend integration
- **Data Sanitization**: Clean user inputs to prevent XSS and other attacks

## Performance Considerations
- **Async Operations**: Use async database operations to prevent blocking
- **Connection Pooling**: Optimize database connection usage
- **Caching**: Implement caching for frequently accessed data
- **Query Optimization**: Write efficient database queries with proper indexing
- **Response Compression**: Enable compression for large response payloads
- **Background Tasks**: Use Celery or FastAPI background tasks for heavy operations