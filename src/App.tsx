/**
 * ═══════════════════════════════════════════════════════════════════
 * APP.TSX - COMPONENTE PRINCIPAL DA APLICAÇÃO
 * ═══════════════════════════════════════════════════════════════════
 *
 * Este é o componente "maestro" que orquestra toda a landing page.
 * Ele gerencia o estado do modal e organiza todas as seções na ordem correta.
 *
 * ESTRUTURA DA PÁGINA:
 * 1. ScrollProgress - Barra de progresso no topo
 * 2. Navbar - Menu de navegação
 * 3. Hero - Seção principal com CTA
 * 4. Logos3 - Logos de clientes/social proof
 * 5. Differentials - Diferenciais da ONDA PRO
 * 6. ProductCatalog - Catálogo de produtos
 * 7. Testimonials - Depoimentos de clientes
 * 8. Blog - Artigos e conteúdo
 * 9. ContactForm - Formulário de contato
 * 10. FAQ - Perguntas frequentes
 * 11. About - Sobre a empresa
 * 12. Footer - Rodapé
 * 13. FormModal - Modal flutuante de captura
 *
 * PARA PROGRAMADORES JÚNIOR:
 * - Este componente é como o "índice" de um livro
 * - Ele lista todos os capítulos (componentes) na ordem
 * - Gerencia a comunicação entre os componentes via props
 */

/**
 * IMPORTS - Trazendo as dependências necessárias
 * ─────────────────────────────────────────────
 */

// Hook do React para gerenciar estado
import { useState } from 'react';

// Todos os componentes da landing page
import Navbar from './components/Navbar';
import Hero from './components/Hero';
<<<<<<< HEAD
import { Logos3 } from './components/ui/logos3';
import Differentials from './components/Differentials';
import { ProductsSection } from './components/ProductsSection';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
=======
import LogoCarousel from './components/LogoCarousel';
import Differentials from './components/DifferentialsModern';
import ProductCatalog from './components/ProductCatalogModern';
import Testimonials from './components/TestimonialsModern';
import Blog from './components/BlogModern';
>>>>>>> c49edcd5df47ba19e8b4a9b14029260d7fa70a83
import ContactForm from './components/ContactForm';
import FAQ from './components/FAQ';
import About from './components/AboutModern';
import Footer from './components/Footer';
import LeadQuiz from './components/LeadQuiz';
import ScrollProgress from './components/ui/ScrollProgress';

/**
 * COMPONENTE APP
 * ─────────────────────────────────────────────
 *
 * Função principal que retorna o JSX (HTML + JavaScript)
 * da aplicação completa.
 */
