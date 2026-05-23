// Mocking ChromaDB client for cross-platform Node.js environments
export class ChromaClient {
  private collectionName: string;

  constructor(collectionName = 'knowledge-base') {
    this.collectionName = collectionName;
  }

  async query(vector: number[], limit = 3) {
    return [
      { id: 'doc_1', text: 'Relevant context chunk matching user knowledge gap.', score: 0.85 },
      { id: 'doc_2', text: 'Secondary supportive educational content.', score: 0.72 }
    ];
  }

  async addDocuments(ids: string[], vectors: number[], metadatas: any[], contents: string[]) {
    return { success: true, count: ids.length };
  }
}

export const chromaClient = new ChromaClient();