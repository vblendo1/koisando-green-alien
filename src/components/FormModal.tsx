import { LeadForm } from './LeadForm';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productLine?: string;
}

const FormModal = ({ isOpen, onClose, productLine }: FormModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          <motion.div
            className="relative z-10 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Fechar"
            >
              <X className="h-5 w-5 text-white" />
            </button>
            
            <LeadForm productLine={productLine} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormModal;