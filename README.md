# CRM Lead Management System

A full-stack CRM application for managing sales leads, built with React frontend and Node.js/Express backend with MongoDB database.

## Features

- **Authentication**: JWT-based login system with protected routes
- **Dashboard**: Overview of lead statistics including total leads, status breakdowns, and deal values
- **Lead Management**: Full CRUD operations for leads
- **Lead Notes**: Add and view notes for each lead with timestamps
- **Search and Filtering**: Search by name, company, email; filter by status, lead source, and assigned salesperson
- **Responsive UI**: Clean, professional interface built with React and CSS

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Plain CSS for styling

### Backend
- Node.js
- Express.js
- JWT for authentication
- MongoDB with Mongoose ODM

### Database
- MongoDB (local or Atlas)

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/crm-db  # or your MongoDB Atlas URI
   JWT_SECRET=your_super_secret_jwt_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token signing

## Test Login Credentials

- **Email**: admin@example.com
- **Password**: password123

## Database Setup

1. Ensure MongoDB is running locally or use MongoDB Atlas
2. The application will automatically create the database and collections on first use
3. Optional: Run the seed script to populate sample data:
   ```bash
   cd backend
   node seed.js
   ```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Leads
- `GET /api/leads` - Get all leads
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead by ID
- `PUT /api/leads/:id` - Update lead
- `DELETE /api/leads/:id` - Delete lead
- `POST /api/leads/:id/notes` - Add note to lead

## Project Structure

```
crm-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   ├── seed.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── public/
│   └── package.json
└── README.md
```

## Known Limitations

- Single hardcoded test user (no user registration)
- No pagination for large lead lists
- Basic error handling and validation
- No email notifications or integrations

## Demo Video Requirements

Create a 5-10 minute demo video covering:
1. **Project Setup**: Show terminal output of running both backend and frontend
2. **Login Flow**: Demonstrate login with test credentials (admin@example.com / password123)
3. **Dashboard**: Show all 7 dashboard statistics cards with data
4. **Create Lead**: Walk through the Add Lead form with all fields and create a sample lead
5. **Edit Lead**: Open a lead and demonstrate editing its fields
6. **Update Status**: Show changing a lead's status (e.g., New → Qualified → Won)
7. **Add Notes**: Add a note to a lead and show it appears with timestamp and creator
8. **Search**: Filter leads by searching for name, company, or email
9. **Filter**: Demonstrate filtering by Status, Lead Source, and Assigned Salesperson
10. **Backend**: Brief explanation of the API structure, MongoDB schema, and JWT authentication
11. **Database**: Show MongoDB collections and document structure

Submit video link on: [Assignment Submission Form](https://airtable.com/app9kXuirRbKEJ88P/pag1nNFlinQLeevO1/form)

## Reflection

This CRM application demonstrates core full-stack development skills including:
- Building RESTful APIs with Express.js and proper CRUD operations
- Implementing JWT authentication with protected routes
- Designing MongoDB schemas with Mongoose including nested note documents
- Creating responsive React components with hooks and state management
- Integrating frontend with backend APIs using Axios
- Implementing advanced search and multi-criteria filtering
- Styling with modern CSS featuring gradients, transitions, and responsive design
- Error handling and validation at both frontend and backend
- Database timestamp tracking (createdAt, updatedAt)
- User experience improvements with hero section, footer, and professional UI

## Bonus Features Implemented

- **Hero Section**: Eye-catching dashboard hero with CTA buttons for navigation
- **Footer**: Professional footer visible across all protected routes
- **Modern UI**: Gradient backgrounds, smooth transitions, professional color scheme
- **Priority Field**: Added priority tracking (Low, Medium, High) for leads
- **Status-based Calculations**: Dashboard calculates stats by status dynamically
- **Responsive Design**: Mobile-optimized layout with flexible grid system
- **Note Timestamps**: Notes include precise creation dates and creator attribution

Areas for future improvement:
- User registration and role-based access control
- Advanced analytics dashboard with charts and graphs
- Lead import/export functionality (CSV)
- Email notifications for status changes
- Lead scoring algorithm for prioritization
- Activity timeline showing all lead changes
- Bulk operations on multiple leads
- Advanced reporting and forecasting