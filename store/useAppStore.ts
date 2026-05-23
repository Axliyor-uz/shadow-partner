import { create } from 'zustand';
import { ChatMessage, LearningBlock } from '@/types';

interface AppState {
  messages: ChatMessage[];
  blocks: LearningBlock[];
  addMessage: (message: ChatMessage) => void;
  setBlocks: (blocks: LearningBlock[]) => void;
}

export const useAppStore = create<AppState>((set) => ({
  messages: [],
  blocks: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  setBlocks: (blocks) => set({ blocks }),
}));