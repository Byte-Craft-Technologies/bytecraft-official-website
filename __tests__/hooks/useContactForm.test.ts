import { renderHook, act } from '@testing-library/react';
import { useContactForm } from '@/hooks/useContactForm';

// Mock fetch API
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('useContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useContactForm());

      expect(result.current.formData).toEqual({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        currency: 'FCFA',
        message: '',
      });
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.submitted).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('handleChange', () => {
    it('should update formData when input changes', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formData.name).toBe('John Doe');
    });

    it('should update email field', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formData.email).toBe('john@example.com');
    });

    it('should update projectType from select', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'projectType', value: 'web' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      expect(result.current.formData.projectType).toBe('web');
    });

    it('should update message from textarea', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'message', value: 'Test message content' },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      });

      expect(result.current.formData.message).toBe('Test message content');
    });
  });

  describe('handleCurrencyChange', () => {
    it('should update currency', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleCurrencyChange('EUR');
      });

      expect(result.current.formData.currency).toBe('EUR');
    });

    it('should reset budget when currency changes', () => {
      const { result } = renderHook(() => useContactForm());

      // Set a budget first
      act(() => {
        result.current.handleChange({
          target: { name: 'budget', value: 'medium' },
        } as React.ChangeEvent<HTMLSelectElement>);
      });

      expect(result.current.formData.budget).toBe('medium');

      // Change currency
      act(() => {
        result.current.handleCurrencyChange('USD');
      });

      expect(result.current.formData.currency).toBe('USD');
      expect(result.current.formData.budget).toBe('');
    });

    it('should handle all currency types', () => {
      const { result } = renderHook(() => useContactForm());

      const currencies = ['FCFA', 'EUR', 'USD'] as const;

      currencies.forEach((currency) => {
        act(() => {
          result.current.handleCurrencyChange(currency);
        });
        expect(result.current.formData.currency).toBe(currency);
      });
    });
  });

  describe('resetForm', () => {
    it('should reset all form data to initial values', () => {
      const { result } = renderHook(() => useContactForm());

      // Fill form with data
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'email', value: 'john@test.com' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleCurrencyChange('EUR');
      });

      // Reset
      act(() => {
        result.current.resetForm();
      });

      expect(result.current.formData.name).toBe('');
      expect(result.current.formData.email).toBe('');
      expect(result.current.formData.currency).toBe('FCFA');
      expect(result.current.submitted).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  describe('handleSubmit', () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
    } as unknown as React.FormEvent;

    // Helper to fill form with valid data
    const fillValidFormData = (result: { current: ReturnType<typeof useContactForm> }) => {
      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John Doe' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'email', value: 'john@example.com' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'message', value: 'This is a test message with enough characters' },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      });
    };

    it('should prevent default form submission', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useContactForm());

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockPreventDefault).toHaveBeenCalled();
    });

    it('should set isSubmitting to true during submission', async () => {
      mockFetch.mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({ ok: true }), 100))
      );
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      act(() => {
        result.current.handleSubmit(mockEvent);
      });

      expect(result.current.isSubmitting).toBe(true);
    });

    it('should submit form successfully', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      });
      expect(result.current.submitted).toBe(true);
      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should send correct form data in request body', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'email', value: 'john@test.com' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'message', value: 'Hello World! This is my message.' },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      });

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1].body);
      expect(requestBody.name).toBe('John');
      expect(requestBody.email).toBe('john@test.com');
      expect(requestBody.message).toBe('Hello World! This is my message.');
    });

    it('should handle API error (non-ok response)', async () => {
      mockFetch.mockResolvedValueOnce({ ok: false });
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toBe('Failed to send message');
      expect(result.current.submitted).toBe(false);
      expect(result.current.isSubmitting).toBe(false);
    });

    it('should handle network error', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toBe('Network error');
      expect(result.current.submitted).toBe(false);
      expect(result.current.isSubmitting).toBe(false);
    });

    it('should handle unknown error type', async () => {
      mockFetch.mockRejectedValueOnce('Unknown error');
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toBe('FORM_ERROR');
    });

    it('should validate form before submission', async () => {
      const { result } = renderHook(() => useContactForm());

      // Submit without filling form
      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toContain('Name is required');
      expect(result.current.error).toContain('Valid email is required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should reject invalid email format', async () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'email', value: 'invalid-email' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'message', value: 'Valid message here' },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      });

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toContain('Valid email is required');
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should reset form after 5 seconds on success', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.submitted).toBe(true);
      expect(result.current.formData.name).toBe('John Doe');

      // Fast-forward 5 seconds
      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(result.current.submitted).toBe(false);
      expect(result.current.formData.name).toBe('');
    });

    it('should clear previous error on new submission', async () => {
      // First submission fails
      mockFetch.mockResolvedValueOnce({ ok: false });
      const { result } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toBe('Failed to send message');

      // Second submission succeeds
      mockFetch.mockResolvedValueOnce({ ok: true });

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.error).toBeNull();
    });

    it('should cleanup timeout on unmount', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true });
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      const { result, unmount } = renderHook(() => useContactForm());
      fillValidFormData(result);

      await act(async () => {
        await result.current.handleSubmit(mockEvent);
      });

      expect(result.current.submitted).toBe(true);

      // Unmount before timeout fires
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();
      clearTimeoutSpy.mockRestore();
    });
  });

  describe('multiple state updates', () => {
    it('should handle rapid form field changes', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'J' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'name', value: 'Jo' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'name', value: 'Joh' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formData.name).toBe('John');
    });

    it('should maintain other fields when updating one field', () => {
      const { result } = renderHook(() => useContactForm());

      act(() => {
        result.current.handleChange({
          target: { name: 'name', value: 'John' },
        } as React.ChangeEvent<HTMLInputElement>);
        result.current.handleChange({
          target: { name: 'email', value: 'john@test.com' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleChange({
          target: { name: 'phone', value: '123456' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.formData.name).toBe('John');
      expect(result.current.formData.email).toBe('john@test.com');
      expect(result.current.formData.phone).toBe('123456');
    });
  });
});