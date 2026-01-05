# Complete Guide: Deploy to Vercel + Render (100% Free)

This guide walks you through deploying the AI Detective game completely free using Vercel (client) and Render (server).

**Total Time:** 15-20 minutes
**Cost:** $0/month forever
**Difficulty:** Easy

---

## Prerequisites

Before starting, make sure you have:

- [ ] A GitHub account
- [ ] Your code pushed to a GitHub repository
- [ ] A Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] A Render account (sign up at [render.com](https://render.com))

---

## Part 1: Deploy Server to Render (10 minutes)

### Step 1: Sign Up for Render

1. Go to [render.com](https://render.com)
2. Click **"Get Started"** or **"Sign Up"**
3. Choose **"Sign in with GitHub"**
4. Authorize Render to access your repositories

### Step 2: Create a New Web Service

1. Click the **"New +"** button in the top right
2. Select **"Web Service"**

![New Web Service](https://docs.render.com/images/create-web-service.png)

### Step 3: Connect Your Repository

1. Find your repository in the list (e.g., "AI guesser game")
2. Click **"Connect"**

If you don't see your repo:
- Click "Configure account" to grant Render access
- Select which repositories Render can access

### Step 4: Configure Your Web Service

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `ai-detective-server` (or any name you prefer) |
| **Region** | Choose closest to your users (e.g., Oregon for US West) |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | `server` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |

### Step 5: Select Free Plan

1. Scroll down to **"Instance Type"**
2. Select **"Free"** plan
3. You'll see: "Free instances spin down after 15 minutes of inactivity"

**This is fine!** The server wakes up in ~30 seconds when needed.

### Step 6: Add Environment Variables (Optional)

Click **"Advanced"** → **"Add Environment Variable"**

Add the following (optional for now, we'll update later):

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `CLIENT_URL` | (leave empty for now, add after deploying to Vercel) |

### Step 7: Create Web Service

1. Click **"Create Web Service"** at the bottom
2. Wait for deployment (2-3 minutes)
3. Watch the logs - you should see: "Server running on port 10000"

### Step 8: Get Your Render URL

Once deployed:

1. Look at the top of the page
2. You'll see your URL: `https://ai-detective-server.onrender.com`
3. **Copy this URL** - you'll need it for Vercel

![Render URL location](https://docs.render.com/images/service-url.png)

✅ **Server is now live!**

---

## Part 2: Deploy Client to Vercel (5 minutes)

### Step 1: Sign Up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repositories

### Step 2: Create New Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository in the list
3. Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect most settings. Verify these:

| Field | Value |
|-------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` (click "Edit" next to root directory) |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

### Step 4: Add Environment Variable

**This is the most important step!**

1. Click **"Environment Variables"** section
2. Add the following variable:

| Key | Value | Environment |
|-----|-------|-------------|
| `VITE_SOCKET_URL` | `https://ai-detective-server.onrender.com` | Production |

**Replace** `ai-detective-server.onrender.com` with your actual Render URL from Part 1, Step 8.

⚠️ **Important:**
- Use `https://` (not `http://`)
- Don't include trailing slash
- Make sure this exactly matches your Render URL

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build and deployment (1-2 minutes)
3. Watch the build logs

Once deployed, you'll see: **"Congratulations! Your project has been deployed."**

### Step 6: Get Your Vercel URL

1. Click **"Visit"** or look for your URL
2. It will be something like: `https://ai-detective-game.vercel.app`
3. **Copy this URL** - you'll need it for the next step

✅ **Client is now live!**

---

## Part 3: Connect Client and Server (5 minutes)

Now we need to tell the server to accept connections from your Vercel client.

### Step 1: Update Server CORS Settings

1. **Open your code editor**
2. **Edit** `server/index.js`
3. **Find the `allowedOrigins` array** (around line 12-20)
4. **Add your Vercel URL:**

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'https://ai-detective-game.vercel.app',  // ← Add your Vercel URL here
];
```

Replace `ai-detective-game.vercel.app` with your actual Vercel URL.

### Step 2: Commit and Push Changes

```bash
git add server/index.js
git commit -m "Add production CORS origin"
git push
```

### Step 3: Wait for Auto-Deploy

Render automatically detects the GitHub push and redeploys:

1. Go to your Render dashboard
2. Click on your `ai-detective-server` service
3. Watch the "Events" tab - you'll see a new deploy start
4. Wait for it to complete (1-2 minutes)

✅ **Server updated with CORS!**

### Step 4: (Optional) Update Render Environment Variable

Go back to Render:

1. Click your `ai-detective-server` service
2. Click **"Environment"** in the left sidebar
3. Add or update:

| Key | Value |
|-----|-------|
| `CLIENT_URL` | `https://ai-detective-game.vercel.app` |

4. Click **"Save Changes"**

This will trigger another deploy.

---

## Part 4: Test Your Deployment (5 minutes)

### Step 1: Open Your Game

1. Go to your Vercel URL: `https://ai-detective-game.vercel.app`
2. You should see the home page with "Presenter" and "Team" buttons

### Step 2: Check Connection

1. **Open Browser Console** (Press F12)
2. Look for: `"Connected to server"` message
3. If you see this, ✅ everything is working!

If you see connection errors, see Troubleshooting below.

### Step 3: Test Presenter View

1. Click **"Presenter"** button
2. You should see the presenter control panel
3. Try selecting "Round 1: Hallucination Detection"
4. Click **"Start Round"**
5. Timer should start counting down

### Step 4: Test Team View

1. **Open a new browser window** (or incognito/private mode)
2. Go to your Vercel URL again
3. Click **"Team"** button
4. Enter a team name (e.g., "Test Team")
5. Click **"Join Game"**
6. You should see "Waiting for round to start..."

### Step 5: Test Full Game Flow

**In Presenter window:**
1. Start Round 1
2. Wait for timer to start

**In Team window:**
1. You should see the question
2. Select an answer
3. Click **"Submit Answer"**

**Back to Presenter:**
1. Click **"Stop Timer & Lock Answers"**
2. Click **"🎯 Reveal Answer"**
3. You should see the correct answer and team scores

**Check Team window:**
1. You should see if you got it right/wrong
2. You should see your selected answer
3. You should see your score

✅ **If all this works, you're done!**

---

## Troubleshooting

### Issue: "Unable to connect to server" error

**Symptoms:**
- Browser console shows connection errors
- Can't join as a team
- Timer doesn't start

**Solutions:**

1. **Check Render server is running:**
   - Go to Render dashboard
   - Click your service
   - Look at "Logs" tab
   - Should see: "Server running on port 10000"

2. **Check environment variable:**
   - Go to Vercel project settings
   - Click "Environment Variables"
   - Verify `VITE_SOCKET_URL` is correct
   - Make sure it's `https://` (not `http://`)

3. **Check CORS settings:**
   - Verify you added Vercel URL to `server/index.js`
   - Verify you committed and pushed the change
   - Verify Render redeployed after the push

4. **Redeploy Vercel:**
   - Go to Vercel dashboard
   - Click "Deployments" tab
   - Click "..." → "Redeploy"

### Issue: Server is sleeping (cold start)

**Symptoms:**
- First connection takes 30+ seconds
- Works fine after initial connection

**This is normal on Render free tier!**

**Solutions:**

1. **Wait 30 seconds** - it will wake up
2. **Use UptimeRobot** to keep it awake:
   - Sign up at [uptimerobot.com](https://uptimerobot.com)
   - Add your Render URL as a monitor
   - Set interval to 5 minutes
   - Server will stay awake

3. **Upgrade to paid plan** ($7/month) for always-on

### Issue: CORS errors in console

**Symptoms:**
- Console shows: "Access-Control-Allow-Origin" error
- Can't connect to server

**Solution:**

1. Verify you added Vercel URL to `allowedOrigins` in `server/index.js`
2. Make sure there's no typo in the URL
3. Make sure you pushed the changes to GitHub
4. Make sure Render redeployed after the push

### Issue: Build fails on Vercel

**Symptoms:**
- Deployment fails
- Build logs show errors

**Solution:**

1. Check Root Directory is set to `client`
2. Check Build Command is `npm run build`
3. Check Output Directory is `dist`
4. Review build logs for specific errors
5. Make sure all dependencies are in `package.json`

### Issue: Build fails on Render

**Symptoms:**
- Deployment fails
- Logs show npm errors

**Solution:**

1. Check Root Directory is set to `server`
2. Check Start Command is `npm start`
3. Review logs for specific errors
4. Make sure `package.json` has `"start": "node index.js"`

---

## Next Steps

### Optional: Add Custom Domain

#### On Vercel:
1. Go to your project settings
2. Click "Domains"
3. Enter your domain (e.g., `game.yourcompany.com`)
4. Follow DNS instructions
5. Update CORS in `server/index.js` to include custom domain

#### On Render:
1. Click your service
2. Go to "Settings"
3. Scroll to "Custom Domain"
4. Add your domain
5. Follow DNS instructions

### Optional: Add Analytics

1. Go to Vercel project settings
2. Click "Analytics"
3. Enable Vercel Analytics (free)
4. See visitor stats and performance

### Optional: Monitor Server

1. Sign up for [UptimeRobot](https://uptimerobot.com) (free)
2. Add your Render URL as a monitor
3. Get alerts if server goes down
4. Keeps server awake (pings every 5 minutes)

---

## Deployment Checklist

Before sharing with teams, verify:

- [ ] Client loads at Vercel URL
- [ ] Browser console shows "Connected to server"
- [ ] Can join as a team
- [ ] Can start a round as presenter
- [ ] Timer counts down
- [ ] Can submit answers as team
- [ ] Can reveal answers as presenter
- [ ] Team sees their results
- [ ] Scores update correctly
- [ ] Can start multiple rounds
- [ ] Multiple teams can join simultaneously

---

## Your Live URLs

Fill these in after deployment:

**Client (Share this with users):**
```
https://_____________________________.vercel.app
```

**Server (Don't share, for reference only):**
```
https://_____________________________.onrender.com
```

**Presenter URL (Share with presenter):**
```
https://_____________________________.vercel.app/presenter
```

---

## Updating Your App

### Update Client:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel auto-deploys
4. Refresh browser to see changes

### Update Server:
1. Make changes locally
2. Commit and push to GitHub
3. Render auto-deploys
4. Check Render dashboard for deployment status

### Update Environment Variables:

**Vercel:**
1. Project Settings → Environment Variables
2. Edit or add variables
3. Redeploy from Deployments tab

**Render:**
1. Service → Environment
2. Edit or add variables
3. Saves and redeploys automatically

---

## Support Resources

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Socket.io Docs:** https://socket.io/docs/v4/
- **This Project's README:** [README.md](./README.md)

---

## Cost Summary

| Service | Plan | Cost | What You Get |
|---------|------|------|--------------|
| **Vercel** | Hobby | **$0** | Unlimited deployments, 100GB bandwidth/month |
| **Render** | Free | **$0** | 750 hours/month, sleeps after 15 min inactivity |
| **Total** | | **$0/month** | Perfect for training sessions! |

---

## FAQs

**Q: Why does the first connection take 30 seconds?**
A: Render free tier spins down after 15 minutes of inactivity. It takes ~30 seconds to wake up. Use UptimeRobot to keep it awake if needed.

**Q: Can I use this for 20+ teams?**
A: Yes! Render free tier can handle multiple teams. If you experience issues, consider upgrading to Render's paid plan ($7/month) or using Railway ($5/month).

**Q: Do I need a credit card?**
A: No! Both Vercel and Render offer free tiers with no credit card required.

**Q: How long does deployment take?**
A: First time: 15-20 minutes. Updates: automatic in 1-2 minutes.

**Q: Can I keep everything on Vercel only?**
A: Not easily. Socket.io needs persistent connections that Vercel serverless doesn't support well. Vercel + Render is the best free solution.

**Q: What if I want to upgrade later?**
A: Easy! Render has paid plans starting at $7/month, or you can switch the server to Railway ($5/month). No code changes needed.

---

## Congratulations! 🎉

Your AI Detective game is now live and free forever!

Share your Vercel URL with your team and start playing!

**Need help?** Check the [Troubleshooting](#troubleshooting) section or open an issue on GitHub.

---

**Last Updated:** 2026-01-05
