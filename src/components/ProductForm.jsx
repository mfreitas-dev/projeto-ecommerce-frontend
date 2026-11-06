import { useState } from 'react';

const fromProduct = (p = {}) => ({
  name: p.name ?? '',
  description: p.description ?? '',
  price: p.price ?? '',
  image: p.image ?? '',
  category: p.category ?? '',
  stock: p.stock ?? 0,
});

export default function ProductForm({ initialValues, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => fromProduct(initialValues));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
      <textarea name="description" placeholder="Descrição" value={form.description} onChange={handleChange} />
      <input name="price" type="number" step="0.01" min="0" placeholder="Preço" value={form.price} onChange={handleChange} required />
      <input name="image" type="url" placeholder="URL da imagem" value={form.image} onChange={handleChange} required />
      <input name="category" placeholder="Categoria" value={form.category} onChange={handleChange} required />
      <input name="stock" type="number" min="0" step="1" placeholder="Estoque" value={form.stock} onChange={handleChange} required />

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button type="submit" disabled={saving}>
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}