import { renderHook, act } from '@testing-library/react';
import { useCarousel } from '@/hooks/useCarousel';

describe('useCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with activeIndex 0', () => {
      const { result } = renderHook(() => useCarousel({ itemCount: 5 }));

      expect(result.current.activeIndex).toBe(0);
    });

    it('should initialize with isAnimating false', () => {
      const { result } = renderHook(() => useCarousel({ itemCount: 5 }));

      expect(result.current.isAnimating).toBe(false);
    });

    it('should provide goToSlide, nextSlide, previousSlide functions', () => {
      const { result } = renderHook(() => useCarousel({ itemCount: 5 }));

      expect(typeof result.current.goToSlide).toBe('function');
      expect(typeof result.current.nextSlide).toBe('function');
      expect(typeof result.current.previousSlide).toBe('function');
    });
  });

  describe('nextSlide', () => {
    it('should advance to next slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.nextSlide();
      });

      // Wait for animation
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should loop back to first slide after last', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 0 })
      );

      // Go to last slide
      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(2);

      // Go past last
      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should set isAnimating during transition', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.isAnimating).toBe(true);

      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.isAnimating).toBe(false);
    });
  });

  describe('previousSlide', () => {
    it('should go to previous slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      // First go forward
      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(2);

      // Then go back
      act(() => {
        result.current.previousSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should loop to last slide from first', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 0 })
      );

      expect(result.current.activeIndex).toBe(0);

      act(() => {
        result.current.previousSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(2);
    });
  });

  describe('goToSlide', () => {
    it('should go to specific slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.goToSlide(3);
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(3);
    });

    it('should not animate when going to current slide', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.goToSlide(0);
      });

      // Should not trigger animation for same slide
      expect(result.current.isAnimating).toBe(false);
    });

    it('should not change slide during animation', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 5, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.goToSlide(2);
      });

      // While animating, try to go to another slide
      act(() => {
        result.current.goToSlide(4);
      });

      act(() => {
        jest.advanceTimersByTime(500);
      });

      // Should still be at 2, not 4
      expect(result.current.activeIndex).toBe(2);
    });
  });

  describe('autoPlay', () => {
    it('should auto-advance slides at specified interval', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 6000 })
      );

      expect(result.current.activeIndex).toBe(0);

      // Wait for auto-play interval
      act(() => {
        jest.advanceTimersByTime(6000);
      });

      // Wait for animation
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should not auto-play when interval is 0', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 0 })
      );

      expect(result.current.activeIndex).toBe(0);

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should not auto-play when interval is negative', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: -1000 })
      );

      expect(result.current.activeIndex).toBe(0);

      act(() => {
        jest.advanceTimersByTime(10000);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should cleanup interval on unmount', () => {
      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      const { unmount } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 6000 })
      );

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
      clearIntervalSpy.mockRestore();
    });
  });

  describe('custom animation duration', () => {
    it('should use custom animation duration', () => {
      const { result } = renderHook(() =>
        useCarousel({
          itemCount: 5,
          autoPlayInterval: 0,
          animationDuration: 1000,
        })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.isAnimating).toBe(true);

      // After 500ms (default), should still be animating
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.isAnimating).toBe(true);

      // After 1000ms (custom), should be done
      act(() => {
        jest.advanceTimersByTime(500);
      });

      expect(result.current.isAnimating).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle single item carousel', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 1, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(0);
    });

    it('should handle two item carousel', () => {
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 2, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(1);

      act(() => {
        result.current.nextSlide();
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(0);
    });
  });

  describe('default values', () => {
    it('should use default autoPlayInterval from CAROUSEL_CONFIG', () => {
      // Default is 6000ms
      const { result } = renderHook(() => useCarousel({ itemCount: 3 }));

      expect(result.current.activeIndex).toBe(0);

      act(() => {
        jest.advanceTimersByTime(6000);
        jest.advanceTimersByTime(500);
      });

      expect(result.current.activeIndex).toBe(1);
    });

    it('should use default animationDuration from CAROUSEL_CONFIG', () => {
      // Default is 500ms
      const { result } = renderHook(() =>
        useCarousel({ itemCount: 3, autoPlayInterval: 0 })
      );

      act(() => {
        result.current.nextSlide();
      });

      expect(result.current.isAnimating).toBe(true);

      act(() => {
        jest.advanceTimersByTime(499);
      });

      expect(result.current.isAnimating).toBe(true);

      act(() => {
        jest.advanceTimersByTime(1);
      });

      expect(result.current.isAnimating).toBe(false);
    });
  });
});