import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';

// Configurando as rotas no padrão moderno Data Router (v6)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // O layout que envelopa o site (Header, Footer, Provider)
    children: [
      { index: true,  element: <Home />, },
      { path: 'cart', element: <Cart />, },
      { path: 'product/:id', element: <ProductDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;