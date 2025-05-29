
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIServiceSelector from "../components/AIServiceSelector";
import AgentCard from "../components/chat/AgentCard";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { callAIService, ChatMessage } from "../services/aiServices";
import { Message } from "../types/chat";
import { agents } from "../config/agents";

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI Development Pipeline. Describe the website or web app you'd like to create, and I'll coordinate with specialized agents to bring it to life!",
      sender: "agent",
      agentType: "coordinator",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(["OpenAI GPT"]);

  const handleServiceToggle = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const chatMessages: ChatMessage[] = [
        {
          role: "system",
          content: "You are an AI Development Pipeline Coordinator. Help users create web applications by breaking down their requests into actionable tasks for specialized development agents. Be helpful, technical, and provide clear guidance."
        },
        {
          role: "user",
          content: inputValue
        }
      ];

      const response = await callAIService("openai", chatMessages);

      const agentResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "agent",
        agentType: "coordinator",
        timestamp: new Date(),
        serviceUsed: "OpenAI GPT"
      };

      setMessages(prev => [...prev, agentResponse]);
    } catch (error) {
      console.error("Error calling AI service:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting to the AI service right now. Please try again in a moment.",
        sender: "agent",
        agentType: "coordinator",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Development Chat
            </h1>
            <p className="text-slate-600">Describe your project and watch AI agents bring it to life</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Agents Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Services */}
            <AIServiceSelector 
              selectedServices={selectedServices}
              onServiceToggle={handleServiceToggle}
            />

            {/* Agents */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-lg">AI Agents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {agents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Panel */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Project Development Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ChatMessages 
                  messages={messages}
                  agents={agents}
                  isTyping={isTyping}
                />
                <ChatInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendMessage}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  canSend={inputValue.trim() && !isTyping && selectedServices.length > 0}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
