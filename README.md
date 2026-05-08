# CRM Lead Management System

A full-stack CRM application for lead management and sales pipeline tracking. This repository contains a **React + Vite frontend** and an **Express + MongoDB backend**.

---

## Project Overview

This CRM application helps a small sales team manage leads from first contact through closing. It includes:
- A secure login screen
- Protected dashboard with pipeline metrics
- Leads list with search and filters
- Add, edit, delete, and view lead details
- Kanban view for drag-and-drop lead status updates
- Notes attached to each lead

---

## Tech Stack

**Frontend**
- React 19
- Vite
- React Router DOM
- Axios
- CSS modules/styles

**Backend**
- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Tokens (JWT)
- dotenv
- CORS

---

## Features Implemented

- Login with JWT token generation
- Protected routes for authenticated users
- Dashboard metrics for total leads, new, qualified, won, and lost leads
- Lead CRUD: create, read, update, delete
- Lead detail view with note creation
- Lead pipeline statuses: New, Contacted, Qualified, Proposal Sent, Won, Lost
- Lead priority and estimated deal value
- Kanban board support with drag-and-drop status changes
- Responsive UI for desktop and mobile screens

---

### Demo Video - https://drive.google.com/drive/folders/16-c6aFmG-YCA2WhzaHy5Kjt9_kZQ7Zo8?usp=sharing 

---

## How to Run Locally

The project is split into two folders: `backend` and `frontend`. Run each in a separate terminal.

### 1. Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `backend` with the required environment variables (see below).

Then start the backend server:
```bash
npm run dev
```

The backend will start on:
- `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on Vite’s default address, for example:
- `http://localhost:5173`

Open the Vite URL and log in with the test credentials.

---

## Environment Variables

Create a `.env` file in the `backend` folder. The app requires:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

### Example local MongoDB URI
```env
MONGO_URI=mongodb://127.0.0.1:27017/crm
```

> Note: `JWT_SECRET` is used for signing authentication tokens. If it is not provided, the backend falls back to a default secret, but using a real secret is recommended for any deployment.

---

## Test Login Credentials

Use the built-in test account to sign in:

- Email: `admin@example.com`
- Password: `password123`

This is the only login method currently supported by the app.

---

## Database Setup

### MongoDB Atlas
1. Create a free cluster at https://www.mongodb.com/atlas.
2. Create a database user.
3. Create a database URI string.
4. Set `MONGO_URI` in `backend/.env`.

### Local MongoDB
1. Install MongoDB Community Server locally.
2. Start MongoDB locally so it listens on `mongodb://127.0.0.1:27017`.
3. Set `MONGO_URI=mongodb://127.0.0.1:27017/crm` in `backend/.env`.

### Notes
- The backend uses Mongoose and will create the `leads` collection automatically when leads are created.
- The `User` model exists, but the login flow is currently hardcoded to the test credentials.

---

## Known Limitations

- Authentication is hardcoded to a single account (`admin@example.com` / `password123`). There is no registration flow.
- No automated test suite is included.
- The backend assumes a valid MongoDB URI; there is no database seeding script.
- No production deployment configuration is included.
- Users and roles are not managed dynamically in the current implementation.

---

## Reflection

This project demonstrates how to build a full-stack CRM system by connecting a modern React UI with an Express API and MongoDB data storage.

Key learnings include:
- Setting up protected routes and JWT authentication
- Designing RESTful APIs for lead management
- Modeling leads and nested notes in MongoDB with Mongoose
- Implementing a responsive dashboard and Kanban board
- Using Axios for frontend API calls and React Router for page navigation

This repository is a solid foundation for future work like real user registration, role-based access control, validation improvements, and deployment.
