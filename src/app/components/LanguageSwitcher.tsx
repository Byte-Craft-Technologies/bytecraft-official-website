'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';

const locales = [
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'en', name: 'EN', flag: '🇬🇧' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000`;
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 p-1">
      {locales.map((loc) => (
        <button
          key={loc.code}
          onClick={() => handleLocaleChange(loc.code)}
          disabled={isPending}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
            locale === loc.code
              ? 'bg-cyan-500 text-white'
              : 'text-gray-400 hover:text-white'
          } ${isPending ? 'opacity-50 cursor-wait' : ''}`}
        >
          <span className="mr-1">{loc.flag}</span>
          {loc.name}
        </button>
      ))}
    </div>
  );
}