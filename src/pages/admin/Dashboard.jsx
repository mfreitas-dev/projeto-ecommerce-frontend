import { useEffect, useState } from 'react';
import { api, brl } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm';

export default function Dashboard() {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    api('/products')
      .then(setProducts)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(data) {
    try {
      if (editing === 'new') {
        const created = await api('/products', { method: 'POST', body: data, auth: true });
        setProducts((prev) => [...prev, created]);
      } else {
        const updated = await api(`/products/${editing._id}`, {
          method: 'PUT',
          body: data,
          auth: true,
        });
        setProducts((prev) => prev.map((p) => (p._id === updated._id ? updated : p)));
      }
      setEditing(null);
    } catch (e) {
      if (e.status === 401) logout();
      throw e;
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`Excluir "${product.name}"?`)) return;

    try {
      await api(`/products/${product._id}`, { method: 'DELETE', auth: true });
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (e) {
      if (e.status === 401) logout();
      else setError(e.message);
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <section className="dashboard">
      <header>
        <h1>Produtos</h1>
        <div className="actions">
          <button onClick={() => setEditing('new')}>Novo produto</button>
          <button onClick={logout}>Sair</button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}

      {editing && (
        <ProductForm
          key={editing === 'new' ? 'new' : editing._id}
          initialValues={editing === 'new' ? undefined : editing}
          onSubmit={handleSave}
          onCancel={() => setEditing(null)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td><img src={p.image} alt={p.name} width="48" /></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{brl(p.price)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => setEditing(p)}>Editar</button>
                <button onClick={() => handleDelete(p)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}