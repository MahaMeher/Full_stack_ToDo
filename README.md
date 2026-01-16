# Full Stack Todo Application

This is a complete full-stack Todo application featuring a FastAPI backend and a Next.js frontend, fully integrated and ready for deployment.

## 🚀 Features

### Backend (FastAPI)
- RESTful API with JWT authentication
- Task management with CRUD operations
- Secure user authentication and authorization
- PostgreSQL database with SQLModel ORM
- Comprehensive error handling and validation
- Docker and Docker Compose support
- Unit and integration tests

### Frontend (Next.js)
- Modern React application with TypeScript
- Responsive UI with Tailwind CSS
- Task management interface with filtering and search
- Dark/light mode toggle
- Form validation and error handling
- Toast notifications
- Protected routes and authentication flows

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL (with SQLModel/SQLAlchemy)
- **Authentication**: JWT tokens
- **Testing**: Pytest
- **Containerization**: Docker, Docker Compose

### Frontend
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Framer Motion

## 📁 Project Structure

```
├── backend/                 # FastAPI backend application
│   ├── src/
│   │   ├── api/            # API routes
│   │   ├── auth/           # Authentication logic
│   │   ├── config/         # Configuration and settings
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic
│   ├── tests/              # Test suite
│   ├── requirements.txt    # Python dependencies
│   └── docker-compose.yml  # Docker configuration
└── frontend/               # Next.js frontend application
    ├── app/                # Next.js 13+ App Router
    ├── components/         # Reusable UI components
    ├── lib/                # Utility functions
    ├── hooks/              # Custom React hooks
    ├── types/              # TypeScript type definitions
    ├── public/             # Static assets
    ├── package.json        # Node.js dependencies
    └── next.config.js      # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL (or Docker for containerized setup)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

5. Initialize the database:
```bash
python initialize_db.py
```

6. Start the development server:
```bash
python -m uvicorn src.main:app --reload --port 8000
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
```
NEON_DB_URL=postgresql://username:password@localhost:5432/todoapp
BETTER_AUTH_SECRET=your-jwt-secret-key
BETTER_AUTH_URL=http://localhost:3000
DEBUG=true
LOG_LEVEL=info
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_BETTER_AUTH_SECRET=your-jwt-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest  # Run all tests
pytest tests/unit/  # Run unit tests
pytest tests/integration/  # Run integration tests
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Lint the code

## 🔐 Authentication

The application implements JWT-based authentication:
- Users can sign up and sign in
- Protected routes require valid JWT tokens
- Tokens are stored securely in localStorage
- Automatic token refresh mechanism

## 🗄️ Database

The application uses PostgreSQL with SQLModel for database operations:
- Automatic schema generation
- Relationship management
- Query optimization
- Connection pooling

## 🚢 Deployment

### Docker Deployment
Both backend and frontend can be deployed using Docker:

```bash
# Build and run the entire stack
docker-compose up --build
```

### Production Deployment

#### Backend Deployment
- Deploy the FastAPI backend to platforms like Hugging Face Spaces, Heroku, Railway, or AWS
- Example Hugging Face deployment: https://mahamode-hackathon-2.hf.space/

#### Frontend Deployment
- Deploy the Next.js frontend to Vercel, Netlify, or similar platforms
- Example Vercel deployment: https://full-stack-to-do-tau.vercel.app/

#### Environment Configuration for Production
When deploying the frontend, make sure to set the environment variables appropriately:

For Vercel deployment, add these environment variables in your Vercel dashboard:
```
NEXT_PUBLIC_API_BASE_URL=https://mahamode-hackathon-2.hf.space  # Replace with your backend URL
NEXT_PUBLIC_BETTER_AUTH_SECRET=your-production-auth-secret
NEXTAUTH_URL=https://full-stack-to-do-tau.vercel.app  # Replace with your frontend URL
```

#### Integration Steps
1. Deploy your backend to Hugging Face Spaces or another platform
2. Update the `NEXT_PUBLIC_API_BASE_URL` in your frontend deployment to point to your backend
3. Ensure CORS is configured properly on your backend to allow requests from your frontend domain
4. Deploy your frontend to Vercel with the updated environment variables
5. Test all functionality to ensure smooth integration between frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please open an issue in the GitHub repository.