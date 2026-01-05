# 🎮 AI Detective Game - Start Here

Welcome! This guide helps you choose the right deployment method for your needs.

---

## 🏃 Quick Start (Local Development)

**Want to test locally first?**

1. **Start the server:**
   ```bash
   cd server
   npm install
   npm start
   ```

2. **Start the client (new terminal):**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Open the game:**
   - Go to http://localhost:5176 (or whatever port Vite shows)
   - Click "Presenter" or "Team"

**Full local instructions:** See [README.md](./README.md)

---

## 🚀 Deploy to Production

### Which Deployment Guide Should I Use?

Choose based on your needs:

#### ⭐ **Want FREE hosting? (Recommended)**
→ Use **[VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)**
- 📘 Complete step-by-step guide (15 minutes)
- 💰 $0/month forever
- ✅ Vercel (client) + Render (server)
- ✅ No code changes needed
- ✅ Auto-deploys from GitHub

#### 📋 **Want a quick checklist?**
→ Use **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)**
- ✅ Printable checklist
- ✅ Check off steps as you go
- ✅ Fill-in-the-blanks for URLs

#### 🔖 **Want a bookmark/reference?**
→ Use **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)**
- ✅ One-page quick reference
- ✅ Common commands
- ✅ Quick troubleshooting

#### 💵 **Don't mind paying $5/month?**
→ Use **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)**
- ✅ Vercel + Railway
- ✅ Always-on server (no sleep)
- ✅ More reliable for frequent use

#### 📚 **Want ALL the options?**
→ Use **[DEPLOYMENT.md](./DEPLOYMENT.md)**
- ✅ Complete deployment guide
- ✅ Multiple hosting options
- ✅ Custom domain setup
- ✅ Advanced configurations

#### 🤔 **Want to compare free options?**
→ Use **[VERCEL_ONLY_DEPLOY.md](./VERCEL_ONLY_DEPLOY.md)**
- ✅ Comparison of all free options
- ✅ Pros/cons of each
- ✅ Technical details

---

## 📊 Deployment Options Comparison

| Option | Cost | Setup Time | Reliability | Best For |
|--------|------|------------|-------------|----------|
| **Vercel + Render Free** ⭐ | $0 | 15 min | Good | Training sessions, demos |
| **Vercel + Railway** | $5/mo | 15 min | Excellent | Frequent use, production |
| **Vercel + Fly.io** | $0 | 20 min | Good | Tech-savvy users |
| **Render Only** | $0 | 15 min | Good | Simple deployment |

---

## 🎯 Recommended Path

**For most users, we recommend:**

1. **Start Local** (5 minutes)
   - Follow [README.md](./README.md)
   - Test the game on your computer
   - Make sure everything works

2. **Deploy for Free** (15 minutes)
   - Follow **[VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)**
   - Get your game live at $0/month
   - Share with your team

3. **Upgrade If Needed** (optional)
   - If you need always-on server
   - Switch to Railway ($5/month)
   - No code changes required

---

## 📱 What You'll Get

After deployment, you'll have:

- ✅ **Live game URL** to share with players
- ✅ **Presenter URL** for game control
- ✅ **Auto-deploys** when you push to GitHub
- ✅ **Free hosting** (Vercel + Render free tiers)

Example URLs:
```
Game: https://ai-detective.vercel.app
Presenter: https://ai-detective.vercel.app/presenter
```

---

## 🆘 Need Help?

### Common Questions

**Q: Is deployment difficult?**
A: No! Follow [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md) - takes 15 minutes, no technical experience needed.

**Q: Do I need a credit card?**
A: No! Both Vercel and Render offer free tiers without requiring a credit card.

**Q: Can I use a custom domain?**
A: Yes! See [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md) section "Add Custom Domain"

**Q: Why does the first connection take 30 seconds?**
A: Render free tier sleeps after 15 min of inactivity. Use UptimeRobot (free) to keep it awake.

**Q: Can I deploy everything to just Vercel?**
A: Not easily. Socket.io needs persistent connections. Vercel + Render is the best free option.

**Q: What if something breaks?**
A: Check the Troubleshooting section in [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)

---

## 📚 All Available Guides

| Guide | Purpose | Time | Difficulty |
|-------|---------|------|------------|
| [VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md) | **Complete deployment** ⭐ | 15 min | Easy |
| [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | Printable checklist | - | Easy |
| [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) | Quick commands | - | Easy |
| [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | Vercel + Railway | 15 min | Easy |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | All options detailed | 30 min | Medium |
| [VERCEL_ONLY_DEPLOY.md](./VERCEL_ONLY_DEPLOY.md) | Compare free options | - | Medium |
| [README.md](./README.md) | Local development | 5 min | Easy |

---

## 🎬 Ready to Deploy?

**Most Popular Choice:**

→ Open **[VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)** and follow the steps!

Takes 15 minutes, costs $0/month, and gets your game live! 🚀

---

## ✅ Quick Start Checklist

Before deploying:

- [ ] Code works locally (tested via README.md)
- [ ] Code pushed to GitHub
- [ ] GitHub account ready
- [ ] Render account created
- [ ] Vercel account created
- [ ] 15-20 minutes available
- [ ] Coffee ready ☕

Then: Open **[VERCEL_RENDER_GUIDE.md](./VERCEL_RENDER_GUIDE.md)** and go!

---

**Questions?** See the guide's troubleshooting section or check [README.md](./README.md)

**Last Updated:** 2026-01-05
