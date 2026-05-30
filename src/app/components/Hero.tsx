'use client';

import React, { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import Button from './button';
import HeroVisual from './HeroVisual';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      titleKey: 'slide1Title',
      subtitleKey: 'slide1Subtitle',
      descriptionKey: 'slide1Description',
      visual: 'tech' as const,
      link: "#contact",
    },
    {
      titleKey: 'slide2Title',
      subtitleKey: 'slide2Subtitle',
      descriptionKey: 'slide2Description',
      visual: 'mobile' as const,
      link: "#services",
    },
    {
      titleKey: 'slide3Title',
      subtitleKey: 'slide3Subtitle',
      descriptionKey: 'slide3Description',
      visual: 'web' as const,
      link: "#realisations",
    },
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    if (index !== activeSlide) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSlide(index);
        setIsAnimating(false);
      }, 300);
    }
  };

  const currentSlide = slides[activeSlide];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Futuristic WebGL Background */}
      <ParticleBackground />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a1a] to-transparent pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`space-y-8 transition-all duration-700 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <div className="space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-cyan-500/20 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse mr-3"></span>
                  <span className="text-cyan-300/90 text-sm font-medium">{t('badge')}</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {t('title1')}
                  <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-primary to-cyan-400 bg-clip-text text-transparent">
                    {t('title2')}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                  {t('description')}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  name={t('cta1')}
                  link={currentSlide.link}
                  borderStyle="rounded-full px-8 py-4"
                  fontStyle="text-base font-semibold"
                  bgColor="bg-gradient-to-r from-cyan-500 to-primary hover:shadow-lg hover:shadow-cyan-500/25"
                  textColor="text-white"
                />
                <a
                  href="#realisations"
                  className="group flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="font-medium">{t('cta2')}</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white">5</div>
                  <div className="text-gray-400 text-sm">{t('stats.projects')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100%</div>
                  <div className="text-gray-400 text-sm">{t('stats.satisfaction')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">3</div>
                  <div className="text-gray-400 text-sm">{t('stats.experience')}</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className={`relative flex items-center justify-center min-h-[400px] transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              <HeroVisual variant={currentSlide.visual} />
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeSlide
                ? 'w-10 h-3 bg-gradient-to-r from-cyan-400 to-primary'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-cyan-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;