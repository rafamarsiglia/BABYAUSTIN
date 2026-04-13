import { motion, useScroll, useTransform } from 'motion/react';
import { Calendar, Clock, MapPin, Heart, Gift, Camera, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../translations';
import RSVPForm from './RSVPForm';
import Gallery from './Gallery';
import GiftRegistry from './GiftRegistry';

interface InvitationContentProps {
  lang: Language;
  key?: string;
}

const BearWatermark = ({ delay = 0, x = "10%", y = "20%" }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 0.05 }}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0]
    }}
    transition={{ 
      duration: 5, 
      repeat: Infinity, 
      delay 
    }}
    className="fixed z-0 pointer-events-none"
    style={{ left: x, top: y }}
  >
    <img
      src="https://orvit.design/wp-content/uploads/2026/04/teddy_bear.webp"
      alt="Bear Watermark"
      className="w-32 h-auto grayscale"
      referrerPolicy="no-referrer"
    />
  </motion.div>
);

export default function InvitationContent({ lang }: InvitationContentProps) {
  const t = translations[lang];
  const { scrollYProgress } = useScroll();

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-light-peach paper-texture selection:bg-muted-sage/30 relative">
      {/* Bear Watermarks */}
      <BearWatermark x="5%" y="15%" delay={0} />
      <BearWatermark x="85%" y="40%" delay={1} />
      <BearWatermark x="10%" y="70%" delay={2} />
      <BearWatermark x="80%" y="85%" delay={0.5} />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-light-peach/90 via-light-peach/40 to-light-peach z-10" />
          <img
            src="https://orvit.design/wp-content/uploads/2026/04/PARENTS.jpeg"
            alt="Parents"
            className="w-full h-full object-cover opacity-15"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-sm md:text-base text-muted-sage uppercase tracking-[0.5em] mb-8 drop-shadow-sm"
          >
            {t.youAreInvited}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-script text-3xl md:text-5xl mb-4 text-deep-royal-blue drop-shadow-sm"
          >
            {t.babyShowerOf}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-5xl md:text-8xl font-serif mb-6 tracking-tight bg-gradient-to-br from-light-seafoam to-muted-sage bg-clip-text text-transparent drop-shadow-md"
          >
            {t.babyName}
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-px bg-muted-sage mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-lg md:text-xl text-gray-600 font-sans tracking-widest uppercase"
          >
            {t.parents}
          </motion.p>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-sage opacity-50"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
            <div className="w-px h-8 bg-muted-sage" />
          </div>
        </motion.div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-4 max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <motion.div {...fadeIn} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-light-seafoam/30 flex items-center justify-center mb-6">
              <Calendar className="text-muted-sage w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif mb-2">{t.date}</h3>
            <p className="text-gray-500">{t.time}</p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-light-seafoam/30 flex items-center justify-center mb-6">
              <MapPin className="text-muted-sage w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif mb-2">{t.location}</h3>
            <p className="text-gray-500 mb-6">{t.city}</p>
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-light-seafoam/30 flex items-center justify-center mb-6">
              <Heart className="text-muted-sage w-8 h-8" />
            </div>
            <h3 className="text-xl font-serif mb-2">{t.dressCode}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed px-4">{t.dressCodeDesc}</p>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-xs">
              {[
                '#FFFFFF', // White
                '#E3F2FD', // Light Blue
               
                '#F1F8E9', // Light Green
                '#FFF9C4', // Light Yellow
          
              ].map((color, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="relative group"
                >
                  <motion.div
                    animate={{ 
                      boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 15px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0)"],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: index * 0.3 
                    }}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md relative overflow-hidden"
                    style={{ backgroundColor: color }}
                  >
                    <motion.div
                      animate={{ 
                        x: ['-100%', '200%'],
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatDelay: 2 + index,
                        ease: "linear"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          {...fadeIn}
          className="mt-24 text-center max-w-2xl mx-auto"
        >
          <p className="font-script text-3xl text-muted-sage mb-6">"{t.message}"</p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      <Gallery lang={lang} />

      {/* Gift Registry Section */}
      <GiftRegistry lang={lang} />

      {/* RSVP Section */}
      <RSVPForm lang={lang} />

      {/* Map Section */}
      <section className="pb-24 px-4 max-w-3xl mx-auto relative z-10 text-center">
        <motion.div {...fadeIn}>
          <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl mb-8 border-8 border-white">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3018.675661208034!2d-73.834789623414!3d40.83509997137537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f37777777777%3A0x7777777777777777!2sVistamar%20Restaurant%20%26%20Lounge!5e0!3m2!1sen!2sus!4v1712512345678!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.google.com/maps/search/?api=1&query=Vistamar+Restaurant+and+Lounge+Bronx+NY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-gradient-to-r from-vibrant-orange to-bright-orange text-white rounded-full text-sm uppercase tracking-widest font-bold shadow-xl hover:shadow-vibrant-orange/40 transition-all"
          >
            Ver Mapa
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-light-seafoam/30 relative z-10">
        <p className="font-serif text-deep-royal-blue text-xl mb-2">{t.babyName}</p>
        <p className="text-xs text-gray-400 uppercase tracking-[0.4em]">2026 • Baby Shower</p>
      </footer>
    </div>
  );
}
