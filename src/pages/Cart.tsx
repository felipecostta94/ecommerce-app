import { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Ticket, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../components/CartContext';

export default function Cart() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  // --- Estados do Frete ---
  const [shippingType, setShippingType] = useState<'standard' | 'express'>('standard');
  const shippingPrices = {
    standard: cartTotal > 3000 ? 0 : 25, // Frete grátis em compras acima de R$3.000
    express: 65
  };
  const currentShippingCost = cartTotal > 0 ? shippingPrices[shippingType] : 0;

  // --- Estados do Cupom ---
  const [couponInput, setCouponInput] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; percentage: number } | null>(null);
  const [couponError, setCouponError] = useState('');

  // Cupons válidos no nosso e-commerce fictício
  const VALID_COUPONS: Record<string, number> = {
    'TECH10': 10,  // 10% de desconto
    'QUERO5': 5    // 5% de desconto
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');

    const code = couponInput.trim().toUpperCase();

    if (!code) return;

    if (VALID_COUPONS[code]) {
      setAppliedDiscount({
        code,
        percentage: VALID_COUPONS[code]
      });
      setCouponInput('');
    } else {
      setCouponError('Cupom inválido ou expirado.');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedDiscount(null);
  };

  // --- Cálculos de Valores ---
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const discountValue = appliedDiscount ? cartTotal * (appliedDiscount.percentage / 100) : 0;
  const orderTotal = cartTotal - discountValue + currentShippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900">Seu carrinho está vazio</h2>
          <p className="text-sm text-zinc-500 max-w-xs">
            Parece que você ainda não adicionou nenhum produto ao seu carrinho.
          </p>
          <Link 
            to="/" 
            className="mt-2 inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 cursor-pointer"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para as compras
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black text-zinc-900 tracking-tight">Seu Carrinho</h1>

      <div className="mt-10 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
        
        {/* Lista de Itens */}
        <section className="lg:col-span-7">
          <div className="divide-y divide-zinc-200 border-t border-b border-zinc-200">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex py-6 sm:py-10 gap-4 sm:gap-6">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200 sm:h-32 sm:w-32">
                  <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover object-center" />
                </div>

                <div className="flex flex-1 flex-col justify-between sm:ml-2">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">{item.product.category}</span>
                      <h3 className="text-base font-bold text-zinc-800 mt-0.5 line-clamp-2">{item.product.name}</h3>
                      <p className="mt-2 text-base font-black text-zinc-900">{formatPrice(item.product.price)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9 flex items-center justify-between sm:justify-end gap-4">
                      <div className="flex items-center border border-zinc-200 rounded-lg bg-zinc-50 p-1">
                        <button onClick={() => decreaseQuantity(item.product.id)} className="p-1 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-3 text-sm font-bold text-zinc-800">{item.quantity}</span>
                        <button onClick={() => addToCart(item.product)} className="p-1 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.product.id)} className="inline-flex text-zinc-400 hover:text-red-500 transition-colors p-2 rounded-md hover:bg-zinc-50 cursor-pointer" title="Remover item">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button onClick={clearCart} className="mt-4 text-xs font-semibold text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer">
            Limpar todo o carrinho
          </button>
        </section>

        {/* Resumo do Pedido Otimizado */}
        <section className="mt-16 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 lg:mt-0 sticky top-[88px] space-y-6">
          <h2 className="text-lg font-bold text-zinc-900">Resumo do pedido</h2>

          {/* Opções de Tipo de Frete */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5">
              <Truck className="h-4 w-4" /> Tipo de envio
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShippingType('standard')}
                className={`flex flex-col items-start p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  shippingType === 'standard'
                    ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <span className="text-xs font-bold text-zinc-800">Econômico</span>
                <span className="text-[11px] text-zinc-500 mt-0.5">5 a 10 dias úteis</span>
                <span className="text-xs font-black text-zinc-900 mt-2">
                  {shippingPrices.standard === 0 ? (
                    <span className="text-emerald-600 font-bold uppercase text-[11px]">Grátis</span>
                  ) : (
                    formatPrice(shippingPrices.standard)
                  )}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setShippingType('express')}
                className={`flex flex-col items-start p-3 rounded-xl border text-left cursor-pointer transition-all ${
                  shippingType === 'express'
                    ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500'
                    : 'border-zinc-200 hover:border-zinc-300 bg-white'
                }`}
              >
                <span className="text-xs font-bold text-zinc-800">Express / Sedex</span>
                <span className="text-[11px] text-zinc-500 mt-0.5">1 a 3 dias úteis</span>
                <span className="text-xs font-black text-zinc-900 mt-2">{formatPrice(shippingPrices.express)}</span>
              </button>
            </div>
          </div>

          {/* Formulário de Cupom de Desconto */}
          <div className="pt-4 border-t border-zinc-100">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1.5 mb-2">
              <Ticket className="h-4 w-4" /> Cupom de desconto
            </label>
            
            {!appliedDiscount ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ex: TECH10"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-grow rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-zinc-50 uppercase font-medium placeholder:normal-case focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-600 transition-colors cursor-pointer"
                >
                  Aplicar
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-sm text-emerald-800 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded uppercase">{appliedDiscount.code}</span>
                  ({appliedDiscount.percentage}% de desconto ativo)
                </span>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="text-emerald-600 hover:text-emerald-800 text-xs font-bold underline cursor-pointer"
                >
                  Remover
                </button>
              </div>
            )}
            
            {couponError && <p className="mt-1.5 text-xs font-semibold text-red-500">{couponError}</p>}
          </div>

          {/* Demonstrativo de Valores Financeiros */}
          <dl className="pt-4 border-t border-zinc-100 text-sm space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-zinc-600">Subtotal</dt>
              <dd className="font-bold text-zinc-900">{formatPrice(cartTotal)}</dd>
            </div>

            {appliedDiscount && (
              <div className="flex items-center justify-between text-emerald-600 font-medium">
                <dt>Desconto</dt>
                <dd>- {formatPrice(discountValue)}</dd>
              </div>
            )}

            <div className="flex items-center justify-between">
              <dt className="text-zinc-600">Frete</dt>
              <dd className="font-bold text-zinc-950">
                {currentShippingCost === 0 ? (
                  <span className="text-emerald-600 uppercase text-xs font-black">Grátis</span>
                ) : (
                  formatPrice(currentShippingCost)
                )}
              </dd>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 text-base">
              <dt className="font-bold text-zinc-900">Total do pedido</dt>
              <dd className="font-black text-xl text-emerald-600 tracking-tight">{formatPrice(orderTotal)}</dd>
            </div>
          </dl>

          <div className="pt-2">
            <button className="w-full rounded-xl bg-zinc-900 py-3.5 px-4 text-base font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 cursor-pointer focus:outline-none">
              Finalizar Compra
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}