import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';
import WalletPage from './pages/WalletPage';
import PublishPage from './pages/PublishPage';
import EcosystemPage from './pages/EcosystemPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import YugcoinLogin from './pages/YugcoinLogin';
import YugcoinRegister from './pages/YugcoinRegister';
import { getSession } from './lib/auth';

function RequireAdmin() {
  const session = getSession();
  return session?.role === 'admin' ? <Admin /> : <Navigate to="/login" replace />;
}

/** Publishing is for signed-in users only — guests are sent to login. */
function RequireAuth() {
  const session = getSession();
  return session ? <PublishPage /> : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/wallet" element={<WalletPage />} />
      <Route path="/publish" element={<RequireAuth />} />
      <Route path="/ecosystem" element={<EcosystemPage />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/yugcoin/login" element={<YugcoinLogin />} />
    <Route path="/yugcoin/register" element={<YugcoinRegister />} />
    <Route path="/admin" element={<RequireAdmin />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
