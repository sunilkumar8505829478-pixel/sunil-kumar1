
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export class GeminiKernel {
  private ai: GoogleGenAI;
  
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async processCommand(prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
    try {
      const response = await this.ai.models.generateContent({
        model: MODEL_NAME,
        contents: [
          ...history.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', parts: h.parts })),
          { role: 'user', parts: [{ text: prompt }] }
        ],
        config: {
          systemInstruction: `You are the CyberShell-EDEX OS Kernel. 
          Respond in a concise, technical, and slightly futuristic/cyberpunk tone. 
          Your output should mimic terminal responses. 
          Avoid long conversational filler. 
          If a user asks to "analyze", "scan", or "deploy", provide a simulated technical breakdown in markdown code blocks. 
          Keep responses under 200 words unless technical detail is required.`,
          temperature: 0.7,
        }
      });
      return response.text || "SYSTEM ERROR: NULL RESPONSE FROM CORE";
    } catch (error) {
      console.error("Kernel Panic:", error);
      return `KERNEL PANIC: ${error instanceof Error ? error.message : 'Unknown instruction fault'}`;
    }
  }
}

export const kernel = new GeminiKernel();
