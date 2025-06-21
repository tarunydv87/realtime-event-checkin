#  Real-Time Event Check-In App

A full-stack real-time event check-in platform where users can browse upcoming events, join them instantly, and see a live attendee list update across all clients.

Built using **React Native (Expo)** for frontend and **Node.js + GraphQL + Prisma + Socket.io** for backend — with **PostgreSQL** as the database.

---

##  Features

-  Mock Login with pre-generated JWT token  
-  View upcoming events  
-  Create a new event  
-  Join an event (uses GraphQL mutation)  
-  See a live list of attendees with avatars  
-  Real-time updates using Socket.io  
-  Visual confirmation when user joins an event

---

## Tech Stack

| Layer     | Tech                                |
|-----------|-------------------------------------|
| Language  | TypeScript                          |
| Backend   | Node.js, GraphQL, Prisma, Socket.io |
| Database  | PostgreSQL                          |
| Frontend  | React Native (Expo)                 |
| State     | Zustand, TanStack Query             |

---

## Setup Instructions

### Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
