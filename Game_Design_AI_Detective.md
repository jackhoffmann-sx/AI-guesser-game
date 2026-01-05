# AI CRITICAL THINKING GAME
## Interactive Group Activity for Wick Marketing Training

═══════════════════════════════════════════════════════════════

## GAME OVERVIEW

**Name:** "AI Detective: Spot the Hallucination"

**Duration:** 10 minutes total
- 7 minutes gameplay
- 3 minutes debrief/scoring reveal

**Group Size:** 3 people per team (adjust based on attendance)

**Objective:** Teams compete to identify bad AI outputs, spot red flags, and write better prompts. Highest score wins.

═══════════════════════════════════════════════════════════════

## GAME MECHANICS

**Format:** Web-based game (React) that displays on projector
- Teams use ONE shared laptop per group
- Presenter controls the game flow from main screen
- 5 rounds, each ~90 seconds
- Points awarded for speed + accuracy

**Scoring:**
- Correct answer: 10 points
- Correct answer FAST (within 30 sec): +5 bonus points
- Wrong answer: -5 points
- Team with highest total wins

═══════════════════════════════════════════════════════════════

## ROUND STRUCTURE

### **ROUND 1: Hallucination Detection**
**Format:** Show an AI-generated response, teams identify if it's accurate or hallucinated

**Example Scenario:**
```
PROMPT: "What percentage of real estate agencies in the US currently use AI tools?"

AI RESPONSE: "According to a 2024 study by the National Association of Realtors, 
73% of real estate agencies have integrated AI tools into their marketing workflows. 
This represents a 300% increase from 2022."

Question: Is this response accurate?
A) Yes, this is factual
B) No, this is hallucinated - the specific statistics are made up
C) Partially true - some numbers are real, some are made up

CORRECT ANSWER: B - Hallucinated
EXPLANATION: While NAR does publish studies, these specific percentages are invented. 
Red flags: Oddly precise (73%), dramatic increase (300%), no source link provided.
```

**3 more examples for Round 1:**

**Scenario 2:**
```
PROMPT: "Who is the current CEO of HubSpot?"

AI RESPONSE: "As of 2025, Yamini Rangan is the CEO of HubSpot, 
having taken over from Brian Halligan in 2021."

Question: Accurate or hallucinated?
CORRECT ANSWER: A - Accurate
EXPLANATION: This is verifiable and correct. Yamini Rangan became CEO in 2021.
```

**Scenario 3:**
```
PROMPT: "What are the key features of GPT-5.2?"

AI RESPONSE: "GPT-5.2 was released in March 2025 and includes: 
- Native video generation from text prompts
- Real-time voice conversations with emotional understanding
- 5 million token context window
- Built-in fact-checking that verifies all outputs"

Question: Accurate or hallucinated?
CORRECT ANSWER: C - Partially true
EXPLANATION: GPT-5.2 was released December 2025 (not March), and these features 
are exaggerated. Red flag: Claims that sound too good to be true.
```

**Scenario 4:**
```
PROMPT: "How much does Claude Pro cost?"

AI RESPONSE: "Claude Pro is priced at $20 per month for individual users."

Question: Accurate or hallucinated?
CORRECT ANSWER: A - Accurate
EXPLANATION: This is current correct pricing (as of December 2025).
```

---

### **ROUND 2: Red Flag Identification**
**Format:** Show an AI response, teams select ALL red flags present (multiple choice, can select multiple)

**Example Scenario:**
```
PROMPT: "Write a case study about Parmer Ranch's success with our services."

AI RESPONSE: "Parmer Ranch, a luxury real estate development in Austin, Texas, 
saw unprecedented success after partnering with our agency. Studies show that 
professional marketing increases property sales by up to 400%. The ranch achieved 
similar results, with all properties selling within 6 weeks. Industry experts agree 
that this is the most effective approach to real estate marketing."

Select ALL red flags present:
□ Vague sources ("Studies show" without citation)
□ Overly confident without data (specific percentage without source)
□ Generic advice that could apply to anyone
□ Made-up quotes or expert opinions
□ Suspiciously perfect outcomes (all properties in 6 weeks)
□ No specific details about actual work done

CORRECT ANSWER: All except "Made-up quotes" (though implied)
EXPLANATION: 5 out of 6 boxes should be checked. Multiple red flags = unreliable output.
```

**2 more examples for Round 2:**

**Scenario 2:**
```
PROMPT: "What's the ROI of using AI tools in marketing?"

AI RESPONSE: "AI tools deliver an average ROI of 284% within the first year. 
Companies report saving 15-20 hours per week per employee. The technology is 
proven to work and all major agencies are adopting it immediately."

Select ALL red flags:
□ Oddly specific statistic without source (284%)
□ Conflicting information
□ Outdated information (check dates)
□ Sweeping generalizations ("all major agencies")
□ Vague attribution ("companies report")
□ Missing important context

CORRECT ANSWER: All except "Conflicting information" and "Outdated information"
```

