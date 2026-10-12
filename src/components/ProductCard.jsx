import { Link } from 'react-router-dom';
import { brl } from '../services/api';

export default function ProductCard({ product }) {
  return (
    <Link to={`/produto/${product._id}`} className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{brl(product.price)}</p>
      {product.stock === 0 && <span className="badge">Esgotado</span>}
    </Link>
  );
};