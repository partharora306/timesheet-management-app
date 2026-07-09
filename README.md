# Timesheet Management Application

A modern SaaS-style **Timesheet Management** application built as part of the **TenTwenty Frontend Technical Assessment**.

The application demonstrates modern frontend development practices using **Next.js**, **TypeScript**, **Tailwind CSS**, and **NextAuth**, with a focus on clean architecture, reusable components, responsive UI, and maintainable code.

---

## Features

- Secure authentication using **NextAuth**
- Protected dashboard routes
- Timesheet listing in a responsive table
- Create and edit timesheet entries via modal
- Form validation and error handling
- Internal API routes for all client-side requests
- Reusable and modular component architecture
- Responsive design across desktop and mobile
- Basic unit/component testing

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- NextAuth
- React Hook Form
- Zod
- Axios
- Jest + React Testing Library
- ESLint

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or yarn/pnpm)

### Installation

```bash
git clone <repository-url>
npm install
```

### Start the development server

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Demo Credentials

Use the following credentials to log in:

**Email**

```text
admin@tentwenty.com
```

**Password**

```text
Password@123
```

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

The project follows a modular, feature-oriented structure.

- **App Router** is used for routing and layouts.
- **NextAuth** manages authentication and session handling.
- All client-side API requests are routed through **Next.js API Routes**.
- Business logic is separated into services and utilities.
- Components are designed to be reusable and easy to maintain.

---

## Assumptions

- Authentication uses dummy credentials for demonstration.
- Timesheet data is mocked/in-memory and simulates backend APIs.
- The application focuses on frontend architecture rather than persistence.
- The UI is built to closely match the provided Figma design while remaining responsive.

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
| Unit/Component Tests | ✅ |

---

## Time Spent

Approximately **9–10 hours**

- Project setup & architecture
- Authentication
- Dashboard implementation
- API integration
- Form validation
- Responsive UI
- Testing
- Refactoring and documentation

---

## Live Demo

> Add your deployed application URL here (e.g. Vercel)

```
https://your-demo-url.vercel.app
```

---

## Repository

> Add your GitHub repository link here

```
https://github.com/your-username/timesheet-management
```

---

## Notes

The objective of this assessment was not to over-engineer the solution, but to demonstrate clean architecture, maintainable code, good UI/UX practices, and scalable frontend development using modern Next.js patterns.

Thank you for taking the time to review my submission.