**Scenario 3:**
```
PROMPT: "Should we invest in TikTok marketing for luxury real estate?"

AI RESPONSE: "No, luxury real estate should never use TikTok. High-net-worth 
individuals don't use social media platforms like TikTok. Traditional channels 
are always more effective for luxury properties. This is universally agreed upon 
by marketing professionals."

Select ALL red flags:
□ Absolute statements ("never", "always")
□ Unfounded assumptions about audience behavior
□ Overly confident without nuance
□ Claims universal agreement without evidence
□ Ignores contrary examples or data
□ Dismisses options without analysis

CORRECT ANSWER: ALL boxes checked
EXPLANATION: This is terrible advice masquerading as confidence. Never trust absolutes.
```

---

### **ROUND 3: Better Prompt Challenge**
**Format:** Show a bad prompt, teams identify the best improved version

**Example Scenario:**
```
ORIGINAL PROMPT: "Write something about our real estate services."

Which improved prompt is BEST?

A) "Write a detailed description of our real estate services for luxury properties."

B) "Write a 150-word service description for luxury real estate marketing. 
Include: drone photography, 3D tours, staging consultation. Target audience: 
property developers with $2M+ listings. Tone: professional but approachable. 
Emphasize ROI and time-to-sale metrics."

C) "Write about our real estate services. Make it good and include all our 
services. Use professional language and make it sound impressive."

D) "Create content describing what we do for real estate clients including 
all the services we offer."

CORRECT ANSWER: B
EXPLANATION: Specific constraints (150 words), clear deliverables (3 services), 
defined audience (developers, $2M+), tone guidance, and emphasis direction. 
A is too vague, C is vague+demanding, D is just rephrasing the original.
```

**2 more examples for Round 3:**

**Scenario 2:**
```
ORIGINAL PROMPT: "Help me with a client email."

Best improved version?

A) "Write a professional email to a client about a project delay."

B) "Write an email to my client explaining we need more time."

C) "Write a 100-word email to Sarah Chen at Parmer Ranch. Subject: Timeline 
update for Phase 2 marketing launch. Explain: 3D tour vendor delayed by 1 week, 
new completion date is March 15. Tone: apologetic but confident. Include: 
what we're doing to prevent future delays, and one quick win we achieved this week."

D) "Help me write an email that explains to a client why we're behind schedule 
but make it sound good and professional."

CORRECT ANSWER: C
```

**Scenario 3:**
```
ORIGINAL PROMPT: "Give me ideas."

Best improved version?

A) "Give me 10 marketing ideas for social media."

B) "Brainstorm social media marketing ideas for real estate."

C) "Generate 5 Instagram Reel concepts for luxury real estate marketing. 
Target audience: high-net-worth buyers aged 35-55. Each concept should include: 
hook (first 3 seconds), content structure, and CTA. Focus on property lifestyle 
over just showcasing homes. Each idea should be executable with iPhone + basic editing."

D) "I need creative marketing ideas for luxury homes that would work on social 
media platforms, especially Instagram where our audience spends time."

CORRECT ANSWER: C
```

---

### **ROUND 4: Tool Selection**
**Format:** Show a task, teams choose which AI tool to use and WHY

**Example Scenario:**
```
TASK: "You need to create a detailed competitive analysis report comparing 5 
real estate marketing agencies. The report needs 30+ sources, deep analysis of 
pricing models, service offerings, and market positioning. Due in 2 days."

Which tool and why?

A) ChatGPT - Fast and good at structured documents
B) Claude Deep Research - Most thorough, handles complex synthesis
C) Gemini - Fastest processing for quick results
D) Use all three and compare outputs

CORRECT ANSWER: B - Claude Deep Research
EXPLANATION: 30+ sources + deep analysis = need Claude's research capabilities. 
ChatGPT is fast but not deep enough. Gemini is fast but shallow. Using all three 
wastes time when one tool is clearly optimal. Pick the right tool for the job.
```

**2 more examples for Round 4:**

**Scenario 2:**
```
TASK: "Client needs a PowerPoint deck with 15 slides about Q4 marketing results. 
Needs charts, data visualization, and professional formatting. Due in 3 hours."

Which tool?

A) Claude - Best for analysis and synthesis
B) ChatGPT - Native PowerPoint creation
C) Gemini - Fastest processing
D) Create manually, AI can't do this well

CORRECT ANSWER: B - ChatGPT
EXPLANATION: GPT-5.2 has native file creation. Can generate actual .pptx files.
```

