# Timesheet Management Application

A modern SaaS-style **Timesheet Management** application built as part of the **TenTwenty Frontend Technical Assessment**.

The application demonstrates modern frontend development practices using **Next.js**, **TypeScript**, **Tailwind CSS**, and **NextAuth**, with a strong focus on clean architecture, reusable components, responsive UI, and maintainable code.

---

## Live Demo

https://timesheet-management-ticktock.vercel.app

---

## Features

- Secure authentication using **NextAuth**
- Protected dashboard routes
- Responsive timesheet table
- Create and edit timesheet entries via modal
- Schema-based form validation using **React Hook Form** and **Zod**
- Client-side API requests routed through **Next.js API Routes**
- Reusable, modular, and scalable component architecture

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- NextAuth
- React Hook Form
- Zod
- ESLint

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/partharora306/timesheet-management-app.git

cd timesheet-management-app

npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-random-secret
```

Generate a secure secret using:

```bash
openssl rand -base64 32
```

### Start the Development Server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Demo Credentials

| Field | Value |
|-------|-------|
| **Email** | `admin@tentwenty.com` |
| **Password** | `Password@123` |

---

## Running Tests

```bash
npm test
```

---

## Project Structure

```text
app/
├── (auth)/
│   └── login/
├── (dashboard)/
│   ├── layout.tsx
│   ├── page.tsx
│   └── timesheets/
├── api/
│   ├── auth/
│   ├── tasks/
│   └── timesheets/

components/
├── auth/
├── layout/
├── timesheets/
└── ui/

lib/
services/
types/
utils/
__tests__/
```

---

## Architecture

The project follows a modular, feature-oriented architecture.

- **App Router** is used for routing and layouts.
- **NextAuth** manages authentication and session handling.
- Client-side API requests are proxied through **Next.js API Routes**.
- Business logic is separated into reusable services and utilities.
- Components are designed to be modular, reusable, and easy to maintain.

---

## Assumptions

- Authentication uses dummy credentials for demonstration purposes.
- Timesheet data is mocked to simulate backend APIs.
- The focus of the assessment is frontend architecture rather than backend persistence.
- The UI closely follows the provided Figma design while maintaining responsiveness across devices.

---

## Assessment Coverage

| Requirement | Status |
|-------------|--------|
| Login Screen | ✅ |
| Authentication (NextAuth) | ✅ |
| Protected Dashboard | ✅ |
| Timesheet Table | ✅ |
| Add/Edit Modal | ✅ |
| Form Validation | ✅ |
| Internal API Routes | ✅ |
| Responsive Layout | ✅ |
| Reusable Components | ✅ |
| TypeScript | ✅ |
| Tailwind CSS | ✅ |

---

## Time Spent

Approximately **9–10 hours**, including:

- Project setup and architecture
- Authentication
- Dashboard implementation
- API integration
- Form validation
- Responsive UI
- Refactoring and documentation

---

## Notes

The goal of this assessment was not to over-engineer the solution, but to demonstrate clean architecture, maintainable code, scalable frontend development practices, and a polished user experience using modern Next.js patterns.

Thank you for taking the time to review my submission.
