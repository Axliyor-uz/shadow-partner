import { openai } from '@/lib/openai/config';
import { ChatMessage } from '@/types';

export class SocraticTutor {
  static async generateResponse(history: ChatMessage[], context: string): Promise<string> {
    const systemPrompt = `You are a Socratic Tutor. Do not give direct answers to the student. 
    Instead, analyze their understanding based on the provided Context, validate their effort, 
    and ask one targeted, open-ended question that guides them to uncover the answer themselves.
    
    Context: ${context}`;

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...history.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: formattedMessages as any,
      temperature: 0.6,
    });

    return response.choices[0].message.content || "Can you expand on what you mean by that?";
  }
}