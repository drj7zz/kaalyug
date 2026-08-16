import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marketplace from './components/Marketplace';
import Wallet from './components/Wallet';
import Publish from './components/Publish';
import Ecosystem from './components/Ecosystem';
import Stats from './components/Stats';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import { getSession } from './lib/auth';

function Home() {
  return <><Navbar /><main><Hero /><Marketplace /><Wallet /><Publish /><Ecosystem /><Stats /><CTA /></main><Footer /></>;
}

function RequireAdmin() {
  const session = getSession();
  return session?.role === 'admin' ? <Admin /> : <Navigate to="/login" replace />;
}

export default function App() {
  return <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/admin" element={<RequireAdmin />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>;
}
