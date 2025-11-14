import { GoogleGenAI, Content } from "@google/genai";

interface ChatContext {
    purpose: string;
    style: string;
    styleDesc: string;
    primaryColor: string;
    components: string;
}

// The chat component will use this type for its state.
// The role for assistant messages is 'model'.
export interface ChatMessage {
    id: string;
    role: 'user' | 'model' | 'error';
    content: string;
    timestamp: number;
}

// Gemini API expects history roles as 'user' and 'model'.
const toGeminiHistory = (messages: ChatMessage[]): Content[] => {
    return messages
        .filter(msg => msg.role === 'user' || msg.role === 'model')
        .map(msg => ({
            role: msg.role,
            parts: [{ text: msg.content }]
        }));
};

export const getAiChatResponse = async (
    userMessage: string,
    context: ChatContext,
    history: ChatMessage[]
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `你是一名专业的UI/UX设计专家。请基于以下设计上下文提供建议：

    设计目的: ${context.purpose || '未选择'}
    设计风格: ${context.style || '未选择'}
    风格特征: ${context.styleDesc || '无'}
    主色调: ${context.primaryColor}
    选中组件: ${context.components || '无'}

    请用专业但易懂的语言回答，提供具体可行的建议。回答应简洁明了，重点突出。`;

  const contents: Content[] = [
      ...toGeminiHistory(history),
      { role: 'user', parts: [{ text: userMessage }] }
  ];

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error getting chat response from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        throw new Error("Gemini API key is invalid. Please check your environment configuration.");
    }
    throw new Error("AI 助手当前不可用，请稍后再试。");
  }
};
