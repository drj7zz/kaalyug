import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getSession } from '../lib/auth';
import '../console.css';

/**
 * Kaalyug Admin Console — rendered at /console.
 * macOS-window style CRM over the /console-api/* endpoints.
 * Route is guarded client-side (admin session required) and every
 * API call is admin-only server-side. Not linked from any public page.
 */

// Console API base — configurable via env (VITE_CONSOLE_API_URL) so deployments
// (Vercel rewrite in prod, local backend in dev) stay out of the source.
const configuredConsoleApiUrl = import.meta.env.VITE_CONSOLE_API_URL?.replace(/\/$/, "");
const API = configuredConsoleApiUrl
  || (import.meta.env.PROD ? '/console-api/admin/console' : 'http://localhost:5000/console-api/admin/console');

type Overview = {
  counts: Record<string, number>;
  last24h: { newUsers: number; newProjects: number };
  totals: { walletBalance: number };
  recentActivity: { _id: string; type: string; amount: number; description: string; createdAt: string }[];
  serverTime: string;
};
type UserRow = { _id: string; name: string; email: string; role: string; createdAt: string };
type ProjectRow = { _id: string; name: string; category: string; tag: string; price: string; author?: { name?: string; email?: string } | null; createdAt: string };
type WalletRow = { _id: string; balance: number; currency?: string; userId: string; user?: { name?: string; email?: string } | null };
type TxRow = { _id: string; userId?: string; type: string; amount: number; description: string; balanceAfter?: number; createdAt: string };
type SystemInfo = {
  node: { nodeVersion: string; uptimeSec: number; memoryRssMb: number; env: string; error?: string };
  mongodb: { database: string | null; collections: { name: string; docs: number | null }[] };
};
type ListPayload<T> = { rows: T[]; total: number; page: number; limit: number };

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'fa-gauge-high' },
  { id: 'users', label: 'Users', icon: 'fa-users' },
  { id: 'projects', label: 'Projects', icon: 'fa-box-archive' },
  { id: 'wallets', label: 'Wallets', icon: 'fa-wallet' },
  { id: 'transactions', label: 'Transactions', icon: 'fa-right-left' },
  { id: 'system', label: 'System', icon: 'fa-microchip' },
] as const;
type TabId = (typeof TABS)[number]['id'];

