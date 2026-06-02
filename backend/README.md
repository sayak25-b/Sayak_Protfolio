# Portfolio Backend Setup Guide

## Overview
This backend powers your portfolio with MongoDB integration for:
- **Contact Form Submissions** - Receive and store messages from visitors
- **Dynamic Projects** - Manage projects from MongoDB instead of hardcoding HTML

## Prerequisites
- **Node.js** (v14+) - [Download here](https://nodejs.org/)
- **MongoDB** - Either:
  - Local installation: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud option: [MongoDB Atlas (Free tier available)](https://www.mongodb.com/cloud/atlas)

## Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Cross-origin requests
- `dotenv` - Environment variables
- `nodemailer` - Email notifications (optional)
- `nodemon` - Development auto-reload

### 2. Configure Environment Variables
The `.env` file is already created. Update it with your settings:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server Configuration
PORT=5000
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECEIVER_EMAIL=bhattacharyasayak977@gmail.com
```

#### MongoDB Connection Options:

**Option A: Local MongoDB**
```
MONGODB_URI=mongodb://localhost:27017/portfolio
```
(Make sure MongoDB service is running)

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string and update:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

### 3. Start the Backend
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

## API Endpoints

### Projects API

#### Get All Projects
```
GET /api/projects
```
Response:
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "...",
      "title": "AI Chat Application",
      "description": "...",
      "image": "...",
      "tags": ["Node.js", "MongoDB"],
      "demoLink": "https://...",
      "githubLink": "https://...",
      "featured": true,
      "createdAt": "2026-06-01T..."
    }
  ]
}
```

#### Add a New Project
```
POST /api/projects
Content-Type: application/json

{
  "title": "Your Project Title",
  "description": "Project description...",
  "image": "https://image-url.jpg",
  "tags": ["React", "Node.js", "MongoDB"],
  "demoLink": "https://demo-url.com",
  "githubLink": "https://github.com/...",
  "featured": true
}
```

#### Update Project
```
PUT /api/projects/:id
Content-Type: application/json

{
  "title": "Updated Title",
  ...
}
```

#### Delete Project
```
DELETE /api/projects/:id
```

### Contact API

#### Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Hello",
  "message": "I'm interested in your services..."
}
```

#### Get All Messages (Admin)
```
GET /api/contact
```

#### Update Message Status
```
PUT /api/contact/:id
Content-Type: application/json

{
  "status": "read"  // or "replied"
}
```

#### Delete Message
```
DELETE /api/contact/:id
```

## Adding Projects to MongoDB

### Using MongoDB Compass (GUI Tool)
1. Download [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
2. Connect to your MongoDB (local or Atlas)
3. Create database: `portfolio`
4. Create collection: `projects`
5. Insert documents (projects) with this structure:

```json
{
  "title": "E-Commerce Platform",
  "description": "A full-featured online shopping platform with cart, payment integration, and admin panel.",
  "image": "https://image-url.jpg",
  "tags": ["React", "Node.js", "MongoDB", "Stripe"],
  "demoLink": "https://demo-url.com",
  "githubLink": "https://github.com/yourname/project",
  "featured": true
}
```

### Using API (cURL)
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Your Project",
    "description": "Description here",
    "image": "https://image-url.jpg",
    "tags": ["Tag1", "Tag2"],
    "demoLink": "https://demo.com",
    "githubLink": "https://github.com/...",
    "featured": true
  }'
```

### Using Postman
1. Download [Postman](https://www.postman.com/downloads/)
2. Create POST request to `http://localhost:5000/api/projects`
3. Set Headers: `Content-Type: application/json`
4. Add JSON body with project data
5. Send request

## Frontend Configuration

The frontend JavaScript automatically connects to `http://localhost:5000`. If you deploy the backend elsewhere, update the URL in [script.js](../script.js):

```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // Change this URL
```

## Troubleshooting

### "MongoDB connection error"
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check `.env` file for correct `MONGODB_URI`

### "Contact form not sending"
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify frontend `API_BASE_URL` is correct

### "Projects not loading"
- Backend server must be running
- Check that projects exist in MongoDB
- Check browser Network tab for failed requests

### "CORS errors"
- CORS is enabled in the backend
- Ensure you're accessing from the correct domain
- For local development, access via `http://localhost:3000`

## Project Structure
```
backend/
├── server.js              # Main server file
├── package.json           # Dependencies
├── .env                   # Environment variables
├── models/
│   ├── Project.js         # Project schema
│   └── Contact.js         # Contact schema
└── routes/
    ├── projects.js        # Projects endpoints
    └── contact.js         # Contact endpoints
```

## Next Steps

1. ✅ Start backend server: `npm run dev`
2. ✅ Add projects to MongoDB
3. ✅ Your portfolio will load projects dynamically
4. ✅ Contact form submissions are saved to database

## Support
For issues or questions, check the error console (press F12 in browser) for detailed error messages.

## Deployment

When ready to deploy:

1. **Backend**: Deploy to Heroku, Railway, or your preferred hosting
2. **MongoDB**: Use MongoDB Atlas (free tier available)
3. **Frontend**: Deploy to Vercel, Netlify, or GitHub Pages
4. **Update URL**: Change `API_BASE_URL` in script.js to deployed backend URL

Example for Heroku deployment:
```bash
cd backend
heroku login
heroku create your-portfolio-backend
git push heroku main
```

---

**Happy coding! 🚀**
