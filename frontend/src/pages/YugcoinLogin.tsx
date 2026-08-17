import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getApiData, readApiError, yugcoinApiUrl } from '../lib/api';
import { saveYugcoinSession, YugcoinSession } from '../lib/yugcoinAuth';
import { AuthCard, Input } from './Login';

type YugcoinAuthResponse = { token?: string; user?: { id?: string; _id?: string; name?: string; email?: string }; id?: string; _id?: string; name?: string; email?: string };

export function toYugcoinSession(payload: YugcoinAuthResponse): YugcoinSession {
  const data = getApiData(payload) as YugcoinAuthResponse;
  const user = data.user ?? data;
  const id = user.id ?? user._id;
  if (!data.token || !id || !user.name || !user.email) throw new Error('The YugCoin service returned an incomplete account session.');
  return { id, name: user.name, email: user.email, token: data.token };
}

export default function YugcoinLogin() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(''); try { const response = await fetch(`${yugcoinApiUrl}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) }); if (!response.ok) throw new Error(await readApiError(response, 'Unable to sign in to YugCoin')); saveYugcoinSession(toYugcoinSession(await response.json())); navigate('/#wallet'); } catch (err) { setError(err instanceof Error ? err.message : 'Server error. Please try again.'); } finally { setLoading(false); } };
  return <AuthCard title="YugCoin Wallet Login" error={error}><form onSubmit={submit} className="flex flex-col gap-4"><Input type="email" placeholder="YugCoin email" value={email} onChange={setEmail} autoComplete="email" /><Input type="password" placeholder="YugCoin password" value={password} onChange={setPassword} autoComplete="current-password" /><button disabled={loading} className="auth-button">{loading ? 'Logging in...' : 'Login to YugCoin'}</button></form><p className="auth-foot">Need a YugCoin wallet? <Link to="/yugcoin/register">Create wallet account</Link></p><p className="auth-foot"><Link to="/login">Marketplace login</Link></p></AuthCard>;
}
