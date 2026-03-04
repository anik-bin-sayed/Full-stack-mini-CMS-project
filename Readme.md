# Full-Stack Mini LMS

A simple learning management system with a **Django REST API backend** and a **React (Vite) frontend**. This repository provides a full-stack example of course creation, enrollment, lesson management, and progress tracking.

---

## Features

### Backend (Django + DRF)

- **Authentication**
  - Custom email-based `User` model with `student` / `instructor` roles
  - JWT tokens using `rest_framework_simplejwt` stored in cookies
  - Login, logout, register, refresh token endpoints
- **Courses & Categories**
  - CRUD for courses with instructor ownership
  - Filtering, search, and ordering support
  - Pagination (10 items per page)
- **Lessons**
  - Lessons associated with courses and ordered
  - Automatic formatting of YouTube URLs to embed links
- **Enrollments & Progress**
  - Students can enroll in courses with unique constraint
  - `LessonProgress` model tracks individual lesson completion
- **Permissions & Security**
  - Instructor-only endpoints for creation/modification
  - Rate throttling on login (10/hour)
  - CORS configured for frontend origin
- **Supporting apps**
  - `accounts`, `courses`, `lesson`, `enrollments`, `progress`
  - Shared utilities in `core` (permissions, pagination)

### Frontend (React + Vite)

- **User interface**
  - Registration and login pages with client-side validation
  - Public course browsing with search and details
  - Student dashboard, enrolled courses, and lesson viewer
  - Instructor dashboard, course creation/editing, lesson management
- **State & API handling**
  - Redux Toolkit Query with automatic token refreshing
  - Protected and public route components
  - Toast notifications, loaders and responsive design via Tailwind
- **Development setup**
  - Vite-based build process with hot reload
  - ESLint configuration for code quality

---

## Getting Started

### Prerequisites

- Python 3.11+ (venv)
- Node.js 18+ and npm (or yarn)
- Git

### Backend Setup

```powershell
python -m venv env
.\env\Scripts\activate            # or activate.bat / Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser    # optional, to access admin
python manage.py runserver
```

- API base URL: `http://localhost:8000/api/`
- CORS allows `http://localhost:5173` by default.

### Frontend Setup

```bash
npm install
npm run dev
```

- Frontend URL: `http://localhost:5173`
- It communicates with the backend for authentication and data.

> **Note:** Ensure the backend server is running before interacting with the frontend.

---

## Development Notes

- Media files are stored in `backend/cms_backend/media/`.
- Run tests within each Django app using `python manage.py test <app>`.
- Adjust settings in `cms_backend/settings.py` for production.

---
