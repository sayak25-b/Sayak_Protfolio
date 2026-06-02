# ⚡ Quick Reference Card

## Essential Commands

### Start Backend
```bash
cd backend
npm run dev
```

### Install Dependencies
```bash
cd backend
npm install
```

### Stop Backend
Press `Ctrl + C` in terminal

---

## API Testing (cURL)

### Get All Projects
```bash
curl http://localhost:5000/api/projects
```

### Add New Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Project",
    "description":"Description",
    "image":"https://image.jpg",
    "tags":["React","Node.js"],
    "demoLink":"https://demo.com",
    "githubLink":"https://github.com/user/repo",
    "featured":true
  }'
```

### Get Contact Messages
```bash
curl http://localhost:5000/api/contact
```

### Check Server Status
```bash
curl http://localhost:5000/api/health
```

---

## Common Files to Edit

| File | Purpose |
|------|---------|
| `backend/.env` | Server configuration |
| `script.js` | Line ~160: API_BASE_URL |
| `backend/server.js` | Backend settings |
| `backend/models/Project.js` | Project schema |
| `backend/models/Contact.js` | Contact schema |

---

## MongoDB Connection Strings

**Local:**
```
mongodb://localhost:27017/portfolio
```

**MongoDB Atlas:**
```
mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

---

## Port Numbers
- Frontend: `3000` (if using local server)
- Backend: `5000` (default)
- MongoDB: `27017` (default)

---

## Error Checklist

❌ Backend not starting
→ Run: `npm install`

❌ MongoDB connection error
→ Start MongoDB service / Check .env

❌ Port 5000 in use
→ Check `.env` for different PORT or kill process

❌ Projects not loading
→ Ensure backend running + projects in database

❌ Contact form not sending
→ Check backend running + fill all fields

---

## File Locations

```
Backend: c:\Users\User\OneDrive\Desktop\My Protfolio\backend\
Frontend: c:\Users\User\OneDrive\Desktop\My Protfolio\
```

---

## Quick API Response Codes

| Code | Meaning |
|------|---------|
| 200 | ✅ Success |
| 201 | ✅ Created |
| 400 | ❌ Bad request (check data) |
| 404 | ❌ Not found |
| 500 | ❌ Server error |

---

## Tools Download Links

- [Node.js](https://nodejs.org/) - Backend runtime
- [MongoDB](https://www.mongodb.com/try/download/community) - Database
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass) - GUI
- [Postman](https://www.postman.com/downloads/) - API Testing
- [VS Code](https://code.visualstudio.com/) - Editor

---

## Project Data Template
```json
{
  "title": "Project Name",
  "description": "What it does",
  "image": "https://image-url.jpg",
  "tags": ["Tech1", "Tech2"],
  "demoLink": "https://live-demo.com",
  "githubLink": "https://github.com/user/project",
  "featured": true
}
```

---

## Documentation Files

1. **SETUP_GUIDE.md** - First read this
2. **IMPLEMENTATION.md** - Architecture overview
3. **backend/README.md** - Detailed backend info
4. **backend/ADMIN_GUIDE.md** - How to manage data
5. **TROUBLESHOOTING.md** - Common issues

---

## Browser DevTools (F12)

- **Console Tab** - JavaScript errors
- **Network Tab** - API requests
- **Sources Tab** - Debug code
- **Application Tab** - Local storage

---

## MongoDB Compass Quick Tips

1. Connect → localhost:27017
2. Create database: `portfolio`
3. Create collection: `projects`
4. Add document → Paste JSON
5. View/Edit → Click document

---

## Environment Setup

**Update these in .env:**

```env
MONGODB_URI=your-connection-string
PORT=5000
NODE_ENV=development
```

---

## Quick Debugging

```javascript
// Add to script.js for debugging
console.log('Projects API URL:', API_BASE_URL);
console.log('Loading projects...');

// Check if projects loaded
window.addEventListener('load', () => {
  console.log('Page loaded, fetching projects');
});
```

---

## Git Commands (Optional)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Portfolio with backend"

# View status
git status
```

---

## Performance Tips

- ✅ Keep images compressed (< 500KB)
- ✅ Use CDN for large images
- ✅ Keep MongoDB indexed
- ✅ Use featured flag to highlight projects
- ✅ Limit tags per project (3-5)

---

## Security Reminders

🔐 Never commit `.env` file  
🔐 Use strong MongoDB password  
🔐 Validate all inputs (already done)  
🔐 Use HTTPS in production  
🔐 Don't share MongoDB connection string  

---

## Need Quick Help?

1. **Error?** → Read TROUBLESHOOTING.md
2. **Setup?** → Read SETUP_GUIDE.md
3. **Adding projects?** → Read backend/ADMIN_GUIDE.md
4. **Architecture?** → Read IMPLEMENTATION.md

---

**Print this card and keep it on your desk! 📋**
