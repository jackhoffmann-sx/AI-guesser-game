# AI Detective: Spot the Hallucination

Interactive multiplayer game for AI critical thinking training at Wick Marketing.

## Overview

AI Detective is a real-time, web-based game where teams compete to identify AI hallucinations, spot red flags, write better prompts, and make smart AI tool choices. Perfect for training sessions on AI literacy and critical thinking.

**Game Features:**
- 5 rounds with different challenge types
- Real-time multiplayer with live scoring
- Presenter view for projector display
- Team view for answer submission
- Speed bonuses for quick correct answers
- Professional, clean UI with Tailwind CSS

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js + Express + Socket.io
- **Real-time Communication:** Socket.io for live game sync
- **Routing:** React Router

## Project Structure

```
AI guesser game/
├── server/                 # Backend server
│   ├── index.js           # Express + Socket.io server
│   └── package.json
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── shared/    # Timer, Scoreboard
│   │   │   ├── presenter/ # Presenter view components
│   │   │   ├── team/      # Team view components
│   │   │   └── Home.jsx   # Landing page
│   │   ├── data/
│   │   │   └── gameData.js # All 5 rounds of game content
│   │   ├── services/
│   │   │   └── socket.js   # Socket.io client wrapper
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── Game_Design_AI_Detective.md  # Full game design document
├── progress.md                   # Implementation progress tracker
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Install Server Dependencies

```bash
cd server
npm install
```

### Step 2: Install Client Dependencies

```bash
cd ../client
npm install
```

## Running the Application

You need to run both the server and client in separate terminals.

### Terminal 1: Start the Server

```bash
cd server
npm start
```

The server will start on `http://localhost:3001`

### Terminal 2: Start the Client

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

## How to Play

### Setup (Before the Game)

1. **Open Presenter View:**
   - Navigate to `http://localhost:5173`
   - Click "Presenter" button
   - Display this view on projector/main screen

2. **Teams Join:**
   - Each team opens `http://localhost:5173` on their laptop
   - Click "Team" button
   - Enter team name and join

### During the Game

**Presenter Controls:**
- Select a round from the control panel
- Click "Start Round" to begin the timer
- Teams see the question and submit answers
- Click "Reveal Answer" to show correct answer and scores
- Click "Next Scenario" to continue or "Complete Round" to finish

**Team View:**
- Read the scenario/question
- Select answer(s) before time expires
- Submit answer
- See results when presenter reveals answer
- Track your score on the leaderboard

### Game Rounds

1. **Round 1: Hallucination Detection** - Identify if AI responses are accurate, hallucinated, or partially true
2. **Round 2: Red Flag Identification** - Select all red flags in AI outputs
3. **Round 3: Better Prompt Challenge** - Choose the best improved prompt version
4. **Round 4: Tool Selection** - Pick the right AI tool for the job
5. **Round 5: Real-World Scenario** - Multi-question scenario about creating blog content

### Scoring

- **Correct Answer:** +10 points
- **Speed Bonus:** +5 points (if answered within 30 seconds)
- **Wrong Answer:** -5 points
- Team with highest score wins!

## Configuration

### Port Configuration

If you need to change ports:

**Server Port** (default: 3001):
- Edit `server/index.js`, line: `const PORT = process.env.PORT || 3001;`

**Client Socket URL** (default: http://localhost:3001):
- Edit `client/src/services/socket.js`, line: `const SOCKET_URL = 'http://localhost:3001';`

### Round Duration

To change round duration (default: 90 seconds):
- Edit `client/src/data/gameData.js`
- Modify the `duration` property for each round

## Customization

### Adding New Scenarios

Edit `client/src/data/gameData.js` to add or modify scenarios:

```javascript
{
  id: "r1s5",
  prompt: "Your prompt here",
  aiResponse: "AI's response here",
  question: "Your question here",
  options: [
    { id: "A", label: "Option A" },
    { id: "B", label: "Option B" }
  ],
  correctAnswer: "B",
  explanation: "Explanation here",
  points: 10
}
```

### Styling

The app uses Tailwind CSS. Customize colors in:
- `client/tailwind.config.js` - Add/modify theme colors
- Component files - Adjust Tailwind classes

## Troubleshooting

### Teams Can't Connect
- Ensure server is running on port 3001
- Check that Socket URL in `client/src/services/socket.js` matches server URL
- Verify no firewall blocking connections

### Timer Not Syncing
- Ensure only one server instance is running
- Refresh all client windows
- Check browser console for Socket.io connection errors

### Scores Not Calculating
- Check browser console for errors
- Verify game data structure in `gameData.js`
- Ensure correct answer format matches question type

## Deployment

📦 **Deployment Guides:**
- **[VERCEL_ONLY_DEPLOY.md](./VERCEL_ONLY_DEPLOY.md)** - Deploy everything for FREE (Vercel + Render)
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - Quick deployment checklist
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide

### Recommended: Free Deployment (Vercel + Render)

**Client:** Vercel (Free)
**Server:** Render Free Tier (Free)
**Total Cost:** $0/month

See [VERCEL_ONLY_DEPLOY.md](./VERCEL_ONLY_DEPLOY.md) for full instructions.

Quick overview:

### Option 1: Deploy to Vercel (Client) + Railway (Server)

**Client (Vercel):**
```bash
cd client
npm run build
# Deploy dist folder to Vercel
```

**Server (Railway/Heroku):**
```bash
cd server
# Deploy to Railway or Heroku
# Update client Socket URL to production server URL
```

### Option 2: Single Server Deployment

Modify server to serve built React app:
```javascript
// In server/index.js
app.use(express.static(path.join(__dirname, '../client/dist')));
```

## Development

### Adding New Round Types

1. Add round data to `gameData.js`
2. Update `ScenarioDisplay.jsx` to render new type
3. Update `TeamAnswer.jsx` to handle new answer format
4. Update server scoring logic if needed

### Debugging

Enable verbose logging:
- Server: Add `console.log` statements in `server/index.js`
- Client: Check browser console for Socket.io events

## Credits

Built for Wick Marketing AI Training Program

## License

Proprietary - For internal use only
