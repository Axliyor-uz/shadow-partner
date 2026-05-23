import { LearningBlock } from '@/types';

export class KnowledgeEngine {
  static getAvailableBlocks(completedBlockIds: string[]): LearningBlock[] {
    const allBlocks: LearningBlock[] = [
      { id: 'b1', title: 'Foundations', description: 'Core Concepts', difficulty: 'beginner', status: 'available', prerequisites: [] },
      { id: 'b2', title: 'Advanced Logic', description: 'Deep Dive structural design', difficulty: 'intermediate', status: 'locked', prerequisites: ['b1'] }
    ];

    return allBlocks.map(block => {
      if (completedBlockIds.includes(block.id)) return { ...block, status: 'completed' };
      const preReqsMet = block.prerequisites.every(id => completedBlockIds.includes(id));
      return { ...block, status: preReqsMet ? 'available' : 'locked' };
    });
  }
}