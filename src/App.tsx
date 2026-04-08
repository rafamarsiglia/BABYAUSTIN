import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import BearIntro from './components/BearIntro';
import InvitationContent from './components/InvitationContent';
import LanguageToggle from './components/LanguageToggle';
import { Language } from './translations';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Language>('es');

  // Ensure we start at the top when opened
  useEffect(() => {
    if (isOpen) {
      window.scrollTo(0, 0);
    }
  }, [isOpen]);

  return (
    <main className="relative min-h-screen">
      <LanguageToggle 
        currentLang={lang} 
        setLang={setLang} 
        onClose={() => setIsOpen(false)} 
        showClose={isOpen} 
      />
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <BearIntro key="intro" onOpen={() => setIsOpen(true)} lang={lang} />
        ) : (
          <InvitationContent key="content" lang={lang} />
        )}
      </AnimatePresence>
    </main>
  );
}
