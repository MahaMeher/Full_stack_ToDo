# JWT-Based Authentication Skill

## Overview
This skill provides expertise in implementing JWT (JSON Web Token) based authentication systems with Better Auth integration for Next.js frontend and FastAPI backend verification. The system implements stateless authentication using JWT tokens with shared secrets via environment variables.

## Capabilities
- Implement JWT token issuance and verification in full-stack applications
- Integrate Better Auth for frontend authentication management
- Configure token expiration and refresh mechanisms
- Set up Authorization header usage for API requests
- Implement backend JWT verification in FastAPI applications
- Configure secure token storage and transmission
- Handle token refresh and renewal processes
- Implement proper error handling for authentication failures

## Frontend Authentication (Better Auth)
- Manage user session state in Next.js applications
- Handle JWT token storage and retrieval from HTTP-only cookies or local storage
- Implement login/logout flows with proper token cleanup
- Configure token refresh mechanisms to maintain user sessions
- Secure token storage using appropriate client-side security measures
- Integrate with Next.js App Router for protected route handling

## JWT Token Structure and Lifecycle
- Configure JWT header with appropriate algorithm information (HS256)
- Define token payload with user claims, expiration time, and issuer
- Implement signature creation using shared secrets
- Set appropriate token expiration times (typically 15 minutes for access tokens)
- Implement refresh tokens with longer expiration periods
- Configure token claims to include user-specific information for authorization

## Authorization Header Implementation
- Format: `Authorization: Bearer <JWT_TOKEN>`
- Include JWT tokens in HTTP headers for protected API requests
- Implement automatic token addition to API calls using interceptors
- Extract tokens from request headers for backend verification
- Handle token presence validation in both frontend and backend

## Backend JWT Verification (FastAPI)
- Extract JWT tokens from Authorization headers in FastAPI endpoints
- Verify token validity using shared secrets and appropriate algorithms
- Decode token payloads to extract user claims and permissions
- Handle token expiration and invalid token scenarios
- Implement security middleware for protected route verification
- Configure proper error responses for authentication failures

## Security Implementation
- Implement stateless authentication to reduce server memory footprint
- Ensure user isolation through unique tokens with specific claims
- Configure secure token storage using HTTP-only cookies or encrypted storage
- Enforce HTTPS for all authentication-related communications
- Implement token rotation for enhanced security
- Validate token audience and issuer to ensure proper service usage
- Configure fine-grained access control through token claims

## Environment Configuration
- Set JWT_SECRET_KEY for shared secret between frontend and backend
- Configure JWT_ALGORITHM for token signing (typically HS256)
- Define JWT_ACCESS_TOKEN_EXPIRE_MINUTES for access token duration
- Set JWT_REFRESH_TOKEN_EXPIRE_HOURS for refresh token duration
- Implement secure environment variable management for production deployment

## Integration Patterns
- User authentication flow: login → token generation → token storage
- API request flow: token retrieval → header inclusion → backend verification
- Token refresh flow: expiration detection → refresh request → token renewal
- Logout flow: token invalidation → session cleanup → secure storage clearing
- Error handling: invalid token detection → appropriate error responses

## Common Scenarios
- Protected route handling in Next.js applications
- API endpoint protection in FastAPI
- Cross-origin request authentication
- Token synchronization between multiple frontend components
- Session management in server-side rendered applications
- Integration with existing user management systems

## Error Handling
- Handle 401 Unauthorized responses for invalid or expired tokens
- Implement token refresh mechanisms when access tokens expire
- Provide appropriate error messages without exposing sensitive information
- Handle malformed token rejection with 400 Bad Request responses
- Implement fallback authentication mechanisms when needed