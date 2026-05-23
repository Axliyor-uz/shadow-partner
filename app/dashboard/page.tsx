'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetch('/app/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data.sessions || []));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-12 border-b border-slate-800 pb-6">
        <h2 className="text-3xl font-bold">Workspace Overview</h2>
        <nav className="space-x-4">
          <Link href="/learn" className="text-slate-300 hover:text-white">Knowledge Tree</Link>
          <Link href="/chat" className="bg-blue-600 px-4 py-2 rounded text-sm font-semibold">New Tutor Session</Link>
        </nav>
      </header>

      <section>
        <h3 className="text-xl font-semibold mb-4">Active Socratic Paths</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s: any) => (
            <div key={s.id} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
              <h4 className="font-bold text-lg mb-2">{s.topic}</h4>
              <p className="text-xs text-slate-400 mb-4">Started: {new Date(s.createdAt).toLocaleDateString()}</p>
              <Link href="/chat" className="text-blue-400 text-sm hover:underline">Resume dialogue &rarr;</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}