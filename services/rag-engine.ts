import { openai } from '@/lib/openai/config';
import { chromaClient } from '@/lib/chroma/config';

export class RAGEngine {
  static async getEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });
    return response.data[0].embedding;
  }

  static async retrieveContext(query: string): Promise<string> {
    const embedding = await this.getEmbedding(query);
    const matches = await chromaClient.query(embedding, 3);
    return matches.map(match => match.text).join('\n\n');
  }
}