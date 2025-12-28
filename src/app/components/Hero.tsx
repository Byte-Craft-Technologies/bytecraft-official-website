'use client';

/**
 * Section Hero avec carousel auto-play
 * Utilise useCarousel hook et HERO_SLIDES constants
 */

import ParticleBackground from './ParticleBackground';
import Button from './button';
import HeroVisual from './HeroVisual';
import { useTranslations } from 'next-intl';
import { useCarousel } from '@/hooks';
import { HERO_SLIDES } from '@/constants';

const Hero = () => {
  const t = useTranslations('hero');
  const { activeIndex, isAnimating, goToSlide } = useCarousel({
    itemCount: HERO_SLIDES.length,
  });

  const currentSlide = HERO_SLIDES[activeIndex];
  const animationClass = isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0';
  const scaleClass = isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100';

  return (
    <section className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a1a] to-transparent pointer-events-none" />

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <HeroContent
              t={t}
              currentSlide={currentSlide}
              animationClass={animationClass}
            />
            <div className={`relative flex items-center justify-center min-h-[400px] transition-all duration-700 ${scaleClass}`}>
              <HeroVisual variant={currentSlide.visual} />
            </div>
          </div>
        </div>
      </div>

      <SlideIndicators
        slides={HERO_SLIDES}
        activeIndex={activeIndex}
        onSelect={goToSlide}
      />
      <ScrollIndicator />
    </section>
  );
};

interface HeroContentProps {
  t: ReturnType<typeof useTranslations>;
  currentSlide: typeof HERO_SLIDES[number];
  animationClass: string;
}

function HeroContent({ t, currentSlide, animationClass }: HeroContentProps) {
  return (
    <div className={`space-y-8 transition-all duration-700 ${animationClass}`}>
      <div className="space-y-8">
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-enhanced border-neon glow-neon-cyan">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse mr-3"></span>
          <span className="text-neon-cyan text-caption font-regular">{t('badge')}</span>
        </div>

        <h1 className="text-display font-semibold text-light leading-tight">
          {t('title1')}
          <span className="block mt-2 text-gradient-aurora">{t('title2')}</span>
        </h1>

        <p className="text-body font-regular text-light-300 max-w-xl leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button
          name={t('cta1')}
          link={currentSlide.link}
          borderStyle="rounded-full px-8 py-4"
          fontStyle="text-body font-semibold"
          bgColor="bg-gradient-to-r from-neon-cyan to-neon-blue shadow-neon-cyan hover:shadow-neon-blue"
          textColor="text-dark-950"
        />
        <a
          href="#realisations"
          className="group flex items-center gap-2 px-8 py-4 rounded-full border-neon-animated text-light hover:bg-white/5 transition-all duration-300 backdrop-blur-sm"
        >
          <span className="text-body font-semibold">{t('cta2')}</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div className="flex gap-8 pt-8 border-t border-light/10">
        <StatItem value="3" label={t('stats.projects')} />
        <StatItem value="100%" label={t('stats.satisfaction')} />
        <StatItem value="2" label={t('stats.experience')} />
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-heading font-semibold text-light">{value}</div>
      <div className="text-caption font-regular text-light-400">{label}</div>
    </div>
  );
}

interface SlideIndicatorsProps {
  slides: readonly typeof HERO_SLIDES[number][];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function SlideIndicators({ slides, activeIndex, onSelect }: SlideIndicatorsProps) {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-3 z-20">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`transition-all duration-300 rounded-full ${
            index === activeIndex
              ? 'w-10 h-3 bg-gradient-to-r from-neon-cyan to-neon-blue shadow-neon-cyan'
              : 'w-3 h-3 bg-light/30 hover:bg-neon-cyan/50 hover:shadow-neon-cyan'
          }`}
        />
      ))}
    </div>
  );
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <div className="w-6 h-10 rounded-full border-2 border-neon-cyan/20 flex items-start justify-center p-2">
        <div className="w-1 h-2 bg-neon-cyan rounded-full animate-bounce shadow-neon-cyan" />
      </div>
    </div>
  );
}

export default Hero;