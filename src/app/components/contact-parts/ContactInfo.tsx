'use client';

/**
 * Composant affichant les informations de contact et liens sociaux
 */

import { useTranslations } from 'next-intl';

interface ContactCardProps {
  icon: string;
  gradientClass: string;
  title: string;
  children: React.ReactNode;
}

function ContactCard({ icon, gradientClass, title, children }: ContactCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center text-white text-xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-white font-semibold mb-1">{title}</h3>
      {children}
    </div>
  );
}

function SocialLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all"
    >
      {children}
    </a>
  );
}

export function ContactInfo() {
  const t = useTranslations('contact');

  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="space-y-4">
        <ContactCard
          icon="📧"
          gradientClass="from-cyan-500 to-primary"
          title={t('email')}
        >
          <a
            href="mailto:bytecraft.technologies@gmail.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            bytecraft.technologies@gmail.com
          </a>
        </ContactCard>

        <ContactCard
          icon="📱"
          gradientClass="from-green-500 to-emerald-500"
          title={t('whatsapp')}
        >
          <a
            href="https://wa.me/0601147224"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-400 transition-colors"
          >
            +33 601147224
          </a>
        </ContactCard>

        <ContactCard
          icon="📍"
          gradientClass="from-blue-500 to-indigo-500"
          title={t('location')}
        >
          <p className="text-gray-400">Porto-novo, Bénin</p>
        </ContactCard>
      </div>

      <div className="pt-6 border-t border-white/10">
        <h3 className="text-white font-semibold mb-4">{t('followUs')}</h3>
        <div className="flex gap-3">
          <SocialLink href="#">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </SocialLink>
          <SocialLink href="#">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://github.com/Byte-Craft-Technologies">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </SocialLink>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-primary/10 border border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
            ⚡
          </div>
          <div>
            <div className="text-white font-medium">{t('responseTime')}</div>
            <div className="text-gray-400 text-sm">{t('responseTimeDesc')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}