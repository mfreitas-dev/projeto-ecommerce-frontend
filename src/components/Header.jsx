import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { count } = useCart();
  const { isAuthenticated } = useAuth();

  return (
    <header className="header">
      <Link to="/" className="logo">Loja: PROJETO MCODEON</Link>
      <nav>
        {isAuthenticated && <Link to="/admin">Admin</Link>}
        <Link to="/carrinho">Carrinho ({count})</Link>
      </nav>
    </header>
  );
};