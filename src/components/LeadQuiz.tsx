import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle2, Store, MapPin, Mail, Phone, FileText, User } from 'lucide-react';

interface LeadQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  isRetailer: boolean | null;
  hasCNPJ: boolean | null;
  name: string;
  cnpj: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
}

const LeadQuiz = ({ isOpen, onClose }: LeadQuizProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    isRetailer: null,
    hasCNPJ: null,
    name: '',
    cnpj: '',
    email: '',
    whatsapp: '',
    city: '',
    state: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const encouragements = ['Show!', 'Perfeito, estamos quase lá!', 'Anotado 👍', 'Última perguntinha…'];

  const handleYesNo = (field: 'isRetailer' | 'hasCNPJ', value: boolean) => {
    setFormData({ ...formData, [field]: value });
    
    if (!value) {
      // Usuário não tem CNPJ ou não é lojista
      setStep(10); // Página de encerramento
    } else {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleNext = () => {
    if (step < 7) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Envio para n8n
    const payload = {
      nome: formData.name,
      telefone: formData.whatsapp,
      email: formData.email,
      cnpj: formData.cnpj,
      cidade: formData.city,
      estado: formData.state
    };

    try {
      // Aqui você coloca a URL do seu webhook n8n
      // await fetch('YOUR_N8N_WEBHOOK_URL', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // });
      
      console.log('Lead enviado:', payload);
      setIsSubmitted(true);
      
      // Fecha o modal após 3 segundos
      setTimeout(() => {
        onClose();
        resetQuiz();
      }, 3000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
    }
  };

  const resetQuiz = () => {
    setStep(1);
    setFormData({
      isRetailer: null,
      hasCNPJ: null,
      name: '',
      cnpj: '',
      email: '',
      whatsapp: '',
      city: '',
      state: ''
    });
    setIsSubmitted(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetQuiz, 300);
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .substring(0, 15);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-[#6c256f] to-[#009bac]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 7) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 pt-16">
            <AnimatePresence mode="wait">
              {/* Step 1: É lojista? */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <Store className="w-16 h-16 mx-auto mb-4 text-[#6c256f]" />
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">Você é lojista?</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleYesNo('isRetailer', true)}
                      className="flex-1 py-4 bg-[#6c256f] text-white rounded-xl font-semibold hover:bg-[#8c4091] transition-colors"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => handleYesNo('isRetailer', false)}
                      className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Não
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Tem CNPJ? */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center"
                >
                  <FileText className="w-16 h-16 mx-auto mb-4 text-[#009bac]" />
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">Você possui CNPJ ativo?</h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleYesNo('hasCNPJ', true)}
                      className="flex-1 py-4 bg-[#009bac] text-white rounded-xl font-semibold hover:bg-[#4dbdc6] transition-colors"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => handleYesNo('hasCNPJ', false)}
                      className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Não
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Nome */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <User className="w-12 h-12 mx-auto mb-4 text-[#6c256f]" />
                  <p className="text-sm text-[#009bac] font-semibold mb-2">{encouragements[0]}</p>
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">Qual é o seu nome completo?</h3>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#6c256f] focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!formData.name.trim()}
                    className="w-full mt-6 py-4 bg-[#6c256f] text-white rounded-xl font-semibold hover:bg-[#8c4091] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Step 4: CNPJ */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <FileText className="w-12 h-12 mx-auto mb-4 text-[#009bac]" />
                  <p className="text-sm text-[#009bac] font-semibold mb-2">{encouragements[1]}</p>
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">Pode me informar o número do seu CNPJ?</h3>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })}
                    placeholder="00.000.000/0000-00"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={formData.cnpj.length < 18}
                    className="w-full mt-6 py-4 bg-[#009bac] text-white rounded-xl font-semibold hover:bg-[#4dbdc6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Step 5: Email */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Mail className="w-12 h-12 mx-auto mb-4 text-[#6c256f]" />
                  <p className="text-sm text-[#009bac] font-semibold mb-2">{encouragements[2]}</p>
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">Qual e-mail você usa para contato comercial?</h3>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#6c256f] focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={!formData.email.includes('@')}
                    className="w-full mt-6 py-4 bg-[#6c256f] text-white rounded-xl font-semibold hover:bg-[#8c4091] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Step 6: WhatsApp */}
              {step === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Phone className="w-12 h-12 mx-auto mb-4 text-[#009bac]" />
                  <p className="text-sm text-[#009bac] font-semibold mb-2">{encouragements[3]}</p>
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-6">E o seu número de WhatsApp?</h3>
                  <p className="text-sm text-gray-600 mb-4">Assim nosso time pode te mandar o catálogo.</p>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: formatPhone(e.target.value) })}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={handleNext}
                    disabled={formData.whatsapp.length < 15}
                    className="w-full mt-6 py-4 bg-[#009bac] text-white rounded-xl font-semibold hover:bg-[#4dbdc6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continuar <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Step 7: Cidade e Estado */}
              {step === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <MapPin className="w-12 h-12 mx-auto mb-4 text-[#6c256f]" />
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-2">Pra finalizar, me diz de qual cidade e estado você fala.</h3>
                  <p className="text-sm text-gray-600 mb-6">Pedimos isso porque um representante oficial da sua região vai entrar em contato com você.</p>
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Cidade"
                      className="col-span-2 px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#6c256f] focus:outline-none text-lg"
                      autoFocus
                    />
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                      placeholder="UF"
                      maxLength={2}
                      className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[#009bac] focus:outline-none text-lg text-center"
                    />
                  </div>
                  <button
                    onClick={handleNext}
                    disabled={!formData.city.trim() || formData.state.length !== 2}
                    className="w-full mt-6 py-4 bg-gradient-to-r from-[#6c256f] to-[#009bac] text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Enviar <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* Step 10: Não qualificado */}
              {step === 10 && (
                <motion.div
                  key="step10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                    <Store className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Ah, entendi!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    No momento, a Onda Pro atende apenas lojistas com CNPJ ativo. Nosso foco é oferecer condições exclusivas e suporte direto para revendedores.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Entendi
                  </button>
                </motion.div>
              )}

              {/* Success */}
              {isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle2 className="w-20 h-20 mx-auto mb-6 text-green-500" />
                  <h3 className="text-2xl font-bold text-[#6c256f] mb-4">Pronto!</h3>
                  <p className="text-gray-700 leading-relaxed mb-2">
                    Seus dados foram enviados pro representante da sua região.
                  </p>
                  <p className="text-lg font-semibold text-[#009bac]">
                    Em breve você vai receber o Catálogo Oficial com condições exclusivas 🎉
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LeadQuiz;
