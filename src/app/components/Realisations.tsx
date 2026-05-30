'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Project {
  id: number;
  titleKey: string;
  categoryKey: string;
  descriptionKey: string;
  link: string;
  storeLink?: string;
  technologies: string[];
  color: string;
  icon: string;
  iconImage?: string;
  heroBg?: string;
}

const Realisations = () => {
  const t = useTranslations('realisations');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      titleKey: "project1.title",
      categoryKey: "project1.category",
      descriptionKey: "project1.description",
      link: "https://leberetrouge.fr/",
      technologies: ["WordPress", "PHP", "CSS"],
      color: "from-red-500 to-orange-500",
      icon: "🎩",
      iconImage: "/beret-rouge-icon.png",
      heroBg: "/beret-rouge-hero.png",
    },
    {
      id: 2,
      titleKey: "project2.title",
      categoryKey: "project2.category",
      descriptionKey: "project2.description",
      link: "https://play.google.com/store/search?q=ojami&c=apps&hl=en",
      technologies: ["React JS", "Spring Boot", "Spring Security", "PostgreSQL"],
      color: "from-green-500 to-emerald-500",
      icon: "📱",
      iconImage: "/ojami-icon.webp",
      heroBg: "/ojami-hero.webp",
    },
    {
      id: 3,
      titleKey: "project3.title",
      categoryKey: "project3.category",
      descriptionKey: "project3.description",
      link: "https://hprogramming.github.io/avrankou",
      technologies: ["React JS", "JavaScript", "CSS"],
      color: "from-blue-500 to-indigo-500",
      icon: "🏛️",
      iconImage: "/avrankou-icon.jpg",
      heroBg: "/avrankou-hero.jpg",
    },
    {
      id: 4,
      titleKey: "project4.title",
      categoryKey: "project4.category",
      descriptionKey: "project4.description",
      link: "https://www.afroverse.io/",
      technologies: ["React", "Python", "FastAPI", "LangChain", "PostgreSQL", "Alembic"],
      color: "from-purple-500 to-pink-500",
      icon: "🌍",
      iconImage: "/afroverse-icon.svg",
      heroBg: "/afroverse-icon.svg",
    },
    {
      id: 5,
      titleKey: "project5.title",
      categoryKey: "project5.category",
      descriptionKey: "project5.description",
      link: "https://vasesdhonneur-adg.com",
      storeLink: "https://apps.apple.com/bj/app/vases-dhonneur-adg/id6763616348",
      technologies: ["Express TS", "React Native", "React", "PostgreSQL", "Prisma", "Docker", "Nginx"],
      color: "from-amber-500 to-yellow-500",
      icon: "🏺",
      iconImage: "/vases-dhonneur-icon.jpg",
      heroBg: "/vases-dhonneur-hero.png",
    },
  ];

  return (
    <section className="py-24 bg-[#0a0a1a] relative overflow-hidden" id="realisations">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const cardInner = (
              <div className={`
                relative overflow-hidden rounded-2xl border border-white/10
                bg-gradient-to-br from-white/5 to-white/[0.02]
                transition-all duration-500 h-full
                ${hoveredId === project.id ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10 scale-[1.02]' : ''}
              `}>
                {/* Project Header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  {project.heroBg && (
                    <Image
                      src={project.heroBg}
                      alt=""
                      fill
                      className="object-cover object-center"
                      aria-hidden="true"
                    />
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} ${project.heroBg ? 'opacity-30' : 'opacity-20'}`} />
                  {!project.heroBg && (
                    <div className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                      }}
                    />
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium text-white
                      bg-gradient-to-r ${project.color}
                    `}>
                      {t(project.categoryKey)}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                      w-20 h-20 rounded-2xl overflow-hidden
                      ${project.iconImage ? '' : `bg-gradient-to-br ${project.color} flex items-center justify-center text-4xl`}
                      shadow-lg transform transition-transform duration-500
                      ${hoveredId === project.id ? 'scale-110 rotate-3' : ''}
                    `}>
                      {project.iconImage ? (
                        <Image
                          src={project.iconImage}
                          alt={project.titleKey}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        project.icon
                      )}
                    </div>
                  </div>
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent
                    transition-opacity duration-300
                    ${hoveredId === project.id ? 'opacity-80' : 'opacity-60'}
                  `} />
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {t(project.titleKey)}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {t(project.descriptionKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.storeLink ? (
                    <div className="flex gap-4">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors"
                      >
                        <span>{t('viewProject')}</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                      <a
                        href={project.storeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-amber-400 text-sm font-medium hover:text-amber-300 transition-colors"
                      >
                        <span>{t('viewStore')}</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  ) : (
                    <div className="flex items-center text-cyan-400 text-sm font-medium">
                      <span>{t('viewProject')}</span>
                      <svg
                        className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredId === project.id ? 'translate-x-2' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );

            return project.storeLink ? (
              <div
                key={project.id}
                className="group relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {cardInner}
              </div>
            ) : (
              <a
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {cardInner}
              </a>
            );
          })}
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

export default Realisations;