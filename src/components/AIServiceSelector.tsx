
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, CheckCircle, AlertCircle } from "lucide-react";
import { aiServices } from "../services/aiServices";

interface AIServiceSelectorProps {
  selectedServices: string[];
  onServiceToggle: (serviceName: string) => void;
}

const AIServiceSelector = ({ selectedServices, onServiceToggle }: AIServiceSelectorProps) => {
  const [testingService, setTestingService] = useState<string | null>(null);

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'openai':
        return <Bot className="h-4 w-4" />;
      case 'azure':
      case 'deepseek':
      case 'grok':
        return <Zap className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'openai':
        return 'bg-green-500';
      case 'azure':
        return 'bg-blue-500';
      case 'deepseek':
        return 'bg-purple-500';
      case 'grok':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const testService = async (serviceName: string) => {
    setTestingService(serviceName);
    // Simulate API test
    setTimeout(() => {
      setTestingService(null);
    }, 2000);
  };

  return (
    <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Zap className="h-5 w-5" />
          AI Inference Services
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {aiServices.map((service) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${getServiceColor(service.type)} text-white`}>
                {getServiceIcon(service.type)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{service.name}</p>
                  {selectedServices.includes(service.name) && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  {service.model || service.type} • {service.type === 'openai' ? 'OpenAI' : 'Azure'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={selectedServices.includes(service.name) ? "default" : "secondary"}
                className="text-xs"
              >
                {selectedServices.includes(service.name) ? "Active" : "Inactive"}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => testService(service.name)}
                disabled={testingService === service.name}
              >
                {testingService === service.name ? (
                  <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant={selectedServices.includes(service.name) ? "destructive" : "default"}
                size="sm"
                onClick={() => onServiceToggle(service.name)}
              >
                {selectedServices.includes(service.name) ? "Disable" : "Enable"}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AIServiceSelector;
