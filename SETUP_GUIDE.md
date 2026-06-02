# 🚀 Quick Start Guide

## What's New?
✅ **Backend Created** - Node.js/Express with MongoDB  
✅ **Dynamic Projects** - Load projects from database instead of HTML  
✅ **Contact Form Connected** - Submissions saved to MongoDB  
✅ **API Endpoints** - Full CRUD operations for projects and contacts  

---

## 🎯 Getting Started in 3 Steps

### Step 1: Setup MongoDB
Choose one option:

**Option A: Local MongoDB (Recommended for testing)**
- Download: https://www.mongodb.com/try/download/community
- Install it
- Run: `mongod` (in terminal/command prompt)

**Option B: MongoDB Cloud (Free)**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account → Create cluster
- Get connection string → Add to `backend/.env`

### Step 2: Start Backend Server
```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

### Step 3: Add Your First Project
Use any of these methods:

**Method 1: Using cURL (command line)**
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Project",
    "description": "This is my amazing project",
    "image": "https://image-url.jpg",
    "tags": ["React", "Node.js"],
    "demoLink": "https://demo.com",
    "githubLink": "https://github.com/yourname/project",
    "featured": true
  }'
```

**Method 2: Using Postman (GUI)**
1. Download: https://www.postman.com/downloads/
2. Create POST request to: `http://localhost:5000/api/projects`
3. Set body as JSON with project data
4. Click Send

**Method 3: Using MongoDB Compass (GUI)**
1. Download: https://www.mongodb.com/products/tools/compass
2. Connect to your MongoDB
3. Navigate to `portfolio` → `projects` collection
4. Insert new document with project details

---

## 📋 Sample Project Data
```json
{
  "title": "Weather App",
  "description": "Beautiful weather application with real-time forecasts and animations",
  "image": "https://media.istockphoto.com/id/1365264688/vector/weather-forecast-meteorology-widget-app-interface.jpg",
  "tags": ["JavaScript", "API", "CSS3"],
  "demoLink": "https://weather-demo.netlify.app",
  "githubLink": "https://github.com/yourname/weather-app",
  "featured": true
}
```

---

## 📂 Project Structure
```
My Portfolio/
├── index.html          # Frontend
├── script.js           # Frontend JS (UPDATED - now fetches from API)
├── style.css           # Frontend styles
└── backend/
    ├── server.js       # Backend server
    ├── package.json    # Dependencies
    ├── .env            # Config file
    ├── models/         # MongoDB schemas
    │   ├── Project.js
    │   └── Contact.js
    └── routes/         # API endpoints
        ├── projects.js
        └── contact.js
```

---

## 🔗 API Endpoints Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Add new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages |

---

## ✨ How It Works

### Frontend
- Automatically fetches projects from MongoDB when page loads
- Dynamically creates project cards
- Contact form sends data to backend via API

### Backend
- Express server listens on `http://localhost:5000`
- MongoDB stores all data
- Handles all CRUD operations
- Validates form submissions

### Data Flow
```
User submits contact form
       ↓
JavaScript sends POST to /api/contact
       ↓
Backend validates & saves to MongoDB
       ↓
User gets success message
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"
**Fix:** Run `npm install` in backend folder

### Issue: "MongoDB connection error"
**Fix:** Check if MongoDB is running or `.env` has correct connection string

### Issue: "Projects not showing"
**Fix:** 
1. Backend must be running on port 5000
2. At least one project must exist in database
3. Check browser console (F12) for errors

### Issue: "Contact form not sending"
**Fix:**
1. Backend must be running
2. Check browser Network tab for failed requests
3. Ensure all form fields are filled

---

## 📞 Contact Form Management

View all submitted messages:
```
GET http://localhost:5000/api/contact
```

Mark as read:
```
PUT http://localhost:5000/api/contact/:id
{
  "status": "read"
}
```

Delete a message:
```
DELETE http://localhost:5000/api/contact/:id
```

---

## 🚀 Next Steps

1. ✅ Setup MongoDB
2. ✅ Run backend: `npm run dev`
3. ✅ Open portfolio in browser
4. ✅ Add 3-5 projects to database
5. ✅ Submit contact form to test
6. ✅ When ready to deploy, read `backend/README.md`

---

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [REST API Best Practices](https://restfulapi.net/)

---

**Enjoy your dynamic portfolio! 🎉**

For detailed setup instructions, see [backend/README.md](backend/README.md)
