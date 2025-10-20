import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Tag, TrendingUp, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const blogPosts = [
  {
    id: 1,
    title: "Como escolher os melhores produtos para sua papelaria",
    excerpt: "Descubra estratégias comprovadas para selecionar itens de alto giro e aumentar sua margem de lucro.",
    fullContent: "Escolher os produtos certos para sua papelaria é fundamental para o sucesso do negócio. Neste guia completo, você aprenderá como avaliar tendências de mercado, analisar a demanda local e selecionar itens que oferecem as melhores margens de lucro.",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80",
    date: "15 Mar 2024",
    readTime: "5 min",
    category: "Gestão",
    featured: true,
  },
  {
    id: 2,
    title: "Tendências 2024: produtos que vão bombar",
    excerpt: "Conheça os produtos mais procurados e prepare seu estoque para o próximo ano letivo.",
    fullContent: "O mercado de papelaria está em constante evolução. Para 2024, identificamos as principais tendências que vão dominar as vendas, desde produtos sustentáveis até itens tech-friendly que combinam funcionalidade com design moderno.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    date: "10 Mar 2024",
    readTime: "7 min",
    category: "Tendências",
    featured: false,
  },
  {
    id: 3,
    title: "Maximizando lucros com produtos de marca própria",
    excerpt: "Entenda as vantagens de trabalhar com importadoras e os benefícios da marca própria.",
    fullContent: "Produtos de marca própria oferecem margens superiores e exclusividade para seu negócio. Descubra como a Onda Pro pode ajudar você a construir um mix diferenciado que atrai e fideliza clientes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    date: "5 Mar 2024",
    readTime: "6 min",
    category: "Negócios",
    featured: false,
  },
  {
    id: 4,
    title: "Gestão de estoque: evite perdas e aumente o giro",
    excerpt: "Aprenda técnicas essenciais para manter seu estoque equilibrado e lucrativo.",
    fullContent: "Uma gestão de estoque eficiente é crucial para a saúde financeira do seu negócio. Neste artigo, compartilhamos estratégias práticas para evitar produtos parados, reduzir perdas e maximizar o giro de mercadorias.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    date: "28 Fev 2024",
    readTime: "8 min",
    category: "Gestão",
    featured: false,
  },
  {
    id: 5,
    title: "Marketing para papelarias: dicas práticas",
    excerpt: "Estratégias de marketing digital e offline para atrair mais clientes.",
    fullContent: "Descubra como usar redes sociais, WhatsApp Business e ações presenciais para divulgar sua papelaria e aumentar suas vendas de forma consistente.",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?auto=format&fit=crop&w=800&q=80",
    date: "20 Fev 2024",
    readTime: "6 min",
    category: "Marketing",
    featured: false,
  },
  {
    id: 6,
    title: "Sustentabilidade no varejo de papelaria",
    excerpt: "Como produtos eco-friendly podem aumentar suas vendas e fortalecer sua marca.",
    fullContent: "O consumidor está cada vez mais consciente. Saiba como incorporar produtos sustentáveis no seu mix e usar isso como diferencial competitivo.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    date: "12 Fev 2024",
    readTime: "5 min",
    category: "Sustentabilidade",
    featured: false,
  },
];

const categories = [
  { name: "Gestão", count: 12 },
  { name: "Tendências", count: 8 },
  { name: "Negócios", count: 15 },
  { name: "Marketing", count: 10 },
  { name: "Sustentabilidade", count: 6 },
];

const popularPosts = [
  { id: 1, title: "Como escolher os melhores produtos para sua papelaria", date: "15 Mar 2024" },
  { id: 2, title: "Tendências 2024: produtos que vão bombar", date: "10 Mar 2024" },
  { id: 3, title: "Marketing para papelarias: dicas práticas", date: "20 Fev 2024" },
];

export default function Blog() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen smooth-scroll">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section com Breadcrumb */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-12">
          <div className="container mx-auto px-4">
            {/* Breadcrumb Navigation */}
            <Breadcrumb className="mb-8 animate-fade-in">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Home className="w-4 h-4" />
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-foreground">Blog</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Blog Onda Pro
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
                Conteúdos estratégicos sobre gestão, tendências de mercado e dicas práticas para lojistas que querem crescer e lucrar mais.
              </p>
            </div>
          </div>
        </section>

        {/* Post em Destaque */}
        {featuredPost && (
          <section className="container mx-auto px-4 py-12">
            <div className="flex items-center gap-2 mb-6 animate-fade-in">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Artigo em Destaque
              </span>
            </div>
            
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in border-2 border-primary/20" style={{ animationDelay: "0.2s" }}>
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 w-fit">
                    <Tag className="w-3.5 h-3.5" />
                    {featuredPost.category}
                  </div>

                  <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <Button size="lg" className="w-full sm:w-auto group">
                    Ler artigo completo
                    <ArrowLeft className="w-5 h-5 ml-2 rotate-180 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Grid com Sidebar */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts Grid - 2 colunas */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-8 animate-fade-in">Últimos Artigos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post, index) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        <Tag className="w-3 h-3" />
                        {post.category}
                      </div>

                      <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <Button variant="outline" size="sm" className="w-full group/btn">
                        Ler mais
                        <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:block space-y-8">
              {/* Categorias */}
              <Card className="p-6 animate-fade-in sticky top-24" style={{ animationDelay: "0.3s" }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-primary" />
                  Categorias
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left group"
                    >
                      <span className="font-medium group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-semibold">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Posts Populares */}
              <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                  Mais Lidos
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <div
                      key={post.id}
                      className="flex gap-3 p-3 rounded-lg hover:bg-muted transition-colors cursor-pointer group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA Sidebar */}
              <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-2 border-primary/20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Tag className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold">
                    Receba Nosso Catálogo
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Mais de 500 produtos com margens de até 200%
                  </p>
                  <Link to="/#formulario">
                    <Button size="sm" className="w-full rounded-full">
                      📥 Baixar Grátis
                    </Button>
                  </Link>
                </div>
              </Card>
            </aside>
          </div>
        </section>

        {/* CTA Final - Rodapé do Blog */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-br from-primary via-primary/90 to-secondary p-8 md:p-12 text-center text-primary-foreground overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Gostou dos nossos conteúdos?
              </h2>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Baixe o Catálogo Completo e conheça mais de 500 produtos exclusivos para fazer seu negócio decolar
              </p>
              <Link to="/#formulario">
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="rounded-full px-10 text-base font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  📥 Receber Catálogo Completo Agora
                </Button>
              </Link>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
