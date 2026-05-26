import Header from './components/Header';
import Footer from './components/Footer';
import HomeBanner from './components/HomeBanner';
import CategoryCarousel from './components/CategoryCarousel'; // Importando o novo bloco
import ProductCarousel from './components/ProductCarousel';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      <Header />
      
      <main className="w-full flex-grow">
        {/* 1. SEÇÃO: Banner Principal (Full Screen lateral) */}
        <HomeBanner />

        {/* Espaçamento controlado de 100px entre os blocos da Home */}
        <div className="my-[100px] space-y-[100px]">
          
          {/* 2. SEÇÃO: Carrossel de Categorias (Limitada na Grid) */}
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <CategoryCarousel />
          </section>
          
          {/* 3. SEÇÃO: Vitrine de Produtos (Limitada na Grid) */}
          <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProductCarousel />
          </section>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;