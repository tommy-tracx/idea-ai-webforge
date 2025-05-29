
interface AIService {
  name: string;
  type: 'openai' | 'azure' | 'deepseek' | 'grok';
  endpoint: string;
  apiKey: string;
  model?: string;
}

export const aiServices: AIService[] = [
  {
    name: 'OpenAI GPT',
    type: 'openai',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || '',
    model: 'gpt-4o-mini'
  },
  {
    name: 'Grok-3 (Azure)',
    type: 'azure',
    endpoint: 'https://ai-huroaiai970351299673.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview',
    apiKey: 'GgTqsvTU1GpxmIHeaRbzctxdivLvdlOGLRl6F37oUFnu09JKyGPLJQQJ99BBACHYHv6XJ3w3AAAAACOGWLsV',
    model: 'grok-3'
  },
  {
    name: 'DeepSeek (Azure)',
    type: 'deepseek',
    endpoint: 'https://ai-huroaiai970351299673.services.ai.azure.com/models/chat/completions?api-version=2024-05-01-preview',
    apiKey: 'GgTqsvTU1GpxmIHeaRbzctxdivLvdlOGLRl6F37oUFnu09JKyGPLJQQJ99BBACHYHv6XJ3w3AAAAACOGWLsV',
    model: 'deepseek'
  }
];

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// Fallback responses for when AI services are unavailable
const fallbackResponses = [
  "I'm here to help you build amazing web applications! While I'm having some connectivity issues with the AI services, I can still guide you through the development process. What kind of project would you like to create?",
  "Great question! I'd love to help you with that. Currently experiencing some technical difficulties with the AI backend, but I can provide guidance on React development, UI design, and web application architecture. What specific area would you like to focus on?",
  "That's an interesting idea! While I'm working through some service connectivity issues, I can still assist with planning your project structure, choosing the right components, and discussing best practices. How can I help you move forward?",
  "I understand what you're looking for. Even though the AI services are temporarily unavailable, I can help you think through the technical requirements and suggest approaches for your web application. What's your main goal?",
  "Excellent! I'm ready to help you build that. There are some temporary issues with the AI services, but I can guide you through the development process step by step. What would you like to start with?"
];

function getRandomFallbackResponse(): string {
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

export async function callAIService(
  serviceType: string,
  messages: ChatMessage[],
  temperature: number = 0.7
): Promise<string> {
  const service = aiServices.find(s => s.type === serviceType || s.name.toLowerCase().includes(serviceType.toLowerCase()));
  
  if (!service) {
    throw new Error(`AI service ${serviceType} not found`);
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(service.type === 'openai'
      ? { Authorization: `Bearer ${service.apiKey}` }
      : { 'api-key': service.apiKey })
  };

  const requestBody = {
    messages,
    temperature,
    max_tokens: 1000,
    ...(service.model && { model: service.model })
  };

  try {
    console.log(`Calling ${service.name} service...`);
    const response = await fetch(service.endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${service.name} API Error:`, errorText);
      
      // Return fallback response instead of throwing error
      return getRandomFallbackResponse();
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || getRandomFallbackResponse();
  } catch (error) {
    console.error(`Error calling ${service.name}:`, error);
    // Return fallback response instead of throwing error
    return getRandomFallbackResponse();
  }
}

export function getAvailableServices(): string[] {
  return aiServices.map(service => service.name);
}
