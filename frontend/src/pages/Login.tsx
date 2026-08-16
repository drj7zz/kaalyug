import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl, readApiError } from '../lib/api';
import { saveSession } from '../lib/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setLoading(true); setError('');
    try {
      const response = await fetch(`${apiUrl}/api/users/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      if (!response.ok) throw new Error(await readApiError(response, 'Unable to sign in'));
      const user = await response.json(); saveSession(user); navigate(user.role === 'admin' ? '/admin' : '/');
    } catch (err) { setError(err instanceof Error ? err.message : 'Server error. Please try again.'); } finally { setLoading(false); }
  };
  return <AuthCard title="Welcome Back" error={error}><form onSubmit={submit} className="flex flex-col gap-4"><Input type="email" placeholder="Email" value={email} onChange={setEmail} autoComplete="email" /><Input type="password" placeholder="Password" value={password} onChange={setPassword} autoComplete="current-password" /><button disabled={loading} className="auth-button">{loading ? 'Logging in...' : 'Login'}</button></form><p className="auth-foot">Don't have an account? <Link to="/register">Register</Link></p></AuthCard>;
}
export function Input({ type, placeholder, value, onChange, autoComplete }: { type: string; placeholder: string; value: string; onChange: (value: string) => void; autoComplete: string }) { return <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} autoComplete={autoComplete} minLength={type === 'password' ? 8 : undefined} required className="auth-input" />; }
export function AuthCard({ title, error, children }: { title: string; error: string; children: React.ReactNode }) { return <main className="auth-page"><section className="glass auth-card"><h1>{title}</h1>{error && <p className="auth-error">{error}</p>}{children}</section></main>; }
