import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Importando os estilos necessários do Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Efeito de transição suave esmaecida (fade) para banners

interface BannerItem {
  id: string;
  desktopImage: string;
  mobileImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
}

// Banners mockados focados no seu nicho de alta performance
const BANNERS: BannerItem[] = [
  {
    id: '1',
    desktopImage: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?w=1920&q=80', // Setup Gamer 2K setup
    mobileImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80',
    title: 'UPGRADE DE PRÓXIMA GERAÇÃO',
    subtitle: 'Domine os lobbies com processadores AMD Ryzen e as placas de vídeo mais potentes do mercado.',
    buttonText: 'Ver Hardware'
  },
  {
    id: '2',
    desktopImage: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=1920&q=80', // Periféricos Premium
    mobileImage: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
    title: 'PRECISÃO EM CADA CLIQUE',
    subtitle: 'Periféricos projetados para e-sports. Teclados mecânicos rápidos e mouses ultraleves.',
    buttonText: 'Equipar Setup'
  },
  {
    id: '3',
    desktopImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1920&q=80', // Monitores High Refresh Rate
    mobileImage: 'https://images.unsplash.com/photo-1547119957-637f8679db1e?w=600&q=80',
    title: 'IMERSÃO TOTAL EM QUAD HD',
    subtitle: 'Monitores de alta taxa de atualização com painel IPS e cores realistas de verdade.',
    buttonText: 'Confira Telas'
  }
];

export default function HomeBanner() {
  return (
    <section className="w-full bg-zinc-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect={'fade'} // Transição suave estilo fade em vez de slide corrido (padrão de banners premium)
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        className="banner-swiper h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] xl:h-[650px] 2xl:h-[700px] w-full"
      >
        {BANNERS.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            {/* Imagem de Fundo Dinâmica (Mobile vs Desktop) */}
            <picture className="absolute inset-0 w-full h-full select-none pointer-events-none">
              <source media="(max-width: 640px)" srcSet={banner.mobileImage} />
              <img 
                src={banner.desktopImage} 
                alt={banner.title} 
                className="w-full h-full object-cover object-center brightness-[0.35]" // Escurece levemente a foto para dar leitura no texto
              />
            </picture>

            {/* Conteúdo do Banner alinhado com o limite da grid do site */}
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-white">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  <span className="inline-block text-xs md:text-sm font-bold tracking-widest text-emerald-500 uppercase">
                    Oferta Exclusiva
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-tight">
                    {banner.title}
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-medium leading-relaxed max-w-xl">
                    {banner.subtitle}
                  </p>
                  <div className="pt-2">
                    <button className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-bold text-zinc-950 transition-all duration-200 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
                      {banner.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}