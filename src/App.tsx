import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Promos from './pages/Promos';
import Club from './pages/Club';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminPromos from './pages/AdminPromos';
import AdminUsers from './pages/AdminUsers';
import AdminSettings from './pages/AdminSettings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public app */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="promos" element={<Promos />} />
          <Route path="club" element={<Club />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Admin panel */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="promos" element={<AdminPromos />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
