"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ToastCtx {
  toasts: string[];
  show: (msg: string) => void;
}

const ToastContext = createContext<ToastCtx>({ toasts: [], show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<string[]>([]);

  const show = useCallback((msg: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, msg]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0));
    }, 2500);
  }, []);

  // Expose globally
  if (typeof window !== "undefined") {
    (window as any)["__toast__"] = show;
  }

  return (
    <ToastContext.Provider value={{ toasts, show }}>
      {children}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((msg, i) => (
          <div
            key={i}
            className="bg-apple-dark text-white text-sm px-5 py-3 rounded-full shadow-apple-lg animate-[fadeIn_0.3s_ease-out] pointer-events-auto"
          >
            {msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
