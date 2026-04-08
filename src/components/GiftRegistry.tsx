import { motion } from 'motion/react';
import { Gift, ExternalLink, ShoppingBag, Star } from 'lucide-react';
import { Language, translations } from '../translations';

interface GiftRegistryProps {
  lang: Language;
}

const products = [
  {
    title: "Blissful Diary Baby Gym",
    price: "$39.99",
    rating: 4.8,
    image: "https://orvit.design/wp-content/uploads/2026/04/Blissful-Diary-Baby-Gym.png"
  },
  {
    title: "Momcozy Baby Carrier",
    price: "$49.99",
    rating: 4.9,
    image: "https://orvit.design/wp-content/uploads/2026/04/Momcozy-Baby-Carrier.png"
  },
  {
    title: "Monamii Baby Swing",
    price: "$89.99",
    rating: 4.7,
    image: "https://orvit.design/wp-content/uploads/2026/04/Monamii-Baby-Swing.png"
  },
  {
    title: "Tummy Time Mat",
    price: "$25.99",
    rating: 4.6,
    image: "https://orvit.design/wp-content/uploads/2026/04/Tummy-Time-Mat.png"
  },
  {
    title: "Lucakuins Baby Lounger",
    price: "$45.99",
    rating: 4.8,
    image: "https://orvit.design/wp-content/uploads/2026/04/Lucakuins-Baby-Lounger.png"
  }
];

export default function GiftRegistry({ lang }: GiftRegistryProps) {
  const t = translations[lang];
  const registryUrl = "https://www.amazon.com/baby-reg/bienvenidosanuestralista-babysaustingerakoulis-junio-2026-bronx/39LDTJAUKY9NA?ref_=cm_sw_r_apin_dp_KX8A2BM2WAECZ9PXKQSW_1&language=en-US";

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white/0 to-white/60 relative z-10">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          <div className="w-12 h-12 rounded-full bg-light-seafoam/30 flex items-center justify-center mb-4">
            <Gift className="text-muted-sage w-6 h-6" />
          </div>
          <h2 className="text-4xl font-serif text-deep-royal-blue mb-4">{t.registry}</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-12">{t.registryDesc}</p>
        </motion.div>

        {/* Product Carousel (Horizontal Scroll) */}
        <div className="flex overflow-x-auto pb-12 gap-6 snap-x no-scrollbar px-4 -mx-4">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-[2rem] shadow-xl border border-light-seafoam/30 overflow-hidden snap-center group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-golden-yellow fill-golden-yellow" />
                  <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                </div>
              </div>
              
              <div className="p-6 text-left">
                <h3 className="font-serif text-lg text-deep-royal-blue mb-1 line-clamp-1">{product.title}</h3>
                <p className="text-vibrant-orange font-bold text-xl mb-4">{product.price}</p>
                
                <a
                  href={registryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-light-seafoam/20 text-muted-sage rounded-xl font-bold text-sm hover:bg-muted-sage hover:text-white transition-all border border-light-seafoam/50"
                >
                  {t.amazonRegistry}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(242, 122, 24, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            href={registryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-vibrant-orange to-bright-orange text-white rounded-2xl font-bold tracking-widest uppercase text-sm shadow-xl transition-all animate-pulse-slow"
          >
            {t.viewFullRegistry}
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
