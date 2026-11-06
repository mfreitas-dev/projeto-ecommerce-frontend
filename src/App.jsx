import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import CheckoutResult from './pages/CheckoutResult';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout/:status" element={<CheckoutResult />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </>
  );
};