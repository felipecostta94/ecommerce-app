import { ShoppingBag, X } from 'lucide-react';
import { useCart } from './CartContext';

export default function CartNotification() {
  const { activeNotification, closeNotification } = useCart();

  // ATENÇÃO: Deixe essa linha ativa para o pop-up sumir e aparecer dinamicamente
  if (!activeNotification?.isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-white rounded-xl border border-emerald-100 shadow-2xl p-4 animate-fade-in-up transition-all duration-300">
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">Adicionado ao carrinho!</h4>
            <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
              {activeNotification.productName}
            </p>
          </div>
        </div>

        <button 
          onClick={closeNotification}
          className="text-zinc-400 hover:text-zinc-600 transition-colors rounded-md p-1 hover:bg-zinc-50 focus:outline-none cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 rounded-b-xl animate-progress-bar w-full" />
    </div>
  );
}