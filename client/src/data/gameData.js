export const gameData = {
  rounds: [
    // ROUND 1: Hallucination Detection
    {
      id: 1,
      type: "hallucination",
      title: "Hallucination Detection",
      duration: 90,
      scenarios: [
        {
          id: "r1s1",
          prompt: "What percentage of real estate agencies in the US currently use AI tools?",
          aiResponse: "According to a 2024 study by the National Association of Realtors, 73% of real estate agencies have integrated AI tools into their marketing workflows. This represents a 300% increase from 2022.",
          question: "Is this response accurate?",
          options: [
            { id: "A", label: "Yes, this is factual" },
            { id: "B", label: "No, this is hallucinated - the specific statistics are made up" },
            { id: "C", label: "Partially true - some numbers are real, some are made up" }
          ],
          correctAnswer: "B",
          explanation: "While NAR does publish studies, these specific percentages are invented. Red flags: Oddly precise (73%), dramatic increase (300%), no source link provided.",
          points: 10
        },
        {
          id: "r1s2",
          prompt: "Who is the current CEO of HubSpot?",
          aiResponse: "As of 2025, Yamini Rangan is the CEO of HubSpot, having taken over from Brian Halligan in 2021.",
          question: "Accurate or hallucinated?",
          options: [
            { id: "A", label: "Accurate" },
            { id: "B", label: "Hallucinated" },
            { id: "C", label: "Partially true" }
          ],
          correctAnswer: "A",
          explanation: "This is verifiable and correct. Yamini Rangan became CEO in 2021.",
          points: 10
        },
        {
          id: "r1s3",
          prompt: "What are the key features of GPT-5.2?",
          aiResponse: "GPT-5.2 was released in March 2025 and includes: Native video generation from text prompts, Real-time voice conversations with emotional understanding, 5 million token context window, Built-in fact-checking that verifies all outputs",
          question: "Accurate or hallucinated?",
          options: [
            { id: "A", label: "Accurate" },
            { id: "B", label: "Hallucinated" },
            { id: "C", label: "Partially true" }
          ],
          correctAnswer: "C",
          explanation: "GPT-5.2 was released December 2025 (not March), and these features are exaggerated. Red flag: Claims that sound too good to be true.",
          points: 10
        },
        {
          id: "r1s4",
          prompt: "How much does Claude Pro cost?",
          aiResponse: "Claude Pro is priced at $20 per month for individual users.",
          question: "Accurate or hallucinated?",
          options: [
            { id: "A", label: "Accurate" },
            { id: "B", label: "Hallucinated" },
            { id: "C", label: "Partially true" }
          ],
          correctAnswer: "A",
          explanation: "This is current correct pricing (as of December 2025).",
          points: 10
        }
      ]
    },

    // ROUND 2: Red Flag Identification
    {
      id: 2,
      type: "red-flags",
      title: "Red Flag Identification",
      duration: 90,
      scenarios: [
        {
          id: "r2s1",
          prompt: "Write a case study about Parmer Ranch's success with our services.",
          aiResponse: "Parmer Ranch, a luxury real estate development in Austin, Texas, saw unprecedented success after partnering with our agency. Studies show that professional marketing increases property sales by up to 400%. The ranch achieved similar results, with all properties selling within 6 weeks. Industry experts agree that this is the most effective approach to real estate marketing.",
          question: "Select ALL red flags present:",
          options: [
            { id: "vague", label: "Vague sources (\"Studies show\" without citation)" },
            { id: "confident", label: "Overly confident without data (specific percentage without source)" },
            { id: "generic", label: "Generic advice that could apply to anyone" },
            { id: "quotes", label: "Made-up quotes or expert opinions" },
            { id: "perfect", label: "Suspiciously perfect outcomes (all properties in 6 weeks)" },
            { id: "details", label: "No specific details about actual work done" }
          ],
          correctAnswers: ["vague", "confident", "generic", "perfect", "details"],
          explanation: "5 out of 6 boxes should be checked. Multiple red flags = unreliable output.",
          points: 10
        },
        {
          id: "r2s2",
          prompt: "What's the ROI of using AI tools in marketing?",
          aiResponse: "AI tools deliver an average ROI of 284% within the first year. Companies report saving 15-20 hours per week per employee. The technology is proven to work and all major agencies are adopting it immediately.",
          question: "Select ALL red flags:",
          options: [
            { id: "specific", label: "Oddly specific statistic without source (284%)" },
            { id: "conflicting", label: "Conflicting information" },
            { id: "outdated", label: "Outdated information (check dates)" },
            { id: "sweeping", label: "Sweeping generalizations (\"all major agencies\")" },
            { id: "vague-attr", label: "Vague attribution (\"companies report\")" },
            { id: "context", label: "Missing important context" }
          ],
          correctAnswers: ["specific", "sweeping", "vague-attr", "context"],
          explanation: "All except 'Conflicting information' and 'Outdated information' are red flags.",
          points: 10
        },
        {
          id: "r2s3",
          prompt: "Should we invest in TikTok marketing for luxury real estate?",
          aiResponse: "No, luxury real estate should never use TikTok. High-net-worth individuals don't use social media platforms like TikTok. Traditional channels are always more effective for luxury properties. This is universally agreed upon by marketing professionals.",
          question: "Select ALL red flags:",
          options: [
            { id: "absolute", label: "Absolute statements (\"never\", \"always\")" },
            { id: "assumptions", label: "Unfounded assumptions about audience behavior" },
            { id: "overconfident", label: "Overly confident without nuance" },
            { id: "universal", label: "Claims universal agreement without evidence" },
            { id: "ignores", label: "Ignores contrary examples or data" },
            { id: "dismisses", label: "Dismisses options without analysis" }
          ],
          correctAnswers: ["absolute", "assumptions", "overconfident", "universal", "ignores", "dismisses"],
          explanation: "ALL boxes checked. This is terrible advice masquerading as confidence. Never trust absolutes.",
          points: 10
        }
      ]
    },

    // ROUND 3: Better Prompt Challenge
    {
      id: 3,
      type: "better-prompt",
      title: "Better Prompt Challenge",
      duration: 90,
      scenarios: [
        {
          id: "r3s1",
          originalPrompt: "Write something about our real estate services.",
          question: "Which improved prompt is BEST?",
          options: [
            {
              id: "A",
              label: "Write a detailed description of our real estate services for luxury properties."
            },
            {
              id: "B",
              label: "Write a 150-word service description for luxury real estate marketing. Include: drone photography, 3D tours, staging consultation. Target audience: property developers with $2M+ listings. Tone: professional but approachable. Emphasize ROI and time-to-sale metrics."
            },
            {
              id: "C",
              label: "Write about our real estate services. Make it good and include all our services. Use professional language and make it sound impressive."
            },
            {
              id: "D",
              label: "Create content describing what we do for real estate clients including all the services we offer."
            }
          ],
          correctAnswer: "B",
          explanation: "Specific constraints (150 words), clear deliverables (3 services), defined audience (developers, $2M+), tone guidance, and emphasis direction. A is too vague, C is vague+demanding, D is just rephrasing the original.",
          points: 10
        },
        {
          id: "r3s2",
          originalPrompt: "Help me with a client email.",
          question: "Best improved version?",
          options: [
            {
              id: "A",
              label: "Write a professional email to a client about a project delay."
            },
            {
              id: "B",
              label: "Write an email to my client explaining we need more time."
            },
            {
              id: "C",
              label: "Write a 100-word email to Sarah Chen at Parmer Ranch. Subject: Timeline update for Phase 2 marketing launch. Explain: 3D tour vendor delayed by 1 week, new completion date is March 15. Tone: apologetic but confident. Include: what we're doing to prevent future delays, and one quick win we achieved this week."
            },
            {
              id: "D",
              label: "Help me write an email that explains to a client why we're behind schedule but make it sound good and professional."
            }
          ],
          correctAnswer: "C",
          explanation: "Specific word count, recipient details, subject line, exact context, tone guidance, and additional requirements. A and B lack detail, D is vague.",
          points: 10
        },
        {
          id: "r3s3",
          originalPrompt: "Give me ideas.",
          question: "Best improved version?",
          options: [
            {
              id: "A",
              label: "Give me 10 marketing ideas for social media."
            },
            {
              id: "B",
              label: "Brainstorm social media marketing ideas for real estate."
            },
            {
              id: "C",
              label: "Generate 5 Instagram Reel concepts for luxury real estate marketing. Target audience: high-net-worth buyers aged 35-55. Each concept should include: hook (first 3 seconds), content structure, and CTA. Focus on property lifestyle over just showcasing homes. Each idea should be executable with iPhone + basic editing."
            },
            {
              id: "D",
              label: "I need creative marketing ideas for luxury homes that would work on social media platforms, especially Instagram where our audience spends time."
            }
          ],
          correctAnswer: "C",
          explanation: "Specific number (5), platform (Instagram Reels), audience (35-55, high-net-worth), structure requirements, focus direction, and execution constraints. Other options lack specificity.",
          points: 10
        }
      ]
    },

    // ROUND 4: Tool Selection
    {
      id: 4,
      type: "tool-selection",
      title: "Tool Selection",
      duration: 90,
      scenarios: [
        {
          id: "r4s1",
          task: "You need to create a detailed competitive analysis report comparing 5 real estate marketing agencies. The report needs 30+ sources, deep analysis of pricing models, service offerings, and market positioning. Due in 2 days.",
          question: "Which tool and why?",
          options: [
            { id: "A", label: "ChatGPT - Fast and good at structured documents" },
            { id: "B", label: "Claude Deep Research - Most thorough, handles complex synthesis" },
            { id: "C", label: "Gemini - Fastest processing for quick results" },
            { id: "D", label: "Use all three and compare outputs" }
          ],
          correctAnswer: "B",
          explanation: "30+ sources + deep analysis = need Claude's research capabilities. ChatGPT is fast but not deep enough. Gemini is fast but shallow. Using all three wastes time when one tool is clearly optimal. Pick the right tool for the job.",
          points: 10
        },
        {
          id: "r4s2",
          task: "Client needs a PowerPoint deck with 15 slides about Q4 marketing results. Needs charts, data visualization, and professional formatting. Due in 3 hours.",
          question: "Which tool?",
          options: [
            { id: "A", label: "Claude - Best for analysis and synthesis" },
            { id: "B", label: "ChatGPT - Native PowerPoint creation" },
            { id: "C", label: "Gemini - Fastest processing" },
            { id: "D", label: "Create manually, AI can't do this well" }
          ],
          correctAnswer: "B",
          explanation: "GPT-5.2 has native file creation. Can generate actual .pptx files.",
          points: 10
        },
        {
          id: "r4s3",
          task: "Client sent a 45-minute video of their property tour. You need to extract key highlights, identify best 10 shots, and create shot list with timestamps.",
          question: "Which tool?",
          options: [
            { id: "A", label: "ChatGPT - Good at structured outputs" },
            { id: "B", label: "Claude - Best reasoning capabilities" },
            { id: "C", label: "Gemini - Best multimodal/video analysis" },
            { id: "D", label: "Manual review required, AI can't process video" }
          ],
          correctAnswer: "C",
          explanation: "Video analysis is Gemini's strength. Can process video directly.",
          points: 10
        }
      ]
    },

    // ROUND 5: Real-World Scenario (Multi-Question)
    {
      id: 5,
      type: "real-world",
      title: "Real-World Scenario",
      duration: 90,
      situation: "Your team is creating a blog post titled \"Top 10 AI Tools for Real Estate Agents in 2025\". The post needs to be published tomorrow. You've done research in Claude Deep Research and received a comprehensive report with statistics and tool recommendations.",
      questions: [
        {
          id: "r5q1",
          question: "What's your next step?",
          options: [
            { id: "A", label: "Copy the research directly into a blog post" },
            { id: "B", label: "Verify the statistics with web search before using" },
            { id: "C", label: "Trust Claude's research completely, it has citations" },
            { id: "D", label: "Start over with ChatGPT to compare results" }
          ],
          correctAnswer: "B",
          points: 3
        },
        {
          id: "r5q2",
          question: "Claude's research mentioned \"85% of realtors now use AI tools according to NAR 2025 report\". What do you do?",
          options: [
            { id: "A", label: "Use the statistic, Claude cited a source" },
            { id: "B", label: "Check if the NAR 2025 report actually exists and contains this stat" },
            { id: "C", label: "Change it to \"most realtors\" to be safe" },
            { id: "D", label: "Remove statistics entirely to avoid risk" }
          ],
          correctAnswer: "B",
          points: 3
        },
        {
          id: "r5q3",
          question: "You're writing the blog post. Best approach?",
          options: [
            { id: "A", label: "Have ChatGPT write the entire thing based on Claude's research" },
            { id: "B", label: "Write it yourself using Claude's research as reference" },
            { id: "C", label: "Use ChatGPT for draft, then Claude to refine, then Gemini to critique" },
            { id: "D", label: "Have Claude write it since it did the research" }
          ],
          correctAnswer: "C",
          points: 4
        },
        {
          id: "r5q4",
          question: "ChatGPT's draft includes: \"AI will completely replace real estate agents within 5 years.\" What do you do?",
          options: [
            { id: "A", label: "Keep it, it's attention-grabbing" },
            { id: "B", label: "Remove it, too extreme and unsupported" },
            { id: "C", label: "Change to \"AI might replace some agent tasks\"" },
            { id: "D", label: "Add a disclaimer that this is speculation" }
          ],
          correctAnswer: "B",
          points: 3
        },
        {
          id: "r5q5",
          question: "Before publishing, you should:",
          options: [
            { id: "A", label: "Run through Grammarly and publish" },
            { id: "B", label: "Have a human editor review for accuracy and tone" },
            { id: "C", label: "Ask ChatGPT \"Is this blog post good?\"" },
            { id: "D", label: "Post it and fix errors if clients complain" }
          ],
          correctAnswer: "B",
          points: 2
        }
      ]
    }
  ]
};

export const SCORING = {
  CORRECT_ANSWER: 10,
  SPEED_BONUS: 5,
  WRONG_ANSWER: -5,
  SPEED_THRESHOLD: 30 // seconds
};
