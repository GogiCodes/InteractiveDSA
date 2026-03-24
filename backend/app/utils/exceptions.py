"""
Exception and Error Handling Utilities
"""

from fastapi import HTTPException, status


class APIException(HTTPException):
    """Base API exception"""
    pass


class UserNotFound(APIException):
    """User not found error"""
    def __init__(self, user_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User {user_id} not found"
        )


class ProblemNotFound(APIException):
    """Problem not found error"""
    def __init__(self, problem_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Problem {problem_id} not found"
        )


class InvalidCredentials(APIException):
    """Invalid credentials error"""
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )


class UserAlreadyExists(APIException):
    """User already exists error"""
    def __init__(self, email: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User with email {email} already exists"
        )


class CodeExecutionError(APIException):
    """Code execution failed"""
    def __init__(self, message: str):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Code execution failed: {message}"
        )
