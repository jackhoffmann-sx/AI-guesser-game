# Deploy Everything to Vercel (Monorepo Approach)

This guide shows how to deploy both client and server to Vercel using a monorepo structure.

## ⚠️ Important Limitations

**Socket.io on Vercel has limitations:**
- Vercel serverless functions timeout after 10 seconds (Hobby) or 60 seconds (Pro)
- WebSocket connections may be unstable
- Better for short sessions or small groups (1-3 teams)

**For production with many teams, use Railway/Render for the server instead.**

But if you want everything on Vercel, here's how:

---

## Option 1: Vercel Monorepo (Everything on Vercel)

### Step 1: Restructure for Vercel

1. **Create API folder** in the client:

```bash
cd client
mkdir -p api
```

2. **Move server code to Vercel function:**

Create `client/api/socket.js`:

```javascript
// This won't work well - see Option 2 below
```

**This approach has major limitations.** Vercel serverless functions don't support Socket.io well.

---

## Option 2: Use Vercel + Free Backend Service

### Recommended Free Backend Options:

#### **A. Render (Free Tier) - Easiest**
- ✅ Free tier available
- ✅ WebSocket support
- ✅ Auto-deploys from GitHub
- ⚠️ Spins down after 15 min of inactivity

**Steps:**
1. Deploy client to Vercel (as normal)
2. Deploy server to Render free tier:
   - Go to [render.com](https://render.com)
   - New Web Service
   - Connect GitHub
   - Root Directory: `server`
   - Start Command: `npm start`
   - Free tier

#### **B. Fly.io (Free Tier)**
- ✅ Always on (free tier: 3 small VMs)
- ✅ WebSocket support
- ✅ Easy deployment

**Steps:**
1. Install Fly CLI:
```bash
npm install -g flyctl
```

2. Login to Fly:
```bash
fly auth login
```

3. Create `server/fly.toml`:
```toml
app = "ai-detective-server"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "8080"

[[services]]
  http_checks = []
  internal_port = 8080
  processes = ["app"]
  protocol = "tcp"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "1s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"
```

4. Deploy:
```bash
cd server
fly launch
fly deploy
```

#### **C. Glitch (Free, Always On)**
- ✅ Free and simple
- ✅ WebSocket support
- ⚠️ Limited resources

**Steps:**
1. Go to [glitch.com](https://glitch.com)
2. New Project → Import from GitHub
3. Connect your repo
4. Set start command to `npm start`

---

## Option 3: Full Vercel with Alternative Architecture

If you MUST have everything on Vercel, you need to replace Socket.io with polling:

### Modified Architecture:
- Use Vercel KV (Redis) for state management
- Use HTTP polling instead of WebSockets
- Use Vercel serverless functions

This requires significant code changes. Here's what needs to change:

### Step 1: Install Vercel KV

```bash
cd client
npm install @vercel/kv
```

### Step 2: Create API Routes

**File: `client/api/game-state.js`**
```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    const gameState = await kv.get('gameState') || {
      currentRound: 0,
      teams: [],
      isActive: false
    };
    return res.json(gameState);
  }

  if (method === 'POST') {
    const updates = req.body;
    await kv.set('gameState', updates);
    return res.json({ success: true });
  }
}
```

**This is a MAJOR rewrite** and loses real-time features.

---

## Recommendation: Hybrid Approach (Best)

**Client on Vercel (Free) + Server on Render Free Tier**

### Why This Works Best:

1. **Vercel for Client:**
   - ✅ Perfect for React apps
   - ✅ Fast global CDN
   - ✅ Free forever
   - ✅ Automatic HTTPS

2. **Render for Server:**
   - ✅ Free tier available
   - ✅ WebSocket support built-in
   - ✅ No code changes needed
   - ✅ Auto-deploy from GitHub
   - ⚠️ Spins down after 15 min (wakes up in ~30 seconds)

### Quick Deploy:

**1. Deploy to Vercel (Client):**
```bash
cd client
vercel --prod
```

**2. Deploy to Render (Server):**
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Settings:
   - Name: `ai-detective-server`
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**
4. Click Create

**3. Connect them:**
- Add Render URL to Vercel environment variable
- Add Vercel URL to Render environment variable

**Done!** Both are free, both auto-deploy from GitHub.

---

## Cost Comparison

| Solution | Client | Server | Monthly Cost | Real-time | Code Changes |
|----------|--------|--------|--------------|-----------|--------------|
| **Vercel + Render Free** | ✅ Vercel | ✅ Render | **$0** | ✅ Yes | None |
| **Vercel + Railway** | ✅ Vercel | Railway | **$5** | ✅ Yes | None |
| **Vercel Only** | ✅ Vercel | Vercel | **$0** | ❌ No | Major rewrite |
| **Vercel + Fly.io** | ✅ Vercel | Fly.io | **$0** | ✅ Yes | None |

---

## My Recommendation

**Use Vercel (client) + Render Free (server)**

Pros:
- ✅ Completely free
- ✅ No code changes
- ✅ Real-time works perfectly
- ✅ Both auto-deploy from GitHub
- ✅ Easy to set up (10 minutes)

Cons:
- ⚠️ Server sleeps after 15 min (wakes in ~30 sec)
- ⚠️ Need to manage 2 platforms

For a training game that runs for 10-15 minutes at a time, Render free tier is perfect.

---

## Quick Setup: Vercel + Render Free

### 1. Deploy Client to Vercel:
```bash
cd client
vercel --prod
# Copy the Vercel URL
```

### 2. Deploy Server to Render:
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New Web Service"
4. Connect your repository
5. Configure:
   - **Name:** ai-detective-server
   - **Root Directory:** server
   - **Environment:** Node
   - **Build Command:** npm install
   - **Start Command:** npm start
   - **Plan:** Free
6. Click "Create Web Service"
7. Copy the Render URL (e.g., https://ai-detective-server.onrender.com)

### 3. Connect Them:

**Add to Vercel:**
- Go to your Vercel project
- Settings → Environment Variables
- Add: `VITE_SOCKET_URL` = `https://ai-detective-server.onrender.com`
- Redeploy

**Add to server/index.js:**
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://your-app.vercel.app', // Your Vercel URL
];
```
- Commit and push (Render auto-deploys)

### 4. Done!

Your app is now live at:
- **Client:** https://your-app.vercel.app
- **Server:** https://ai-detective-server.onrender.com

**Total cost: $0/month** ✅

---

## Keeping Render Server Awake

Since Render free tier sleeps after 15 min:

**Option 1: Accept the 30-second wake-up time**
- Fine for occasional use
- First visitor wakes it up

**Option 2: Use a ping service (free)**
- [UptimeRobot](https://uptimerobot.com) - Free
- Pings your server every 5 minutes
- Keeps it awake

**Option 3: Upgrade to Railway ($5/month)**
- Always on
- More reliable
- Better for frequent use

---

## Conclusion

**You CAN do everything on Vercel**, but it requires a major rewrite to replace Socket.io.

**Recommended:** Use **Vercel (client) + Render Free (server)** for:
- ✅ $0/month cost
- ✅ No code changes
- ✅ 10-minute setup
- ✅ Real-time works perfectly

Let me know which option you'd like to pursue!
