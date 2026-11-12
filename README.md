
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
