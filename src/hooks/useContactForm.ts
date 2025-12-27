'use client';

/**
 * Hook pour gérer le formulaire de contact
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { ContactFormData, Currency } from '@/types';
import { DEFAULT_CURRENCY } from '@/constants';
import { validateContactForm } from '@/domain/usecases/validateContactForm';

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  company: '',
  projectType: '',
  budget: '',
  currency: DEFAULT_CURRENCY,
  message: '',
};

interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleCurrencyChange: (currency: Currency) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useContactForm(): UseContactFormReturn {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleCurrencyChange = useCallback((currency: Currency) => {
    setFormData((prev) => ({ ...prev, currency, budget: '' }));
  }, []);

  const resetForm = useCallback(() => {
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
    setFormData(INITIAL_FORM_DATA);
    setSubmitted(false);
    setError(null);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      // Validate form before submission
      const validation = validateContactForm(formData);
      if (!validation.valid) {
        setError(validation.errors.join(', '));
        return;
      }

      setIsSubmitting(true);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        setSubmitted(true);

        // Reset after 5 seconds with cleanup reference
        resetTimeoutRef.current = setTimeout(() => {
          resetForm();
        }, 5000);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Contact form error:', err);
        }
        setError(err instanceof Error ? err.message : 'FORM_ERROR');
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, resetForm]
  );

  return {
    formData,
    isSubmitting,
    submitted,
    error,
    handleChange,
    handleCurrencyChange,
    handleSubmit,
    resetForm,
  };
}