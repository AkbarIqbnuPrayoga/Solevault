'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import Image from 'next/image';

export function ToastContainer() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 p-4 bg-[#141418] border border-[#2a2a33] text-white shadow-2xl rounded-lg backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100"
          >
            {toast.image ? (
              <div className="relative w-12 h-12 rounded bg-zinc-800 overflow-hidden flex-shrink-0 border border-zinc-700">
                <Image
                  src={toast.image}
                  alt={toast.title}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex-shrink-0">
                {toast.type === 'success' && (
                  <CheckCircle2 className="w-5 h-5 text-[#d4ff00]" />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-400" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-5 h-5 text-blue-400" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="font-mono text-xs font-bold tracking-wider uppercase text-white">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-zinc-400 truncate mt-0.5">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white transition-colors p-1"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
