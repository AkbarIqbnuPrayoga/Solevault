'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, ArrowRight, Sparkles, Loader2 } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate network submission delay
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 900);
  };

  return (
    <section id="newsletter" className="py-24 bg-[#0a0a0d] border-b border-zinc-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#d4ff00]/[0.04] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 text-[#d4ff00] text-xs font-mono font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VAULT PRIORITY ACCESS</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
          FIRST IN LINE.
        </h2>

        <p className="mt-4 text-zinc-400 text-sm sm:text-base max-w-lg mx-auto font-sans leading-relaxed">
          Get early access to new drops, exclusive edits, and members-only offers.
        </p>

        {/* Signup Form */}
        <div className="mt-10 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-[#111116] border border-[#d4ff00]/40 text-center animate-in zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-full bg-[#d4ff00]/10 text-[#d4ff00] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold uppercase text-white">
                You&apos;re On The VIP List
              </h3>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                Demo confirmation: You will receive drop broadcasts before public releases.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-mono text-[#d4ff00] hover:underline"
              >
                Register another email &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="ENTER YOUR EMAIL FOR EARLY ACCESS"
                  className="w-full bg-[#14141a] border border-zinc-800 text-white placeholder-zinc-500 font-mono text-xs pl-10 pr-4 py-3.5 rounded-xl focus:border-[#d4ff00] focus:outline-none transition-colors"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3.5 bg-[#d4ff00] hover:bg-[#e2ff40] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 glow-lime-sm flex-shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>VERIFYING...</span>
                  </>
                ) : (
                  <>
                    <span>JOIN DROP LIST</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === 'error' && (
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-red-400 font-mono">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="mt-4 text-[11px] font-mono text-zinc-600">
            Frontend demonstration. Zero spam. Unsubscribe at any time.
          </p>
        </div>

      </div>
    </section>
  );
}
