"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n";

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSecretKeyLogin = () => {
    const key = prompt("Enter admin secret key:");
    if (!key) return;
    setError("");
    setLoading(true);
    fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "__admin_key__", password: key }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("admin_token", data.token);
          router.push("/admin/dashboard");
        } else {
          setError(data.error || t.admin.errorAuth);
          setLoading(false);
        }
      })
      .catch(() => {
        setError(t.admin.errorNetwork);
        setLoading(false);
      });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.admin.errorAuth);
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError(t.admin.errorNetwork);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-light px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-apple-dark tracking-tight">{t.admin.loginTitle}</h1>
          <p className="text-sm text-apple-text mt-1">{t.admin.loginSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-apple shadow-apple p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-apple-text mb-1.5">{t.admin.username}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-apple-text mb-1.5">{t.admin.password}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
              required
            />
          </div>

          {error && (
            <div className="text-xs text-red-500 bg-red-50 rounded-lg p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-apple-dark text-white text-sm font-medium py-2.5 rounded-full hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? t.admin.signingIn : t.admin.signIn}
          </button>

          <button
            type="button"
            onClick={handleSecretKeyLogin}
            className="w-full text-xs text-apple-text hover:text-apple-blue transition-colors mt-2"
          >
            Use admin secret key
          </button>
        </form>
      </div>
    </div>
  );
}
