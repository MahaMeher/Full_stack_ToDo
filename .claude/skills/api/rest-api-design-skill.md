# REST API Design Skill

## Overview
This skill provides expertise in designing RESTful APIs using FastAPI for the backend and consumption by Next.js frontend applications. The system implements stateless, scalable APIs following RESTful principles with JWT-based security for the Phase-II application.

## Capabilities
- Design RESTful endpoints following industry best practices
- Implement proper HTTP methods usage for CRUD operations
- Create consistent endpoint naming conventions
- Build stateless APIs with proper authentication
- Secure APIs using JWT tokens and authorization
- Design efficient request/response structures
- Implement proper error handling and status codes
- Optimize API performance with caching and pagination

## RESTful Principles
- **Resource-Based**: Organize APIs around resources (users, todos, etc.) rather than actions
- **Stateless Operations**: Each request contains all necessary information for processing
- **Uniform Interface**: Consistent API design patterns across all endpoints
- **Self-Descriptive Messages**: Clear request/response formats with appropriate metadata
- **HATEOAS**: Include relevant links in responses for discoverability
- **Layered Architecture**: Support for intermediaries like load balancers and caches
- **Cacheable Responses**: Implement proper caching headers for improved performance
- **Client-Server Separation**: Clear separation between client and server concerns

## Endpoint Naming Conventions
- **Plural Nouns**: Use plural nouns for resource collections (`/users`, `/todos`)
- **Lowercase**: All endpoint paths in lowercase (`/api/users`, not `/api/Users`)
- **Hyphens for Multi-Word**: Use hyphens for multi-word resources (`/user-profiles`)
- **Hierarchical Structure**: Use nested paths for related resources (`/users/{id}/todos`)
- **Versioning**: Include version in URL (`/api/v1/users`) or headers
- **Consistent Patterns**: Maintain consistent patterns across all endpoints
- **Meaningful Names**: Use descriptive names that clearly indicate resource purpose
- **No File Extensions**: Avoid file extensions in REST endpoints

## HTTP Methods Usage
- **GET**: Retrieve resources (`GET /api/users`, `GET /api/users/{id}`)
- **POST**: Create new resources (`POST /api/users`, `POST /api/users/{id}/todos`)
- **PUT**: Update entire resource (`PUT /api/users/{id}`)
- **PATCH**: Partial resource updates (`PATCH /api/users/{id}`)
- **DELETE**: Remove resources (`DELETE /api/users/{id}`)
- **OPTIONS**: Retrieve communication options for resources
- **HEAD**: Get headers without response body
- **Proper Semantics**: Use methods according to their intended semantics

## Stateless API Behavior
- **No Session State**: Server doesn't store client session information
- **Complete Requests**: Each request contains all necessary information
- **JWT Tokens**: Use tokens for authentication instead of server-side sessions
- **Idempotent Operations**: GET, PUT, DELETE operations produce same result when repeated
- **Independent Transactions**: Each request is independent of others
- **Scalability**: Easy to scale horizontally without shared state
- **Load Balancing**: Works well with load balancers without sticky sessions
- **Caching**: Enables effective response caching strategies

## JWT-Secured APIs
- **Token-Based Authentication**: Use JWT tokens instead of traditional sessions
- **Header Authorization**: Include tokens in `Authorization: Bearer <token>` header
- **Token Validation**: Verify token signature and expiration on each request
- **Protected Endpoints**: Secure sensitive endpoints with JWT dependency
- **Token Refresh**: Implement refresh token mechanisms for extended sessions
- **Role-Based Access**: Include user roles and permissions in token claims
- **Token Revocation**: Support for token invalidation when needed
- **Secure Transmission**: Always transmit tokens over HTTPS

## FastAPI Specific Implementation
- **Pydantic Models**: Use Pydantic for request/response validation
- **Type Hints**: Leverage Python type hints for automatic documentation
- **Dependency Injection**: Implement clean dependency injection patterns
- **Automatic Documentation**: Generate Swagger UI and ReDoc automatically
- **Async Support**: Use async/await for non-blocking operations
- **Request Validation**: Automatic request validation and error responses
- **Response Serialization**: Automatic response serialization and validation

## Next.js Frontend Integration
- **API Consumption**: Properly consume REST APIs in Next.js applications
- **Authorization Headers**: Include JWT tokens in API requests
- **Error Handling**: Handle API errors gracefully in frontend
- **Loading States**: Implement proper loading states for API calls
- **Caching Strategies**: Implement client-side caching for API responses
- **Retry Logic**: Handle network failures with retry mechanisms
- **Request Interceptors**: Intercept and modify API requests as needed

## API Versioning Strategy
- **URL Versioning**: Include version in URL path (`/api/v1/users`)
- **Backward Compatibility**: Maintain backward compatibility when possible
- **Deprecation Strategy**: Plan for API deprecation with advance notice
- **Feature Flags**: Use feature flags for gradual rollout of new features
- **Documentation Updates**: Keep API documentation synchronized with versions

## Performance Considerations
- **Pagination**: Implement pagination for collection endpoints
- **Filtering**: Support query parameters for data filtering
- **Sorting**: Allow clients to sort results via query parameters
- **Caching Headers**: Set appropriate cache headers for responses
- **Compression**: Enable response compression for large payloads
- **Rate Limiting**: Implement rate limiting to prevent abuse