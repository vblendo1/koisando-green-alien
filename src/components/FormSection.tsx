import { LeadForm } from "./LeadForm";

export const FormSection = () => {
  return (
    <section id="formulario" className="py-12 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Quer revender Onda Pro?
            </h2>
            <p className="text-lg text-muted-foreground">
              Cadastre-se e receba o catálogo completo com condições exclusivas para papelarias e comércios.
            </p>
          </div>

          <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12">
            <LeadForm />
          </div>

        </div>
      </div>
    </section>
  );
};
