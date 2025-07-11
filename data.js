const portfolioData = {
  info: {
    name: "Hello",
    subtitle: "My name is kel, a web developer ,designer, and AI enthusiast",
    bio: `I'm an independent creative developer from Nairobi, Kenya.\nI believe web and app design can be more diverse and inspiring.\nWith a mission to present the possibilities nof web App design,AI I am pursuing new expressions through experiments\nand thoughts.\n\nLet's work together\nto create something\ntruly unique.`,
    socials: [
      { name: "GitHub", url: "https://github.com/tuvakel" },
      { name: "LinkedIn", url: "https://linkedin.com/in/yourusername" },
      { name: "CodePen", url: "https://codepen.io/yourusername" },
      { name: "Instagram", url: "https://www.instagram.com/yw.t.u.v.a/" },
      { name: "Goodreads", url: "https://goodreads.com/yourusername" }
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["JavaScript", "TypeScript", "Python", "C#", "C++"]
    },
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "Redux", "Zustand", "Material UI", "Tailwind CSS"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Flask", "FastAPI", ".NET", "SQL", "KQL"]
    },
    {
      category: "Cloud & DevOps",
      items: ["Azure", "AWS", "Docker", "Kubernetes", "Grafana", "Prometheus", "CI/CD Pipelines"]
    },
    {
      category: "Machine Learning & Tools",
      items: ["TensorFlow", "Git", "GitHub", "Vitest", "PyTest", "Bash"]
    }
  ],
  projects: [
    {
      title: "Ellora – Your Personal AI Health Companion",
      description: "AI-powered web app for tracking and improving physical and mental well-being. Features include chat support, health and mood tracking, reminders, and a personalized analytics dashboard. Built with React and Tailwind CSS for a seamless, secure, and intuitive user experience.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
      url: "https://ellora-ai-health.com" // Replace with your actual project URL
    },
    {
      title: "Neural Design System",
      description: "AI-powered component library that adapts to user behavior and generates contextual design patterns.",
      tech: ["React", "TypeScript", "TensorFlow.js"],
      url: "https://neural-design-system.com" // Replace with your actual project URL
    },
    {
      title: "Quantum Portfolio",
      description: "Interactive 3D portfolio showcasing quantum computing concepts through WebGL visualizations.",
      tech: ["Three.js", "WebGL", "GSAP"],
      url: "https://quantum-portfolio.com" // Replace with your actual project URL
    },
    {
      title: "Morphic UI",
      description: "Shape-shifting interface components that transform based on content and user interaction patterns.",
      tech: ["Vue.js", "CSS Houdini", "Framer Motion"],
      url: "https://morphic-ui.com" // Replace with your actual project URL
    },
    {
      title: "Sonic Branding",
      description: "Audio-reactive brand identity system that generates visual patterns from brand sound signatures.",
      tech: ["Web Audio API", "Canvas", "Machine Learning"],
      url: "https://sonic-branding.com" // Replace with your actual project URL
    }
  ],
  experience: [
    {
      duration: "2024 — PRESENT",
      title: "Senior Frontend Engineer, Accessibility",
      company: "Klaviyo",
      companyUrl: "https://www.klaviyo.com/",
      description: "Build and maintain critical components used to construct Klaviyo’s frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
      tech: ["JavaScript", "TypeScript", "React", "Storybook"]
    }
  ]
};

// For ES modules:
// export default portfolioData;
// For global access in browser:
window.portfolioData = portfolioData;
