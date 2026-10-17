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
    <section id="newsletter" className="py-28 bg-[#1A1814] border-b border-[#2C2318] relative overflow-hidden">
      {/* Background warm glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#B87333]/[0.08] blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B87333]/15 border border-[#B87333]/25 text-[#D4955A] text-xs font-mono-tag font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VAULT PRIORITY ACCESS</span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight italic">
          First In Line.
        </h2>

        <p className="mt-4 text-[#C4B8A8] text-sm sm:text-base max-w-lg mx-auto font-sans font-light leading-relaxed">
          Get early access to new drops, exclusive edits, and members-only offers.
        </p>

        {/* Signup Form */}
        <div className="mt-10 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-[#2C2318] border border-[#B87333]/30 text-center">
              <div className="w-12 h-12 rounded-full bg-[#B87333]/15 text-[#D4955A] flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-white italic">
                You&apos;re On The VIP List
              </h3>
              <p className="text-xs text-[#C4B8A8] font-mono-tag mt-1">
                Demo confirmation: You will receive drop broadcasts before public releases.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-mono-tag text-[#D4955A] hover:underline"
              >
                Register another email &rarr;
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8275]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="ENTER YOUR EMAIL FOR EARLY ACCESS"
                  className="w-full bg-[#2C2318] border border-[#3D3225] text-white placeholder-[#8C8275] font-mono-tag text-xs pl-11 pr-4 py-4 rounded-full focus:border-[#B87333] focus:outline-none transition-colors"
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-4 bg-[#B87333] hover:bg-[#D4955A] text-white font-mono-tag text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 disabled:opacity-50 glow-copper-sm flex-shrink-0"
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
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-red-400 font-mono-tag">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <p className="mt-4 text-[11px] font-mono-tag text-[#8C8275]">
            Frontend demonstration. Zero spam. Unsubscribe at any time.
          </p>
        </div>

      </div>
    </section>
  );
}
