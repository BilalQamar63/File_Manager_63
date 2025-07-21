# File_Manager_63

A full-stack file management system built with **MERN Stack**. Users can upload, store, and manage their files easily.

---

## Project Structure

File_Manager/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ └── pages/
└── README.md

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v9 or higher)
- MongoDB installed and running

---

## Backend Setup

### Navigate to backend folder:

cd backend

### Install backend dependencies:

npm install

### Environment Variables

Create a .env file in the backend/ directory and add the following:

PORT=5000
MONGO_URL=your_mongo_connection_string
EMAIL=your_email_address
PASSWORD=your_email_app_password

### Run backend server:

npm run dev

### Backend Packages Used:

express

mongoose

cors

dotenv

nodemailer

nodemon (dev dependency)

## Frontend Setup

### Navigate to frontend folder:

cd frontend
Install frontend dependencies:

npm install
Run frontend app:

npm start

### Frontend Libraries Used:

@mui/material

@mui/icons-material

@emotion/react

@emotion/styled

dotenv

### How to Run Project

Run MongoDB locally or on MongoDB Atlas.

### Start the backend server:

cd backend
npm run dev

### Start the frontend server:

cd frontend
npm start
