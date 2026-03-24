# Interactive DSA Platform

A comprehensive, AI-powered platform for learning Data Structures and Algorithms through interactive visualizations, animations, and simulations.

## Project Overview

**Interactive DSA** is a full-stack web application that combines:
- 📊 **Visual Algorithm Animations** - Watch algorithms execute step-by-step
- 💻 **Live Code Editor** - Write and test code in multiple languages
- 🤖 **AI Assistance** - Get intelligent hints and explanations
- 📈 **Progress Tracking** - Visualize your learning journey
- 🎯 **Adaptive Learning** - Difficulty scales based on performance

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (React 18)
- **Styling**: Tailwind CSS + Custom CSS
- **Visualization**: Canvas/Three.js for animations
- **State Management**: Zustand
- **Real-time**: WebSocket (Socket.io)

### Backend
- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL
- **Caching**: Redis
- **Code Execution**: Judge0 API / Containerized Sandbox
- **AI**: OpenAI/Claude API

### DevOps
- **Containerization**: Docker & Docker Compose
- **Version Control**: Git
- **Deployment**: (TBD - AWS/Vercel/Railway)

## Project Structure

```
InteractiveDSA/
├── backend/                 # FastAPI server
│   ├── app/
│   │   ├── routes/         # API endpoints
│   │   ├── models/         # Pydantic models
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── main.py         # App entry point
│   ├── tests/              # Unit & integration tests
│   ├── requirements.txt    # Python dependencies
│   └── docker/             # Docker configuration
│
├── frontend/               # Next.js app
│   ├── src/
│   │   ├── app/           # App Router (Next.js 13+)
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles
│   ├── public/            # Static assets
│   ├── package.json       # Node dependencies
│   └── next.config.js     # Next.js config
│
├── database/              # DB migrations & schemas
│   ├── migrations/        # Alembic migrations
│   └── schemas.sql        # DB schema definitions
│
├── docs/                  # Documentation
│   ├── API.md            # API documentation
│   ├── ARCHITECTURE.md    # System architecture
│   └── SETUP.md          # Setup guide
│
├── docker-compose.yml     # Service orchestration
├── .env.example          # Environment template
└── README.md             # This file
```

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 14+
- Redis 7+
- Docker & Docker Compose (optional)

### Local Setup

1. **Clone the repository**
```bash
cd /Users/sumanth/Desktop/Projects/InteractiveDSA
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Database Setup**
```bash
# Using Docker Compose (easiest)
docker-compose up -d postgres redis

# Or manual PostgreSQL setup
psql -U postgres -c "CREATE DATABASE interactive_dsa;"
```

## Features (MVP)

- [ ] User Authentication & Profiles
- [ ] 15 DSA Problems (Arrays, Linked Lists, Sorting)
- [ ] Code Editor with Syntax Highlighting
- [ ] Algorithm Visualization (Step-by-step)
- [ ] Test Case Runner
- [ ] Basic Hint System (Text-based)
- [ ] Progress Tracking
- [ ] Leaderboard (Optional)

## API Endpoints (Preview)

```
Authentication:
  POST   /auth/register
  POST   /auth/login
  POST   /auth/logout
  GET    /auth/me

Problems:
  GET    /problems
  GET    /problems/{id}
  GET    /problems/{id}/hints
  GET    /problems/{id}/test-cases

Code Execution:
  POST   /submissions
  GET    /submissions/{id}
  POST   /submissions/{id}/run

Users:
  GET    /users/{id}/profile
  GET    /users/{id}/progress
  POST   /users/{id}/settings

AI:
  POST   /ai/hint
  POST   /ai/explain
  POST   /ai/debug
```

## Environment Variables

Create `.env` file in root:
```
# Backend
BACKEND_URL=http://localhost:8000
DATABASE_URL=postgresql://user:password@localhost/interactive_dsa
REDIS_URL=redis://localhost:6379
SECRET_KEY=your-secret-key
JUDGE0_API_KEY=your-judge0-key
OPENAI_API_KEY=your-openai-key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm run test
```

### Building for Production
```bash
# Backend
docker build -t interactive-dsa-backend ./backend

# Frontend
npm run build
npm start
```

## Contributing

1. Create a branch for your feature
2. Commit changes with clear messages
3. Submit a pull request
4. Code review required before merge

## Roadmap

### Phase 1 (MVP - Current)
- Core problem-solving platform
- Basic visualizations
- User accounts & progress

### Phase 2
- AI-powered hints & explanations
- Advanced visualizations
- Code review system

### Phase 3
- Community features
- Leaderboards & gamification
- Interview prep mode

### Phase 4
- Mobile app (React Native)
- Collaborative problem-solving
- Video explanations

## License

MIT License (TBD)

## Contact

Created by: Your Team Name
Website: (TBD)
Email: (TBD)
