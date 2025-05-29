
import { Badge } from "@/components/ui/badge";
import { Agent } from "../../types/chat";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const IconComponent = agent.icon;
  
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
      <div className={`p-2 rounded-lg ${agent.color} text-white`}>
        <IconComponent className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm">{agent.name}</p>
          <Badge 
            variant={agent.status === "active" ? "default" : "secondary"}
            className="text-xs"
          >
            {agent.status}
          </Badge>
        </div>
        <p className="text-xs text-slate-600 mt-1">{agent.specialty}</p>
        <p className="text-xs text-blue-600 mt-1">Using: {agent.aiService}</p>
      </div>
    </div>
  );
};

export default AgentCard;
