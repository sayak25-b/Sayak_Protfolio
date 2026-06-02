# 🔧 Troubleshooting Guide

## Common Issues and Solutions

---

## Issue 1: "Cannot find module 'express'"

### Error Message
```
Error: Cannot find module 'express'
```

### Cause
Dependencies not installed

### Solution
```bash
cd backend
npm install
```

Wait for installation to complete. You should see many packages being installed.

---

## Issue 2: "MongoDB connection error"

### Error Message
```
❌ MongoDB connection error: connect ECONNREFUSED 127.0.0.1:27017
```

### Cause
MongoDB service is not running or connection string is wrong

### Solution

**If using Local MongoDB:**

**On Windows:**
1. Press `Win + R`
2. Type `services.msc`
3. Find "MongoDB" service
4. Right-click → "Start"

**On Mac:**
```bash
brew services start mongodb-community
```

**On Linux:**
```bash
sudo systemctl start mongod
```

**If using MongoDB Atlas (Cloud):**
1. Check `.env` file has correct connection string
2. Format: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`
3. Make sure password doesn't have special characters (URL encode if needed)
4. Check your IP is whitelisted in MongoDB Atlas

---

## Issue 3: "Port 5000 is already in use"

### Error Message
```
Error: listen EADDRINUSE :::5000
```

### Cause
Another application is using port 5000

### Solution

**Find what's using port 5000:**

**Windows (Command Prompt):**
```bash
netstat -ano | findstr :5000
```
Then kill the process:
```bash
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
```
Then kill:
```bash
kill -9 <PID>
```

**Or use a different port:**
Edit `backend/.env`:
```env
PORT=3001
```
Then restart server.

---

## Issue 4: "Projects not showing on website"

### Symptoms
- Projects section shows "Loading projects..." forever
- No projects appear even after adding to database

### Cause
1. Backend not running
2. No projects in database
3. API endpoint not working
4. CORS issue

### Solution

**Step 1: Check Backend is Running**
```bash
curl http://localhost:5000/api/health
```

Should return:
```json
{"status":"Server is running","timestamp":"2026-06-01T..."}
```

If it fails → Start backend: `npm run dev`

**Step 2: Check Projects Exist in Database**
```bash
curl http://localhost:5000/api/projects
```

Should return:
```json
{"success":true,"count":3,"data":[...]}
```

If count is 0 → Add projects to database

**Step 3: Check Browser Console**
1. Press `F12` in browser
2. Go to "Console" tab
3. Look for red errors
4. Check "Network" tab → look for `/api/projects` request
   - If red ❌ → Backend not running
   - If 200 ✅ but empty → No projects in DB

---

## Issue 5: "Contact form not sending"

### Symptoms
- Form shows error when submitting
- "Error sending message" appears

### Cause
1. Backend not running
2. Validation error (missing fields)
3. Backend crashed
4. Network issue

### Solution

**Step 1: Verify all fields filled**
- Name (required)
- Email (required)
- Subject (required)
- Message (required)

**Step 2: Check Backend Running**
```bash
curl http://localhost:5000/api/health
```

**Step 3: Test API with cURL**
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Test message"
  }'
```

Should return:
```json
{"success":true,"message":"Thank you! Your message has been received..."}
```

**Step 4: Check Browser Console**
1. Press `F12`
2. Go to "Network" tab
3. Submit form
4. Look for POST request to `/api/contact`
5. Click it and check response

---

## Issue 6: "CORS error" (if deployed to different domain)

### Error Message
```
Access to XMLHttpRequest at 'http://backend.com/api/projects' 
from origin 'http://frontend.com' has been blocked by CORS policy
```

### Cause
Frontend and backend on different domains/ports without CORS enabled

### Solution

Update `backend/server.js`:
```javascript
app.use(cors({
    origin: 'http://your-frontend-url.com',
    credentials: true
}));
```

Or for testing (allows any origin):
```javascript
app.use(cors());
```

---

## Issue 7: "Cannot connect to MongoDB Atlas"

### Error Message
```
MongooseError: connect ENOTFOUND cluster0.mongodb.net
```

