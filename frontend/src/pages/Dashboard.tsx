import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSession } from '../lib/auth';
import { marketplaceApiUrl, readApiError } from '../lib/api';

type Published = { _id: string; name?: string; title?: string; category?: string; price?: number; createdAt?: string };

/** Signed-in dashboard — the workspace view (distinct from the marketing hero). */
export default function Dashboard() {
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

  const stats = [
    { label: 'PROJECTS PUBLISHED', value: loading ? '…' : String(products.length), icon: 'fa-cube', tone: '#22a04a' },
    { label: 'TOTAL DOWNLOADS', value: '—', icon: 'fa-download', tone: '#f59e0b' },
    { label: 'ACCOUNT TYPE', value: session?.role === 'admin' ? 'Admin' : 'Developer', icon: 'fa-user', tone: '#64748b' },
  ];

  const actions = [
    { to: '/publish', icon: 'fa-cloud-arrow-up', title: 'Publish a project', text: 'Ship something new to the marketplace.' },
    { to: '/marketplace', icon: 'fa-store', title: 'Explore marketplace', text: 'Discover what other builders shipped.' },
    { to: '/profile', icon: 'fa-user', title: 'Edit your profile', text: 'Manage your public identity.' },
  ];

  return (
    <main className="w-[min(94%,1150px)] mx-auto pt-[40px] pb-[60px]">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-[16px]">
        <div>
          <p className="eyebrow m-0" style={{ fontFamily: 'var(--font-body)' }}>DASHBOARD</p>
          <h1 className="mt-[6px] text-[1.6rem] font-black text-[#1e293b] m-0">
            Welcome back, {session?.name?.split(' ')[0] ?? 'builder'}.
          </h1>
          <p className="mt-[6px] text-[#64748b] text-[0.88rem] m-0">
            Your workspace across the Kaalyug ecosystem.
          </p>
        </div>
        <Link to="/publish" className="btn-primary no-underline text-[12px]" style={{ textDecoration: 'none' }}>
          <i className="fa-solid fa-plus text-[10px]"></i> New project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mt-[26px]">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-[18px]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.08em] text-[#64748b] font-bold">{s.label}</span>
              <span
                className="w-[30px] h-[30px] grid place-items-center rounded-[9px] text-[12px]"
                style={{ background: `${s.tone}18`, color: s.tone }}
              >
                <i className={`fa-solid ${s.icon}`}></i>
              </span>
            </div>
            <div className="mt-[10px] text-[1.7rem] font-black text-[#1e293b] leading-none">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-[14px] mt-[14px] items-start">
        {/* Projects */}
        <section className="glass-card p-[22px]">
          <p className="profile-section-head">PUBLISHED</p>
          <h2 className="mt-[4px] text-[1.1rem] font-bold text-[#1e293b] m-0">Your projects</h2>
          {error && <p className="text-[#e11d48] text-[0.8rem]">{error}</p>}
          {loading ? (
            <p className="text-[#64748b] text-[0.84rem]">Loading…</p>
          ) : products.length ? (
            <div className="flex flex-col mt-[12px]">
              {products.map((p) => (
                <div key={p._id} className="flex items-center justify-between py-[12px] border-b border-[#e2e8f0] last:border-0">
                  <div className="flex items-center gap-[12px]">
                    <span className="w-[34px] h-[34px] grid place-items-center rounded-[10px] text-[#22a04a] bg-[rgba(34,160,74,0.1)] text-[12px]">
                      <i className="fa-solid fa-cube"></i>
                    </span>
                    <div>
                      <strong className="block text-[12px] text-[#1e293b]">{p.name ?? p.title ?? 'Untitled'}</strong>
                      <small className="block text-[10px] text-[#64748b]">{p.category ?? 'Project'}</small>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#1b8a3e]">
                    {p.price ? `$${p.price}` : 'FREE'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-[10px] text-[#64748b] text-[0.84rem]">
              Nothing published yet.{' '}
              <Link to="/publish" className="text-[#22a04a] no-underline">Publish your first project</Link>.
            </p>
          )}
        </section>

        {/* Quick actions */}
        <section className="glass-card p-[22px]">
          <p className="profile-section-head">SHORTCUTS</p>
          <h2 className="mt-[4px] text-[1.1rem] font-bold text-[#1e293b] m-0">Quick actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[10px] mt-[14px]">
            {actions.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="no-underline p-[14px] rounded-[12px] border border-[#e2e8f0] bg-[#f8fafc] hover:bg-[#eef2f7] hover:border-[#cbd5e1] transition-colors"
              >
                <span className="w-[30px] h-[30px] grid place-items-center rounded-[9px] text-[#22a04a] bg-[rgba(34,160,74,0.1)] text-[12px] mb-[8px]">
                  <i className={`fa-solid ${a.icon}`}></i>
                </span>
                <strong className="block text-[12px] text-[#1e293b]">{a.title}</strong>
                <small className="block text-[10px] text-[#64748b] mt-[2px]">{a.text}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
