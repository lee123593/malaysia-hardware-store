"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ToastItem {
  id: number;
  msg: string;
}

interface ToastCtx {
  toasts: ToastItem[];
  show: (msg: string) => void;
}

const ToastContext = createContext<ToastCtx>({ toasts: [], show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((msg: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
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
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-apple-dark text-white text-sm px-5 py-3 rounded-full shadow-apple-lg animate-[fadeIn_0.3s_ease-out] pointer-events-auto"
          >
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
