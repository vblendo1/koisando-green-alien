import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Como aumentar as vendas da sua papelaria em 2025",
    excerpt: "Estratégias práticas para impulsionar seu faturamento com produtos de alta margem e atendimento diferenciado.",
    date: "15 de Março, 2025",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Tendências de material escolar para o próximo semestre",
    excerpt: "Descubra quais produtos estão em alta e como montar um mix de sucesso para a volta às aulas.",
    date: "10 de Março, 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Gestão de estoque: o que funciona para papelarias",
    excerpt: "Aprenda a equilibrar seu estoque, reduzir custos e garantir disponibilidade dos produtos mais vendidos.",
    date: "5 de Março, 2025",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
  },
];

export const Blog = () => {
  return (
    <section id="blog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Blog Onda Pro
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdos exclusivos sobre mercado, gestão e estratégias para lojistas que querem crescer.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={post.id} 
              className="overflow-hidden hover:shadow-xl transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link to="/blog" className="w-full">
                  <Button variant="outline" className="w-full group">
                    Ler mais
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full px-8"
            >
              Ver todos os artigos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
