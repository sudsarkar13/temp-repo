# Implementation Instructions for Admin Dashboard & CRUD Operations

## Overview

This document outlines the steps to implement CRUD operations, admin dashboard, and MongoDB integration for the portfolio website.

## Table of Contents

- [Implementation Instructions for Admin Dashboard \& CRUD Operations](#implementation-instructions-for-admin-dashboard--crud-operations)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Backend Setup](#backend-setup)
  - [Authentication Implementation](#authentication-implementation)
  - [Frontend Integration Points](#frontend-integration-points)
    - [1. Projects Management (`app/work/page.tsx`)](#1-projects-management-appworkpagetsx)
    - [2. Contact Form (`app/contact/page.tsx`)](#2-contact-form-appcontactpagetsx)
    - [3. Admin Dashboard](#3-admin-dashboard)
  - [Implementation Steps](#implementation-steps)
    - [1. Backend Setup](#1-backend-setup)
    - [2. Models](#2-models)
    - [3. API Routes](#3-api-routes)
    - [4. Admin Dashboard Layout](#4-admin-dashboard-layout)
  - [Package Additions](#package-additions)
  - [Integration Points](#integration-points)
    - [1. Work Page Integration](#1-work-page-integration)
    - [2. Contact Form Integration](#2-contact-form-integration)
  - [Security Considerations](#security-considerations)
  - [Admin Features](#admin-features)
    - [1. Project Management](#1-project-management)
    - [2. Message Management](#2-message-management)
    - [3. Dashboard Overview](#3-dashboard-overview)
  - [Implementation Order](#implementation-order)
  - [Notes](#notes)
  - [Additional Resources](#additional-resources)

## Backend Setup

Create the following directory structure:

mkdir backend
cd backend

```bash
backend/
├── config/
│ └── db.ts # MongoDB connection
├── models/
│ ├── Project.ts # For work/projects
│ └── Message.ts # For contact form
├── routes/
│ ├── auth.ts # Passkey authentication
│ ├── projects.ts # CRUD for projects
│ └── messages.ts # CRUD for contact messages
└── server.ts # Express server setup
```

## Authentication Implementation

1. Add to `.env.local`:

   ```env
   ADMIN_PASSKEY=your_secure_passkey_here
   MONGODB_URI=your_mongodb_connection_string
   ```

2. Create authentication middleware for passkey verification

## Frontend Integration Points

### 1. Projects Management (`app/work/page.tsx`)

- Convert static projects array to dynamic data
- Add admin controls for CRUD operations

### 2. Contact Form (`app/contact/page.tsx`)

- Implement form submission logic
- Store messages in MongoDB

### 3. Admin Dashboard

- Create new route: `app/admin/page.tsx`

## Implementation Steps

### 1. Backend Setup

```typescript
// backend/config/db.ts
import mongoose from "mongoose";
export const connectDB = async () => {
 try {
  await mongoose.connect(process.env.MONGODB_URI!);
  console.log("MongoDB Connected");
 } catch (err) {
  console.error("MongoDB connection error:", err);
  process.exit(1);
 }
};
```

### 2. Models

```typescript
// backend/models/Project.ts
import mongoose from "mongoose";
const ProjectSchema = new mongoose.Schema({
 num: String,
 category: String,
 title: String,
 description: String,
 stack: [{ name: String }],
 image: String,
 live: String,
 github: String,
});
export default mongoose.model("Project", ProjectSchema);
```

### 3. API Routes

Create in `app/api/`:

- `app/api/auth/route.ts`
- `app/api/projects/route.ts`
- `app/api/messages/route.ts`

### 4. Admin Dashboard Layout

```typescript
// app/admin/layout.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default function AdminLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const headersList = headers();
 const passkey = headersList.get("x-admin-passkey");
 if (passkey !== process.env.ADMIN_PASSKEY) {
  redirect("/admin/login");
 }
 return <div className="admin-layout">{children}</div>;
}
```

## Package Additions

Add to `package.json`:

```json
{
 "dependencies": {
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.0"
 }
}
```

## Integration Points

### 1. Work Page Integration

```typescript
// app/work/page.tsx
const fetchProjects = async () => {
 const res = await fetch("/api/projects");
 return res.json();
};
const [projects, setProjects] = useState([]);
useEffect(() => {
 fetchProjects().then(setProjects);
}, []);
```

### 2. Contact Form Integration

```typescript
// app/contact/page.tsx
const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 const formData = new FormData(e.target as HTMLFormElement);
 await fetch("/api/messages", {
  method: "POST",
  body: JSON.stringify(Object.fromEntries(formData)),
  headers: {
   "Content-Type": "application/json",
  },
 });
};
```

## Security Considerations

1. Environment Variables

   - Store passkey securely
   - Keep MongoDB URI private

2. API Protection
   - Implement rate limiting
   - Add CORS protection
   - Sanitize all inputs
   - Proper error handling

## Admin Features

### 1. Project Management

- Create new projects
- Edit existing projects
- Delete projects
- Upload project images

### 2. Message Management

- View contact form submissions
- Mark messages as read/unread
- Delete messages
- Export messages

### 3. Dashboard Overview

- Recent messages
- Project statistics
- Quick actions

## Implementation Order

1. Set up MongoDB connection
2. Create backend models
3. Implement authentication
4. Create API routes
5. Build admin dashboard UI
6. Integrate frontend with API
7. Add security measures
8. Test thoroughly

## Notes

- Keep existing frontend structure
- Admin panel is a protected route
- Use passkey for authentication
- Implement proper error handling
- Add loading states
- Include proper validation

## Additional Resources

- MongoDB Documentation
- Next.js API Routes Documentation
- Mongoose Documentation
- JWT Documentation

---

For any specific implementation details or questions, please refer to the individual sections above or create an issue in the repository.

This Instructions.md file provides a comprehensive guide for implementing the backend, admin dashboard, and CRUD operations while maintaining the existing frontend structure. The file is organized in a clear, step-by-step manner and includes all necessary code snippets and considerations.
