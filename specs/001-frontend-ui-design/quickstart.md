# Quickstart Guide: Frontend UI Development

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- Better Auth configured with shared BETTER_AUTH_SECRET

## Setup Instructions

### 1. Initialize the Frontend Project

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

### 2. Environment Configuration

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3001
NEXT_PUBLIC_BETTER_AUTH_COOKIE_PREFIX=your_app_prefix
BETTER_AUTH_SECRET=your_shared_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 3. Run the Development Server

```bash
# Start the Next.js development server
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:3000

## Project Structure Overview

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (protected)/       # Protected routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
├── lib/                  # Utility functions
│   └── api.ts            # API client with JWT handling
├── hooks/                # Custom React hooks
└── types/                # TypeScript definitions
```

## Key Features Implementation

### Authentication Flow
- Better Auth integration for user signup/login
- Protected route handling
- Automatic JWT token attachment to API requests

### Theme Management
- Light/dark mode support
- System preference detection
- Manual theme toggle

### API Integration
- Centralized API client (`lib/api.ts`)
- Automatic JWT token inclusion
- Error handling and loading states

## Development Commands

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run tests (when implemented)
npm run test
```

## Component Architecture

Components are organized following atomic design principles:

- `components/ui/` - Base UI primitives (buttons, inputs, etc.)
- `components/task/` - Task-specific components
- `components/auth/` - Authentication-related components
- `components/theme/` - Theme provider and toggle

## API Integration Pattern

All API calls should go through the centralized client in `lib/api.ts`:

```typescript
import { apiClient } from '@/lib/api';

// Example API call with automatic JWT handling
const tasks = await apiClient.get('/tasks');
const newTask = await apiClient.post('/tasks', { title: 'New Task' });
```

## Styling Convention

- Tailwind CSS utility classes
- Consistent color palette (defined in tailwind.config.ts)
- Responsive design using Tailwind breakpoints
- Dark mode support using `dark:` prefixes

## Next Steps

1. Implement authentication pages (sign-in, sign-up)
2. Create dashboard with task management features
3. Build reusable UI components
4. Integrate with backend API endpoints
5. Add loading and error states