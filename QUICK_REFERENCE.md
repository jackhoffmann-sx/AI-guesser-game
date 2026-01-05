# Quick Reference Card

Keep this handy for quick deployments and updates!

---

## 🚀 Deploy in 3 Steps

### 1. Deploy Server (Render)
```
render.com → New Web Service
Root: server | Build: npm install | Start: npm start
Plan: Free → Deploy
📋 Copy Render URL
```

### 2. Deploy Client (Vercel)
```
vercel.com → New Project
Root: client | Framework: Vite
Env: VITE_SOCKET_URL = [Render URL]
Deploy
📋 Copy Vercel URL
```

### 3. Update CORS
```
Edit: server/index.js
Add: [Vercel URL] to allowedOrigins
git push → Render auto-deploys
```

---

## 🔗 Important URLs

**Full Guide:** [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)

**Deployment Checklist:** [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

## 📝 Environment Variables

### Vercel
```
VITE_SOCKET_URL=https://your-server.onrender.com
```

### Render (optional)
```
CLIENT_URL=https://your-app.vercel.app
NODE_ENV=production
```

---

## 🔧 Update App

### Client Updates
```bash
# Make changes
git add .
git commit -m "Update client"
git push
# Vercel auto-deploys
```

### Server Updates
```bash
# Make changes
git add .
git commit -m "Update server"
git push
# Render auto-deploys
```

---

## ⚡ Quick Fixes

### Can't connect to server
1. Check Render logs (server running?)
2. Check VITE_SOCKET_URL in Vercel
3. Check CORS in server/index.js
4. Redeploy Vercel

### CORS errors
1. Add Vercel URL to allowedOrigins
2. git push (Render redeploys)

### First load slow
- Normal! Render free tier wakes in ~30s
- Use uptimerobot.com to keep awake

---

## 📱 Share URLs

**Players:**
```
https://your-app.vercel.app
```

**Presenter:**
```
https://your-app.vercel.app/presenter
```

---

## 💰 Cost: $0/month

Vercel Free + Render Free = Completely Free! ✅

---

## 🆘 Need Help?

See [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md) for detailed troubleshooting