**Scenario 3:**
```
TASK: "Client sent a 45-minute video of their property tour. You need to 
extract key highlights, identify best 10 shots, and create shot list with timestamps."

Which tool?

A) ChatGPT - Good at structured outputs
B) Claude - Best reasoning capabilities  
C) Gemini - Best multimodal/video analysis
D) Manual review required, AI can't process video

CORRECT ANSWER: C - Gemini
EXPLANATION: Video analysis is Gemini's strength. Can process video directly.
```

---

### **ROUND 5: Real-World Scenario**
**Format:** Complex scenario requiring multiple decisions, teams earn points for each correct choice

**Scenario:**
```
SITUATION: Your team is creating a blog post titled "Top 10 AI Tools for 
Real Estate Agents in 2025". The post needs to be published tomorrow.

You've done research in Claude Deep Research and received a comprehensive report 
with statistics and tool recommendations.

QUESTION 1: What's your next step?
A) Copy the research directly into a blog post
B) Verify the statistics with web search before using
C) Trust Claude's research completely, it has citations
D) Start over with ChatGPT to compare results

CORRECT: B
POINTS: 3

QUESTION 2: Claude's research mentioned "85% of realtors now use AI tools 
according to NAR 2025 report". What do you do?
A) Use the statistic, Claude cited a source
B) Check if the NAR 2025 report actually exists and contains this stat
C) Change it to "most realtors" to be safe
D) Remove statistics entirely to avoid risk

CORRECT: B
POINTS: 3

QUESTION 3: You're writing the blog post. Best approach?
A) Have ChatGPT write the entire thing based on Claude's research
B) Write it yourself using Claude's research as reference
C) Use ChatGPT for draft, then Claude to refine, then Gemini to critique
D) Have Claude write it since it did the research

CORRECT: C (multi-tool workflow)
POINTS: 4

QUESTION 4: ChatGPT's draft includes: "AI will completely replace real estate 
agents within 5 years." What do you do?
A) Keep it, it's attention-grabbing
B) Remove it, too extreme and unsupported
C) Change to "AI might replace some agent tasks"
D) Add a disclaimer that this is speculation

CORRECT: B
POINTS: 3

QUESTION 5: Before publishing, you should:
A) Run through Grammarly and publish
B) Have a human editor review for accuracy and tone
C) Ask ChatGPT "Is this blog post good?"
D) Post it and fix errors if clients complain

CORRECT: B
POINTS: 2

MAX POINTS FOR ROUND 5: 15 points
```

═══════════════════════════════════════════════════════════════

## GAME INTERFACE DESIGN

**Main Display (Projector):**
```
┌─────────────────────────────────────────────────────────────┐
│  🧠 AI DETECTIVE: SPOT THE HALLUCINATION                    │
│                                                              │
│  ROUND 2 of 5: Red Flag Identification                      │
│  Time Remaining: 01:24                                      │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  TEAM SCORES:                                          │ │
│  │  🥇 Team A: 45 pts  │  🥈 Team B: 40 pts  │  Team C: 35│ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  PROMPT: "What percentage of real estate agencies..."       │
│  [Full scenario displayed here]                             │
│                                                              │
│  Select ALL red flags present:                              │
│  □ Vague sources                                            │
│  □ Overly confident                                         │
│  [etc...]                                                   │
│                                                              │
│  ⏱️  SUBMIT YOUR ANSWER                                     │
└─────────────────────────────────────────────────────────────┘
```

