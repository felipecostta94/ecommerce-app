import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { ShoppingBag, Menu, X, Search, User, ShoppingCart } from 'lucide-react';
import { HEADER_LINKS } from '../constants/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-black text-zinc-900 tracking-tight">
            TECH<span className="text-emerald-500">STORE</span>
          </Link>
        </div>

        {/* Menu Desktop (Dinâmico) */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-zinc-700">
          {HEADER_LINKS.map((link, index) => (
            <a 
              key={index} 
              href={link.href} 
              className="transition-colors hover:text-emerald-500"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Ícones de Ação */}
        <div className="flex items-center space-x-4">
          {/* Pesquisa (Mobile Hidden) */}
          <button className="cursor-pointer text-zinc-600 transition-colors hover:text-emerald-500 max-sm:hidden focus:outline-none">
            <Search className="h-5 w-5" />
          </button>
          
          {/* Usuário / Minha Conta */}
          <button className="cursor-pointer text-zinc-600 transition-colors hover:text-emerald-500 focus:outline-none">
            <User className="h-5 w-5" />
          </button>
          
          {/* Carrinho de Compras Otimizado */}
          <Link 
            to="/cart" className="relative p-2 text-zinc-600 transition-colors hover:text-emerald-500 cursor-pointer focus:outline-none"
            title="Ver carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-black leading-none text-white shadow-sm transform translate-x-1/3 -translate-y-1/3 animate-fade-in">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Menu Hamburguer (Mobile Only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 md:hidden focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile (Dropdown Dinâmico) */}
      {isMenuOpen && (
        <div className="border-b border-zinc-200 bg-white px-4 pt-2 pb-4 shadow-lg md:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {HEADER_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block rounded-md px-3 py-2 text-base font-medium text-zinc-700 hover:bg-zinc-50 hover:text-emerald-500"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="border-t border-zinc-200 pt-4 pb-2 px-4">
            <div className="flex items-center bg-zinc-100 rounded-md px-3 py-2">
              <Search className="h-5 w-5 text-zinc-400 mr-2" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="w-full bg-transparent text-sm text-zinc-700 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}