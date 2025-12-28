/**
 * Configuration du carousel Hero
 */

export const CAROUSEL_CONFIG = {
  AUTO_PLAY_INTERVAL: 6000,
  ANIMATION_DURATION: 500,
  NAVIGATION_ANIMATION_DURATION: 300,
} as const;

export const HERO_SLIDES = [
  {
    titleKey: 'slide1Title',
    subtitleKey: 'slide1Subtitle',
    descriptionKey: 'slide1Description',
    visual: 'tech' as const,
    link: '#contact',
  },
  {
    titleKey: 'slide2Title',
    subtitleKey: 'slide2Subtitle',
    descriptionKey: 'slide2Description',
    visual: 'mobile' as const,
    link: '#services',
  },
  {
    titleKey: 'slide3Title',
    subtitleKey: 'slide3Subtitle',
    descriptionKey: 'slide3Description',
    visual: 'web' as const,
    link: '#realisations',
  },
] as const;