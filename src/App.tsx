import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoCarousel from './components/LogoCarousel';
import Differentials from './components/DifferentialsModern';
import ProductCatalog from './components/ProductCatalogModern';
import Testimonials from './components/TestimonialsModern';
import Blog from './components/BlogModern';
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import About from './components/AboutModern';
import Footer from './components/Footer';
import FormModal from './components/FormModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <Navbar />
      <Hero onCTAClick={() => setIsModalOpen(true)} />
      <LogoCarousel />
      <div id="diferenciais">
        <Differentials onCTAClick={() => setIsModalOpen(true)} />
      </div>
      <div id="produtos">
        <ProductCatalog onCTAClick={() => setIsModalOpen(true)} />
      </div>
      <div id="depoimentos">
        <Testimonials onCTAClick={() => setIsModalOpen(true)} />
      </div>
      <div id="blog">
        <Blog />
      </div>
      <div id="contato">
        <ContactForm />
      </div>
      <FAQ />
      <About />
      <Footer />
      <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
