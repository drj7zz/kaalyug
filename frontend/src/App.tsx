import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';
import PublishPage from './pages/PublishPage';
import EcosystemPage from './pages/EcosystemPage';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Admin from './pages/Admin';
import { getSession } from './lib/auth';

function RequireAdmin() {
  const session = getSession();
  return session?.role === 'admin' ? <Admin /> : <Navigate to="/login" replace />;
}

/** Publishing & dashboard are for signed-in users only — guests are sent to login. */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const session = getSession();
  return session ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/publish" element={<RequireAuth><PublishPage /></RequireAuth>} />
      <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/ecosystem" element={<EcosystemPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/profile" element={<Profile />} />
    </Route>
    <Route path="/admin" element={<RequireAdmin />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
