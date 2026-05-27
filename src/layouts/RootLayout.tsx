import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartNotification from '../components/CartNotification';
import { CartProvider } from '../components/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
        {/* O cabeçalho fica fixo no topo de todas as páginas */}
        <Header />
        
        {/* As páginas (Home, Cart, etc.) serão renderizadas dinamicamente aqui dentro */}
        <main className="w-full flex-grow">
          <Outlet />
        </main>

        {/* O rodapé fica fixo na base de todas as páginas */}
        <Footer />
        
        {/* O pop-up global de aviso fica escutando em toda a aplicação */}
        <CartNotification />
      </div>
    </CartProvider>
  );
}