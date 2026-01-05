# Quick Deploy Checklist

Follow these steps to deploy the AI Detective game to production.

## Prerequisites

- [ ] GitHub account
- [ ] Railway account ([railway.app](https://railway.app))
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] Code committed to GitHub repository

---

## Step 1: Deploy Server (5 minutes)

### Railway Deployment

1. **Go to [railway.app](https://railway.app)**

2. **Click "New Project"**

3. **Select "Deploy from GitHub repo"**

4. **Choose your repository**

5. **Configure:**
   - Root Directory: `server`
   - Start Command: (leave default, uses `npm start`)

6. **Click "Deploy"**

7. **Wait for deployment** (1-2 minutes)

8. **Copy your Railway URL** (e.g., `https://ai-detective-server.railway.app`)
   - Find it in Settings → Domains

✅ Server is live!

---

## Step 2: Configure Client (2 minutes)

1. **Create `client/.env.production` file:**

```bash
VITE_SOCKET_URL=https://your-railway-url.railway.app
```

Replace with your actual Railway URL from Step 1.

2. **Commit and push to GitHub:**

```bash
git add client/.env.production
git commit -m "Add production environment config"
git push
```

---

## Step 3: Deploy Client (5 minutes)

### Vercel Deployment

1. **Go to [vercel.com](https://vercel.com)**

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: **client**
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variable:**
   - Key: `VITE_SOCKET_URL`
   - Value: `https://your-railway-url.railway.app`

6. **Click "Deploy"**

7. **Wait for deployment** (1-2 minutes)

8. **Copy your Vercel URL** (e.g., `https://ai-detective.vercel.app`)

✅ Client is live!

---

## Step 4: Update Server CORS (3 minutes)

1. **Edit `server/index.js`** (around line 18):

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'https://ai-detective.vercel.app',  // Add your Vercel URL
];
```

2. **Commit and push:**

```bash
git add server/index.js
git commit -m "Add production CORS origin"
git push
```

3. **Railway will auto-deploy** (watch the deployment logs)

✅ CORS configured!

---

## Step 5: Test Your Deployment (5 minutes)

1. **Open your Vercel URL** in a browser

2. **Open Browser Console** (F12)
   - Should see: "Connected to server"

3. **Test Presenter View:**
   - Click "Presenter" button
   - Select a round
   - Click "Start Round"

4. **Test Team View:**
   - Open a new browser window (or incognito)
   - Go to your Vercel URL
   - Click "Team"
   - Enter a team name
   - Join the game

5. **Test Full Flow:**
   - Submit an answer as a team
   - Click "Stop Timer & Lock Answers" as presenter
   - Click "Reveal Answer" as presenter
   - Verify team sees their result

✅ Game is working!

---

## Troubleshooting

### Issue: "Unable to connect to server"

**Fix:**
1. Check Railway server is running (check logs)
2. Verify `VITE_SOCKET_URL` in Vercel environment variables
3. Verify CORS in `server/index.js` includes Vercel URL

### Issue: CORS error in console

**Fix:**
1. Make sure you added your Vercel URL to `allowedOrigins` in `server/index.js`
2. Make sure you committed and pushed the change
3. Wait for Railway to redeploy

### Issue: Build fails on Vercel

**Fix:**
1. Check "Build Command" is `npm run build`
2. Check "Root Directory" is `client`
3. Review build logs for errors

---

## All Done! 🎉

Your game is now live at:
- **Game URL:** https://your-app.vercel.app
- **Server URL:** https://your-server.railway.app

Share the Vercel URL with your team!

---

## Optional: Custom Domain

### Add to Vercel:
1. Go to project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Add to Railway:
1. Go to service Settings
2. Add custom domain
3. Update DNS records

**Remember:** Update CORS in `server/index.js` to include custom domain!

---

## Monthly Costs

- **Vercel:** Free (hobby plan)
- **Railway:** $5/month (after 500 free hours)

**Total:** ~$5/month

---

## Need Help?

See full deployment guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
