import { useState } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Send, Users, Mail, User } from 'lucide-react';
import { Language, translations } from '../translations';

interface RSVPFormProps {
  lang: Language;
}

export default function RSVPForm({ lang }: RSVPFormProps) {
  const t = translations[lang];
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      guests: formData.get('guests'),
    };

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        console.error('RSVP failed');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-light-seafoam/30 relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-light-seafoam/20 rounded-bl-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-muted-sage/10 rounded-tr-full -ml-12 -mb-12" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-4xl font-serif text-deep-royal-blue mb-4">{t.rsvp}</h2>
                  <div className="w-12 h-1 bg-muted-sage mx-auto" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold ml-1">
                      {t.rsvpName}
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-sage" />
                      <input
                        required
                        name="name"
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-light-peach/30 border border-light-seafoam/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-muted-sage/50 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold ml-1">
                      {t.rsvpEmail}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-sage" />
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full pl-12 pr-4 py-4 bg-light-peach/30 border border-light-seafoam/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-muted-sage/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold ml-1">
                      {t.rsvpGuests}
                    </label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-sage" />
                      <select
                        required
                        name="guests"
                        className="w-full pl-12 pr-4 py-4 bg-light-peach/30 border border-light-seafoam/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-muted-sage/50 transition-all appearance-none"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-deep-royal-blue text-white rounded-2xl font-bold tracking-widest uppercase text-sm hover:bg-deep-royal-blue/90 transition-all shadow-xl hover:shadow-deep-royal-blue/20 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t.rsvpConfirm}
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-muted-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-muted-sage w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif text-deep-royal-blue mb-2">¡Excelente!</h3>
                <p className="text-gray-500">{t.rsvpSuccess}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs uppercase tracking-widest text-muted-sage border-b border-muted-sage"
                >
                  Volver a enviar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
