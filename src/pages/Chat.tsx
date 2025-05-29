
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, ArrowLeft, Zap, Code, Palette, Server, Database, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AIServiceSelector from "../components/AIServiceSelector";
import { callAIService, ChatMessage } from "../services/aiServices";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  agentType?: string;
  timestamp: Date;
  serviceUsed?: string;
}

interface Agent {
  id: string;
  name: string;
  icon: any;
  color: string;
  specialty: string;
  status: "active" | "thinking" | "idle";
  aiService?: string;
}

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      // Use coordinator agent with OpenAI service
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

  const getAgentInfo = (agentType: string) => {
    return agents.find(agent => agent.id === agentType) || agents[0];
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
                {agents.map((agent) => {
                  const IconComponent = agent.icon;
                  return (
                    <div key={agent.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
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
                })}
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
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                  {messages.map((message) => {
                    const agent = message.sender === "agent" ? getAgentInfo(message.agentType || "coordinator") : null;
                    const IconComponent = agent?.icon || User;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
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
                  })}
                  
                  {isTyping && (
                    <div className="flex gap-3 justify-start">
                      <div className="p-2 rounded-lg bg-yellow-500 text-white flex-shrink-0">
                        <Zap className="h-4 w-4" />
                      </div>
                      <div className="bg-slate-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your website or web app idea..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping || selectedServices.length === 0}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
