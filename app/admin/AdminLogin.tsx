"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

const inputClass =
  "w-full rounded-lg border border-charcoal/20 bg-background px-3.5 py-2.5 text-sm text-charcoal placeholder:text-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json();
        setLoginError(data.error || "كلمة المرور غير صحيحة");
      }
    } catch {
      setLoginError("خطأ في الاتصال");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-charcoal/10 bg-surface p-8">
        <h1 className="mb-1 text-xl font-bold text-charcoal">لوحة التحكم</h1>
        <p className="mb-6 text-sm text-muted">أدخل كلمة المرور للمتابعة</p>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="admin-password" className="mb-1.5 block text-xs font-semibold text-charcoal">
              كلمة المرور
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoFocus
              placeholder="••••••••"
            />
          </div>
          {loginError && <p className="text-sm text-red-600">{loginError}</p>}
          <button
            type="submit"
            disabled={loggingIn || !password}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
          >
            {loggingIn && <Loader2 className="h-4 w-4 animate-spin" />}
            دخول
          </button>
        </div>
      </form>
    </div>
  );
}
