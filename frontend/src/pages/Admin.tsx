import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiUrl } from '../lib/api';
import { getSession } from '../lib/auth';

type Dashboard = { userCount: number; projectCount: number; recentUsers: { _id: string; name: string; email: string; role: string; createdAt: string }[]; recentProjects: { _id: string; name: string; category: string; price: string; createdAt: string }[] };
export default function Admin() {
  const [data, setData] = useState<Dashboard | null>(null); const [error, setError] = useState('');
  useEffect(() => { const session = getSession(); fetch(`${apiUrl}/api/admin/dashboard`, { headers: { Authorization: `Bearer ${session?.token}` } }).then(async (response) => { if (!response.ok) throw new Error('Unable to load dashboard'); return response.json(); }).then(setData).catch((err) => setError(err.message)); }, []);
  return <main className="admin-page"><div className="admin-top"><div><p className="eyebrow">KAALYUG CONTROL PANEL</p><h1>Administrator dashboard</h1></div><Link to="/" className="admin-home">← Back to site</Link></div>{error && <p className="auth-error">{error}</p>}{!data ? <p className="admin-loading">Loading dashboard…</p> : <><section className="admin-stats"><Metric label="Registered users" value={data.userCount} /><Metric label="Published projects" value={data.projectCount} /></section><section className="admin-grid"><DataPanel title="Recent users"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead><tbody>{data.recentUsers.map((user) => <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td></tr>)}</tbody></table></DataPanel><DataPanel title="Recent projects"><table><thead><tr><th>Project</th><th>Category</th><th>Access</th></tr></thead><tbody>{data.recentProjects.map((project) => <tr key={project._id}><td>{project.name}</td><td>{project.category}</td><td>{project.price}</td></tr>)}</tbody></table></DataPanel></section></>}</main>;
}
function Metric({ label, value }: { label: string; value: number }) { return <div className="glass metric"><span>{label}</span><strong>{value}</strong></div>; }
function DataPanel({ title, children }: { title: string; children: React.ReactNode }) { return <section className="glass data-panel"><h2>{title}</h2><div className="table-wrap">{children}</div></section>; }
