import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

const supportedLocales = ['fr', 'en'];

function getPreferredLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return 'fr';

  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, priority = 'q=1'] = lang.trim().split(';');
      const q = parseFloat(priority.replace('q=', '')) || 1;
      const baseCode = code.split('-')[0].toLowerCase();
      return { code: baseCode, q };
    })
    .sort((a, b) => b.q - a.q);

  for (const lang of languages) {
    if (supportedLocales.includes(lang.code)) {
      return lang.code;
    }
  }

  return 'fr';
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value;

  let locale: string;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const acceptLanguage = headerStore.get('accept-language');
    locale = getPreferredLocale(acceptLanguage);
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});