import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import ProductCard from './ProductCard';
import productsData from '../data/products.json';
import type { Product } from '../types/ecommerce';

const products = productsData as Product[];

export default function ProductCarousel() {
  // FILTRO INTELIGENTE: Pega apenas os produtos com redução real de preço
  const discountProducts = products.filter(
    product => product.originalPrice && product.originalPrice > product.price
  );

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
          Grandes Ofertas da Semana
        </h2>
        <p className="text-sm md:text-base text-zinc-500 mt-2 max-w-2xl font-medium">
          Componentes e periféricos de alta performance com quedas reais de preço. Aproveite antes que acabe.
        </p>
      </div>

      <Swiper
        modules={[Pagination, A11y, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true, 
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        className="product-swiper"
      >
        {discountProducts.map((product) => (
          <SwiperSlide key={product.id} className="h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}