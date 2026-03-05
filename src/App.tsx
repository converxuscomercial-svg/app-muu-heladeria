import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Promos from './pages/Promos';
import Club from './pages/Club';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';

const AdminProducts = () => <div className="text-center py-20 text-4xl font-display font-bold italic text-muu-blue">ADMIN: PRODUCTOS</div>;
const AdminPromos = () => <div className="text-center py-20 text-4xl font-display font-bold italic text-muu-blue">ADMIN: PROMOS</div>;
const AdminUsers = () => <div className="text-center py-20 text-4xl font-display font-bold italic text-muu-blue">ADMIN: CLUB</div>;
const AdminSettings = () => <div className="text-center py-20 text-4xl font-display font-bold italic text-muu-blue">ADMIN: AJUSTES</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="promos" element={<Promos />} />
          <Route path="club" element={<Club />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="promos" element={<AdminPromos />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
