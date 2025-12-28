import { render, screen, fireEvent } from '@testing-library/react';
import { ContactForm } from '@/app/components/contact-parts/ContactForm';
import type { ContactFormData } from '@/types';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('ContactForm', () => {
  const mockFormData: ContactFormData = {
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    currency: 'FCFA',
    message: '',
  };

  const mockProps = {
    formData: mockFormData,
    isSubmitting: false,
    error: null,
    onSubmit: jest.fn((e) => e.preventDefault()),
    onChange: jest.fn(),
    onCurrencyChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render all form fields', () => {
      render(<ContactForm {...mockProps} />);

      expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('john@example.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+229 00 00 00 00')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Your company')).toBeInTheDocument();
    });

    it('should render project type select', () => {
      render(<ContactForm {...mockProps} />);

      // Select by name attribute since label is not associated with htmlFor
      const projectSelect = document.querySelector('select[name="projectType"]');
      expect(projectSelect).toBeInTheDocument();
    });

    it('should render message textarea', () => {
      render(<ContactForm {...mockProps} />);

      // Textarea has name="message"
      const textarea = document.querySelector('textarea[name="message"]');
      expect(textarea).toBeInTheDocument();
    });

    it('should render submit button', () => {
      render(<ContactForm {...mockProps} />);

      expect(screen.getByRole('button', { name: /form.submit/i })).toBeInTheDocument();
    });

    it('should render currency selector buttons', () => {
      render(<ContactForm {...mockProps} />);

      expect(screen.getByRole('button', { name: 'FCFA' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '€' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '$' })).toBeInTheDocument();
    });
  });

  describe('form values', () => {
    it('should display form data values in inputs', () => {
      const filledFormData: ContactFormData = {
        ...mockFormData,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+229 12345678',
        company: 'ACME Corp',
        message: 'Hello world',
      };

      render(<ContactForm {...mockProps} formData={filledFormData} />);

      expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('+229 12345678')).toBeInTheDocument();
      expect(screen.getByDisplayValue('ACME Corp')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Hello world')).toBeInTheDocument();
    });
  });

  describe('onChange handler', () => {
    it('should call onChange when name input changes', () => {
      render(<ContactForm {...mockProps} />);

      const nameInput = screen.getByPlaceholderText('John Doe');
      fireEvent.change(nameInput, { target: { name: 'name', value: 'Test Name' } });

      expect(mockProps.onChange).toHaveBeenCalled();
    });

    it('should call onChange when email input changes', () => {
      render(<ContactForm {...mockProps} />);

      const emailInput = screen.getByPlaceholderText('john@example.com');
      fireEvent.change(emailInput, { target: { name: 'email', value: 'test@test.com' } });

      expect(mockProps.onChange).toHaveBeenCalled();
    });

    it('should call onChange when message textarea changes', () => {
      render(<ContactForm {...mockProps} />);

      const textarea = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      fireEvent.change(textarea, { target: { name: 'message', value: 'New message' } });

      expect(mockProps.onChange).toHaveBeenCalled();
    });

    it('should call onChange when project type select changes', () => {
      render(<ContactForm {...mockProps} />);

      const select = document.querySelector('select[name="projectType"]') as HTMLSelectElement;
      fireEvent.change(select, { target: { name: 'projectType', value: 'web' } });

      expect(mockProps.onChange).toHaveBeenCalled();
    });
  });

  describe('onCurrencyChange handler', () => {
    it('should call onCurrencyChange when FCFA button clicked', () => {
      render(<ContactForm {...mockProps} formData={{ ...mockFormData, currency: 'EUR' }} />);

      fireEvent.click(screen.getByRole('button', { name: 'FCFA' }));

      expect(mockProps.onCurrencyChange).toHaveBeenCalledWith('FCFA');
    });

    it('should call onCurrencyChange when EUR button clicked', () => {
      render(<ContactForm {...mockProps} />);

      fireEvent.click(screen.getByRole('button', { name: '€' }));

      expect(mockProps.onCurrencyChange).toHaveBeenCalledWith('EUR');
    });

    it('should call onCurrencyChange when USD button clicked', () => {
      render(<ContactForm {...mockProps} />);

      fireEvent.click(screen.getByRole('button', { name: '$' }));

      expect(mockProps.onCurrencyChange).toHaveBeenCalledWith('USD');
    });

    it('should highlight selected currency button', () => {
      render(<ContactForm {...mockProps} formData={{ ...mockFormData, currency: 'EUR' }} />);

      const eurButton = screen.getByRole('button', { name: '€' });
      expect(eurButton).toHaveClass('bg-cyan-500');
    });
  });

  describe('budget select', () => {
    it('should render FCFA budget options when currency is FCFA', () => {
      render(<ContactForm {...mockProps} />);

      expect(screen.getByText('< 500 000 FCFA')).toBeInTheDocument();
      expect(screen.getByText('500 000 - 2 000 000 FCFA')).toBeInTheDocument();
    });

    it('should render EUR budget options when currency is EUR', () => {
      render(<ContactForm {...mockProps} formData={{ ...mockFormData, currency: 'EUR' }} />);

      expect(screen.getByText('< 800 €')).toBeInTheDocument();
      expect(screen.getByText('800 - 3 000 €')).toBeInTheDocument();
    });

    it('should render USD budget options when currency is USD', () => {
      render(<ContactForm {...mockProps} formData={{ ...mockFormData, currency: 'USD' }} />);

      expect(screen.getByText('< $850')).toBeInTheDocument();
      expect(screen.getByText('$850 - $3,200')).toBeInTheDocument();
    });
  });

  describe('form submission', () => {
    it('should call onSubmit when form is submitted', () => {
      render(<ContactForm {...mockProps} />);

      const form = screen.getByRole('button', { name: /form.submit/i }).closest('form');
      fireEvent.submit(form!);

      expect(mockProps.onSubmit).toHaveBeenCalled();
    });

    it('should have submit button with correct type', () => {
      render(<ContactForm {...mockProps} />);

      const submitButton = screen.getByRole('button', { name: /form.submit/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('isSubmitting state', () => {
    it('should disable submit button when submitting', () => {
      render(<ContactForm {...mockProps} isSubmitting={true} />);

      const submitButton = screen.getByRole('button', { name: /form.sending/i });
      expect(submitButton).toBeDisabled();
    });

    it('should show loading text when submitting', () => {
      render(<ContactForm {...mockProps} isSubmitting={true} />);

      expect(screen.getByText('form.sending')).toBeInTheDocument();
    });

    it('should show spinner when submitting', () => {
      render(<ContactForm {...mockProps} isSubmitting={true} />);

      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should have gray background when submitting', () => {
      render(<ContactForm {...mockProps} isSubmitting={true} />);

      const submitButton = screen.getByRole('button', { name: /form.sending/i });
      expect(submitButton).toHaveClass('bg-gray-600');
    });
  });

  describe('error state', () => {
    it('should display error message when error is provided', () => {
      render(<ContactForm {...mockProps} error="Une erreur est survenue" />);

      expect(screen.getByText('Une erreur est survenue')).toBeInTheDocument();
    });

    it('should not display error when error is null', () => {
      render(<ContactForm {...mockProps} error={null} />);

      const errorDiv = document.querySelector('.bg-red-500\\/10');
      expect(errorDiv).not.toBeInTheDocument();
    });

    it('should style error message with red border', () => {
      render(<ContactForm {...mockProps} error="Error message" />);

      const errorDiv = screen.getByText('Error message').closest('div');
      expect(errorDiv).toHaveClass('border-red-500/20');
    });
  });

  describe('required fields', () => {
    it('should mark name as required', () => {
      render(<ContactForm {...mockProps} />);

      const nameInput = screen.getByPlaceholderText('John Doe');
      expect(nameInput).toHaveAttribute('required');
    });

    it('should mark email as required', () => {
      render(<ContactForm {...mockProps} />);

      const emailInput = screen.getByPlaceholderText('john@example.com');
      expect(emailInput).toHaveAttribute('required');
    });

    it('should mark project type as required', () => {
      render(<ContactForm {...mockProps} />);

      const projectSelect = document.querySelector('select[name="projectType"]');
      expect(projectSelect).toHaveAttribute('required');
    });

    it('should mark message as required', () => {
      render(<ContactForm {...mockProps} />);

      const textarea = document.querySelector('textarea[name="message"]');
      expect(textarea).toHaveAttribute('required');
    });

    it('should not mark phone as required', () => {
      render(<ContactForm {...mockProps} />);

      const phoneInput = screen.getByPlaceholderText('+229 00 00 00 00');
      expect(phoneInput).not.toHaveAttribute('required');
    });

    it('should not mark company as required', () => {
      render(<ContactForm {...mockProps} />);

      const companyInput = screen.getByPlaceholderText('Your company');
      expect(companyInput).not.toHaveAttribute('required');
    });
  });

  describe('input types', () => {
    it('should have correct input type for email', () => {
      render(<ContactForm {...mockProps} />);

      const emailInput = screen.getByPlaceholderText('john@example.com');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should have correct input type for phone', () => {
      render(<ContactForm {...mockProps} />);

      const phoneInput = screen.getByPlaceholderText('+229 00 00 00 00');
      expect(phoneInput).toHaveAttribute('type', 'tel');
    });

    it('should have correct input type for name', () => {
      render(<ContactForm {...mockProps} />);

      const nameInput = screen.getByPlaceholderText('John Doe');
      expect(nameInput).toHaveAttribute('type', 'text');
    });
  });
});