
import { Code, Palette, Server, Database, Globe, Zap } from "lucide-react";
import { Agent } from "../types/chat";

export const agents: Agent[] = [
  {
    id: "frontend",
    name: "Frontend Agent",
    icon: Code,
    color: "bg-blue-500",
    specialty: "React, UI/UX, Responsive Design",
    status: "idle",
    aiService: "OpenAI GPT"
  },
  {
    id: "backend",
    name: "Backend Agent",
    icon: Server,
    color: "bg-green-500",
    specialty: "APIs, Authentication, Business Logic",
    status: "idle",
    aiService: "Grok-3 (Azure)"
  },
  {
    id: "design",
    name: "Design Agent",
    icon: Palette,
    color: "bg-purple-500",
    specialty: "Visual Design, Branding, Typography",
    status: "idle",
    aiService: "DeepSeek (Azure)"
  },
  {
    id: "database",
    name: "Database Agent",
    icon: Database,
    color: "bg-orange-500",
    specialty: "Data Architecture, Optimization",
    status: "idle",
    aiService: "OpenAI GPT"
  },
  {
    id: "devops",
    name: "DevOps Agent",
    icon: Globe,
    color: "bg-red-500",
    specialty: "Deployment, Scaling, Monitoring",
    status: "idle",
    aiService: "Grok-3 (Azure)"
  },
  {
    id: "coordinator",
    name: "AI Coordinator",
    icon: Zap,
    color: "bg-yellow-500",
    specialty: "Project Management, Agent Coordination",
    status: "active",
    aiService: "OpenAI GPT"
  }
];
