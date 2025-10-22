import { useState } from 'react';
import { X, User, Phone, Mail, Store, MapPin, Send } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormModal = ({ isOpen, onClose }: FormModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    storeName: '',
    location: '',
    acceptTerms: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Modal form submitted:', formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
        <div className="sticky top-0 bg-gradient-to-r from-[#6c256f] to-[#009bac] px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <h3 className="text-2xl font-bold text-white">
            Receba seu Catálogo no WhatsApp
          </h3>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            aria-label="Fechar"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <p className="text-gray-600 mb-8 text-center">
            Preencha seus dados e receba nosso catálogo completo com produtos, condições e ofertas exclusivas.
          </p>

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
                id="modalAcceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 text-[#009bac] border-gray-300 rounded focus:ring-[#009bac]"
              />
              <label htmlFor="modalAcceptTerms" className="text-sm text-gray-600 leading-relaxed">
                Aceito receber comunicações da Onda Pro via WhatsApp, e-mail e outros canais.
                Li e concordo com a Política de Privacidade e Termos de Uso.
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gradient-to-r from-[#009bac] to-[#4dbdc6] text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Send size={20} />
              Receber Catálogo no WhatsApp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
