import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { readApiError, yugcoinApiUrl } from '../lib/api';
import { saveYugcoinSession } from '../lib/yugcoinAuth';
import { AuthCard, Input } from './Login';
import { toYugcoinSession } from './YugcoinLogin';

export default function YugcoinRegister() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [securityPin, setSecurityPin] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(''); try { const response = await fetch(`${yugcoinApiUrl}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, securityPin }) }); if (!response.ok) throw new Error(await readApiError(response, 'Unable to create YugCoin account')); saveYugcoinSession(toYugcoinSession(await response.json())); navigate('/#wallet'); } catch (err) { setError(err instanceof Error ? err.message : 'Server error. Please try again.'); } finally { setLoading(false); } };
  return <AuthCard title="Create YugCoin Wallet" error={error}><form onSubmit={submit} className="flex flex-col gap-4"><Input type="text" placeholder="Name" value={name} onChange={setName} autoComplete="name" /><Input type="email" placeholder="YugCoin email" value={email} onChange={setEmail} autoComplete="email" /><Input type="password" placeholder="Password (8+ characters)" value={password} onChange={setPassword} autoComplete="new-password" /><input type="password" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} placeholder="4-digit security PIN" value={securityPin} onChange={event => setSecurityPin(event.target.value.replace(/\D/g, ''))} autoComplete="off" required className="auth-input" /><button disabled={loading} className="auth-button">{loading ? 'Creating wallet...' : 'Create YugCoin wallet'}</button></form><p className="auth-foot">Already have a YugCoin wallet? <Link to="/yugcoin/login">Login</Link></p></AuthCard>;
}
