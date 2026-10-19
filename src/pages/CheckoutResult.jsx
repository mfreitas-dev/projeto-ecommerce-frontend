import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const MENSAGENS = {
  sucesso: {
    titulo: 'Pagamento recebido!',
    texto: 'Recebemos seu pagamento e estamos confirmando seu pedido.',
  },
  falha: {
    titulo: 'Não foi possível concluir o pagamento',
    texto: 'Seu pagamento não foi aprovado. Você pode tentar novamente.',
  },
  pendente: {
    titulo: 'Pagamento pendente',
    texto: 'Estamos aguardando a confirmação do pagamento.',
  },
};

const DESCONHECIDO = {
  titulo: 'Página não encontrada',
  texto: 'Não reconhecemos o status deste pedido.',
};

export default function CheckoutResult() {
  const { status } = useParams();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const pedido = searchParams.get('external_reference');
  const { titulo, texto } = MENSAGENS[status] || DESCONHECIDO;

  useEffect(() => {
    if (status === 'sucesso') clearCart();
  }, [status, clearCart]);

  return (
    <section className="checkout-result">
      <h1>{titulo}</h1>
      <p>{texto}</p>
      {pedido && <p>Pedido: {pedido}</p>}

      {status === 'falha' ? (
        <Link to="/carrinho">Voltar ao carrinho</Link>
      ) : (
        <Link to="/">Continuar comprando</Link>
      )}
    </section>
  );
}