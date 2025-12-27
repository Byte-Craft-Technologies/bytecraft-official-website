'use client';

/**
 * Message de succès après soumission du formulaire
 */

import { useTranslations } from 'next-intl';

export function SuccessMessage() {
  const t = useTranslations('contact');

  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-4xl mx-auto mb-6">
        ✓
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
      <p className="text-gray-400">{t('form.successMessage')}</p>
    </div>
  );
}