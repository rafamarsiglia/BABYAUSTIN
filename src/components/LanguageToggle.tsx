import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { Language } from '../translations';

interface LanguageToggleProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
  onClose: () => void;
  showClose: boolean;
}

export default function LanguageToggle({ currentLang, setLang, onClose, showClose }: LanguageToggleProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-full shadow-md border border-light-seafoam">
        <button
          onClick={() => setLang('en')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            currentLang === 'en'
              ? 'bg-muted-sage text-white shadow-sm'
              : 'text-muted-sage hover:bg-light-seafoam/20'
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang('es')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            currentLang === 'es'
              ? 'bg-muted-sage text-white shadow-sm'
              : 'text-muted-sage hover:bg-light-seafoam/20'
          }`}
        >
          ES
        </button>
      </div>
      
      {showClose && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-light-seafoam flex items-center justify-center text-[10px] font-bold uppercase tracking-widest text-muted-sage hover:text-vibrant-orange transition-colors"
        >
          Close Invitation
        </motion.button>
      )}
    </div>
  );
}
