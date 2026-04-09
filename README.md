# Ticket Management System

A full-stack application for merchants to create, view, and manage support inquiries with a clean and intuitive interface.

## 🎯 Overview

This project is a modern ticket management system built with a professional tech stack. It allows users to:
- Create support tickets with subject, message, and priority levels
- View all tickets in a clean, organized list
- Update ticket status in real-time (NEW → INVESTIGATING → RESOLVED)
- Receive visual feedback with status and priority indicators
- Get instant notifications for duplicate submissions and successful operations

## 🏗️ Project Structure

```
TransFi assessment/
├── client/                          # React Frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── TicketForm.jsx      # Ticket creation form
│   │   │   ├── TicketForm.css      # Form styling
│   │   │   ├── TicketList.jsx      # Tickets display list
│   │   │   ├── TicketList.css      # List styling
│   │   │   ├── Notification.jsx    # Toast notifications
│   │   │   └── Notification.css    # Notification styling
│   │   ├── App.jsx                 # Main app component
│   │   ├── App.css                 # App layout styles
│   │   ├── index.css               # Global styles
│   │   ├── main.jsx                # Entry point
│   │   └── assets/                 # Static assets
│   ├── .env                        # Environment variables
│   └── package.json
│
└── server/                          # Node.js/Express Backend
    ├── controllers/
    │   └── ticket-controller.js    # Business logic
    ├── models/
    │   └── ticket-model.js         # MongoDB schema
    ├── routes/
    │   └── ticket-route.js         # API routes
    ├── config/
    │   └── db.js                   # Database connection
    ├── server.js                   # Server entry point
    ├── .env                        # Environment variables
    └── package.json
```

## ⚙️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 8** - Build tool & dev server
- **Axios** - HTTP client for API calls
- **Vanilla CSS** - Clean, minimal styling

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource handling
- **Dotenv** - Environment variable management

## ✨ Features

### Core Functionality
- ✅ **Create Tickets** - Submit new support inquiries with subject, message, and priority
- ✅ **View Tickets** - Display all tickets in an organized list
- ✅ **Update Status** - Change ticket status with one click (NEW → INVESTIGATING → RESOLVED)
- ✅ **Duplicate Detection** - Prevent duplicate tickets with smart validation

### UI/UX Features
- 🎨 **Color-Coded Status** - Visual indicators for ticket status
- 🎨 **Priority Badges** - Color-coded priority levels (Low/Medium/High)
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Smooth Transitions** - Professional animations and interactions
- 🔔 **Auto-dismissing Alerts** - Notifications auto-close after 4 seconds
<img width="1896" height="971" alt="image" src="https://github.com/user-attachments/assets/40134193-ba31-4a50-b458-05b2cd09a77c" />


## 📋 API Endpoints

### POST /api/tickets
Create a new support ticket.

**Request Body:**
```json
{
  "subject": "Having trouble with payment",
  "message": "I'm unable to process my payment through the app...",
  "priority": "High"
}
```

**Response (201/200):**
```json
{
  "success": true,
  "message": "Ticket added successfully",
  "data": {
    "_id": "xyz123",
    "subject": "Having trouble with payment",
    "message": "I'm unable to process my payment...",
    "priority": "High",
    "status": "NEW",
    "createdAt": "2026-04-08T10:30:00Z"
  }
}
```

**Error Response (400):**
```json
{
  "message": "Duplicate! ticket already exists."
}
```

### GET /api/tickets
Retrieve all tickets.

**Response (200):**
```json
{
  "success": true,
  "message": "Ticket list retrieved",
  "data": [
    {
      "_id": "xyz123",
      "subject": "Payment issue",
      "message": "Cannot process payment...",
      "priority": "High",
      "status": "INVESTIGATING",
      "createdAt": "2026-04-08T10:30:00Z"
    }
  ]
}
```

### PATCH /api/tickets/:id
Update ticket status.

**Request Body:**
```json
{
  "status": "RESOLVED"
}
```

**Response (200):**
```json
{
  "message": "Ticket edited successfully",
  "data": {
    "_id": "xyz123",
    "subject": "Payment issue",
    "status": "RESOLVED"
  }
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

**1. Clone the repository:**
```bash
git clone <repository-url>
cd Ticket Manager
```

**2. Setup Backend:**
```bash
cd server

# Install dependencies
npm install

# Create .env file
echo MONGODB_URI=mongodb://localhost:27017/ticket-management > .env
echo PORT=8000 >> .env

# Start the server
npm start
```

**3. Setup Frontend:**
```bash
cd client

# Install dependencies
npm install

# The .env file is already configured with:
# VITE_BASE_URL=http://localhost:8000/api

# Start the dev server
npm run dev
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
# Output: Running on 8000
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
# Output: VITE v8.0.4  ready in XXX ms
# ➜  Local:   http://localhost:5173/
```

Visit **http://localhost:5173** in your browser to access the application.

## 🎨 UI Screenshots

### Form Section (Left Panel)
- Clean form with three input fields
- Professional blue gradient button
- Input validation with helpful placeholder text
- Focus states with smooth transitions

### Tickets List (Right Panel)
- Card-based ticket display
- Subject, message preview, priority badge
- Status badge with color indicators
- Quick status update buttons
- Responsive to amount of tickets

## 🔑 Environment Variables

**Server (.env):**
```
MONGODB_URI=mongodb://localhost:27017/ticket-management
PORT=8000
```

**Client (.env):**
```
VITE_BASE_URL=http://localhost:8000/api
```

## 📦 Dependencies

### Server
```json
{
  "cors": "^2.8.6",
  "dotenv": "^17.4.1",
  "express": "^5.2.1",
  "mongoose": "^9.4.1",
  "nodemon": "^3.1.14" (dev)
}
```

### Client
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "axios": "^1.14.0",
  "vite": "^8.0.4" (dev),
  "@vitejs/plugin-react": "^6.0.1" (dev)
}
```

## 🛠️ Build & Deployment

### Build Frontend
```bash
cd client
npm run build
# Creates optimized production build in dist/
```

### Production Checklist
- [ ] Set `VITE_BASE_URL` to production API URL
- [ ] Configure CORS in backend for production domain
- [ ] Set MongoDB connection to production database
- [ ] Use environment variables for sensitive data
- [ ] Add SSL/HTTPS certificates

## 📊 Data Model

### Ticket Schema
```javascript
{
  subject: String (required, 3-255 chars),
  message: String (required, 10-5000 chars),
  priority: String (enum: "Low", "Medium", "High"),
  status: String (enum: "NEW", "INVESTIGATING", "RESOLVED"),
  assignedTo: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🎯 Features in Detail

### Duplicate Ticket Prevention
The system prevents duplicate tickets by checking:
- Subject and message combination
- Returns 400 error with clear message if duplicate exists

### Real-time Notifications
- **Success**: Green notification when ticket is created
- **Error**: Red notification if duplicate or validation error
- **Auto-close**: Disappears after 4 seconds or on manual close

### Status Management
Users can change ticket status to:
1. **NEW** - Newly created ticket
2. **INVESTIGATING** - Support team is looking into it
3. **RESOLVED** - Issue has been resolved

## 🔐 Security Features

- CORS enabled for secure cross-origin requests
- Input validation on both client and server
- MongoDB schema validation
- Environment variables for sensitive data
- No hardcoded credentials

## 📝 Notes

- The application uses modular component architecture for easy maintenance
- Responsive design works on mobile, tablet, and desktop
- Smooth color gradients and animations for professional appearance
- Error handling with user-friendly messages
- Console logs for debugging (can be removed in production)

---
