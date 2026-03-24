# Interactive DSA

**A mission to make Data Structures and Algorithms simple.**

Learn DSA through interactive visualizations, animations, and AI-powered guidance. Code, visualize, understand.

## Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, PostgreSQL, Redis
- **Code Execution**: Judge0 API
- **Real-time**: WebSocket

## Quick Start

```bash
# Frontend
cd frontend
npm install --legacy-peer-deps
npm run dev

# Backend (coming soon)
cd backend
python -m venv venv
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Visit `http://localhost:3000`

---

That's it. Build, learn, get better. 🚀
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


Created by: Sumanth Gogineni
