'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const Services = () => {
  const t = useTranslations('services');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const services = [
    {
      id: 'web',
      icon: '🌐',
      titleKey: 'web.title',
      descriptionKey: 'web.description',
      detailsKey: 'web.details',
      technologies: ['React JS', 'Next.js', 'WordPress', 'Spring MVC'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'mobile',
      icon: '📱',
      titleKey: 'mobile.title',
      descriptionKey: 'mobile.description',
      detailsKey: 'mobile.details',
      technologies: ['React Native', 'Java', 'Spring Boot'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'backend',
      icon: '⚙️',
      titleKey: 'backend.title',
      descriptionKey: 'backend.description',
      detailsKey: 'backend.details',
      technologies: ['Java EE', 'Spring Boot', 'Spring Security', 'Python'],
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'ai',
      icon: '🤖',
      titleKey: 'ai.title',
      descriptionKey: 'ai.description',
      detailsKey: 'ai.details',
      technologies: ['Spring AI', 'Python', 'OpenAI', 'LangChain'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'consulting',
      icon: '💡',
      titleKey: 'consulting.title',
      descriptionKey: 'consulting.description',
      detailsKey: 'consulting.details',
      technologies: ['Agile', 'Scrum', 'UML', 'Design Thinking'],
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'deploy',
      icon: '🚀',
      titleKey: 'deploy.title',
      descriptionKey: 'deploy.description',
      detailsKey: 'deploy.details',
      technologies: ['Docker', 'AWS', 'Vercel', 'VPS', 'GitHub Actions'],
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  const technologies = [
    { name: 'Java EE', category: 'Backend' },
    { name: 'Spring Boot', category: 'Backend' },
    { name: 'Spring AI', category: 'AI' },
    { name: 'Spring MVC', category: 'Backend' },
    { name: 'Spring Security', category: 'Backend' },
    { name: 'React Native', category: 'Mobile' },
    { name: 'React JS', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'WordPress', category: 'CMS' },
    { name: 'Python', category: 'Backend' },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a1a] to-[#0d1525] relative overflow-hidden" id="services">
      {/* Background decorations */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {services.map((service) => {
            const details = t.raw(service.detailsKey) as string[];
            return (
              <div
                key={service.id}
                className={`
                  group relative p-6 rounded-2xl border transition-all duration-500
                  bg-gradient-to-br from-white/5 to-white/[0.02]
                  ${hoveredService === service.id
                    ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10 scale-[1.02]'
                    : 'border-white/10 hover:border-white/20'}
                `}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                {/* Icon */}
                <div className={`
                  w-14 h-14 rounded-xl bg-gradient-to-br ${service.color}
                  flex items-center justify-center text-2xl mb-4
                  shadow-lg transition-transform duration-300
                  ${hoveredService === service.id ? 'scale-110 rotate-3' : ''}
                `}>
                  {service.icon}
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {t(service.descriptionKey)}
                </p>

                {/* Details */}
                <ul className="space-y-2 mb-4">
                  {details.map((detail: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {service.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Technologies Section */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">{t('techTitle')}</h3>
            <p className="text-gray-400">{t('techDescription')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="group px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all duration-300 cursor-default"
              >
                <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {tech.name}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Agile badge */}
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

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">{t('ctaText')}</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            {t('ctaButton')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;