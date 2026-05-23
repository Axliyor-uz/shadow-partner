'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  const { messages, addMessage } = useAppStore();
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll layout handler when messages populate
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { id: Math.random().toString(), role: 'user' as const, content: input, timestamp: Date.now() };
    addMessage(userMsg);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await response.json();
      
      addMessage({
        id: Math.random().toString(),
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      
      {/* Structural Context Panel Sidebars */}
      <aside className="hidden lg:flex flex-col w-80 border-r border-slate-800 bg-slate-900/40 p-6 space-y-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Active Framework</h3>
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-sm font-semibold text-blue-400 block">Socratic Inquiry</span>
            <span className="text-xs text-slate-400 block mt-1">The AI engine won\'t solve problems directly. It challenges your underlying premises instead.</span>
          </div>
        </div>
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Tips for Discovery</h3>
          <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
            <li>State assumptions clearly</li>
            <li>Break big claims down</li>
            <li>Ask questions when stuck</li>
          </ul>
        </div>
      </aside>

      {/* Primary Chat Subsystem */}
      <div className="flex-1 flex flex-col h-full relative">
        
        {/* Mini Chat Workspace Navbar Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/20 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <h2 className="text-sm font-bold tracking-tight">Active Socratic Interface</h2>
          </div>
          <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
            Target: Logical Consistency
          </span>
        </header>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4 opacity-80">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl text-blue-400 font-serif text-2xl">“?”</div>
              <p className="text-sm text-slate-400">
                Type an assertion or question below. The tutor will analyze your approach and guide your next steps.
              </p>
            </div>
          )}

          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div key={m.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl flex gap-3 p-4 rounded-2xl border transition-all ${
                  isUser 
                    ? 'bg-blue-600/10 border-blue-500/30 text-slate-100 rounded-br-none shadow-sm' 
                    : 'bg-slate-900 border-slate-800 text-slate-100 rounded-bl-none shadow-sm'
                }`}>
                  <div className="flex flex-col space-y-1">
                    <span className={`text-[10px] font-mono tracking-wider uppercase opacity-40 ${isUser ? 'text-right' : 'text-left'}`}>
                      {isUser ? 'Student' : 'Socratic Guide'}
                    </span>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Premium Loading Dynamic Indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-900 border border-slate-800/80 p-4 rounded-2xl rounded-bl-none flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Formulating counter-inquiry</span>
                <div className="flex gap-1">
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Controlled Action Input Bar Area */}
        <footer className="p-4 md:p-6 bg-slate-950 border-t border-slate-900/80">
          <form onSubmit={sendMessage} className="max-w-4xl mx-auto flex items-center gap-3 relative bg-slate-900 border border-slate-800 focus-within:border-blue-500/60 rounded-xl p-2 transition-all shadow-xl">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Submit an assertion or break down your question..."
              className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-slate-500 text-slate-200"
              disabled={loading}
            />
            <Button 
              type="submit" 
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg px-4 h-9 shadow transition-all disabled:bg-slate-800 disabled:text-slate-600"
            >
              Evaluate
            </Button>
          </form>
        </footer>

      </div>
    </div>
  );
}