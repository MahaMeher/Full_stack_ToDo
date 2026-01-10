# Data Model: Frontend UI for Todo Application

## Entities

### TaskDisplay
Represents visual representation of tasks with status indicators, completion states, and interactive controls

**Fields**:
- id: string (unique identifier for the task)
- title: string (task title, 1-200 characters)
- description: string (optional task description)
- completed: boolean (completion status indicator)
- createdAt: Date (timestamp when task was created)
- updatedAt: Date (timestamp when task was last updated)
- userId: string (identifier of the user who owns the task)

**Validation Rules**:
- Title must be 1-200 characters
- Description is optional
- Completed defaults to false
- createdAt and updatedAt are managed by the system

**State Transitions**:
- Active → Completed (when user marks task as complete)
- Completed → Active (when user unmarks task as complete)

### UserSession
Represents authenticated user state with associated preferences and theme settings

**Fields**:
- id: string (user identifier from authentication)
- email: string (user's email address)
- name: string (user's display name)
- themePreference: 'light'|'dark'|'system' (user's theme preference)
- isAuthenticated: boolean (authentication status)
- jwtToken: string (JWT token for API authentication)

**Validation Rules**:
- Email must be valid email format
- Name is optional but preferred
- Theme preference defaults to 'system'
- JWT token must be present when authenticated