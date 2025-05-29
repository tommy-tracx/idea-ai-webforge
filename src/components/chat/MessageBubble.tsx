
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Message, Agent } from "../../types/chat";

interface MessageBubbleProps {
  message: Message;
  agent?: Agent;
}

const MessageBubble = ({ message, agent }: MessageBubbleProps) => {
  const IconComponent = agent?.icon || User;
  
  return (
    <div className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      {message.sender === "agent" && (
        <div className={`p-2 rounded-lg ${agent?.color || "bg-gray-500"} text-white flex-shrink-0`}>
          <IconComponent className="h-4 w-4" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === "user"
            ? "bg-blue-600 text-white"
            : "bg-slate-100 text-slate-900"
        }`}
      >
        {message.sender === "agent" && (
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium text-xs text-slate-600">
              {agent?.name || "AI Agent"}
            </p>
            {message.serviceUsed && (
              <Badge variant="outline" className="text-xs">
                {message.serviceUsed}
              </Badge>
            )}
          </div>
        )}
        <p className="text-sm leading-relaxed">{message.content}</p>
        <p className={`text-xs mt-2 ${
          message.sender === "user" ? "text-blue-100" : "text-slate-500"
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
      {message.sender === "user" && (
        <div className="p-2 rounded-lg bg-blue-600 text-white flex-shrink-0">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
