# Task Manager Backend

A RESTful backend service for a Task Manager application that helps users manage their daily tasks efficiently.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose)
- **Language:** JavaScript
- **API Style:** REST
- **Environment Management:** dotenv
- **Rate Limiting:** express-rate-limit
- **Containerization:** Docker

## Features

✅ Create tasks  
✅ List tasks with filtering (pending/completed)  
✅ Pagination support  
✅ Update task status (mark as completed/pending)  
✅ Delete tasks  
✅ Robust error handling & validation

## Project Structure

```
├── config/
│   └── db.js                     # Database connection
├── controllers/
│   └── task.controller.js        # HTTP request handlers (controllers)
├── services/
│   └── task.service.js           # Business logic & database operations
├── middleware/
│   ├── errorMiddleware.js        # 404 route & Global error handling
│   └── rateLimiter.js            # API rate limiting
├── models/
│   └── task.model.js             # Task schema (Mongoose)
├── routes/
│   └── task.routes.js            # API route definitions
├── utils/
│   └── appError.js               # Custom error classes
└── index.js                      # Application entry point

```

## API Endpoints

| Method | Endpoint         | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| POST   | `/api/tasks`     | Create a new task                          |
| GET    | `/api/tasks`     | List all tasks (with filters & pagination) |
| PATCH  | `/api/tasks/:id` | Update task status                         |
| DELETE | `/api/tasks/:id` | Delete a task                              |

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Create `.env` file:**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
CLIENT_URL=http://localhost:3000
```

3. **Start the server:**

```bash
npm run dev
```

4. **Run with Docker:**

```bash
docker-compose up 
```
