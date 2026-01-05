# Deployment Checklist - Print This!

Use this checklist while deploying. Check off each step as you complete it.

---

## Prerequisites
- [ ] Code pushed to GitHub
- [ ] GitHub account ready
- [ ] Render account created ([render.com](https://render.com))
- [ ] Vercel account created ([vercel.com](https://vercel.com))

---

## Part 1: Deploy Server to Render

- [ ] Go to render.com
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] **Settings:**
  - [ ] Name: `ai-detective-server`
  - [ ] Root Directory: `server`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Plan: **Free**
- [ ] Click "Create Web Service"
- [ ] Wait for deployment to complete (2-3 min)
- [ ] **Copy Render URL:** `https://________________________.onrender.com`

---

## Part 2: Deploy Client to Vercel

- [ ] Go to vercel.com
- [ ] Click "Add New..." → "Project"
- [ ] Import your GitHub repository
- [ ] **Settings:**
  - [ ] Framework: Vite
  - [ ] Root Directory: `client`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`
- [ ] **Environment Variables:**
  - [ ] Key: `VITE_SOCKET_URL`
  - [ ] Value: `https://________________________.onrender.com` (from Part 1)
- [ ] Click "Deploy"
- [ ] Wait for deployment (1-2 min)
- [ ] **Copy Vercel URL:** `https://________________________.vercel.app`

---

## Part 3: Connect Client & Server

- [ ] Open `server/index.js` in your editor
- [ ] Find the `allowedOrigins` array (around line 12-20)
- [ ] Add your Vercel URL:
  ```javascript
  'https://________________________.vercel.app',
  ```
- [ ] Save the file
- [ ] Commit changes:
  ```bash
  git add server/index.js
  git commit -m "Add production CORS origin"
  git push
  ```
- [ ] Wait for Render to auto-deploy (check Render dashboard)

---

## Part 4: Test Deployment

- [ ] Go to your Vercel URL
- [ ] Open browser console (F12)
- [ ] Look for "Connected to server" message
- [ ] Click "Presenter" - should load presenter view
- [ ] Start a round - timer should work
- [ ] Open new window/tab
- [ ] Click "Team" - join with a test name
- [ ] Submit an answer
- [ ] Reveal answer as presenter
- [ ] Check team sees results

---

## Your URLs (Fill In)

**Game URL (share with users):**
```
https://________________________________.vercel.app
```

**Server URL (for reference):**
```
https://________________________________.onrender.com
```

**Presenter URL (share with presenter):**
```
https://________________________________.vercel.app/presenter
```

---

## Troubleshooting

### ❌ "Unable to connect to server"
- [ ] Check Render server is running (check logs)
- [ ] Verify `VITE_SOCKET_URL` in Vercel is correct
- [ ] Verify Vercel URL is in `server/index.js` allowedOrigins
- [ ] Try redeploying Vercel

### ❌ CORS errors
- [ ] Verify you added Vercel URL to `allowedOrigins`
- [ ] Verify you pushed changes to GitHub
- [ ] Verify Render redeployed

### ❌ First connection slow
- [ ] Normal! Render free tier sleeps after 15 min
- [ ] Server wakes up in ~30 seconds
- [ ] Use UptimeRobot to keep it awake (optional)

---

## ✅ Deployment Complete!

Congratulations! Your game is live at:
```
https://________________________________.vercel.app
```

**Next Steps:**
- [ ] Share URL with your team
- [ ] Test with multiple teams
- [ ] (Optional) Add custom domain
- [ ] (Optional) Set up UptimeRobot monitoring

---

**Need help?** See [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md) for detailed instructions.

**Date Deployed:** __________________
