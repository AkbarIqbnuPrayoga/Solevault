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
            className="pointer-events-auto flex items-center justify-between gap-3.5 p-4 bg-[#FFFDF8] border border-[#E8E0D4] text-[#1A1814] shadow-2xl rounded-2xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100"
          >
            {toast.image ? (
              <div className="relative w-12 h-12 rounded-xl bg-[#FAF7F2] overflow-hidden flex-shrink-0 border border-[#E8E0D4]">
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
                  <CheckCircle2 className="w-5 h-5 text-[#B87333]" />
                )}
                {toast.type === 'error' && (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                {toast.type === 'info' && (
                  <Info className="w-5 h-5 text-[#B87333]" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <p className="font-serif text-xs font-bold tracking-tight text-[#1A1814]">
                {toast.title}
              </p>
              {toast.message && (
                <p className="text-xs text-[#8C8275] truncate mt-0.5">
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#8C8275] hover:text-[#1A1814] rounded-full hover:bg-[#F0EBE3] transition-colors p-1"
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
