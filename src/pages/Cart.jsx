import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { api, brl } from '../services/api';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleCheckout() {
    setSubmitting(true);
    setError('');

    try {
      const { init_point } = await api('/orders', {
        method: 'POST',
        body: {
          items: items.map((i) => ({ productId: i._id, quantity: i.quantity })),
        },
      });

      window.location.href = init_point;
    } catch (e) {
      setError(e.message);
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <section>
        <p>Seu carrinho está vazio.</p>
        <Link to="/">Voltar para a loja</Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>Carrinho</h1>

      {items.map((item) => (
        <div key={item._id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>{brl(item.price)}</p>
          </div>
          <input
            type="number"
            min="1"
            max={item.stock}
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
          />
          <strong>{brl(item.price * item.quantity)}</strong>
          <button onClick={() => removeItem(item._id)}>Remover</button>
        </div>
      ))}

      <footer>
        <strong>Total: {brl(total)}</strong>
        {error && <p className="error">{error}</p>}
        <button onClick={handleCheckout} disabled={submitting}>
          {submitting ? 'Redirecionando...' : 'Finalizar compra'}
        </button>
      </footer>
    </section>
  );
}