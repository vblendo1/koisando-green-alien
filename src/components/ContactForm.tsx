import { useState } from 'react';
import { Send, User, Phone, Mail, Store, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    storeName: '',
    location: '',
    acceptTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#6c256f] to-[#009bac] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Solicite seu Catálogo Exclusivo
          </h2>
          <p className="text-xl text-white/90">
            Receba os produtos, condições e ofertas direto no seu WhatsApp.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none transition-colors duration-300 text-gray-800"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp (com DDD)"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none transition-colors duration-300 text-gray-800"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none transition-colors duration-300 text-gray-800"
              />
            </div>

            <div className="relative">
              <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="storeName"
                placeholder="Nome da Loja"
                value={formData.storeName}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none transition-colors duration-300 text-gray-800"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="location"
                placeholder="Cidade/Estado"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none transition-colors duration-300 text-gray-800"
              />
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 text-[#009bac] border-gray-300 rounded focus:ring-[#009bac]"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-600 leading-relaxed">
                Aceito receber comunicações da Onda Pro via WhatsApp, e-mail e outros canais.
                Li e concordo com a Política de Privacidade e Termos de Uso.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-[#009bac] to-[#4dbdc6] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send size={20} />
              Quero falar com um representante
            </button>

            <p className="text-center text-sm text-gray-600 italic">
              Atendimento direto com nosso time comercial.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
