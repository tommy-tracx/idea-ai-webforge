
import { useRef, useEffect } from "react";
import { Message, Agent } from "../../types/chat";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface ChatMessagesProps {
  messages: Message[];
  agents: Agent[];
  isTyping: boolean;
}

const ChatMessages = ({ messages, agents, isTyping }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAgentInfo = (agentType: string) => {
    return agents.find(agent => agent.id === agentType) || agents[0];
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
      {messages.map((message) => {
        const agent = message.sender === "agent" ? getAgentInfo(message.agentType || "coordinator") : undefined;
        
        return (
          <MessageBubble
            key={message.id}
            message={message}
            agent={agent}
          />
        );
      })}
      
      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
