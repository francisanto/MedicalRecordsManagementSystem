medical-records-management/
│── public/                  # Static assets (Frontend)
│   ├── styles/              # CSS Styles
│   │   ├── common.css       # Global styles
│   │   ├── admin.css        # Admin-specific styles
│   │   ├── doctor.css       # Doctor-specific styles
│   │   ├── patient.css      # Patient-specific styles
│   │   ├── sidebar.css      # Sidebar styles
│   │   ├── responsive.css   # Mobile responsiveness
│   │   ├── darkmode.css     # Dark mode styles
│   │   ├── login.css        # Login page styles
│   │
│   ├── js/                  # JavaScript Files
│   │   ├── auth.js          # Handles authentication & redirects
│   │   ├── admin.js         # Admin panel logic (add users, search, notifications)
│   │   ├── doctor.js        # Doctors adding records
│   │   ├── patient.js       # Viewing medical records
│   │   ├── theme.js         # Dark mode toggle
│   │   ├── sidebar.js       # Sidebar functionality
│   │   ├── search.js        # Live search feature
│   │   ├── notifications.js # WebSocket notifications
│   │
│   ├── images/              # Icons, logos, and other images
│   │
│   ├── index.html           # Landing Page
│   ├── login.html           # Login Page
│   ├── admin-dashboard.html # Admin Panel
│   ├── doctor-dashboard.html# Doctor Portal
│   ├── patient-dashboard.html# Patient Dashboard
│   ├── add-record.html      # Add medical records (Doctor)
│   ├── view-records.html    # View medical records (Patient & Doctor)
│   ├── add-doctor.html      # Add doctor (Admin)
│   ├── add-patient.html     # Add patient (Admin)
│   ├── search.html          # Search & filter users/records
│   ├── settings.html        # Account settings page
│
│── server/                  # Backend (Node.js + Express)
│   ├── config/              # Database configuration
│   │   ├── db.js            # MySQL connection setup
│   │
│   ├── routes/              # API Endpoints
│   │   ├── authRoutes.js    # Authentication & login
│   │   ├── adminRoutes.js   # Manage doctors & patients
│   │   ├── doctorRoutes.js  # Doctor functionalities
│   │   ├── patientRoutes.js # Fetching patient records
│   │   ├── searchRoutes.js  # Search functionality
│   │
│   ├── models/              # Database models
│   │   ├── User.js          # User model (Admin, Doctor, Patient)
│   │   ├── Record.js        # Medical record model
│   │
│   ├── middleware/          # Authentication & Role-Based Access Control (RBAC)
│   │   ├── authMiddleware.js# Protect routes based on roles
│   │
│   ├── server.js            # Main backend server file
│
│── database/                # MySQL Database Setup
│   ├── schema.sql           # Database schema
│   ├── seed.sql             # Initial data setup
│
│── package.json             # Node.js dependencies
│── .env                     # Environment variables (Database credentials)
│── README.md                # Project documentation


# Medical Records Management System

A web-based system for managing medical records with role-based access control.

## Features
- User authentication (Admin, Doctor, Patient)
- Admin can add doctors and patients
- Doctors can add medical records
- Patients can view their records
- WebSocket-based notifications

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` file
3. Initialize database: `mysql < database/schema.sql`
4. Start server: `npm start`
