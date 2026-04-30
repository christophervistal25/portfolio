// Christopher Vistal — content data
window.PORTFOLIO_DATA = {
  name: "Christopher Vistal",
  role: "Full-Stack Software Engineer",
  location: "Surigao del Sur, Philippines",
  pitch:
    "I build production systems for government, law, and enterprise — case management, citizen records, and AI-powered tools that ship and stay shipped.",
  email: "vistalchris@gmail.com",
  cv: "https://drive.google.com/file/d/1CDd4-ztY7c-qhJZ56g2nzw-SA3FXxE9Y/view",
  socials: {
    github: "https://github.com/christophervistal25",
    linkedin: "https://www.linkedin.com/in/christophervistal25/",
    youtube: "https://www.youtube.com/@tophertips3387",
  },
  metrics: [
    { num: "5", suffix: "+", label: "Years building production systems" },
    { num: "3,000", suffix: "+", label: "End users on systems I've shipped" },
    { num: "9", suffix: "", label: "Live products across gov, law, gaming" },
    { num: "100", suffix: "%", label: "Offline AI — zero cloud dependency" },
  ],
  featured: [
    {
      key: "ata",
      title: "ATA Law Firm",
      tag: "case management · aws",
      summary:
        "Designed and built a complete case management system on AWS — case tracking, document automation, and a secure client portal used in active legal practice.",
      impact: "Replaced spreadsheet-based workflows for an entire firm.",
      stack: ["Laravel", "Vue.js", "AWS", "MySQL"],
      url: "https://atafirm.ph",
      live: true,
    },
    {
      key: "transcriber",
      title: "Offline AI Transcriber",
      tag: "ai · ctranslate2 · python",
      summary:
        "Local-first speech-to-text with real-time waveform feedback. Runs entirely on-device — no audio ever leaves the machine. Built for sensitive legal/medical contexts.",
      impact: "Zero cloud dependency. Faster than cloud STT on modern CPUs.",
      stack: ["Python", "CTranslate2", "Whisper", "PyQt"],
      ai: true,
    },
  ],
  projects: [
    {
      title: "NEMSU Data Hub",
      desc: "University data + student records",
      stack: "Laravel · Vue",
      status: "live",
      url: "https://udh.nemsu.edu.ph/",
    },
    {
      title: "Dragonica Spidpex",
      desc: "Live gaming platform with player accounts & community",
      stack: "Laravel · Vue",
      status: "live",
      url: "https://dragonicaspidpex.com/",
    },
    {
      title: "GSIS Deduction System",
      desc: "Government insurance computation engine",
      stack: "PHP · SQL Server",
      status: "dev",
      url: "https://github.com/christophervistal25/GSIS-Deduction",
    },
    {
      title: "Real-time RPS",
      desc: "Multiplayer game with live socket sync",
      stack: "Node.js · Socket.io",
      status: "dev",
      url: "https://www.youtube.com/watch?v=B-Aj7DVPXaM",
    },
    {
      title: "NEMSU SMS Gateway",
      desc: "Android SMS notifications service",
      stack: "Java",
      status: "apk",
      url: "#",
    },
    {
      title: "Dental Care System",
      desc: "Clinic management with custom SVG charting",
      stack: "Laravel · Vue",
      status: "dev",
      url: "https://github.com/christophervistal25/dental-care-system",
    },
    {
      title: "Bicycle Rent Timer",
      desc: "Rental timing + sales tracking app",
      stack: "Java",
      status: "apk",
      url: "https://play.google.com/store/apps/details?id=com.bikerent",
    },
  ],
  experience: [
    {
      role: "Freelance Software Engineer",
      org: "Self-employed",
      date: "2023 — present",
      current: true,
      bullets: [
        "Built **ATA Law Firm's** case management system on AWS — case tracking, document automation, and a secure client portal used in active legal practice.",
        "Built an **offline AI transcription tool** with CTranslate2 and Python — local speech-to-text with real-time waveform feedback, zero cloud dependency.",
        "Launched **Dragonica Spidpex**, a live gaming platform with player accounts and community features, built with Laravel and Vue.js.",
      ],
    },
    {
      role: "Software Engineer",
      org: "Province of Surigao del Sur",
      date: "Jan 2021 — Dec 2023",
      bullets: [
        "Built the province's **E-PDS system and tourism analytics dashboard** — digitizing civil servant records and tracking visitor data for provincial planning.",
        "Diagnosed and fixed performance bottlenecks in legacy government applications, improving response times on high-traffic reporting views.",
        "**Introduced Git/GitHub and modern dev tooling** to the team — standardizing workflows and cutting integration friction across ongoing government projects.",
        "Mentored team members on Laravel fundamentals and production deployment — server environments, CI pipelines, and live release procedures.",
      ],
    },
    {
      role: "Intern Developer",
      org: "NEMSU",
      date: "Jul — Aug 2018",
      bullets: [
        "Built a **faculty evaluation web app with Python NLP sentiment analysis**, used by 3,000+ students and staff.",
        "Turned evaluation data into sentiment reports used by faculty to identify and address teaching gaps.",
      ],
    },
  ],
  skills: [
    {
      cat: "Backend",
      tags: ["PHP / Laravel", "Node.js", "MySQL", "SQL Server", "REST APIs", "Socket.io"],
    },
    {
      cat: "Frontend",
      tags: ["Vue.js", "TypeScript", "Tailwind", "Inertia.js", "HTML / CSS / JS"],
    },
    {
      cat: "AI & ML",
      featured: true,
      tags: ["Python", "CTranslate2", "Whisper", "NLP", "Speech-to-Text"],
    },
    {
      cat: "DevOps & Tools",
      tags: ["Git", "AWS", "Docker", "PHPUnit", "Linux"],
    },
    {
      cat: "Other Languages",
      tags: ["Java (Android)", "Go", "C# (.NET)"],
    },
  ],
  services: [
    {
      name: "Full-stack web apps",
      desc: "Laravel + Vue, end-to-end. From spec to deployment.",
    },
    {
      name: "Government / enterprise systems",
      desc: "Records management, case tracking, internal tools.",
    },
    {
      name: "AI integration",
      desc: "Offline / on-prem speech, NLP, and inference pipelines.",
    },
    {
      name: "Legacy modernization",
      desc: "Rescuing slow PHP systems. Profiling, refactoring, scaling.",
    },
    {
      name: "DevOps & deployment",
      desc: "AWS setup, CI/CD pipelines, server hardening.",
    },
    {
      name: "Code review & mentoring",
      desc: "Team upskilling, workflow standardization, technical docs.",
    },
  ],
};
