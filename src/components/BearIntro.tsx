import { motion } from 'motion/react';
import { Language, translations } from '../translations';

interface BearIntroProps {
  onOpen: () => void;
  lang: Language;
  key?: string;
}

export default function BearIntro({ onOpen, lang }: BearIntroProps) {
  const t = translations[lang];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-light-peach paper-texture vignette"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative cursor-pointer group"
        onClick={onOpen}
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative z-10"
        >
          <img
            src="https://orvit.design/wp-content/uploads/2026/04/teddy_bear.webp"
            alt="Teddy Bear"
            className="w-64 md:w-80 h-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-muted-sage/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-8 font-serif text-xl md:text-2xl text-muted-sage tracking-widest uppercase animate-pulse"
      >
        {t.clickToOpen}
      </motion.p>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="w-px h-16 bg-gradient-to-b from-muted-sage/0 via-muted-sage/50 to-muted-sage/0" />
      </div>
    </motion.div>
  );
}
