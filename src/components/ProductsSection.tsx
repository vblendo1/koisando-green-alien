import { useState } from "react";
import { ProductCarouselSection } from "./products/ProductCarouselSection";
import FormModal from "./FormModal";

export const ProductsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductLine, setSelectedProductLine] = useState<string>("");

  const handleCTAClick = (lineName: string) => {
    setSelectedProductLine(lineName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProductLine("");
  };

  // Seção 1: Novidades da Onda
  const novidadesProducts = [
    {
      imageSrc: "/placeholder.svg",
      title: "Canetas Gel Neon",
      tags: ["Margem ~150%", "Exclusivo", "Alta saída"],
      bullets: ["Cores vibrantes", "Não encalha", "Cliente pede reposição"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Cadernos Holográficos",
      tags: ["Margem ~180%", "Tendência 2025", "Giro rápido"],
      bullets: ["Design único", "Ticket alto", "Viraliza nas redes"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Adesivos Temáticos",
      tags: ["Margem ~200%", "Baixo custo", "Impulso"],
      bullets: ["Compra por impulso", "Margem absurda", "Leve pra qualquer canto"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Kit Presentes Personalizados",
      tags: ["Ticket alto", "Margem ~160%", "Exclusivo"],
      bullets: ["Cliente compra conjunto", "Ticket médio R$45+", "Ideal pra datas"],
    },
  ];

  // Seção 2: Materiais Escolares
  const materiaisEscolaresProducts = [
    {
      imageSrc: "/placeholder.svg",
      title: "Lápis HB Onda Pro",
      tags: ["Margem ~140%", "Giro todo ano", "Reposição"],
      bullets: ["Cliente volta sempre", "Não para de sair", "Custo baixo"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Borrachas Coloridas",
      tags: ["Margem ~180%", "Compra impulso", "Leve"],
      bullets: ["Cores que chamam", "Ticket acessível", "Margem alta"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Apontadores Metálicos",
      tags: ["Margem ~150%", "Durável", "Popular"],
      bullets: ["Produto de reposição", "Sai todo mês", "Ticket R$3-5"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Réguas Transparentes",
      tags: ["Margem ~160%", "Básico", "Constante"],
      bullets: ["Item essencial", "Compra obrigatória", "Previsível"],
    },
  ];

  // Seção 3: Materiais de Escritório
  const materiaisEscritorioProducts = [
    {
      imageSrc: "/placeholder.svg",
      title: "Bloco de Notas Premium",
      tags: ["Margem ~170%", "Reposição mensal", "B2B"],
      bullets: ["Cliente empresarial", "Pedido recorrente", "Ticket R$15-25"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Canetas Esferográficas",
      tags: ["Margem ~160%", "Alta saída", "Básico"],
      bullets: ["Produto âncora", "Compra em volume", "Sempre precisa"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Pastas Suspensas",
      tags: ["Margem ~150%", "Escritórios", "Ticket alto"],
      bullets: ["Cliente corporativo", "Pedido grande", "Fidelização fácil"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Marcadores de Texto",
      tags: ["Margem ~180%", "Estudantes+Office", "Popular"],
      bullets: ["Duas audiences", "Sai rápido", "Reposição certa"],
    },
  ];

  // Seção 4: Onda Prints (Papéis de Parede)
  const ondaPrintsProducts = [
    {
      imageSrc: "/placeholder.svg",
      title: "Papel de Parede Geométrico",
      tags: ["Margem ~250%", "Tendência", "Ticket alto"],
      bullets: ["Visual premium", "Margem por m²", "Cliente reforma"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Papel Infantil Temático",
      tags: ["Margem ~220%", "Alta demanda", "Exclusivo"],
      bullets: ["Pais gastam mais", "Decoração completa", "Ticket R$80-150"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Papel Texturas Naturais",
      tags: ["Margem ~240%", "Premium", "Decoração"],
      bullets: ["Aparência de material real", "Cliente classe A/B", "Margem absurda"],
    },
    {
      imageSrc: "/placeholder.svg",
      title: "Adesivos Decorativos",
      tags: ["Margem ~200%", "Fácil aplicar", "Impulso"],
      bullets: ["Cliente faz DIY", "Venda adicional", "Baixo custo"],
    },
  ];

  return (
    <>
      <ProductCarouselSection
        sectionTitle="Novidades da Onda"
        sectionSubtitle="Lançamentos que viram vitrine e chamam cliente pra dentro da loja."
        products={novidadesProducts}
        ctaCardProps={{
          lineName: "Novidades da Onda",
          benefits: [
            "Acesso a preços de atacado",
            "Margem garantida de 150-200%",
            "Produtos exclusivos",
            "Suporte técnico incluso",
          ],
        }}
        onCTAClick={handleCTAClick}
        backgroundColor="gray"
      />

      <ProductCarouselSection
        sectionTitle="Materiais Escolares"
        sectionSubtitle="Itens de giro rápido, ticket acessível e margem absurda o ano inteiro."
        products={materiaisEscolaresProducts}
        ctaCardProps={{
          lineName: "Materiais Escolares",
          benefits: [
            "Giro constante o ano todo",
            "Margem entre 140-180%",
            "Ticket médio acessível",
            "Mix completo de itens",
          ],
        }}
        onCTAClick={handleCTAClick}
        backgroundColor="white"
      />

      <ProductCarouselSection
        sectionTitle="Materiais de Escritório"
        sectionSubtitle="Produtos que fazem o cliente voltar todo mês pra repor. Faturamento previsível."
        products={materiaisEscritorioProducts}
        ctaCardProps={{
          lineName: "Materiais de Escritório",
          benefits: [
            "Clientes B2B recorrentes",
            "Margem 150-180%",
            "Pedidos mensais garantidos",
            "Ticket médio R$20+",
          ],
        }}
        onCTAClick={handleCTAClick}
        backgroundColor="gray"
      />

      <ProductCarouselSection
        sectionTitle="Onda Prints"
        sectionSubtitle="Aplicação fácil, visual chamativo e margem alta por metro. Ideal pra upsell."
        products={ondaPrintsProducts}
        ctaCardProps={{
          lineName: "Onda Prints",
          benefits: [
            "Margem 200-250% por metro",
            "Cliente gasta R$100+ por compra",
            "Nicho pouco explorado",
            "Suporte de aplicação",
          ],
        }}
        onCTAClick={handleCTAClick}
        backgroundColor="white"
      />

      <FormModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        productLine={selectedProductLine}
      />
    </>
  );
};
