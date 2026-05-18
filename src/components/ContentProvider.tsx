"use client";
import { useEffect } from "react";
import { useI18n } from "@/i18n";

export default function ContentProvider({ children }: { children: React.ReactNode }) {
  const lang = useI18n((s) => s.lang);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/content");
        if (!res.ok || cancelled) return;
        const overrides = await res.json();
        if (!cancelled) {
          useI18n.getState().loadContentOverrides(overrides);
        }
      } catch (e) {
        console.warn("Failed to load content overrides:", e);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return <>{children}</>;
}
