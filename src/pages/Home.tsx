import HomeBanner from '../components/HomeBanner';
import CategoryCarousel from '../components/CategoryCarousel';
import ProductCarousel from '../components/ProductCarousel';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <div className="my-[100px] space-y-[100px]">
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <CategoryCarousel />
        </section>
        
        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <ProductCarousel />
        </section>
      </div>
    </>
  );
}