# Deployment Guide - AI Detective Game

This guide walks you through deploying the AI Detective game to production.

## Architecture Overview

The app has two parts:
- **Client (React/Vite)**: Can be deployed to Vercel
- **Server (Node.js/Socket.io)**: Requires persistent WebSocket connections, best deployed to Railway, Render, or Heroku

## Option 1: Client on Vercel + Server on Railway (Recommended)

This is the recommended setup as it's free and reliable.

---

## Part 1: Deploy Server to Railway

### Step 1: Prepare Server for Production

1. **Add a Procfile** in the `server` folder:

```bash
cd server
```

Create a file named `Procfile` (no extension):
```
web: node index.js
```

2. **Update server CORS settings** to allow your Vercel domain.

Edit `server/index.js` and update the CORS configuration:

```javascript
// Find this section around line 9:
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "https://your-app-name.vercel.app"  // Add your Vercel URL here
    ],
    methods: ["GET", "POST"]
  }
});
```

3. **Make sure server package.json has the start script**:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

### Step 2: Deploy to Railway

1. **Sign up for Railway**: Go to [railway.app](https://railway.app) and sign up with GitHub

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account
   - Select your repository

3. **Configure the deployment**:
   - Railway will auto-detect Node.js
   - Set the **Root Directory** to `server`
   - Railway will automatically run `npm install` and `npm start`

4. **Get your Railway URL**:
   - Once deployed, Railway will give you a URL like: `https://your-app.railway.app`
   - Copy this URL - you'll need it for the client

5. **Configure environment** (if needed):
   - Click on your service
   - Go to "Variables" tab
   - Add `PORT` = `3001` (Railway will override this with their own port, but it's good practice)

---

## Part 2: Deploy Client to Vercel

### Step 1: Update Client to Use Production Server

Edit `client/src/services/socket.js`:

```javascript
// Find this line around line 3:
const SOCKET_URL = 'http://localhost:3001';

// Replace with:
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';
```

### Step 2: Add Environment Variable File

Create `client/.env.production`:

```env
VITE_SOCKET_URL=https://your-app.railway.app
```

Replace `your-app.railway.app` with your actual Railway URL.

### Step 3: Test Production Build Locally

```bash
cd client
npm run build
npm run preview
```

Open the preview URL and test that it connects to your Railway server.

### Step 4: Deploy to Vercel

**Option A: Deploy via Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy from the client folder:
```bash
cd client
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - Project name? `ai-detective-game`
   - In which directory is your code? `./` (current directory)
   - Override settings? **N**

4. Set environment variable:
```bash
vercel env add VITE_SOCKET_URL
```
Enter your Railway URL: `https://your-app.railway.app`

5. Redeploy to apply environment variable:
```bash
vercel --prod
```

**Option B: Deploy via Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "Add New Project"

3. Import your Git repository

4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Add Environment Variable:
   - Click "Environment Variables"
   - Add: `VITE_SOCKET_URL` = `https://your-app.railway.app`

6. Click "Deploy"

---

## Part 3: Update Railway CORS with Vercel URL

Once you have your Vercel URL (e.g., `https://ai-detective-game.vercel.app`):

1. Update `server/index.js` CORS settings:

```javascript
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "https://ai-detective-game.vercel.app"  // Your actual Vercel URL
    ],
    methods: ["GET", "POST"]
  }
});
```

2. Commit and push to GitHub (Railway will auto-deploy)

---

## Option 2: All-in-One on Render

If you prefer a single deployment platform:

### Deploy to Render

1. Sign up at [render.com](https://render.com)

2. **Deploy the Server**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Name: `ai-detective-server`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Click "Create Web Service"

3. **Deploy the Client**:
   - Click "New +" → "Static Site"
   - Connect your GitHub repo
   - Name: `ai-detective-client`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Add Environment Variable:
     - Key: `VITE_SOCKET_URL`
     - Value: `https://ai-detective-server.onrender.com` (your server URL)
   - Click "Create Static Site"

4. **Update Server CORS**:
   - Add your Render static site URL to the CORS origins in `server/index.js`

---

## Testing Your Deployment

1. **Open your Vercel URL** (e.g., `https://ai-detective-game.vercel.app`)

2. **Check the browser console**:
   - Look for "Connected to server" message
   - If you see connection errors, check:
     - Railway server is running
     - CORS settings include your Vercel URL
     - Environment variable is set correctly

3. **Test the full flow**:
   - Open Presenter view in one browser window
   - Open Team view in another window (or private/incognito mode)
   - Join as a team
   - Start a round
   - Submit an answer
   - Reveal the answer

---

## Custom Domain (Optional)

### For Vercel:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### For Railway:
1. Click on your service
2. Go to "Settings"
3. Add custom domain
4. Update DNS records as instructed

**Important**: After adding custom domains, update the CORS settings in `server/index.js` to include your custom domain.

---

## Environment Variables Reference

### Client (Vercel)
```
VITE_SOCKET_URL=https://your-server-url.railway.app
```

### Server (Railway)
```
PORT=3001  # Railway will override this
NODE_ENV=production
```

---

## Troubleshooting

### Issue: Client can't connect to server

**Solution:**
1. Check browser console for errors
2. Verify `VITE_SOCKET_URL` is set correctly in Vercel
3. Verify Railway server is running (check logs)
4. Verify CORS settings include your Vercel URL

### Issue: Socket.io connection fails

**Solution:**
1. Check that Railway allows WebSocket connections (it should by default)
2. Verify the server URL is using `https://` not `http://`
3. Check Railway logs for connection errors

### Issue: "Error: listen EADDRINUSE"

**Solution:**
This only happens locally when a port is in use. In production, Railway assigns the port automatically.

### Issue: Build fails on Vercel

**Solution:**
1. Make sure Root Directory is set to `client`
2. Check that `package.json` has all dependencies
3. Review build logs for specific errors

### Issue: Teams can't join the game

**Solution:**
1. Check that both presenter and teams are using the same production URL
2. Verify the server is running on Railway
3. Check browser console for Socket.io connection errors

---

## Cost Breakdown

### Free Tier (Recommended for testing):
- **Vercel**: Free for personal projects (unlimited bandwidth)
- **Railway**: $5/month after 500 free hours (or use free trial)
- **Total**: ~$5/month

### Alternative Free Options:
- **Render**: Free tier available (may spin down after inactivity)
- **Vercel + Render**: Both free for personal use

---

## Production Checklist

Before going live:

- [ ] Server deployed to Railway/Render and running
- [ ] Client deployed to Vercel and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured with production URLs
- [ ] Tested full game flow in production
- [ ] Checked browser console for errors
- [ ] Tested with multiple teams simultaneously
- [ ] Verified Socket.io connections are stable
- [ ] (Optional) Custom domain configured
- [ ] (Optional) Analytics added (Vercel Analytics)

---

## Updating the App

### Client Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel auto-deploys (if connected to GitHub)
4. Or run `vercel --prod` from client folder

### Server Updates:
1. Make changes locally
2. Commit and push to GitHub
3. Railway auto-deploys (if connected to GitHub)
4. Check Railway logs to verify deployment

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Socket.io Docs**: https://socket.io/docs/v4/

---

## Quick Deploy Commands

```bash
# Test production build locally
cd client
npm run build
npm run preview

# Deploy to Vercel (from client folder)
vercel --prod

# Check Railway deployment
# (Done via Railway dashboard or GitHub auto-deploy)
```

---

## Notes

- The server requires WebSocket support, so serverless platforms like AWS Lambda or Vercel Functions won't work well
- Railway is recommended because it's simple and supports WebSockets out of the box
- Always test the full game flow after deployment
- Keep your Railway and Vercel URLs in sync across all configuration files
