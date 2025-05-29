
export interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  agentType?: string;
  timestamp: Date;
  serviceUsed?: string;
}

export interface Agent {
  id: string;
  name: string;
  icon: any;
  color: string;
  specialty: string;
  status: "active" | "thinking" | "idle";
  aiService?: string;
}
