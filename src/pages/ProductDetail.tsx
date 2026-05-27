import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, CreditCard, Star, ChevronRight, MapPin } from 'lucide-react';
import { useCart } from '../components/CartContext';
import ProductCarousel from '../components/ProductCarousel';

// Importe o seu arquivo JSON real aqui (ajuste os diretórios se necessário)
import productsData from '../data/products.json'; 

// Swiper & Fancybox Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  
  const [cep, setCep] = useState('');
  const [shippingOptions, setShippingOptions] = useState<{name: string, price: number, days: string}[] | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(false);

  // 1. Buscamos dinamicamente dentro do seu JSON real importado
  const product = productsData.find(p => p.id === id);

  useEffect(() => {
    Fancybox.bind("[data-fancybox='gallery']", {});
    return () => Fancybox.destroy();
  }, []);

  // Se o usuário tentar acessar uma URL com ID que não existe no JSON
  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Produto não encontrado</h2>
        <Link to="/" className="text-emerald-500 underline mt-2 inline-block">Voltar para a Home</Link>
      </div>
    );
  }

  // 2. Criamos o array de imagens baseados na propriedade do seu JSON
  // Se o seu JSON tiver apenas 'imageUrl', jogamos ela dentro de um array. 
  // Se já tiver uma lista de imagens no futuro, o código continua funcionando.
  const productImages = product.images || [product.imageUrl];

  // Especificações técnicas genéricas para exibição caso seu JSON não tenha esse campo ainda
  const productSpecs = product.specs || ['Alta performance garantida', 'Componente premium de hardware', 'Pronto para setups gamer e profissionais'];

  const handleBuyNow = () => {
    addToCart(product);
    navigate('/cart');
  };

  const handleSearchShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (cep.length < 8) return;
    setLoadingShipping(true);
    setTimeout(() => {
      setShippingOptions([
        { name: 'Econômico', price: 15.90, days: '7-10 dias úteis' },
        { name: 'Sedex', price: 38.50, days: '2-4 dias úteis' }
      ]);
      setLoadingShipping(false);
    }, 800);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8 text-sm text-zinc-500 items-center">
        <Link to="/" className="hover:text-zinc-800">Home</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-zinc-900 font-bold">{product.category}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
        
        {/* Galeria usando o array tratado do JSON */}
        <div className="flex flex-col">
          <Swiper
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Pagination, Thumbs]}
            className="w-full rounded-2xl border border-zinc-200 bg-white overflow-hidden"
          >
            {productImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <a href={img} data-fancybox="gallery" className="cursor-zoom-in">
                  <img src={img} alt={`${product.name} - ${idx}`} className="h-[500px] w-full object-contain p-8" />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Miniaturas só aparecem se houver mais de uma imagem */}
          {productImages.length > 1 && (
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              watchSlidesProgress={true}
              modules={[Navigation, Thumbs]}
              className="mt-4 w-full"
            >
              {productImages.map((img, idx) => (
                <SwiperSlide key={idx} className="cursor-pointer rounded-lg border border-zinc-200 overflow-hidden opacity-50 hover:opacity-100 transition-opacity [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-emerald-500 [&.swiper-slide-thumb-active]:border-2">
                  <img src={img} alt="thumb" className="h-20 w-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Informações Reais vindas do JSON */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <div className="flex flex-col">
            <span className="text-emerald-600 font-black uppercase tracking-widest text-sm">{product.category}</span>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 mt-2">{product.name}</h1>
            
            <div className="mt-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              <span className="text-xs text-zinc-500 ml-2">(48 avaliações)</span>
            </div>

            <div className="mt-6 border-t border-zinc-100 pt-6">
              <p className="text-base text-zinc-600 leading-relaxed">{product.description}</p>
              <ul className="mt-6 space-y-2">
                {productSpecs.map((spec, i) => (
                  <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-zinc-900 tracking-tight">
                  {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <p className="text-sm text-zinc-500 mt-1">Em até 12x de {(product.price / 12).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button onClick={() => addToCart(product)} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white border-2 border-zinc-900 py-3 px-8 text-base font-bold text-zinc-900 transition-all hover:bg-zinc-50 cursor-pointer">
                  <ShoppingCart className="h-5 w-5" /> Adicionar ao Carrinho
                </button>
                <button onClick={handleBuyNow} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 py-3 px-8 text-base font-bold text-white transition-all hover:bg-emerald-600 shadow-lg shadow-zinc-200 cursor-pointer">
                  <CreditCard className="h-5 w-5" /> Compre Agora
                </button>
              </div>
            </div>

            {/* Calculadora de Frete */}
            <div className="mt-8 border-t border-zinc-100 pt-8">
              <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" /> Calcular Frete e Prazo
              </h4>
              <form onSubmit={handleSearchShipping} className="mt-4 flex gap-2">
                <input
                  type="text"
                  maxLength={8}
                  placeholder="Insira seu CEP"
                  value={cep}
                  onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                  className="max-w-[200px] flex-grow rounded-lg border border-zinc-200 px-4 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                />
                <button type="submit" className="rounded-lg bg-zinc-100 px-6 py-2 text-sm font-bold text-zinc-900 hover:bg-zinc-200 transition-colors cursor-pointer">
                  Calcular
                </button>
              </form>
              {loadingShipping && <p className="mt-4 text-xs text-zinc-500 animate-pulse">Consultando transportadoras...</p>}
              {shippingOptions && (
                <div className="mt-4 space-y-2 animate-fade-in">
                  {shippingOptions.map((opt, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-zinc-100 rounded-lg text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-800">{opt.name}</span>
                        <span className="text-xs text-zinc-500">{opt.days}</span>
                      </div>
                      <span className="font-black text-emerald-600">{opt.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <input type="hidden" name="time-context-marker" value="2026" />
      {/* Seção de Relacionados */}
      <section className="mt-24 border-t border-zinc-100 pt-16">
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight mb-8">Quem viu este produto também viu</h2>
        <ProductCarousel />
      </section>
    </div>
  );
}