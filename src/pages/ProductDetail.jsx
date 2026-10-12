import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, brl } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState('');

  useEffect(() => {
    api(`/products/${id}`).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Carregando...</p>;

  return (
    <article className="detail">
      <img src={product.image} alt={product.name} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <strong>{brl(product.price)}</strong>
        <input
          type="number" min="1" max={product.stock} value={qty}
          onChange={(e) => setQty(Math.max(1, Math.min(Number(e.target.value), product.stock)))}
        />
        <button disabled={product.stock === 0} onClick={() => addItem(product, qty)}>
          {product.stock === 0 ? 'Esgotado' : 'Adicionar ao carrinho'}
        </button>
      </div>
    </article>
  );
};