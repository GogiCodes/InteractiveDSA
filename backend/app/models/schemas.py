"""
Pydantic Models for API Request/Response Validation
"""

from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum


# ===== Enums =====
class DifficultyLevel(str, Enum):
    """Problem difficulty levels"""
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    EXPERT = "expert"


class ProgrammingLanguage(str, Enum):
    """Supported programming languages"""
    PYTHON = "python"
    JAVA = "java"
    JAVASCRIPT = "javascript"
    CPP = "cpp"
    C = "c"


class SubmissionStatus(str, Enum):
    """Code submission statuses"""
    PENDING = "pending"
    RUNNING = "running"
    ACCEPTED = "accepted"
    WRONG_ANSWER = "wrong_answer"
    TIME_LIMIT_EXCEEDED = "time_limit_exceeded"
    RUNTIME_ERROR = "runtime_error"
    COMPILATION_ERROR = "compilation_error"


# ===== Authentication =====
class UserRegister(BaseModel):
    """User registration request"""
    email: EmailStr
    username: str
    password: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "username": "john_doe",
                "password": "securepassword123"
            }
        }


class UserLogin(BaseModel):
    """User login request"""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """JWT token response"""
    access_token: str
    token_type: str = "bearer"


class UserProfile(BaseModel):
    """User profile response"""
    id: int
    username: str
    email: str
    avatar_url: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# ===== Problems =====
class ProblemBase(BaseModel):
    """Base problem model"""
    title: str
    description: str
    difficulty: DifficultyLevel
    category: str
    time_limit: int = 2000  # milliseconds
    memory_limit: int = 256  # MB


class ProblemCreate(ProblemBase):
    """Create problem request"""
    pass


class ProblemResponse(ProblemBase):
    """Problem response"""
    id: int
    created_at: datetime
    solved_count: int = 0
    
    class Config:
        from_attributes = True


class ProblemDetailResponse(ProblemResponse):
    """Detailed problem response with examples"""
    examples: List[dict] = []
    hints: List[str] = []


# ===== Submissions =====
class SubmissionCreate(BaseModel):
    """Create code submission request"""
    problem_id: int
    code: str
    language: ProgrammingLanguage


class SubmissionResponse(BaseModel):
    """Submission response"""
    id: int
    problem_id: int
    user_id: int
    code: str
    language: ProgrammingLanguage
    status: SubmissionStatus
    output: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True


# ===== Test Cases =====
class TestCaseCreate(BaseModel):
    """Create test case request"""
    problem_id: int
    input_data: str
    expected_output: str
    is_hidden: bool = False


class TestCaseResponse(BaseModel):
    """Test case response"""
    id: int
    input_data: str
    expected_output: Optional[str] = None
    is_hidden: bool
    
    class Config:
        from_attributes = True


# ===== Hints =====
class HintCreate(BaseModel):
    """Create hint request"""
    problem_id: int
    level: int  # 1 = beginner hint, 2 = intermediate, 3 = advanced
    hint_text: str


class HintResponse(BaseModel):
    """Hint response"""
    id: int
    level: int
    hint_text: str
    
    class Config:
        from_attributes = True


# ===== Progress =====
class ProgressResponse(BaseModel):
    """User progress response"""
    total_problems_solved: int
    problems_by_category: dict
    current_streak: int
    accuracy_rate: float
    topics_mastered: List[str]
    
    class Config:
        from_attributes = True


# ===== AI Assistance =====
class HintRequest(BaseModel):
    """Request AI hint for a problem"""
    problem_id: int
    user_code: Optional[str] = None
    hint_level: int = 1


class ExplanationRequest(BaseModel):
    """Request AI explanation"""
    problem_id: int
    code: str
    language: ProgrammingLanguage


class DebugRequest(BaseModel):
    """Request AI debug assistance"""
    problem_id: int
    code: str
    language: ProgrammingLanguage
    error_message: str
