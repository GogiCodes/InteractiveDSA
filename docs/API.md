"""
Documentation for API Endpoints
"""

"""
Authentication Endpoints:
========================

POST /api/v1/auth/register
    Register a new user
    Request:
        - email: string (required)
        - username: string (required)
        - password: string (required)
    Response:
        - access_token: string
        - token_type: string

POST /api/v1/auth/login
    Login user
    Request:
        - email: string (required)
        - password: string (required)
    Response:
        - access_token: string
        - token_type: string

GET /api/v1/auth/me
    Get current user profile
    Headers:
        - Authorization: Bearer <token>
    Response:
        - id: integer
        - username: string
        - email: string
        - avatar_url: string | null
        - created_at: datetime


Problems Endpoints:
==================

GET /api/v1/problems
    Get list of problems
    Query Parameters:
        - category: string (optional)
        - difficulty: string (optional)
        - skip: integer (default: 0)
        - limit: integer (default: 10)
    Response:
        - problems: list of Problem objects
        - total: integer

GET /api/v1/problems/{problem_id}
    Get problem details
    Response:
        - id: integer
        - title: string
        - description: string
        - difficulty: string
        - category: string
        - examples: list
        - hints: list


Submissions Endpoints:
======================

POST /api/v1/submissions
    Submit code for a problem
    Request:
        - problem_id: integer (required)
        - code: string (required)
        - language: string (required)
    Response:
        - id: integer
        - status: string
        - output: string | null

GET /api/v1/submissions/{submission_id}
    Get submission details
    Response:
        - id: integer
        - status: string
        - output: string
        - error_message: string | null


Progress Endpoints:
===================

GET /api/v1/users/{user_id}/progress
    Get user progress
    Response:
        - total_problems_solved: integer
        - problems_by_category: dict
        - current_streak: integer
        - accuracy_rate: float


AI Endpoints:
=============

POST /api/v1/ai/hint
    Get AI hint for a problem
    Request:
        - problem_id: integer
        - user_code: string (optional)
        - hint_level: integer
    Response:
        - hint: string

POST /api/v1/ai/explain
    Get AI explanation
    Request:
        - problem_id: integer
        - code: string
        - language: string
    Response:
        - explanation: string

POST /api/v1/ai/debug
    Get AI debug help
    Request:
        - problem_id: integer
        - code: string
        - language: string
        - error_message: string
    Response:
        - debug_help: string
"""