const fmt = (n: number | undefined) => (n ?? 0).toLocaleString();
const money = (n: number | undefined) => `₹${(n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
const when = (iso?: string) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : '—');

export default function Console() {
  const session = getSession();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabId>('overview');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [notice, setNotice] = useState('');

  const [error, setError] = useState('');

  const authHeaders = useMemo(
    () => ({ Authorization: `Bearer ${session?.token}` }),
    [session?.token]
  );

  const api = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const res = await fetch(`${API}${path}`, { headers: authHeaders, ...init });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || body.status === false) throw new Error(body.message || 'Request failed');
      return body.data as T;
    },
    [authHeaders]
  );

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(''), 3000);
  };

  if (!session || session.role !== 'admin') return <Navigate to="/login" replace />;

  return (
    <main className="console">
      <div className="console-window slide-in">
        {/* Title bar */}
        <div className="console-titlebar">
          <div className="console-lights">
            <button className="console-light red" aria-label="Close" onClick={() => navigate('/')} />
            <button className="console-light yellow" aria-label="Minimize" />
            <button className="console-light green" aria-label="Maximize" />
          </div>
          <div className="console-title">
            <i className="fa-solid fa-shield-halved" style={{ marginRight: 6, opacity: 0.6 }} />
            Kaalyug Console — {session.email}
          </div>
          <div className="console-titlebar-spacer" />
        </div>

        <div className="console-body">
          {/* Sidebar */}
          <nav className="console-sidebar">
            <div>
              <p className="console-side-label">Manage</p>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  className={`console-nav-btn${tab === t.id ? ' active' : ''}`}
                  onClick={() => { setTab(t.id); setPage(1); setSearch(''); }}
                >
                  <i className={`fa-solid ${t.icon}`} /> {t.label}
                </button>
              ))}
            </div>
            <div>
              <p className="console-side-label">Site</p>
              <button className="console-nav-btn" onClick={() => navigate('/')}>
                <i className="fa-solid fa-globe" /> Open site
              </button>
              <button
                className="console-nav-btn"
                onClick={() => { localStorage.removeItem('userInfo'); navigate('/login'); }}
              >
                <i className="fa-solid fa-arrow-right-from-bracket" /> Sign out
              </button>
            </div>
            <p className="console-side-foot">Signed in as<br /><strong>{session.name}</strong><br />admin session</p>
          </nav>

          {/* Content */}
          <section className="console-content">
            {error && <div className="console-notice error"><i className="fa-solid fa-triangle-exclamation" /> {error}</div>}
            {notice && <div className="console-notice" style={{ background: '#e2f6e8', color: '#1a7f3c', border: '1px solid rgba(26,127,60,.25)' }}>{notice}</div>}

            {tab === 'overview' && <OverviewTab api={api} />}
            {tab === 'users' && <UsersTab api={api} search={search} setSearch={setSearch} page={page} setPage={setPage} onDone={(m) => flash(m)} onError={setError} />}
            {tab === 'projects' && <ProjectsTab api={api} search={search} setSearch={setSearch} page={page} setPage={setPage} onDone={(m) => flash(m)} onError={setError} />}
            {tab === 'wallets' && <WalletsTab api={api} />}
            {tab === 'transactions' && <TransactionsTab api={api} />}
            {tab === 'system' && <SystemTab api={api} />}
          </section>
        </div>
      </div>
    </main>
  );
}

/* ---------------- Tabs ---------------- */

type Api = <T,>(path: string, init?: RequestInit) => Promise<T>;

function Header({ title, sub, children }: { title: string; sub?: string; children?: React.ReactNode }) {
  return (
    <header className="console-content-header">
      <div><h1>{title}</h1>{sub && <p>{sub}</p>}</div>
      {children}
    </header>
  );
}

function useFetch<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState('');
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let live = true;
    setError('');
    fn().then((d) => live && setData(d)).catch((e) => live && setError(e.message));
    return () => { live = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);
  return { data, error, reload: () => setTick((t) => t + 1) };
}

function OverviewTab({ api }: { api: Api }) {
  const { data, error } = useFetch<Overview>(() => api<Overview>('/overview'), [api]);
  if (error) return <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>;
  if (!data) return <div className="console-state"><i className="fa-solid fa-spinner fa-spin" />Loading overview…</div>;

  const c = data.counts;
  return <>
    <Header title="Overview" sub={`Live snapshot · server time ${when(data.serverTime)}`} />
    <div className="console-stats">
      <Stat label="Users" value={fmt(c.users)} note={`+${data.last24h.newUsers} in 24h`} />
      <Stat label="Projects" value={fmt(c.projects)} note={`+${data.last24h.newProjects} in 24h`} />
      <Stat label="Wallets" value={fmt(c.wallets)} />
      <Stat label="Transactions" value={fmt(c.transactions)} />
      <Stat label="Wallet balance" value={money(data.totals.walletBalance)} />
      <Stat label="Admins" value={fmt(c.admins)} />
    </div>
    <div className="console-panel">
      <table>
        <thead><tr><th>Recent activity</th><th>Amount</th><th>When</th></tr></thead>
        <tbody>
          {data.recentActivity.length === 0 && <tr><td colSpan={3}>No activity yet.</td></tr>}
          {data.recentActivity.map((t) => (
            <tr key={t._id}>
              <td>{t.description || t.type}</td>
              <td><span className={`console-badge ${t.amount >= 0 ? 'credit' : 'debit'}`}>{money(Math.abs(t.amount))}</span></td>
              <td>{when(t.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>;
}
function Stat({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="console-stat"><span>{label}</span><strong>{value}</strong>{note && <small>{note}</small>}</div>;
}

const PAGE_SIZE = 20;
function Pager({ total, page, limit, onPage }: { total: number; page: number; limit: number; onPage: (p: number) => void }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  return (
    <div className="console-foot">
      <span>{fmt(total)} record{total === 1 ? '' : 's'} · page {page} of {pages}</span>
      <div className="console-pages">
        <button className="console-act" disabled={page <= 1} onClick={() => onPage(page - 1)}>‹ Prev</button>
        <button className="console-act" disabled={page >= pages} onClick={() => onPage(page + 1)}>Next ›</button>
      </div>
    </div>
  );
}

function UsersTab({ api, search, setSearch, page, setPage, onDone, onError }: {
  api: Api; search: string; setSearch: (s: string) => void; page: number; setPage: (p: number) => void;
  onDone: (msg: string) => void; onError: (msg: string) => void;
}) {
  const q = useDebounce(search);
  const { data, error, reload } = useFetch<ListPayload<UserRow>>(
    () => api<ListPayload<UserRow>>(`/users?page=${page}&limit=${PAGE_SIZE}&q=${encodeURIComponent(q)}`),
    [api, q, page]
  );
  const [busy, setBusy] = useState('');

  const act = async (id: string, label: string, fn: () => Promise<unknown>) => {
    setBusy(id + label);
    try { await fn(); onDone(label === 'delete' ? 'User deleted' : 'User updated'); reload(); }
    catch (e) { onError((e as Error).message); }
    finally { setBusy(''); }
  };

  return <>
    <Header title="Users" sub="Manage accounts, roles and access">
      <input className="console-search" placeholder="Search name or email…" value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
    </Header>
    {error && <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>}
    {data && <>
      <div className="console-panel">
        <div className="console-table-wrap">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {data.rows.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.name || '—'}</strong></td>
                  <td>{u.email}</td>
                  <td><span className={`console-badge ${u.role}`}>{u.role}</span></td>
                  <td>{when(u.createdAt)}</td>
                  <td>
                    <div className="console-row-actions">
                      <button className="console-act" disabled={busy === u._id + 'role'}
                        onClick={() => act(u._id, 'role', () =>
                          api(`/users/${u._id}`, { method: 'PATCH', body: JSON.stringify({ role: u.role === 'admin' ? 'user' : 'admin' }) }))}>
                        {u.role === 'admin' ? 'Demote' : 'Promote'}
                      </button>
                      <button className="console-act danger" disabled={busy === u._id + 'delete'}
                        onClick={() => window.confirm(`Delete ${u.email}? This also wipes their wallet.`) &&
                          act(u._id, 'delete', () => api(`/users/${u._id}`, { method: 'DELETE' }))}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.rows.length === 0 && <tr><td colSpan={5}>No users match “{search}”.</td></tr>}
            </tbody>
          </table>
        </div>
        <Pager total={data.total} page={data.page} limit={data.limit} onPage={setPage} />
      </div>
    </>}
  </>;
}

function ProjectsTab({ api, search, setSearch, page, setPage, onDone, onError }: {
  api: Api; search: string; setSearch: (s: string) => void; page: number; setPage: (p: number) => void;
  onDone: (msg: string) => void; onError: (msg: string) => void;
}) {
  const q = useDebounce(search);
  const { data, error, reload } = useFetch<ListPayload<ProjectRow>>(
    () => api<ListPayload<ProjectRow>>(`/projects?page=${page}&limit=${PAGE_SIZE}&q=${encodeURIComponent(q)}`),
    [api, q, page]
  );
  const [busy, setBusy] = useState('');

  return <>
    <Header title="Projects" sub="All published marketplace listings">
      <input className="console-search" placeholder="Search name, category…" value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
    </Header>
    {error && <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>}
    {data && <div className="console-panel">
      <div className="console-table-wrap">
        <table>
          <thead><tr><th>Project</th><th>Category</th><th>Author</th><th>Price</th><th>Created</th><th>Actions</th></tr></thead>
          <tbody>
            {data.rows.map((p) => (
              <tr key={p._id}>
                <td><strong>{p.name}</strong></td>
                <td>{p.category || '—'}</td>
                <td>{p.author?.email || p.author?.name || 'unassigned'}</td>
                <td>{p.price || 'free'}</td>
                <td>{when(p.createdAt)}</td>
                <td>
                  <button className="console-act danger" disabled={busy === p._id}
                    onClick={() => window.confirm(`Delete project “${p.name}”?`) &&
                      api(`/projects/${p._id}`, { method: 'DELETE' })
                        .then(() => { onDone('Project deleted'); reload(); })
                        .catch((e) => onError((e as Error).message))
                        .finally(() => setBusy(''))}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {data.rows.length === 0 && <tr><td colSpan={6}>No projects match “{search}”.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager total={data.total} page={data.page} limit={data.limit} onPage={setPage} />
    </div>}
  </>;
}

function WalletsTab({ api }: { api: Api }) {
  const [page, setPage] = useState(1);
  const payload = useFetch<ListPayload<WalletRow> & { totalBalance: number }>(
    () => api<ListPayload<WalletRow> & { totalBalance: number }>(`/wallets?page=${page}&limit=${PAGE_SIZE}`),
    [api, page]
  );
  const { data, error } = payload;
  return <>
    <Header title="Wallets" sub={data ? `Total balance across wallets: ${money(data.totalBalance)}` : 'Wallet balances per user'} />
    {error && <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>}
    {data && <div className="console-panel">
      <div className="console-table-wrap">
        <table>
          <thead><tr><th>Owner</th><th>Email</th><th>Balance</th><th>Currency</th></tr></thead>
          <tbody>
            {data.rows.map((w) => (
              <tr key={w._id}>
                <td><strong>{w.user?.name || w.userId}</strong></td>
                <td>{w.user?.email || '—'}</td>
                <td>{money(w.balance)}</td>
                <td>{w.currency || 'INR'}</td>
              </tr>
            ))}
            {data.rows.length === 0 && <tr><td colSpan={4}>No wallets yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager total={data.total} page={data.page} limit={data.limit} onPage={setPage} />
    </div>}
  </>;
}

function TransactionsTab({ api }: { api: Api }) {
  const [page, setPage] = useState(1);
  const { data, error } = useFetch<ListPayload<TxRow>>(
    () => api<ListPayload<TxRow>>(`/transactions?page=${page}&limit=${PAGE_SIZE}`),
    [api, page]
  );
  return <>
    <Header title="Transactions" sub="Ledger of all wallet movements" />
    {error && <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>}
    {data && <div className="console-panel">
      <div className="console-table-wrap">
        <table>
          <thead><tr><th>Description</th><th>Type</th><th>Amount</th><th>Balance after</th><th>When</th></tr></thead>
          <tbody>
            {data.rows.map((t) => (
              <tr key={t._id}>
                <td>{t.description || '—'}</td>
                <td><span className={`console-badge ${t.type}`}>{t.type}</span></td>
                <td>{money(t.amount)}</td>
                <td>{t.balanceAfter != null ? money(t.balanceAfter) : '—'}</td>
                <td>{when(t.createdAt)}</td>
              </tr>
            ))}
            {data.rows.length === 0 && <tr><td colSpan={5}>No transactions yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <Pager total={data.total} page={data.page} limit={data.limit} onPage={setPage} />
    </div>}
  </>;
}

function SystemTab({ api }: { api: Api }) {
  const { data, error } = useFetch<SystemInfo>(() => api<SystemInfo>('/system'), [api]);
  if (error) return <div className="console-state"><i className="fa-solid fa-plug-circle-xmark" />{error}</div>;
  if (!data) return <div className="console-state"><i className="fa-solid fa-spinner fa-spin" />Inspecting system…</div>;
  return <>
    <Header title="System" sub="Runtime health and database inventory" />
    <div className="console-stats">
      <Stat label="Node.js" value={data.node.nodeVersion || '—'} />
      <Stat label="Uptime" value={`${Math.floor((data.node.uptimeSec || 0) / 60)}m`} />
      <Stat label="Memory (RSS)" value={`${data.node.memoryRssMb || 0} MB`} />
      <Stat label="Environment" value={data.node.env || '—'} />
    </div>
    <div className="console-panel">
      <table>
        <thead><tr><th>Collection</th><th>Documents (approx.)</th></tr></thead>
        <tbody>
          {data.mongodb.collections.map((c) => (
            <tr key={c.name}><td>{c.name}</td><td>{c.docs == null ? '—' : fmt(c.docs)}</td></tr>
          ))}
          {data.mongodb.collections.length === 0 && <tr><td colSpan={2}>No collections visible.</td></tr>}
        </tbody>
      </table>
    </div>
  </>;
}

/* ---------------- utils ---------------- */

function useDebounce(value: string, delay = 350) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setV(value), delay);
    return () => window.clearTimeout(t);
  }, [value, delay]);
  return v;
}
