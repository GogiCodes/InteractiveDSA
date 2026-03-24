# Setup Guide - Interactive DSA Platform

## Prerequisites

Before you start, make sure you have:
- Node.js 18+ installed
- Python 3.11+ installed
- PostgreSQL 14+ installed
- Redis 7+ installed
- Docker & Docker Compose (optional but recommended)

## Option 1: Local Setup (Without Docker)

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env

# Edit .env with your configuration
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/interactive_dsa
# REDIS_URL=redis://localhost:6379

# Run migrations (when Alembic is set up)
# alembic upgrade head

# Start backend server
python -m uvicorn app.main:app --reload
```

The backend will be running at: `http://localhost:8000`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env.local file (optional)
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Start development server
npm run dev
```

The frontend will be running at: `http://localhost:3000`

### 3. Database Setup (PostgreSQL)

```bash
# Create database
createdb interactive_dsa

# Run schema
psql interactive_dsa < ../database/schema.sql

# Verify connection
psql interactive_dsa -c "SELECT 1;"
```

### 4. Redis Setup

```bash
# On macOS with Homebrew
brew install redis
brew services start redis

# On Linux with apt
sudo apt-get install redis-server
sudo service redis-server start

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

---

## Option 2: Docker Setup (Recommended)

### 1. Start Services

```bash
# From project root directory
docker-compose up -d

# Verify services are running
docker-compose ps
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp ../.env.example .env

# Update DATABASE_URL in .env to use Docker PostgreSQL:
# DATABASE_URL=postgresql://postgres:postgres@postgres:5432/interactive_dsa

# Run backend
python -m uvicorn app.main:app --reload --host 0.0.0.0
```

### 3. Frontend Setup

Same as Option 1, step 2.

---

## Verification

### 1. Check Backend Health

```bash
curl http://localhost:8000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Interactive DSA API",
  "version": "0.1.0"
}
```

### 2. Check Frontend

Open browser and go to: `http://localhost:3000`

### 3. API Documentation

FastAPI Swagger UI: `http://localhost:8000/docs`
ReDoc: `http://localhost:8000/redoc`

---

## Common Issues & Solutions

### PostgreSQL Connection Error

**Error**: `psycopg2.OperationalError: could not connect to server`

**Solution**:
```bash
# Check if PostgreSQL is running
psql --version
pg_isready

# If using Docker:
docker-compose ps postgres

# If not running, start it:
# macOS: brew services start postgresql
# Linux: sudo service postgresql start
```

### Redis Connection Error

**Error**: `ConnectionError: Error 111 connecting to localhost:6379`

**Solution**:
```bash
# Check if Redis is running
redis-cli ping

# If using Docker:
docker-compose ps redis

# If not running, start it:
# macOS: brew services start redis
# Linux: sudo service redis-server start
```

### Port Already in Use

**Error**: `Address already in use`

**Solution**:
```bash
# Find process using port
# For port 8000:
lsof -i :8000
# Kill process
kill -9 <PID>

# Or use different port:
python -m uvicorn app.main:app --reload --port 8001
```

### Module Not Found

**Error**: `ModuleNotFoundError: No module named 'app'`

**Solution**:
```bash
# Make sure you're in backend directory
cd backend

# Make sure venv is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file in the root directory:

```env
# Backend
BACKEND_URL=http://localhost:8000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/interactive_dsa

# Redis
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# External APIs
JUDGE0_API_KEY=your-judge0-key
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
OPENAI_API_KEY=your-openai-key

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## Next Steps

1. **Database Migrations**: Set up Alembic for migration management
2. **API Routes**: Implement remaining problem, submission, and progress routes
3. **Frontend Components**: Build React components for the UI
4. **Testing**: Write unit and integration tests
5. **Deployment**: Prepare for cloud deployment (AWS, Vercel, etc.)

---

## Useful Commands

### Backend

```bash
# Run tests
pytest

# Format code
black .

# Lint code
flake8

# Type check
mypy app

# Create database tables
python -c "from app.database import init_db; init_db()"

# Drop all tables (caution!)
python -c "from app.database import drop_db; drop_db()"
```

### Frontend

```bash
# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

### Database

```bash
# Connect to database
psql interactive_dsa

# List all tables
\dt

# View specific table
SELECT * FROM problems;

# Backup database
pg_dump interactive_dsa > backup.sql

# Restore database
psql interactive_dsa < backup.sql
```

---

## Support

For issues, check:
- GitHub Issues
- Documentation in `/docs` folder
- FastAPI docs at `/docs` endpoint

Good luck! 🚀
