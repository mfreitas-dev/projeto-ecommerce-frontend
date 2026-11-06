# E-commerce Frontend

Interface de uma loja virtual desenvolvida com **React** e **Vite**: vitrine de produtos, carrinho, pagamento via **Mercado Pago** e um painel administrativo para gerenciar o catálogo.

> Projeto de portfólio full stack. Este repositório contém o frontend; a API fica em [projeto-ecommerce-backend](https://github.com/mfreitas-dev/projeto-ecommerce-backend).

## ✨ Funcionalidades

**Loja**
- Listagem de produtos com filtro por categoria
- Página de detalhe com seleção de quantidade (limitada ao estoque)
- Indicação de produtos esgotados
- Carrinho persistido no `localStorage`, com ajuste de quantidade e remoção de itens
- Finalização de compra com redirecionamento ao Checkout Pro do Mercado Pago
- Páginas de retorno do pagamento (sucesso, falha e pendente)

**Painel administrativo**
- Login com JWT
- Rotas protegidas
- Cadastro, edição e exclusão de produtos
- Tratamento de sessão expirada (401 desloga e volta ao login)

## 🛠️ Tecnologias

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- Context API (carrinho e autenticação)
- CSS puro
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) para lint

## 📁 Estrutura

```text
src/
├── components/
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── ProductForm.jsx
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx      # token JWT e sessão do admin
│   └── CartContext.jsx      # itens, quantidades e total
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── CheckoutResult.jsx
│   └── admin/
│       ├── Login.jsx
│       └── Dashboard.jsx
├── services/
│   └── api.js               # cliente HTTP e formatação de moeda
├── App.jsx                  # definição das rotas
├── main.jsx
└── index.css
```

## 🔀 Rotas

| Rota | Descrição | Acesso |
|---|---|---|
| `/` | Vitrine de produtos | Público |
| `/produto/:id` | Detalhe do produto | Público |
| `/carrinho` | Carrinho e finalização | Público |
| `/checkout/:status` | Retorno do pagamento (`sucesso`, `falha`, `pendente`) | Público |
| `/admin/login` | Login do administrador | Público |
| `/admin` | Gerenciamento de produtos | Autenticado |

## 💳 Fluxo de pagamento

1. O carrinho envia ao backend apenas `productId` e `quantity` de cada item (`POST /orders`).
2. O backend consulta preço e estoque no banco, calcula o total, cria o pedido e gera a preferência de pagamento no Mercado Pago.
3. O frontend redireciona o usuário para o `init_point` devolvido.
4. Após o pagamento, o Mercado Pago retorna para `/checkout/:status`.
5. A confirmação real do pagamento acontece no backend, via webhook. A página de retorno é informativa e não é usada para confirmar o pedido.

Os preços exibidos no carrinho servem só para exibição: o valor cobrado é sempre recalculado pelo servidor.

## 🚀 Como executar localmente

### Pré-requisitos

- Node.js 20.19+ (ou 22.12+)
- Backend em execução ([instruções](https://github.com/mfreitas-dev/projeto-ecommerce-backend#-como-executar-localmente))

### 1. Clone e instale

```bash
git clone https://github.com/mfreitas-dev/projeto-ecommerce-frontend.git
cd projeto-ecommerce-frontend
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz, usando o `.env.example` como modelo:

```env
VITE_API_URL=http://localhost:3000
```

| Variável | Descrição |
|---|---|
| `VITE_API_URL` | URL base da API, sem barra no final |

No backend, configure também `FRONTEND_URL=http://localhost:5173` para que o Mercado Pago retorne ao endereço correto e o CORS aceite o frontend.

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação fica disponível em `http://localhost:5173`.

## 📜 Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve localmente o build de produção |
| `npm run lint` | Executa o Oxlint |

## ☁️ Deploy

O frontend foi pensado para a **Vercel**, com a API no **Render**.

- Defina `VITE_API_URL` apontando para a URL da API em produção.
- Como o app usa roteamento no cliente, o `vercel.json` redireciona todas as rotas para o `index.html` (sem isso, atualizar a página em `/carrinho` ou `/admin` retorna 404):

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

## 🧭 Decisões técnicas

- **Context API em vez de bibliotecas de estado:** o estado global se resume a carrinho e sessão, então não justificava uma dependência extra.
- **Carrinho no `localStorage`:** o carrinho sobrevive a recarregamentos sem exigir conta de cliente.
- **Servidor como fonte da verdade:** o frontend nunca envia preço nem total, apenas ids e quantidades.
- **Cliente HTTP único (`services/api.js`):** centraliza URL base, cabeçalho de autenticação e tratamento de erros, e anexa o status HTTP ao erro para que telas protegidas reajam a 401.
- **JavaScript por escolha:** o foco deste projeto é o fluxo completo (catálogo, autenticação e pagamentos). TypeScript fica para um projeto próprio.

## 🔮 Próximos passos

- Consulta do status real do pedido na página de retorno
- Página 404
- Busca e paginação de produtos
- Testes automatizados

## 👨‍💻 Autor

**Matheus Freitas**

- GitHub: [@mfreitas-dev](https://github.com/mfreitas-dev)
- Backend: [projeto-ecommerce-backend](https://github.com/mfreitas-dev/projeto-ecommerce-backend)