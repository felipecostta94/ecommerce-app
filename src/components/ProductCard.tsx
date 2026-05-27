import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { type Product } from '../types/ecommerce';
import { useCart } from './CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-xl hover:border-zinc-300">
      
      {/* Envelopamos a Imagem com o Link Dinâmico */}
      <Link 
        to={`/product/${product.id}`} 
        className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-50 flex items-center justify-center p-4 cursor-pointer"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="mt-4 flex flex-col flex-grow">
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">
          {product.category}
        </span>
        
        {/* Envelopamos também o Título para melhorar a UX */}
        <Link to={`/product/${product.id}`} className="cursor-pointer">
          <h3 className="mt-1 text-sm font-bold text-zinc-800 line-clamp-2 min-h-[40px] hover:text-emerald-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between pt-2 border-t border-zinc-50">
          <span className="text-lg font-black text-zinc-900">
            {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white transition-colors hover:bg-emerald-600 cursor-pointer"
            title="Adicionar ao carrinho"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}