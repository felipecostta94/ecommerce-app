import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import { Cpu, Monitor, Keyboard, Laptop } from 'lucide-react';

// Importando apenas o que precisamos do Swiper
import 'swiper/css';
import 'swiper/css/pagination';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  itemCount: string; // Detalhe de e-commerce premium para dar mais contexto
}

const CATEGORIES: CategoryItem[] = [
  { id: '1', name: 'Hardware', slug: 'hardware', icon: Cpu, itemCount: '4 produtos' },
  { id: '2', name: 'Monitores', slug: 'monitores', icon: Monitor, itemCount: '3 produtos' },
  { id: '3', name: 'Periféricos', slug: 'perifericos', icon: Keyboard, itemCount: '4 produtos' },
  { id: '4', name: 'Setups', slug: 'setups', icon: Laptop, itemCount: 'Breve' },
];

export default function CategoryCarousel() {
  return (
    <div className="w-full">
      {/* Título da Seção (Seguindo a nova escala tipográfica que você alinhou) */}
      <div className="mb-8 md:mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
          Navegue por Categoria
        </h2>
        <p className="text-sm md:text-base text-zinc-500 mt-2 max-w-2xl font-medium">
          Encontre exatamente o que você precisa para elevar o nível do seu setup.
        </p>
      </div>

      {/* Carrossel de Categorias com classe específica */}
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={16}
        slidesPerView={2}
        pagination={{ 
          clickable: true,
          dynamicBullets: true 
        }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 20 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="category-swiper pb-12"
      >
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <SwiperSlide key={category.id} className="h-auto">
              {/* Box Clicável */}
              <div 
                onClick={() => alert(`Navegar para a página de ${category.name}`)}
                className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white p-6 text-center transition-all duration-300 hover:shadow-md hover:border-emerald-500/30 hover:bg-zinc-50/50 cursor-pointer select-none h-[160px] sm:h-[180px]"
              >
                {/* Container do Ícone */}
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                  <Icon className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Textos */}
                <h3 className="mt-4 text-base font-bold text-zinc-800 transition-colors duration-200 group-hover:text-emerald-600">
                  {category.name}
                </h3>
                <span className="mt-1 text-xs font-medium text-zinc-400">
                  {category.itemCount}
                </span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}