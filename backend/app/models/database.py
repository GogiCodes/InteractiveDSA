"""
SQLAlchemy Database Models
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum as SQLEnum, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()


class DifficultyEnum(str, enum.Enum):
    """Difficulty levels"""
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    EXPERT = "expert"


class LanguageEnum(str, enum.Enum):
    """Programming languages"""
    PYTHON = "python"
    JAVA = "java"
    JAVASCRIPT = "javascript"
    CPP = "cpp"
    C = "c"


class SubmissionStatusEnum(str, enum.Enum):
    """Submission statuses"""
    PENDING = "pending"
    RUNNING = "running"
    ACCEPTED = "accepted"
    WRONG_ANSWER = "wrong_answer"
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded"
    RUNTIME_ERROR = "runtime_error"
    COMPILATION_ERROR = "compilation_error"


# ===== User Model =====
class User(Base):
    """User database model"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    submissions = relationship("Submission", back_populates="user", cascade="all, delete-orphan")
    progress = relationship("Progress", back_populates="user", uselist=False, cascade="all, delete-orphan")
    bookmarks = relationship("Bookmark", back_populates="user", cascade="all, delete-orphan")


# ===== Problem Model =====
class Problem(Base):
    """Problem database model"""
    __tablename__ = "problems"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    difficulty = Column(SQLEnum(DifficultyEnum), nullable=False, index=True)
    category = Column(String(100), nullable=False, index=True)
    time_limit = Column(Integer, default=2000)  # milliseconds
    memory_limit = Column(Integer, default=256)  # MB
    solved_count = Column(Integer, default=0)
    acceptance_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    submissions = relationship("Submission", back_populates="problem", cascade="all, delete-orphan")
    test_cases = relationship("TestCase", back_populates="problem", cascade="all, delete-orphan")
    hints = relationship("Hint", back_populates="problem", cascade="all, delete-orphan")
    bookmarks = relationship("Bookmark", back_populates="problem", cascade="all, delete-orphan")


# ===== Submission Model =====
class Submission(Base):
    """Code submission database model"""
    __tablename__ = "submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False, index=True)
    code = Column(Text, nullable=False)
    language = Column(SQLEnum(LanguageEnum), nullable=False)
    status = Column(SQLEnum(SubmissionStatusEnum), default=SubmissionStatusEnum.PENDING, index=True)
    output = Column(Text, nullable=True)
    error_message = Column(Text, nullable=True)
    runtime_ms = Column(Integer, nullable=True)
    memory_kb = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    
    # Relationships
    user = relationship("User", back_populates="submissions")
    problem = relationship("Problem", back_populates="submissions")


# ===== Test Case Model =====
class TestCase(Base):
    """Test case database model"""
    __tablename__ = "test_cases"
    
    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False, index=True)
    input_data = Column(Text, nullable=False)
    expected_output = Column(Text, nullable=False)
    is_hidden = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    problem = relationship("Problem", back_populates="test_cases")


# ===== Hint Model =====
class Hint(Base):
    """Hint database model"""
    __tablename__ = "hints"
    
    id = Column(Integer, primary_key=True, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False, index=True)
    level = Column(Integer, nullable=False)  # 1, 2, 3 for different hint levels
    hint_text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    problem = relationship("Problem", back_populates="hints")


# ===== Progress Model =====
class Progress(Base):
    """User progress tracking model"""
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False, index=True)
    total_problems_solved = Column(Integer, default=0)
    current_streak = Column(Integer, default=0)
    longest_streak = Column(Integer, default=0)
    last_solved_at = Column(DateTime, nullable=True)
    accuracy_rate = Column(Float, default=0.0)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="progress")


# ===== Bookmark Model =====
class Bookmark(Base):
    """User bookmarked problems"""
    __tablename__ = "bookmarks"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    problem_id = Column(Integer, ForeignKey("problems.id"), nullable=False, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="bookmarks")
    problem = relationship("Problem", back_populates="bookmarks")
