"""
Code Execution Utilities
Judge0 API Integration
"""

import httpx
import asyncio
from typing import Optional, Dict
from app.config import settings
from app.utils.exceptions import CodeExecutionError

# Language mapping for Judge0
LANGUAGE_IDS = {
    "python": 92,      # Python 3.11
    "java": 62,        # Java 17
    "javascript": 63,  # Node.js 18
    "cpp": 54,         # C++ 17
    "c": 50,           # C 11
}


async def execute_code(
    code: str,
    language: str,
    input_data: str = "",
    time_limit: int = 2,
) -> Dict:
    """
    Execute code using Judge0 API
    
    Returns:
        Dict with execution results
    """
    if not settings.JUDGE0_API_KEY:
        raise CodeExecutionError("Judge0 API key not configured")
    
    language_id = LANGUAGE_IDS.get(language.lower())
    if not language_id:
        raise CodeExecutionError(f"Unsupported language: {language}")
    
    headers = {
        "X-RapidAPI-Key": settings.JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json"
    }
    
    payload = {
        "language_id": language_id,
        "source_code": code,
        "stdin": input_data,
        "cpu_time_limit": time_limit,
        "memory_limit": 256,
    }
    
    try:
        async with httpx.AsyncClient() as client:
            # Submit code for execution
            response = await client.post(
                f"{settings.JUDGE0_API_URL}/submissions",
                json=payload,
                headers=headers,
                timeout=30.0
            )
            
            if response.status_code != 201:
                raise CodeExecutionError(f"Submission failed: {response.text}")
            
            submission = response.json()
            token = submission.get("token")
            
            # Poll for results
            result = await poll_execution_result(token, headers)
            return result
            
    except httpx.TimeoutException:
        raise CodeExecutionError("Code execution timeout")
    except Exception as e:
        raise CodeExecutionError(str(e))


async def poll_execution_result(token: str, headers: dict, max_retries: int = 10) -> Dict:
    """Poll Judge0 for execution results"""
    async with httpx.AsyncClient() as client:
        for _ in range(max_retries):
            response = await client.get(
                f"{settings.JUDGE0_API_URL}/submissions/{token}",
                headers=headers,
                timeout=10.0
            )
            
            result = response.json()
            
            # 0 = In Queue, 1 = Processing, 2 = Accepted, 3+ = Error
            status_id = result.get("status", {}).get("id")
            
            if status_id in [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]:
                return {
                    "status_id": status_id,
                    "stdout": result.get("stdout", ""),
                    "stderr": result.get("stderr", ""),
                    "compile_output": result.get("compile_output", ""),
                    "time": result.get("time", 0),
                    "memory": result.get("memory", 0),
                }
            
            # Wait before next poll
            await asyncio.sleep(0.5)
    
    raise CodeExecutionError("Execution polling timeout")
