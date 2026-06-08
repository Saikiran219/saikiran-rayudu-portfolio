// Environment config — edit these values or set via .env
export const config = {
  phone: '9381841053',          // WhatsApp phone number (no + prefix)
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

export const resumeData = {
  personal: {
    name: 'Saikiran Rayudu',
    role: 'Full Stack Developer',
    experience: '2 Years of Experience',
    location: 'Hyderabad, India',
    tagline: 'Building scalable web applications with clean, maintainable code.',
    summary: 'Full Stack Developer with 2 years of professional experience building scalable web applications and enterprise solutions. Proficient in React.js, ASP.NET Core, Node.js, SQL Server, MongoDB, and RESTful API development — with hands-on experience in headless CMS architecture, AI-assisted development, and CRM data integration.',
  },

  skills: [
    { category: 'Languages', items: ['C#', 'JavaScript'], icon: '💻', color: '#6366f1' },
    { category: 'Frontend', items: ['React.js', 'HTML5', 'CSS3', 'Tailwind CSS'], icon: '🎨', color: '#3b82f6' },
    { category: 'Backend', items: ['ASP.NET Core', 'Node.js', 'Express.js', 'RESTful APIs'], icon: '⚙️', color: '#10b981' },
    { category: 'Databases', items: ['SQL Server', 'MongoDB'], icon: '🗄️', color: '#f59e0b' },
    { category: 'CMS / Platforms', items: ['Directus CMS', 'Power Apps', 'Power Automate', 'Dataverse'], icon: '🧩', color: '#8b5cf6' },
    { category: 'Tools & DevOps', items: ['Git', 'GitHub', 'GitHub Copilot'], icon: '🛠️', color: '#06b6d4' },
  ],

  experience: [
    {
      role: 'Associate Software Engineer',
      company: 'Prudent Global Technologies',
      period: '2026 - present',
      type: 'Full-time',
      color: '#3b82f6',
      highlights: [
'Designed and implemented scalable ASP.NET Core backend services following Clean Architecture and layered design principles.',
'Developed event-driven and background processing solutions using hosted services, for long-running business operations.',
'Built and maintained enterprise-grade REST APIs with JWT authentication, role-based authorization, logging, caching, and exception handling.',
'Enhanced application performance through SQL query optimization, indexing strategies, and efficient data-access patterns using Entity Framework Core.',
'Integrated third-party platforms including Salesforce, Directus CMS, Azure services, and payment providers to support complex business workflows.',
      ],
    },
    {
      role: 'Software Engineer - Trainee',
      company: 'Prudent Global Technologies',
      period: '2024 – 2026',
      type: 'Full-time',
      color: '#3b82f6',
      highlights: [
        'Developed and maintained full-stack web applications using React.js, ASP.NET Core, Node.js, and SQL Server.',
        'Designed and optimized RESTful APIs supporting complex business workflows and data-intensive operations.',
        'Delivered the FRVT Tour & Booking Platform — headless architecture using Directus CMS, React.js, Node.js, and GitHub Copilot AI.',
        'Built a Salesforce-to-Directus data sync pipeline enabling seamless bi-directional CRM data flow.',
        'Contributed to the ABS Maritime Compliance & Reporting System — built voyage/fuel reporting APIs and React visualization modules.',
      ],
    },
    {
      role: 'Software Engineer - Intern ',
      company: 'Prudent Global Technologies',
      period: '2024',
      type: 'Internship',
      color: '#8b5cf6',
      highlights: [
        'Gained hands-on experience with ASP.NET Core, React.js, Node.js, Express.js, and SQL in real-world projects.',
        'Built and integrated Power Apps (Canvas and Model-Driven) with SharePoint and Power Automate for workflow automation.',
        'Practiced version control with Git/GitHub in a collaborative team environment.',
      ],
    },
  ],

  projects: [
    {
      title: 'FRVT – Tour & Booking Platform',
      description: 'Full-stack tours and booking platform using headless CMS architecture. Company portal syncs data real-time from Salesforce to Directus, ensuring accurate CRM-driven content delivery.',
      tags: ['React.js', 'Node.js', 'Directus CMS', 'Salesforce', 'GitHub Copilot'],
      icon: '✈️',
      color: '#3b82f6',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      border: 'border-blue-500/30',
      github: null,
      live: null,
      highlight: true,
    },
    {
      title: 'ABS – Maritime Compliance System',
      description: 'RESTful APIs for voyage and fuel reporting adhering to maritime environmental regulations. React data visualization components for fleet environmental compliance metrics.',
      tags: ['React.js', 'ASP.NET Core', 'SQL Server','Mango DB'],
      icon: '🚢',
      color: '#10b981',
      gradient: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      github: null,
      live: null,
      highlight: true,
    },
    {
      title: 'Flight Booking System',
      description: 'Full-stack flight booking application with separate React frontend and .NET backend. Implements search, booking, and ticketing flows with a clean responsive UI.',
      tags: ['React.js', '.NET', 'REST API','SQL Server'],
      icon: '🛫',
      color: '#6366f1',
      gradient: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30',
      github: 'https://github.com/Saikiran219',
      live: null,
      highlight: false,
    },
    {
      title: 'Power Platform Automation Suite',
      description: 'Business productivity apps using Canvas and Model-Driven Power Apps. Integrated with SharePoint and Power Automate for document approvals and team notifications.',
      tags: ['Power Apps', 'Power Automate', 'SharePoint', 'Dataverse'],
      icon: '⚡',
      color: '#f59e0b',
      gradient: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      github: null,
      live: null,
      highlight: false,
    },
  ],

  education: [
    {
      degree: 'B.Tech – Electronics & Communication Engineering',
      institution: 'Teegala Krishna Reddy College of Engineering and Technology',
      location: 'Hyderabad',
      grade: 'CGPA: 7.11/10',
      icon: '🎓',
    },
    {
      degree: 'Intermediate (MPC)',
      institution: 'Pragati Junior College',
      location: 'Hyderabad',
      grade: '95.2%',
      icon: '📚',
    },
  ],
};
