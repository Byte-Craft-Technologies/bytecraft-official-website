'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ParticleBackground from './ParticleBackground';
import NavBar from '../ui/Navbar';
import Button from './button';

const slides = [
  {
    title: "Propulsez votre Business",
    subtitle: "vers de nouveaux sommets",
    description: "Nous transformons vos idées en solutions numériques innovantes. Sites web, applications, et stratégies digitales sur mesure.",
    imageUrl: "/hero-image-1.png",
    link: "#contact",
  },
  {
    title: "Innovation & Excellence",
    subtitle: "au service de votre croissance",
    description: "Notre expertise technique et créative vous accompagne dans votre transformation digitale avec des solutions performantes.",
    imageUrl: "/hero-image-2.png",
    link: "#services",
  },
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 500);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

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

      {/* NavBar */}
      <NavBar />

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
                  <span className="text-cyan-300/90 text-sm font-medium">Disponible pour nouveaux projets</span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {currentSlide.title}
                  <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-primary to-cyan-400 bg-clip-text text-transparent">
                    {currentSlide.subtitle}
                  </span>
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  name="Démarrer un projet"
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
                  <span className="font-medium">Voir nos réalisations</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-10 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-sm">Projets livrés</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-gray-400 text-sm">Clients satisfaits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-gray-400 text-sm">Années d&apos;expérience</div>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className={`relative flex items-center justify-center transition-all duration-700 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-primary/20 rounded-full blur-3xl scale-75" />

              {/* Tech circles */}
              <div className="absolute w-[450px] h-[450px] border border-cyan-500/10 rounded-full" />
              <div className="absolute w-[380px] h-[380px] border border-primary/20 rounded-full animate-spin-slow" />
              <div className="absolute w-[300px] h-[300px] border border-cyan-400/10 rounded-full animate-spin-reverse" />

              {/* Hero Image */}
              <div className="relative z-10">
                <Image
                  src={currentSlide.imageUrl}
                  width={550}
                  height={550}
                  alt="Hero illustration"
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
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