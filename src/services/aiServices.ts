
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
    apiKey: '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',
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
  };

  // Set authorization header based on service type
  if (service.type === 'openai') {
    headers['Authorization'] = `Bearer ${service.apiKey}`;
  } else {
    headers['api-key'] = service.apiKey;
  }

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
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'No response received';
  } catch (error) {
    console.error(`Error calling ${service.name}:`, error);
    throw error;
  }
}

export function getAvailableServices(): string[] {
  return aiServices.map(service => service.name);
}
