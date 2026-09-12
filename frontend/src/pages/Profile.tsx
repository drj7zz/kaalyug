import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSession } from '../lib/auth';
import { marketplaceApiUrl, readApiError } from '../lib/api';

type Published = { _id: string; name?: string; title?: string; category?: string; createdAt?: string };

/** Profile page — profile-layout: sticky sidebar + main sections. */
export default function Profile() {
  const session = getSession();
  const [products, setProducts] = useState<Published[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!session) return;
    (async () => {
      try {
        const res = await fetch(`${marketplaceApiUrl}/projects/mine`, {
          headers: { Authorization: `Bearer ${session.token}` },
        });
        if (!res.ok) throw new Error(await readApiError(res, 'Could not load your projects'));
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load your projects');
      } finally {
        setLoading(false);
      }
    })();
  }, [session?.token]);

  if (!session) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <h1 className="text-[1.35rem] font-bold text-[#1e293b] m-0">Sign in required</h1>
          <p className="text-[#64748b] text-[0.84rem] m-0">You need an account to view your profile.</p>
          <Link to="/login" className="auth-button" style={{ textDecoration: 'none', textAlign: 'center' }}>
            Login
          </Link>
        </section>
      </main>
    );
  }

  const initial = session.name.charAt(0).toUpperCase();

  return (
    <main className="profile-layout">
      {/* Sticky sidebar */}
      <aside className="glass-card profile-side">
        <div className="profile-side-avatar">{initial}</div>
        <div className="text-[1.05rem] font-bold text-[#1e293b]">{session.name}</div>
        <span className="profile-side-badge">{session.role === 'admin' ? 'ADMIN' : 'DEVELOPER'}</span>
        <div className="profile-side-facts">
          <div className="profile-fact">
            <span>Member since</span>
            <strong>—</strong>
          </div>
          <div className="profile-fact">
            <span>Projects published</span>
            <strong>{loading ? '…' : products.length}</strong>
          </div>
          <div className="profile-fact">
            <span>Account type</span>
            <strong>{session.role === 'admin' ? 'Admin' : 'Developer'}</strong>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="profile-main">
        <section className="glass-card profile-section">
          <p className="profile-section-head">ACCOUNT</p>
          <h2>Your details</h2>
          <div className="profile-rows">
            <div>
              <dt>Name</dt>
              <dd>{session.name}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{session.email}</dd>
            </div>
            <div>
              <dt>User ID</dt>
              <dd className="mono-id">{session._id}</dd>
            </div>
            {session.role === 'admin' && (
              <div>
                <dt>Tools</dt>
                <dd>
                  <Link to="/admin" className="text-[#22a04a] no-underline">Open admin panel</Link>
                </dd>
              </div>
            )}
          </div>
        </section>

        <section className="glass-card profile-section">
          <p className="profile-section-head">PUBLISHED</p>
          <h2>Your projects</h2>
          {error && <p className="profile-notice" style={{ color: '#e11d48', fontSize: '0.8rem' }}>{error}</p>}
          {loading ? (
            <p className="text-[#64748b] text-[0.84rem]">Loading…</p>
          ) : products.length ? (
            <div className="profile-rows">
              {products.map((p) => (
                <div key={p._id}>
                  <dt>{p.category ?? 'Project'}</dt>
                  <dd>{p.name ?? p.title ?? 'Untitled'}</dd>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#64748b] text-[0.84rem]">
              Nothing published yet. <Link to="/publish" className="text-[#22a04a] no-underline">Publish your first project</Link>.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
