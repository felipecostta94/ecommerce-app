import { ShoppingCart } from 'lucide-react';
import type { Product } from '../types/ecommerce';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Verifica se tem desconto ativo
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Calcula a porcentagem do desconto
  const discountPercentage = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:shadow-lg hover:border-zinc-300">
      
      {/* Imagem do Produto com Badge de Desconto */}
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Etiqueta de Desconto Premium */}
        {hasDiscount && (
          <span className="absolute top-2 left-2 z-10 inline-flex items-center justify-center rounded-md bg-emerald-500 px-2 py-1 text-xs font-black text-white uppercase tracking-wider shadow-sm">
            -{discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Detalhes */}
      <div className="mt-4 flex flex-1 flex-col justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            {product.category}
          </span>
          <h3 className="mt-1.5 text-md font-bold text-zinc-800 line-clamp-2 min-h-[48px] leading-snug">
            <a href="#">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </a>
          </h3>
          <p className="mt-2 text-sm text-zinc-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Preço e Botão */}
        <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-100 relative z-10">
          <div className="flex flex-col">
            {/* Se houver desconto, exibe o preço original riscado */}
            {hasDiscount ? (
              <span className="text-xs line-through text-red-500 font-medium">
                {formatPrice(product.originalPrice!)}
              </span>
            ) : (
              <span className="text-xs font-medium text-zinc-400">A partir de</span>
            )}
            <span className="text-xl text-emerald-600 font-bold tracking-tight">
              {formatPrice(product.price)}
            </span>
          </div>
          
          <button 
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-zinc-900 text-white transition-colors duration-200 hover:bg-emerald-600 cursor-pointer focus:outline-none relative z-20"
            title="Adicionar ao carrinho"
            onClick={(e) => {
              e.stopPropagation();
              alert(`${product.name} adicionado!`);
            }}
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}