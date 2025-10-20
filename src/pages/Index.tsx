import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhyChoose } from "@/components/WhyChoose";
import { ProductCarousel } from "@/components/ProductCarousel";
import { HowItWorks } from "@/components/HowItWorks";
import { FormSection } from "@/components/FormSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen smooth-scroll">
      <Header />
      <main>
        <Hero />
        <WhyChoose />
        <ProductCarousel />
        <HowItWorks />
        <FormSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
