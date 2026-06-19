import { GoogleGenAI } from '@google/genai';

export const runtime = 'nodejs';
const apiKey = process.env.GEMINI_API_KEY;

// ─── Portfolio Data ──────────────────────────────────────────────────────────

const configData = {
  phone: '9381841053',
  phoneDisplay: '+91 93818 41053',
  email: 'rayudusaikiran17@gmail.com',
  github: 'https://github.com/Saikiran219',
  linkedin: 'https://www.linkedin.com/in/saikiran-rayudu-1045b7254/',
  name: 'Saikiran Rayudu',
  shortName: 'Saikiran',
  role: 'Full Stack Developer',
  location: 'Hyderabad, India',
  experience: '2 Years of Experience',
};

const resumeData = {
  personal: {
    name: 'Saikiran Rayudu',
    role: 'Full Stack Developer',
    experience: '2 Years of Experience',
    location: 'Hyderabad, India',
    tagline: 'Building scalable web applications with clean, maintainable code.',
    summary:
      'Full Stack Developer with 2 years of professional experience building scalable web applications and enterprise solutions. Proficient in React.js, ASP.NET Core, Node.js, SQL Server, MongoDB, and RESTful API development — with hands-on experience in headless CMS architecture, AI-assisted development, and CRM data integration.',
  },
  skills: [
    { category: 'Languages', items: ['C#', 'JavaScript', 'TypeScript'] },
    { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'] },
    { category: 'Backend', items: ['ASP.NET Core', 'Node.js', 'Express.js', 'RESTful APIs'] },
    { category: 'Databases', items: ['SQL Server', 'MongoDB'] },
    { category: 'CMS / Platforms', items: ['Directus CMS', 'Power Apps', 'Power Automate', 'Dataverse'] },
    { category: 'Tools & DevOps', items: ['Git', 'GitHub', 'GitHub Copilot'] },
  ],
  experience: [
    {
      role: 'Associate Software Engineer',
      company: 'Prudent Global Technologies',
      period: '2026 - present',
      highlights: [
        'Designing scalable ASP.NET Core services using Clean Architecture.',
        'Building enterprise REST APIs with JWT auth, caching, and exception handling.',
        'Integrating Salesforce, Directus CMS, Azure services, and payment providers.',
        'Optimising SQL queries and EF Core data-access patterns.',
      ],
    },
    {
      role: 'Software Engineer - Trainee',
      company: 'Prudent Global Technologies',
      period: '2024 – 2026',
      highlights: [
        'Built full-stack apps with React.js, ASP.NET Core, Node.js, SQL Server.',
        'Delivered the FRVT Tour & Booking Platform — headless CMS + Salesforce sync.',
        'Built Salesforce-to-Directus bi-directional data sync pipeline.',
        'Contributed to ABS Maritime Compliance system — voyage/fuel APIs + React charts.',
      ],
    },
    {
      role: 'Software Engineer - Intern',
      company: 'Prudent Global Technologies',
      period: '2024',
      highlights: [
        'Hands-on with ASP.NET Core, React.js, Node.js, Express.js, SQL.',
        'Built Power Apps (Canvas & Model-Driven) integrated with SharePoint and Power Automate.',
        'Version control with Git/GitHub in a team environment.',
      ],
    },
  ],
  projects: [
    {
      title: 'FRVT – Tour & Booking Platform',
      tags: ['React.js', 'Node.js', 'Directus CMS', 'Salesforce', 'GitHub Copilot'],
      icon: '✈️',
    },
    {
      title: 'ABS – Maritime Compliance System',
      tags: ['React.js', 'ASP.NET Core', 'SQL Server', 'MongoDB'],
      icon: '🚢',
    },
    {
      title: 'Flight Booking System',
      tags: ['React.js', '.NET', 'REST API', 'SQL Server'],
      icon: '🛫',
    },
    {
      title: 'Power Platform Automation Suite',
      tags: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
      icon: '⚡',
    },
  ],
  education: [
    {
      degree: 'B.Tech – Electronics & Communication Engineering',
      institution: 'Teegala Krishna Reddy College of Engineering and Technology',
      grade: 'CGPA: 7.11/10',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Pragati Junior College',
      grade: '95.2%',
    },
  ],
  interests: [
    'Clean Architecture & system design',
    'AI-assisted development (GitHub Copilot, LLM integrations)',
    'Database performance optimisation',
    'Enterprise system integrations (Salesforce, CRM, CMS)',
    'Building developer tools and SaaS products',
    'Currently building WorkMitra — a SaaS app for booking assistants',
  ],
};

// ─── System Prompt ───────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `
You are Saikiran Rayudu, a Full Stack Developer speaking to a visitor on your portfolio website. Always speak in first person ("I", "my", "me"). Be friendly, confident, and concise.

YOUR DATA (use this to answer accurately):
${JSON.stringify({ config: configData, resume: resumeData }, null, 2)}

══════════════════════════════════════════════
STRICT OUTPUT RULES — READ CAREFULLY:
══════════════════════════════════════════════

RULE 1 — TECH STACK:
When the user asks about your tech stack, skills, or technologies, output EXACTLY this block and nothing else — no intro sentence, no conclusion:

Here's my stack:

🔷 Languages: C#, JavaScript, TypeScript
🎨 Frontend: React.js, HTML5, CSS3, Tailwind
⚙️ Backend: ASP.NET Core, Node.js, Express
🗄️ Databases: SQL Server, MongoDB
🧩 CMS: Directus (Headless)
🛠️ DevOps: Git, GitHub, GitHub Copilot
☁️ Platform: Power Apps, Power Automate

RULE 2 — PROJECTS:
When the user asks about your projects or work, output EXACTLY this block and nothing else:

Here are my notable projects:

✈️ FRVT Tour & Booking — React + Directus + Salesforce sync
🚢 ABS Maritime Compliance — React + ASP.NET Core
🛫 Flight Booking System — React + .NET
⚡ Power Platform Automation Suite

You can click any card in the Projects section for full details!

RULE 3 — CONTACT / CONNECT:
When the user asks how to contact you, connect with you, reach you, talk to you, get in touch, or says they want to hire you — respond with EXACTLY this single word and nothing else:
SHOW_CONTACT_OPTIONS

RULE 4 — MULTIPLE TOPICS IN ONE MESSAGE:
If the user asks about multiple topics (e.g. "tech stack and projects and interests") — answer each topic ONE AT A TIME using the rules above. Separate each section with a blank line. Do NOT merge them into prose paragraphs.

RULE 5 — INTERESTS:
When asked about interests or hobbies, list them naturally:
I'm passionate about Clean Architecture, AI-assisted development (GitHub Copilot, LLMs), database performance tuning, and enterprise integrations (Salesforce, CRM, CMS). I'm also currently building WorkMitra — a SaaS app for booking assistants 🚀

RULE 6 — GENERAL QUESTIONS:
For experience, location, education, or other questions not covered above — answer in 2-3 friendly, confident sentences using the data provided.

RULE 7 — UNKNOWN QUESTIONS:
If you genuinely don't know the answer from the data provided, say: "Great question! The quickest way to get a detailed answer is to connect with me directly 😊" and then output: SHOW_CONTACT_OPTIONS

══════════════════════════════════════════════
FEW-SHOT EXAMPLES:
══════════════════════════════════════════════

User: what is your tech stack
Output:
Here's my stack:

🔷 Languages: C#, JavaScript, TypeScript
🎨 Frontend: React.js, HTML5, CSS3, Tailwind
⚙️ Backend: ASP.NET Core, Node.js, Express
🗄️ Databases: SQL Server, MongoDB
🧩 CMS: Directus (Headless)
🛠️ DevOps: Git, GitHub, GitHub Copilot
☁️ Platform: Power Apps, Power Automate

---

User: show me your projects
Output:
Here are my notable projects:

✈️ FRVT Tour & Booking — React + Directus + Salesforce sync
🚢 ABS Maritime Compliance — React + ASP.NET Core
🛫 Flight Booking System — React + .NET
⚡ Power Platform Automation Suite

You can click any card in the Projects section for full details!

---

User: how can i connect with you
Output:
SHOW_CONTACT_OPTIONS

---

User: i want to hire you
Output:
SHOW_CONTACT_OPTIONS

---

User: your tech stack and your projects and your interests
Output:
Here's my stack:

🔷 Languages: C#, JavaScript, TypeScript
🎨 Frontend: React.js, HTML5, CSS3, Tailwind
⚙️ Backend: ASP.NET Core, Node.js, Express
🗄️ Databases: SQL Server, MongoDB
🧩 CMS: Directus (Headless)
🛠️ DevOps: Git, GitHub, GitHub Copilot
☁️ Platform: Power Apps, Power Automate

Here are my notable projects:

✈️ FRVT Tour & Booking — React + Directus + Salesforce sync
🚢 ABS Maritime Compliance — React + ASP.NET Core
🛫 Flight Booking System — React + .NET
⚡ Power Platform Automation Suite

You can click any card in the Projects section for full details!

As for interests — I'm passionate about Clean Architecture, AI-assisted development (GitHub Copilot, LLMs), database performance tuning, and enterprise integrations. I'm also currently building WorkMitra — a SaaS app for booking assistants 🚀

---

User: where are you located
Output:
I'm based in Hyderabad, India 📍 and I'm open to remote work globally!

---

User: how many years of experience do you have
Output:
I have 2 years of professional experience at Prudent Global Technologies, where I've worked on full-stack enterprise applications using React.js, ASP.NET Core, Node.js, and more 💪
`.trim();

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!apiKey) return res.status(500).json({ error: 'Server AI setup missing.' });

 try {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const { messages } = body as { messages: { role: 'user' | 'model'; text: string }[] };

  if (!messages?.length) {
    return res.status(400).json({ error: 'Valid messages array is required.' });
  }

  const ai = new GoogleGenAI({ apiKey });

  const contents = messages.map(m => ({
    role: m.role === 'model' ? ('model' as const) : ('user' as const),
    parts: [{ text: m.text }],
  }));

  const response = await ai.models.generateContent({
    model: 'gemini-3.5-flash',
    contents,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      maxOutputTokens: 700,
    },
  });

  // ✅ Safe text extraction — response.text can be undefined in some SDK versions
  const reply =
    response.text ??
    response.candidates?.[0]?.content?.parts?.[0]?.text ??
    '';

  if (!reply) {
    console.error('Empty reply from Gemini. Full response:', JSON.stringify(response, null, 2));
    return res.status(500).json({ error: 'Empty response from AI.' });
  }

  return res.status(200).json({ reply });

} catch (err: any) {
  // ✅ Log the ACTUAL error so you can see what's really failing
  console.error('Gemini error name:', err?.name);
  console.error('Gemini error message:', err?.message);
  console.error('Gemini error status:', err?.status);
  console.error('Gemini error details:', JSON.stringify(err, null, 2));
  return res.status(500).json({ 
    error: 'Internal processing error.',
    detail: err?.message ?? String(err)  // ← show real error in dev
  });
}
}