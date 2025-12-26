'use client';

import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: "Le Béret Rouge",
    category: "Site Web",
    description: "Site vitrine élégant pour une entreprise française. Design moderne, responsive et optimisé pour le SEO.",
    link: "https://leberetrouge.fr/",
    technologies: ["WordPress", "PHP", "CSS"],
    color: "from-red-500 to-orange-500",
    icon: "🎩",
  },
  {
    id: 2,
    title: "Ojami",
    category: "Application Mobile",
    description: "Application mobile innovante disponible sur Google Play Store. Architecture robuste avec un backend sécurisé.",
    link: "https://play.google.com/store/search?q=ojami&c=apps&hl=en",
    technologies: ["React Native", "Java Spring Boot", "Spring Security"],
    color: "from-green-500 to-emerald-500",
    icon: "📱",
  },
  {
    id: 3,
    title: "Commune d'Avrankou",
    category: "Site Web",
    description: "Site officiel de la commune d'Avrankou. Interface moderne pour informer les citoyens et promouvoir la région.",
    link: "https://hprogramming.github.io/avrankou",
    technologies: ["React JS", "JavaScript", "CSS"],
    color: "from-blue-500 to-indigo-500",
    icon: "🏛️",
  },
];

const Realisations = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#0a0a1a] relative overflow-hidden" id="realisations">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nos Réalisations
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez quelques-uns de nos projets qui témoignent de notre expertise et de notre engagement envers l&apos;excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={`
                relative overflow-hidden rounded-2xl border border-white/10
                bg-gradient-to-br from-white/5 to-white/[0.02]
                transition-all duration-500 h-full
                ${hoveredId === project.id ? 'border-cyan-500/30 shadow-2xl shadow-cyan-500/10 scale-[1.02]' : ''}
              `}>
                {/* Project Header */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  {/* Placeholder gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />

                  {/* Grid pattern overlay */}
                  <div className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
                                        linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
                      backgroundSize: '20px 20px'
                    }}
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium text-white
                      bg-gradient-to-r ${project.color}
                    `}>
                      {project.category}
                    </span>
                  </div>

                  {/* Project icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`
                      w-20 h-20 rounded-2xl bg-gradient-to-br ${project.color}
                      flex items-center justify-center text-4xl
                      shadow-lg transform transition-transform duration-500
                      ${hoveredId === project.id ? 'scale-110 rotate-3' : ''}
                    `}>
                      {project.icon}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent
                    transition-opacity duration-300
                    ${hoveredId === project.id ? 'opacity-80' : 'opacity-60'}
                  `} />
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
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

                  {/* Link arrow */}
                  <div className="flex items-center text-cyan-400 text-sm font-medium">
                    <span>Voir le projet</span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform duration-300 ${hoveredId === project.id ? 'translate-x-2' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Vous avez un projet en tête ?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-primary text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Discutons de votre projet
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