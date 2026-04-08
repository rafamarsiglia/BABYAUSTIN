import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language, translations } from '../translations';

interface GalleryProps {
  lang: Language;
}

export default function Gallery({ lang }: GalleryProps) {
  const t = translations[lang];
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelation7.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelation6.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelation5-scaled.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelation4.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelartion2.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/sex-revelation1.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/ecografia-4.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/ecografia-baby-austin-3.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/ecografia-baby-austin-2-scaled.jpeg",
    "https://orvit.design/wp-content/uploads/2026/04/PARENTS.jpeg"
  ];

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-24 px-4 bg-white/40 backdrop-blur-sm relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16"
        >
          <div className="w-12 h-12 rounded-full bg-light-seafoam/30 flex items-center justify-center mb-4">
            <Camera className="text-muted-sage w-6 h-6" />
          </div>
          <h2 className="text-4xl font-serif text-deep-royal-blue">{t.gallery}</h2>
          <div className="w-16 h-px bg-muted-sage mt-4" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(index)}
              className={`relative overflow-hidden rounded-2xl shadow-lg aspect-square group cursor-pointer ${
                index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <img
                src={img}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-deep-royal-blue/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-black/20 rounded-full backdrop-blur-sm"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-black/20 rounded-full backdrop-blur-sm"
            >
              <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-black/20 rounded-full backdrop-blur-sm"
            >
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -100 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImage]}
                alt={`Gallery ${selectedImage}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
            {/* Mobile Swipe Indicators */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 md:hidden">
              {images.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-full transition-all ${i === selectedImage ? 'bg-white w-4' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