**Team Interface (Each team's laptop):**
```
┌─────────────────────────────────────┐
│  TEAM A                             │
│  Current Score: 45 points           │
│                                     │
│  Round 2: Red Flag Identification   │
│  Time: 01:24                        │
│                                     │
│  Select ALL red flags:              │
│  ☑️ Vague sources                   │
│  ☑️ Overly confident                │
│  ☐ Generic advice                   │
│  ☑️ Made-up quotes                  │
│  ☐ Perfect outcomes                 │
│  ☑️ No specific details             │
│                                     │
│  [SUBMIT ANSWER]                    │
└─────────────────────────────────────┘
```

═══════════════════════════════════════════════════════════════

## IMPLEMENTATION SPECS

**Tech Stack:**
- React for frontend
- Socket.io for real-time syncing between presenter screen and team screens
- Tailwind CSS for styling
- Hosted on Vercel or similar (easy deployment)

**Key Features:**
1. **Presenter Control Panel**
   - Start/pause timer
   - Advance rounds manually
   - Lock answers when time expires
   - Reveal correct answers with explanations
   - Display live scoreboard

2. **Team Interface**
   - Join with team code
   - Answer submission (can change until submitted)
   - Visual feedback when answer submitted
   - Score history visible

3. **Scoring System**
   - Auto-calculate based on correctness + speed
   - Display running totals
   - Show final leaderboard

4. **Visual Design**
   - Clean, professional (not gamey)
   - Large text (readable from across room)
   - Color-coded teams
   - Celebration animations for correct answers

═══════════════════════════════════════════════════════════════

## PRESENTER SCRIPT FOR GAME

**Introduction (1 min):**
"Alright, time for a game! We're going to test everything we just learned about critical thinking.

Break into groups of 3. [Count attendees, divide into teams]

Each team grab ONE laptop. Go to [URL] and enter your team name.

**[Display game on projector]**

Here's how it works: 5 rounds, 90 seconds each. You'll see scenarios on the big screen, answer questions on your laptop. Points for correct answers, bonus points for speed. Team with most points wins... [pull out prize - maybe gift cards or coffee gift card].

Everyone ready? Team names entered? Let's go!"

**Between Rounds (15 sec each):**
"Round 1 complete! Current scores: Team A leading with 30 points, Team B at 25, Team C at 20. 

Round 2 starting in 3... 2... 1... GO!"

**After Each Answer Reveal (20 sec):**
"The correct answer was B - Hallucinated. Here's why: [read explanation on screen].

Team A got it right! Plus 10 points. Team B selected A - close but not quite. Team C also got it.

See the red flags? Oddly specific statistics, no source citation, too-perfect numbers. These are dead giveaways."

**Final Scores (1 min):**
"Alright, final round complete! Let's see the final scores...

Team A: 85 points
Team B: 80 points  
Team C: 75 points

Team A wins! **[Applause, award prize]**

What did we learn? Call out one thing your team learned."

**[Have each team share one insight - 30 sec per team]**

"Perfect. That's critical thinking in action. You'll use these exact skills tomorrow when you're working with AI.

Now - real Q&A time. What questions do you have?"

═══════════════════════════════════════════════════════════════

## GAME VARIATIONS

**If Short on Time (5-min version):**
- Do only 3 rounds instead of 5
- 60 seconds per round instead of 90
- Skip Round 5 (complex scenario)

**If Large Group (15+ people):**
- 4-5 people per team
- Project answers on screen so everyone can discuss
- Have teams defend their answers out loud

**If Small Group (6 people):**
- 2 teams of 3
- Add a "lightning round" for tiebreaker

**Prize Ideas:**
- $25 coffee gift cards
- "AI Expert" certificate (printed, professional)
- First pick at lunch
- SentimentX swag (if you have it)
- Company pays for their lunch

═══════════════════════════════════════════════════════════════

## POST-GAME DEBRIEF

**Key Questions to Ask (2 min):**
1. "What was the hardest round and why?"
2. "What red flag surprised you most?"
3. "Which scenario felt most like real work you do?"
4. "What will you do differently tomorrow when using AI?"

**Tie Back to Training:**
"See how fast you caught those red flags? That's the skill you're building. 

Tomorrow when ChatGPT gives you statistics, you'll think 'is this real?' 

When Claude makes claims, you'll ask 'where's the source?'

When outputs look too perfect, you'll get suspicious.

That's exactly what we want. Healthy skepticism + AI power = better work.

Alright - real questions now!"

═══════════════════════════════════════════════════════════════

## TECHNICAL IMPLEMENTATION NOTES

**For Vibe Coding This:**

1. **Start with structure:**
   - Presenter view (controls + big display)
   - Team view (answer input)
   - Game state management (Socket.io)

2. **Data structure:**
```javascript
const gameState = {
  currentRound: 1,
  timeRemaining: 90,
  teams: [
    { name: "Team A", score: 0, answers: [] },
    { name: "Team B", score: 0, answers: [] }
  ],
  rounds: [
    {
      id: 1,
      type: "hallucination",
      scenario: "...",
      question: "...",
      options: [...],
      correctAnswer: "B",
      explanation: "...",
      points: 10
    }
  ]
}
```

3. **Key functions:**
   - `startRound()` - Begins timer, unlocks answers
   - `submitAnswer(teamId, answer)` - Records answer with timestamp
   - `endRound()` - Locks answers, calculates scores
   - `revealAnswer()` - Shows correct answer + explanation
   - `updateScores()` - Recalculates based on speed + accuracy

4. **Styling priorities:**
   - Large text (minimum 24px for projector)
   - High contrast (dark text on light, or vice versa)
   - Team colors (distinct but not garish)
   - Responsive (works on laptop and projector)

5. **Testing checklist:**
   - Works with 2 teams minimum
   - Timer syncs across all devices
   - Answer locking works
   - Scoring math is correct
   - Explanation displays properly
   - Mobile friendly (in case someone uses phone)

═══════════════════════════════════════════════════════════════
