# Users REST API

A simple REST API built with **Express** and **PostgreSQL** to practise CRUD, routing, middleware, and parameterized SQL queries.

## Tech stack
- Node.js, Express
- PostgreSQL (`pg` connection pool)
- dotenv

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create the database and table in psql:
   ```sql
   CREATE DATABASE express_basics;
   \c express_basics
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name TEXT NOT NULL,
     age INTEGER
   );
   ```
3. Create a `.env` file in the project root:
   ```
   DB_USER=
   DB_PASSWORD=
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=express_basics
   ```
4. Start the server:
   ```bash
   node app.js
   ```
   The server runs on `http://localhost:4000`.

## Routes

| Method | Path | Auth | Success | Errors |
|---|---|---|---|---|
| GET | `/users` | — | 200, all users | 500 |
| GET | `/users/:id` | — | 200, one user | 404, 500 |
| POST | `/users` | API key | 201, created user | 400 (no name), 401, 500 |
| PATCH | `/users/:id` | API key | 200, updated user (only the fields sent are changed) | 401, 404, 500 |
| DELETE | `/users/:id` | API key | 200, deleted user | 401, 404, 500 |

Routes marked **API key** need the header `x-api-key`.

## What I learned
- Parameterized queries (`$1`, `$2`) to prevent SQL injection
- `RETURNING *` to get back the affected row
- `COALESCE` for partial updates in PATCH
- Correct status codes, and sending exactly one response per request