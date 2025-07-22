# Expense Tracker App

A full-stack web application for remote teams to track and review expenses, with role-based access control, audit logs, and visual insights.

---

## Features

- **Authentication & RBAC**
  - Email/password login
  - Roles: employee (manage own expenses), admin (view and act on all expenses)
- **Expense Tracking**
  - Employees: add/view expenses (amount, category, date, notes, receipt upload)
  - Admins: view all expenses, filter, change status (pending, approved, rejected)
- **Charts (Admin-only)**
  - Total expenses per category (bar chart)
  - Expenses over time (monthly breakdown)
- **Audit Logs (Admin-only)**
  - Log key actions: expense creation, status changes
  - View logs on a dedicated page
- **CSV Export (Admin-only)**
- **File Upload for Receipts**
- **Modern UI**: Solid blue/white theme, Inter font, Lucide icons

---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs, multer
- **Frontend:** React (Vite), Tailwind CSS, Lucide React, Chart.js, Axios, React Router

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repo-url>
cd <repo-folder>
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in `backend/`:
  ```
  MONGO_URI=mongodb://localhost:27017/expensetracker
  JWT_SECRET=your_jwt_secret_here
  PORT=5000
  ```
- Start MongoDB (locally or use MongoDB Atlas)
- Start the backend:
  ```bash
  npm run dev
  # or
  nodemon index.js
  ```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
- The app will run at `http://localhost:5173` (default Vite port)

---

## Architecture Notes

- **Monorepo:** Separate `backend/` and `frontend/` folders for clear separation of concerns.
- **Backend:**
  - RESTful API with Express
  - MongoDB for data persistence
  - JWT for stateless authentication
  - Role-based middleware for secure access control
  - Multer for file uploads (receipts)
  - Audit logs for key actions (expense creation, status changes)
- **Frontend:**
  - React with Vite for fast development
  - Tailwind CSS for utility-first, consistent styling
  - Lucide React for modern icons
  - Chart.js for admin insights
  - Auth context for global user state
  - Axios for API calls

---

## Trade-offs & Decisions

- **RBAC in Backend & Frontend:**
  - All sensitive routes are protected by backend middleware; frontend also hides admin-only features for UX.
- **File Uploads:**
  - Receipts are stored in a local `uploads/` folder and served statically. For production, consider cloud storage (e.g., S3).
- **CSV Export:**
  - Only available to admins for security and privacy.
- **No SSR:**
  - Chose SPA for simplicity and speed; SSR could be added for SEO if needed.
- **No Redux:**
  - Used React Context for auth to keep state management simple.
- **Testing:**
  - Basic manual testing; for production, add unit/integration tests.
- **Dockerization:**
  - Not included for brevity, but can be added for full containerization.

---

## Usage

1. **Register** as an employee or admin.
2. **Login** to access your dashboard.
3. **Employees:**
   - Add/view your own expenses
   - Upload receipts (image/pdf)
4. **Admins:**
   - View all expenses
   - Change status (pending/approved/rejected)
   - Export expenses as CSV
   - View audit logs
   - See insights (charts)
5. **Logout** securely from the Navbar.

---

## Screenshots





   
---

---
## Deployed Link

```
https://expenses-tracker-frontend-wine.vercel.app/login
```<img width="1920" height="1020" alt="Screenshot 2025-07-22 112825" src="https://github.com/user-attachments/assets/703e924f-ac8f-435f-9799-5aba8ce8880f" />
<img width="1920" height="1020" alt="Screenshot 2025-07-22 112825" src="https://github.com/user-attachments/assets/45f03099-c299-4744-a301-0ed6659b211f" />

---