### Cause
Wrong connection string or network issue

### Solution

1. **Get correct connection string:**
   - Go to MongoDB Atlas → Clusters → Connect
   - Choose "Connect your application"
   - Copy connection string

2. **Update .env:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

3. **Verify credentials:**
   - Username and password correct
   - No special characters in password (if yes, URL encode)

4. **Check IP Whitelist:**
   - MongoDB Atlas → Network Access
   - Add your IP address (or 0.0.0.0 for testing only)

5. **Test connection:**
   ```bash
   npm run dev
   ```
   Should show: `✅ MongoDB connected successfully`

---

## Issue 8: "npm install taking too long"

### Symptoms
- Installation stuck for 10+ minutes
- No output

### Solution

**Cancel and try again:**
```bash
npm install
```

**Or use npm cache clean:**
```bash
npm cache clean --force
npm install
```

**Or use yarn instead:**
```bash
npm install -g yarn
yarn install
```

---

## Issue 9: "Nodemon command not found"

### Error Message
```
'nodemon' is not recognized as an internal or external command
```

### Cause
Nodemon not installed or npm scripts not found

### Solution

**Reinstall dependencies:**
```bash
cd backend
npm install
```

**Or install nodemon globally:**
```bash
npm install -g nodemon
```

**Or use node directly:**
```bash
node server.js
```

---

## Issue 10: "env file not working"

### Symptoms
- Environment variables undefined
- MongoDB URI not reading

### Cause
- `.env` file in wrong location
- .env not loaded properly
- Wrong variable name

### Solution

1. **Check .env file location:**
   - Should be in `backend/.env`
   - Not in root or other folders

2. **Verify format:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   PORT=5000
   ```
   (No spaces around `=`)

3. **Force reload:**
   ```bash
   # Kill backend process
   # Delete node_modules
   rm -rf node_modules
   # Reinstall
   npm install
   # Start again
   npm run dev
   ```

---

## Debug Mode

### Enable Debug Logging

Add to `backend/server.js`:
```javascript
const mongoose = require('mongoose');
mongoose.set('debug', true);  // Enable mongoose debugging
```

### View Full Error Details

In browser console (F12), look for full error messages:
1. Console tab → Red errors
2. Network tab → Failed requests
3. Check response body for error details

---

## Performance Issues

### Slow API Response

**Check database:**
```bash
curl http://localhost:5000/api/projects
```
If takes > 5 seconds → MongoDB may be slow

**Restart MongoDB:**
```bash
# Windows
net stop MongoDB
net start MongoDB

# Mac
brew services restart mongodb-community

# Linux
sudo systemctl restart mongod
```

### Memory Issues

Check Node process memory:
```bash
node --max-old-space-size=2048 server.js
```

---

## Getting Help

### Check Logs

1. Backend console output
2. Browser console (F12)
3. Network tab in browser DevTools
4. MongoDB logs

### Collect Debug Info

When asking for help, provide:
- Error message (full text)
- What you were doing when error occurred
- Operating system
- Node.js version: `node --version`
- npm version: `npm --version`

---

## Emergency Restart

If everything is broken, try the nuclear option:

```bash
# Stop everything
# Kill all node processes
# Windows:
taskkill /F /IM node.exe

# Kill MongoDB
# Windows: 
net stop MongoDB

# Mac/Linux:
killall mongod

# Clean install
cd backend
rm -rf node_modules package-lock.json
npm install

# Start fresh
npm run dev
```

---

## Still Stuck?

1. **Read the error message carefully** - It usually tells you what's wrong
2. **Check all 3 parts:**
   - Frontend (browser console)
   - Backend (terminal output)
   - Database (MongoDB Compass)
3. **Try a fresh restart** - Stop everything and start from scratch
4. **Check online** - Google the error message
5. **Ask for help** - Include error logs and what you've tried

---

**Remember: 99% of issues are one of these:**
- ✅ Backend not running
- ✅ MongoDB not running
- ✅ Wrong configuration in .env
- ✅ Port already in use

---

**Good luck! 🚀**
