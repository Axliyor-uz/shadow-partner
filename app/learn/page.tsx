'use client';
import React, { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import Link from 'next/link';

export default function LearnPage() {
  const { blocks, setBlocks } = useAppStore();

  useEffect(() => {
    // Simulating API pull
    fetch('/api/blocks')
      .then((res) => res.json())
      .then((data) => setBlocks(data.blocks || []))
      .catch(() => {
        // Fallback mock data for immediate rendering evaluation
        setBlocks([
          { id: 'b1', title: 'Foundations of Logic', description: 'Master core propositional logic and deductive arguments.', difficulty: 'beginner', status: 'completed', prerequisites: [] },
          { id: 'b2', title: 'Socratic Dialectics', description: 'Deconstruct complex arguments through structural questioning.', difficulty: 'intermediate', status: 'available', prerequisites: ['b1'] },
          { id: 'b3', title: 'Cognitive Biases', description: 'Identify systemic deviations from rational judgment paths.', difficulty: 'advanced', status: 'locked', prerequisites: ['b2'] }
        ]);
      });
  }, [setBlocks]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header & Stats Banner */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Knowledge Map
            </h1>
            <p className="text-slate-400 text-sm mt-1">Your adaptive, non-linear cognitive progression tracker.</p>
          </div>
          <div className="flex gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-blue-400">1 / 3</span>
              <span className="text-xs text-slate-500 font-medium uppercase">Blocks Done</span>
            </div>
            <div className="w-px bg-slate-800 self-stretch"></div>
            <div className="text-center px-2">
              <span className="block text-xl font-bold text-indigo-400">Level 4</span>
              <span className="text-xs text-slate-500 font-medium uppercase">Current Skill</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nodes Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block, index) => {
            const isLocked = block.status === 'locked';
            const isCompleted = block.status === 'completed';
            const isAvailable = block.status === 'available';

            return (
              <div
                key={block.id}
                className={`group relative flex flex-col justify-between rounded-2xl border p-6 transition-all duration-300 transform ${
                  isLocked 
                    ? 'bg-slate-900/20 border-slate-900/60 text-slate-500 opacity-60 cursor-not-allowed' 
                    : isCompleted
                    ? 'bg-slate-900/40 border-emerald-500/30 hover:border-emerald-500/50 shadow-lg hover:shadow-emerald-950/10 hover:-translate-y-1'
                    : 'bg-slate-900 border-slate-800 hover:border-blue-500/50 shadow-md hover:shadow-blue-950/20 hover:-translate-y-1 cursor-pointer'
                }`}
              >
                {/* Node Line Connector Overlay Effect */}
                <div className="absolute -top-3 left-6 text-[10px] font-mono tracking-widest text-slate-600 bg-slate-950 px-2">
                  NODE // 0{index + 1}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      block.difficulty === 'advanced' ? 'bg-rose-950/50 text-rose-400 border border-rose-800/30' :
                      block.difficulty === 'intermediate' ? 'bg-amber-950/50 text-amber-400 border border-amber-800/30' :
                      'bg-sky-950/50 text-sky-400 border border-sky-800/30'
                    }`}>
                      {block.difficulty}
                    </span>

                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      isAvailable ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse' :
                      'bg-slate-800 text-slate-500'
                    }`}>
                      {block.status}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold tracking-tight ${!isLocked ? 'text-slate-100 group-hover:text-blue-400 transition-colors' : 'text-slate-600'}`}>
                    {block.title}
                  </h3>
                  <p className="text-sm mt-2 text-slate-400 leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {isLocked ? '🔒 Prerequisites hidden' : `🎯 Core Objective`}
                  </span>
                  
                  {isAvailable && (
                    <Link href="/chat" className="text-xs font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-1 transition-colors">
                      Launch Session <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                  )}
                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      ✓ Mastered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}