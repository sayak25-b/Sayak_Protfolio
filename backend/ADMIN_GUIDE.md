# 👨‍💼 Admin Guide - Managing Your Portfolio Backend

## Overview
This guide shows you how to manage your portfolio data (projects and contact messages) from the backend.

---

## 📊 Managing Projects

### Add a New Project

**Using MongoDB Compass (Easiest GUI Method)**

1. Open MongoDB Compass
2. Connect to your MongoDB
3. Navigate: `portfolio` database → `projects` collection
4. Click "+ ADD DATA" → "Insert Document"
5. Fill in the project details:

```json
{
  "title": "Your Project Title",
  "description": "A brief description of what your project does",
  "image": "https://image-url-here.jpg",
  "tags": ["Technology1", "Technology2", "Technology3"],
  "demoLink": "https://live-demo-url.com",
  "githubLink": "https://github.com/yourname/project-repo",
  "featured": true,
  "details": "Detailed description (optional)"
}
```

**Using API (cURL)**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    "description": "Project description",
    "image": "https://image.jpg",
    "tags": ["React", "Node.js"],
    "demoLink": "https://demo.com",
    "githubLink": "https://github.com/user/project",
    "featured": true
  }'
```

**Using Postman**

1. Create NEW request
2. Set method: `POST`
3. URL: `http://localhost:5000/api/projects`
4. Go to "Body" tab
5. Select "raw" and "JSON"
6. Paste project JSON
7. Click "Send"

---

### View All Projects

**Using MongoDB Compass**
- Navigate to `portfolio` → `projects`
- All projects are displayed in a table

**Using API**
```bash
curl http://localhost:5000/api/projects
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Title",
      "description": "...",
      ...
    }
  ]
}
```

---

### Update a Project

**Using MongoDB Compass**

1. Click on the project in the collection
2. Edit the fields you want to change
3. The database auto-saves

**Using API (cURL)**

```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "featured": false
  }'
```

Replace `PROJECT_ID` with the MongoDB `_id` of your project.

---

### Delete a Project

**Using MongoDB Compass**

1. Right-click on the project
2. Click "Delete Document"
3. Confirm deletion

**Using API**

```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID
```

---

## 💬 Managing Contact Messages

### View All Messages

**Using MongoDB Compass**

1. Navigate to `portfolio` → `contacts` collection
2. All messages are displayed in a table
3. Sort by `createdAt` to see newest first

**Using API**

```bash
curl http://localhost:5000/api/contact
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com",
      "subject": "Interested in your work",
      "message": "Hi, I'd like to work with you...",
      "status": "new",
      "createdAt": "2026-06-01T10:30:00Z"
    }
  ]
}
```

---

### Mark Message as Read

**Using MongoDB Compass**

1. Click on the message
2. Change `status` field from `"new"` to `"read"`

**Using API**

```bash
curl -X PUT http://localhost:5000/api/contact/MESSAGE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "read"
  }'
```

---

### Mark Message as Replied

**Using API**

```bash
curl -X PUT http://localhost:5000/api/contact/MESSAGE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "status": "replied"
  }'
```

---

### Delete a Message

**Using MongoDB Compass**

1. Right-click on the message
2. Click "Delete Document"
3. Confirm deletion

**Using API**

```bash
curl -X DELETE http://localhost:5000/api/contact/MESSAGE_ID
```

---

## 🔍 Monitoring & Analytics

### Get Message Statistics

Create a quick query in MongoDB Compass:

**Count by status:**
```javascript
db.contacts.aggregate([
  {
    $group: {
      _id: "$status",
      count: { $sum: 1 }
    }
  }
])
```

**Messages by date:**
```javascript
db.contacts.aggregate([
  {
    $group: {
      _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: -1 } }
])
```

---

## 📧 Email Notifications (Optional)

To receive email notifications when someone submits the contact form:

1. Update `.env` with Gmail credentials:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
RECEIVER_EMAIL=your-email@gmail.com
```

2. Generate Gmail App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Select Mail and Windows Computer
   - Copy the generated password to `.env`

3. Uncomment email code in `backend/routes/contact.js`

---

## 🗂️ Database Structure

### Projects Collection
```json
{
  "_id": ObjectId,
  "title": String,
  "description": String,
  "image": String (URL),
  "tags": [String],
  "demoLink": String (URL),
  "githubLink": String (URL),
  "details": String,
  "featured": Boolean,
  "createdAt": Date,
  "updatedAt": Date
}
```

### Contacts Collection
```json
{
  "_id": ObjectId,
  "name": String,
  "email": String,
  "subject": String,
  "message": String,
  "status": String (new|read|replied),
  "createdAt": Date
}
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It contains sensitive data
2. **Use strong MongoDB passwords** - Especially for production
3. **Enable MongoDB IP whitelist** - In MongoDB Atlas
4. **Use HTTPS in production** - Not just HTTP
5. **Validate all inputs** - Backend already does this
6. **Regular backups** - Export your MongoDB regularly

---

## ⚙️ Useful MongoDB Commands

**Export projects to JSON:**
```bash
mongoexport --db portfolio --collection projects --out projects.json
```

**Import projects from JSON:**
```bash
mongoimport --db portfolio --collection projects --file projects.json
```

**Delete all contacts:**
```bash
mongo portfolio --eval "db.contacts.deleteMany({})"
```

---

## 🚀 Quick Tips

- ✅ Regularly backup your database
- ✅ Monitor contact messages for opportunities
- ✅ Keep project information updated
- ✅ Test API endpoints after making changes
- ✅ Use MongoDB Compass for visual management

---

## 🆘 Common Issues

**"Cannot connect to MongoDB"**
- Check if MongoDB service is running
- Verify connection string in `.env`

**"API endpoints not working"**
- Ensure backend is running: `npm run dev`
- Check port 5000 is not in use

**"Cannot see projects on website"**
- Projects might not exist in database
- Check browser console for errors (F12)

---

For more help, refer to:
- [MongoDB Compass Guide](https://docs.mongodb.com/compass/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js REST API Guide](https://expressjs.com/)

---

**Happy managing! 📊**
