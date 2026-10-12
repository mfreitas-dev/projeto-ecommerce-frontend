import { useEffect, useState } from 'react';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('todas');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/products')
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['todas', ...new Set(products.map((p) => p.category))];
  const visible =
    category === 'todas' ? products : products.filter((p) => p.category === category);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <div className="filters">
        {categories.map((c) => (
          <button key={c} onClick={() => setCategory(c)} className={c === category ? 'active' : ''}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid">
        {visible.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </section>
  );
};