function App() {
  /**
   * GERENCIAMENTO DE ESTADO - Modal
   * ──────────────────────────────────
   *
   * useState é um "hook" do React que permite criar variáveis
   * que quando mudarem, fazem o componente re-renderizar.
   *
   * AQUI:
   * - isModalOpen: variável booleana (true/false)
   * - setIsModalOpen: função para mudar o valor
   * - false: valor inicial (modal começa fechado)
   *
   * COMO FUNCIONA:
   * - Quando isModalOpen = true → Modal aparece
   * - Quando isModalOpen = false → Modal desaparece
   *
   * PARA ENTENDER:
   * É como um interruptor de luz:
   * - isModalOpen: luz está ligada ou desligada?
   * - setIsModalOpen: botão que liga/desliga
   */
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * RENDERIZAÇÃO DO COMPONENTE
   * ──────────────────────────────────
   *
   * Retorna o JSX (estrutura visual) da aplicação.
   * Cada componente é como um "bloco de LEGO" que
   * se encaixa para formar a página completa.
   */
  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      {/* ════════════════════════════════════════════════════════════
          BARRA DE PROGRESSO DE SCROLL
          ════════════════════════════════════════════════════════════
          Mostra quanto da página o usuário já scrollou.
          Aparece como uma linha colorida no topo. */}
      <ScrollProgress />

      {/* ════════════════════════════════════════════════════════════
          MENU DE NAVEGAÇÃO
          ════════════════════════════════════════════════════════════
          Menu fixo no topo com links para as seções.
          Só aparece em desktop (hidden em mobile). */}
      <Navbar />

      {/* ════════════════════════════════════════════════════════════
          SEÇÃO HERO PRINCIPAL
          ════════════════════════════════════════════════════════════
          Primeira seção que o usuário vê.
          Tem o título grande e o CTA principal.

          PROP onCTAClick:
          Quando o usuário clica no botão do Hero,
          esta função é executada e abre o modal.

          () => setIsModalOpen(true)
          └─ Arrow function que muda isModalOpen para true */}
      <Hero onCTAClick={() => setIsModalOpen(true)} />
<<<<<<< HEAD

      {/* Container com margens compactas entre seções */}
      <div className="space-y-0">
        {/* ════════════════════════════════════════════════════════════
            SOCIAL PROOF - LOGOS
            ════════════════════════════════════════════════════════════
            Logos de clientes que usam ONDA PRO.
            Carrossel infinito que desliza automaticamente. */}
        <Logos3 />

        {/* ════════════════════════════════════════════════════════════
            SEÇÃO DE DIFERENCIAIS
            ════════════════════════════════════════════════════════════
            ID: 'diferenciais' para navegação do menu.

            A div com id permite que o menu navegue até aqui
            quando o usuário clicar em "Diferenciais".

            PROP onCTAClick:
            Botão desta seção também abre o modal. */}
        <div id="diferenciais">
          <Differentials onCTAClick={() => setIsModalOpen(true)} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            ÁREA DE PRODUTOS
            ════════════════════════════════════════════════════════════
            ID: 'produtos' para navegação do menu.

            Nova área completa com 4 seções de carrosséis de produtos. */}
        <div id="produtos">
          <ProductsSection />
        </div>

        {/* ════════════════════════════════════════════════════════════
            DEPOIMENTOS DE CLIENTES
            ════════════════════════════════════════════════════════════
            ID: 'depoimentos' para navegação do menu.

            Carrossel de testemunhos com foto, nome e avaliação. */}
        <div id="depoimentos">
          <Testimonials onCTAClick={() => setIsModalOpen(true)} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            SEÇÃO DE BLOG
            ════════════════════════════════════════════════════════════
            ID: 'blog' para navegação do menu.

            Artigos e conteúdo educativo para lojistas. */}
        <div id="blog">
          <Blog onCTAClick={() => setIsModalOpen(true)} />
        </div>

        {/* ════════════════════════════════════════════════════════════
            FORMULÁRIO DE CONTATO
            ════════════════════════════════════════════════════════════
            ID: 'contato' para navegação do menu.

            Formulário principal da página para captura de leads.
            Este NÃO precisa do onCTAClick pois já é o próprio formulário. */}
        <div id="contato">
          <ContactForm />
        </div>

        {/* ════════════════════════════════════════════════════════════
            PERGUNTAS FREQUENTES
            ════════════════════════════════════════════════════════════
            Accordion com dúvidas comuns dos clientes.
            Não tem ID pois não está no menu de navegação. */}
        <FAQ />

        {/* ════════════════════════════════════════════════════════════
            SOBRE A EMPRESA
            ════════════════════════════════════════════════════════════
            História e valores da ONDA PRO. */}
        <About />
=======
      <LogoCarousel />
      <div id="diferenciais">
        <Differentials onCTAClick={() => setIsModalOpen(true)} />
>>>>>>> c49edcd5df47ba19e8b4a9b14029260d7fa70a83
      </div>

      {/* ════════════════════════════════════════════════════════════
          RODAPÉ
          ════════════════════════════════════════════════════════════
          Informações de contato, redes sociais e links legais. */}
      <Footer />

      {/* ════════════════════════════════════════════════════════════
          MODAL FLUTUANTE DE CAPTURA
          ════════════════════════════════════════════════════════════
          Modal que aparece sobre a página quando ativado.

          PROPS:
          - isOpen: controla se modal está visível ou não
          - onClose: função chamada quando usuário fecha o modal
                     () => setIsModalOpen(false)
                     └─ Fecha o modal mudando estado para false

          COMO FUNCIONA:
          1. Usuário clica em qualquer CTA da página
          2. onCTAClick() é executado
          3. setIsModalOpen(true) é chamado
          4. isModalOpen muda para true
          5. React re-renderiza o componente
          6. FormModal recebe isOpen={true}
          7. Modal aparece na tela

          Para fechar:
          1. Usuário clica no X ou fora do modal
          2. onClose() é executado
          3. setIsModalOpen(false) é chamado
          4. isModalOpen muda para false
          5. React re-renderiza
          6. FormModal recebe isOpen={false}
          7. Modal desaparece */}
      <LeadQuiz isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

/**
 * EXPORT DEFAULT
 * ──────────────
 * Exporta o componente para ser usado em outros arquivos.
 * No nosso caso, main.tsx importa este App.
 *
 * 'default' significa que é a exportação principal do arquivo.
 */
export default App;
