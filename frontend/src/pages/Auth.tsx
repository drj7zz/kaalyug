import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceApiUrl, readApiError } from '../lib/api';
import { saveSession } from '../lib/auth';

type UserSession = { _id: string; name: string; email: string; role: 'user' | 'admin'; token: string };

type Mode = 'login' | 'register';

/** Combined auth screen — Login / Create Account stitched as one glass card. */
export default function Auth() {
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const finish = (user: UserSession) => {
    saveSession(user);
    if (!remember) sessionStorage.setItem('kaalyugSessionOnly', '1');
    navigate(user.role === 'admin' ? '/admin' : '/');
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true); setError('');
    try {
      const endpoint = mode === 'login' ? '/users/login' : '/users/register';
      const body = mode === 'login' ? { email, password } : { name, email, password };
      const response = await fetch(`${marketplaceApiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(await readApiError(response, 'Unable to continue'));
      finish(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next); setError(''); setPassword('');
  };




  return (
    <main className="auth-page">
      <section className="auth-card">

        {/* Pill switch: Login | Create Account */}
        <div className="auth-switch">
          <button type="button" onClick={() => switchMode('login')} data-active={mode === 'login'}>
            Login
          </button>
          <button type="button" onClick={() => switchMode('register')} data-active={mode === 'register'}>
            Create Account
          </button>
        </div>

        <div>
          <h1 className="text-[1.35rem] font-bold text-[#1e293b] mb-[6px]">
            {mode === 'login' ? 'Welcome back' : 'Join Kaalyug'}
          </h1>
          <p className="text-[#64748b] text-[0.84rem] m-0">
            {mode === 'login' ? 'Sign in to your marketplace account.' : 'Publish projects to the marketplace.'}
          </p>
        </div>

        <p className="auth-disclaimer m-0">
          {mode === 'login'
            ? 'Use your Kaalyug marketplace account.'
            : 'Free to use. Publish projects and make them discoverable to the community.'}
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={submit} className="flex flex-col gap-[14px]">
          {mode === 'register' && (
            <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)}
              autoComplete="name" required minLength={2}
              className="auth-input" />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
            autoComplete="email" required
            className="auth-input" />
          <input type="password" placeholder={mode === 'register' ? 'Password (8+ characters)' : 'Password'}
            value={password} onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            required minLength={8}
            className="auth-input" />

          {mode === 'login' && (
            <label className="flex items-center gap-2 text-[12px] text-[#64748b] cursor-pointer select-none">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)}
                className="accent-[#22a04a] w-[14px] h-[14px]" />
              Remember me
            </label>
          )}

          <button disabled={loading} className="auth-button">
            {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create account'}
          </button>
        </form>

        <div className="auth-flat-links">
          {mode === 'login'
            ? <button type="button" onClick={() => switchMode('register')}>New here? Create an account</button>
            : <button type="button" onClick={() => switchMode('login')}>Already have an account? Login</button>}
        </div>
      </section>
    </main>
  );
}