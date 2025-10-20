import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowLeft, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

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
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen smooth-scroll">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-16">
          <div className="container mx-auto px-4">
            <Link to="/">
              <Button variant="ghost" className="mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Home
              </Button>
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Onda Pro</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Conteúdos exclusivos sobre gestão, tendências e estratégias para fazer seu negócio crescer
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <Tag className="w-3 h-3" />
                    {post.category}
                  </div>

                  <h3 className="text-xl font-bold line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  
                  <Button variant="outline" className="w-full group">
                    Ler artigo completo
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Quer receber conteúdos exclusivos?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Cadastre-se e receba nosso catálogo completo + newsletter com dicas de gestão e vendas
            </p>
            <Link to="/#formulario">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">
                📥 Receber Catálogo Grátis
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
