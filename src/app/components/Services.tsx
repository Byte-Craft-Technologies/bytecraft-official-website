'use client';

/**
 * Section Services - Affiche les services offerts
 * Utilise SERVICES et TECHNOLOGIES constants
 */

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SERVICES, TECHNOLOGIES } from '@/constants';
import type { Service } from '@/types';

const Services = () => {
  const t = useTranslations('services');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a1a] to-[#0d1525] relative overflow-hidden" id="services">
      <div className="absolute top-40 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHeader t={t} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              t={t}
              isHovered={hoveredService === service.id}
              onHover={() => setHoveredService(service.id)}
              onLeave={() => setHoveredService(null)}
            />
          ))}
        </div>

        <TechnologiesSection t={t} />
        <AgileBadge t={t} />
        <CTASection t={t} />
      </div>
    </section>
  );
};

function SectionHeader({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
        {t('badge')}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('title')}</h2>
      <p className="text-gray-400 max-w-2xl mx-auto">{t('description')}</p>
    </div>
  );
}

interface ServiceCardProps {
  service: Service;
  t: ReturnType<typeof useTranslations>;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ServiceCard({ service, t, isHovered, onHover, onLeave }: ServiceCardProps) {
  const details = t.raw(service.detailsKey) as string[];

  return (
    <div
      className={`group relative p-6 rounded-2xl border transition-all duration-500 bg-gradient-to-br from-white/5 to-white/[0.02] ${
        isHovered ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10 scale-[1.02]' : 'border-white/10 hover:border-white/20'
      }`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4 shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
        {service.icon}
      </div>

      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
        {t(service.titleKey)}
      </h3>
      <p className="text-gray-400 text-sm mb-4">{t(service.descriptionKey)}</p>

      <ul className="space-y-2 mb-4">
        {details.map((detail: string, index: number) => (
          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
            <CheckIcon />
            {detail}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
        {service.technologies.map((tech, index) => (
          <span key={index} className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TechnologiesSection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="mt-20">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-2">{t('techTitle')}</h3>
        <p className="text-gray-400">{t('techDescription')}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {TECHNOLOGIES.map((tech, index) => (
          <div key={index} className="group px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 cursor-default">
            <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">{tech.name}</span>
            <span className="ml-2 text-xs text-gray-500">{tech.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AgileBadge({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="mt-16 flex justify-center">
      <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-primary/10 border border-cyan-500/20">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-primary flex items-center justify-center text-white text-xl">
          ⚡
        </div>
        <div>
          <div className="text-white font-semibold">{t('agileTitle')}</div>
          <div className="text-gray-400 text-sm">{t('agileDescription')}</div>
        </div>
      </div>
    </div>
  );
}

function CTASection({ t }: { t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="text-center mt-16">
      <p className="text-gray-400 mb-6">{t('ctaText')}</p>
      <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
        {t('ctaButton')}
        <ArrowIcon />
      </a>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default Services;