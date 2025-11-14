import { Folder as FolderIcon } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "IPL Match Predictor",
    description:
      "ML pipeline to predict six likelihood in first overs using Random Forest with GridSearchCV; Flask app for results.",
    tech: ["Python", "scikit-learn", "Pandas", "SMOTE", "GridSearchCV", "Flask"],
    year: "2024",
  },
  {
    id: 2,
    title: "Inventory Management Automation",
    description:
      "Automated inventory for small shops using n8n; chatbot/kiosk-like AI workflows; integrated local LLMs via Ollama.",
    tech: ["n8n", "Ollama", "AI Automation"],
    year: "2025",
  },
  {
    id: 3,
    title: "Stock Market / Crypto Predictor",
    description:
      "Python models and LLM ensemble (ChatGPT, Claude, Gemini) for predictions; automated trading and options; ₹70k+ results.",
    tech: ["Python", "Pandas", "Matplotlib", "LLMs", "Automation"],
    year: "2025",
  },
  {
    id: 4,
    title: "Email Summary & Responder Automation",
    description:
      "Gmail API + n8n to capture metadata and automate daily workflows; OpenAI LLMs for summaries and insights.",
    tech: ["Gmail API", "n8n", "OpenAI LLMs"],
    year: "2025",
  },
  {
    id: 5,
    title: "Project Management Automation",
    description:
      "AI agent with n8n, Airtable, Fireflies; transcripts via GraphQL API processed with LLMs; tasks and notifications automated.",
    tech: ["n8n", "Airtable", "Fireflies", "GraphQL API", "OpenAI LLMs"],
    year: "2024",
  },
  {
    id: 6,
    title: "Portfolio Site (Windows 7 Theme)",
    description:
      "This site: a Windows 7–style portfolio with draggable windows, taskbar, start menu, and resume viewer.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "shadcn/ui"],
    year: "2025",
  },
  {
    id: 7,
    title: "Networth Calculator",
    description:
      "Networth Calculator: A React app to calculate networth using real-time data from CryptoAPI and NSE BSE API",
    tech: ["React", "TypeScript", "NSE BSE API", "CryptoAPI"],
    year: "2025",
  },
];

const ProjectsWindow = () => {
  return (
    <div className="p-6">
      {/* Explorer Header */}
      <div className="mb-4 pb-3 border-b flex items-center gap-2">
        <FolderIcon className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Projects</h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-border rounded-lg p-4 bg-white/50 hover:bg-white/70 backdrop-blur-sm transition-colors"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-sm">{project.title}</h3>
            </div>
            {"year" in project && (
              <div className="text-[10px] text-muted-foreground mb-1">{(project as any).year}</div>
            )}
            <p className="text-xs text-muted-foreground mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
