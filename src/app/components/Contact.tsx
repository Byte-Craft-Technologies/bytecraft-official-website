'use client';

/**
 * Section Contact - Conteneur principal
 * Utilise les sous-composants et le hook useContactForm
 */

import { useTranslations } from 'next-intl';
import { useContactForm } from '@/hooks';
import { ContactInfo, ContactForm, SuccessMessage } from './contact-parts';

const Contact = () => {
  const t = useTranslations('contact');
  const {
    formData,
    isSubmitting,
    submitted,
    error,
    handleChange,
    handleCurrencyChange,
    handleSubmit,
  } = useContactForm();

  const translatedError = error ? t('form.error') : null;

  return (
    <section className="py-24 bg-gradient-to-b from-[#0d1525] to-[#0a0a1a] relative overflow-hidden" id="contact">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-12">
          <ContactInfo />

          <div className="lg:col-span-3">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {submitted ? (
                <SuccessMessage />
              ) : (
                <ContactForm
                  formData={formData}
                  isSubmitting={isSubmitting}
                  error={translatedError}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  onCurrencyChange={handleCurrencyChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;