-- Interactive DSA Database Schema
-- PostgreSQL Schema Definitions

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ============================================
-- PROBLEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard', 'expert')),
    category VARCHAR(100) NOT NULL,
    time_limit INTEGER DEFAULT 2000,
    memory_limit INTEGER DEFAULT 256,
    solved_count INTEGER DEFAULT 0,
    acceptance_rate FLOAT DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_category ON problems(category);
CREATE INDEX idx_problems_created_at ON problems(created_at);

-- ============================================
-- SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language VARCHAR(20) NOT NULL CHECK (language IN ('python', 'java', 'javascript', 'cpp', 'c')),
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'accepted', 'wrong_answer', 'time_limit_exceeded', 'runtime_error', 'compilation_error')),
    output TEXT,
    error_message TEXT,
    runtime_ms INTEGER,
    memory_kb INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_created_at ON submissions(created_at);

-- ============================================
-- TEST CASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS test_cases (
    id SERIAL PRIMARY KEY,
    problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    input_data TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_cases_problem_id ON test_cases(problem_id);

-- ============================================
-- HINTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hints (
    id SERIAL PRIMARY KEY,
    problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    level INTEGER NOT NULL,
    hint_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_hints_problem_id ON hints(problem_id);
CREATE INDEX idx_hints_level ON hints(level);

-- ============================================
-- PROGRESS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    total_problems_solved INTEGER DEFAULT 0,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_solved_at TIMESTAMP,
    accuracy_rate FLOAT DEFAULT 0.0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_user_id ON progress(user_id);

-- ============================================
-- BOOKMARKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookmarks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    problem_id INTEGER NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, problem_id)
);

CREATE INDEX idx_bookmarks_user_id ON bookmarks(user_id);
CREATE INDEX idx_bookmarks_problem_id ON bookmarks(problem_id);

-- ============================================
-- INITIAL SAMPLE DATA
-- ============================================

-- Sample Problems
INSERT INTO problems (title, description, difficulty, category, time_limit, memory_limit, solved_count)
VALUES
    ('Two Sum', 'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.', 'easy', 'Arrays', 1000, 256, 1250),
    ('Reverse a Linked List', 'Reverse the nodes of a singly linked list.', 'easy', 'Linked List', 1000, 256, 980),
    ('Binary Tree Level Order Traversal', 'Given the root of a binary tree, return the level order traversal of its nodes'' values.', 'medium', 'Trees', 1500, 256, 650),
    ('LRU Cache', 'Design a data structure that follows the constraints of Least Recently Used (LRU) cache.', 'medium', 'Design', 2000, 512, 420),
    ('Word Ladder', 'Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence.', 'hard', 'Graphs', 3000, 512, 180)
ON CONFLICT DO NOTHING;

-- Sample Hints for Two Sum
INSERT INTO hints (problem_id, level, hint_text)
SELECT id, 1, 'Think about using a hash map to store the numbers you have seen.'
FROM problems WHERE title = 'Two Sum'
ON CONFLICT DO NOTHING;

INSERT INTO hints (problem_id, level, hint_text)
SELECT id, 2, 'For each number, check if target - number exists in your hash map.'
FROM problems WHERE title = 'Two Sum'
ON CONFLICT DO NOTHING;
