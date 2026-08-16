import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiUrl, readApiError } from '../lib/api';
import { saveSession } from '../lib/auth';
import { AuthCard, Input } from './Login';

export default function Register() {
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [loading, setLoading] = useState(false); const navigate = useNavigate();
  const submit = async (event: FormEvent) => { event.preventDefault(); setLoading(true); setError(''); try { const response = await fetch(`${apiUrl}/api/users/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) }); if (!response.ok) throw new Error(await readApiError(response, 'Unable to create account')); saveSession(await response.json()); navigate('/'); } catch (err) { setError(err instanceof Error ? err.message : 'Server error. Please try again.'); } finally { setLoading(false); } };
  return <AuthCard title="Create Account" error={error}><form onSubmit={submit} className="flex flex-col gap-4"><Input type="text" placeholder="Name" value={name} onChange={setName} autoComplete="name" /><Input type="email" placeholder="Email" value={email} onChange={setEmail} autoComplete="email" /><Input type="password" placeholder="Password (8+ characters)" value={password} onChange={setPassword} autoComplete="new-password" /><button disabled={loading} className="auth-button">{loading ? 'Creating account...' : 'Create account'}</button></form><p className="auth-foot">Already have an account? <Link to="/login">Login</Link></p></AuthCard>;
}
