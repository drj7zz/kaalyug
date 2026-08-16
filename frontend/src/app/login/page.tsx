"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl, readApiError } from "@/lib/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
        router.push("/");
      } else {
        setError(await readApiError(res, "Unable to sign in"));
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="glass p-[30px] rounded-[24px] w-full max-w-[400px]">
        <h2 className="text-[23px] font-bold mb-[20px]">Welcome Back</h2>
        {error && <div className="text-[#ff8799] text-xs mb-4">{error}</div>}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="w-full px-[14px] py-[11px] outline-none rounded-[13px] text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            minLength={8}
            required
            className="w-full px-[14px] py-[11px] outline-none rounded-[13px] text-white bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#1e1e24] hover:bg-[#2a2a32] text-white py-[11px] rounded-[13px] transition font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-[20px] text-xs text-[#858691] text-center">
          Don&apos;t have an account? <a href="/register" className="text-[#58c7ff]">Register</a>
        </p>
      </div>
    </div>
  );
}
