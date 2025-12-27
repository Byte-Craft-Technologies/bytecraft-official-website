'use client';

/**
 * Hook pour gérer un carousel avec auto-play
 */

import { useState, useEffect, useCallback } from 'react';
import { CAROUSEL_CONFIG } from '@/constants';

interface UseCarouselOptions {
  itemCount: number;
  autoPlayInterval?: number;
  animationDuration?: number;
}

interface UseCarouselReturn {
  activeIndex: number;
  isAnimating: boolean;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  previousSlide: () => void;
}

export function useCarousel({
  itemCount,
  autoPlayInterval = CAROUSEL_CONFIG.AUTO_PLAY_INTERVAL,
  animationDuration = CAROUSEL_CONFIG.ANIMATION_DURATION,
}: UseCarouselOptions): UseCarouselReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const animateTransition = useCallback(
    (callback: () => void) => {
      setIsAnimating(true);
      setTimeout(() => {
        callback();
        setIsAnimating(false);
      }, animationDuration);
    },
    [animationDuration]
  );

  const goToSlide = useCallback(
    (index: number) => {
      if (index !== activeIndex && !isAnimating) {
        animateTransition(() => setActiveIndex(index));
      }
    },
    [activeIndex, isAnimating, animateTransition]
  );

  const nextSlide = useCallback(() => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    });
  }, [itemCount, animateTransition]);

  const previousSlide = useCallback(() => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
    });
  }, [itemCount, animateTransition]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, isAnimating, nextSlide]);

  return {
    activeIndex,
    isAnimating,
    goToSlide,
    nextSlide,
    previousSlide,
  };
}