# Quiz Builder

A full-stack **Quiz Builder** application with **React (Frontend)** and **Node.js + Express + Prisma + SQLite (Backend)**.  
Users can create custom quizzes, view all available quizzes, and inspect any quiz in detail.

---

## 🚀 Tech Stack

- **Frontend**: React, Material-UI (MUI)
- **Backend**: Node.js, Express
- **Database**: SQLite (via Prisma ORM)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-project-folder>
```

---

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the **backend** folder:
```env
PORT=5005
DATABASE_URL="file:./dev.db"
```

Generate Prisma client and run migrations:
```bash
npx prisma generate
npx prisma migrate dev --name init
```

Run the backend server:
```bash
npm run dev
```

API will be available at:
```
http://localhost:5005
```

---

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env` file inside the **frontend** folder:
```env
REACT_APP_API_URL=http://localhost:{PORT}
```

Run the frontend app:
```bash
npm start
```

Frontend will be available at:
```
http://localhost:{PORT}
```
