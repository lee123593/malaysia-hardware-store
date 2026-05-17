"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useKey, setUseKey] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const body: Record<string, string> = useKey ? { key, username: "admin" } : { username, password };
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("Network error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-light px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-apple-dark tracking-tight">Admin Panel</h1>
          <p className="text-sm text-apple-text mt-1">MY Hardware Pro</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-apple shadow-apple p-6 space-y-4">
          {!useKey ? (
            <>
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-apple-text mb-1.5">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                  required
                />
              </div>
            </>
          ) : (
            <div>
              <label className="block text-xs font-medium text-apple-text mb-1.5">Admin Secret Key</label>
              <input
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-apple-border text-sm focus:outline-none focus:border-apple-blue transition-colors"
                placeholder="Enter admin key from .env"
                required
              />
            </div>
          )}

          {error && (
            <div className="text-xs text-red-500 bg-red-50 rounded-lg p-3">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-apple-dark text-white text-sm font-medium py-2.5 rounded-full hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <button
            type="button"
            onClick={() => setUseKey(!useKey)}
            className="w-full text-xs text-apple-text hover:text-apple-blue transition-colors"
          >
            {useKey ? "Use username & password" : "Use admin secret key"}
          </button>
        </form>
      </div>
    </div>
  );
}
