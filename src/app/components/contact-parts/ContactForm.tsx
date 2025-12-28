'use client';

/**
 * Formulaire de contact avec sélection de devise et budget
 */

import { useTranslations } from 'next-intl';
import type { ContactFormData, Currency } from '@/types';
import { CURRENCIES, BUDGET_RANGES } from '@/constants';

interface ContactFormProps {
  formData: ContactFormData;
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCurrencyChange: (currency: Currency) => void;
}

export function ContactForm({
  formData,
  isSubmitting,
  error,
  onSubmit,
  onChange,
  onCurrencyChange,
}: ContactFormProps) {
  const t = useTranslations('contact');

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField label={`${t('form.name')} *`}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
            placeholder="John Doe"
          />
        </FormField>
        <FormField label={`${t('form.email')} *`}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
            placeholder="john@example.com"
          />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label={t('form.phone')}>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
            placeholder="+229 00 00 00 00"
          />
        </FormField>
        <FormField label={t('form.company')}>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
            placeholder="Your company"
          />
        </FormField>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField label={`${t('form.projectType')} *`}>
          <select
            name="projectType"
            value={formData.projectType}
            onChange={onChange}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
          >
            <option value="" className="bg-gray-900">{t('form.select')}</option>
            <option value="web" className="bg-gray-900">{t('form.projectTypes.web')}</option>
            <option value="mobile" className="bg-gray-900">{t('form.projectTypes.mobile')}</option>
            <option value="webapp" className="bg-gray-900">{t('form.projectTypes.webapp')}</option>
            <option value="api" className="bg-gray-900">{t('form.projectTypes.api')}</option>
            <option value="consulting" className="bg-gray-900">{t('form.projectTypes.consulting')}</option>
            <option value="other" className="bg-gray-900">{t('form.projectTypes.other')}</option>
          </select>
        </FormField>

        <FormField label={t('form.budget')}>
          <div className="flex flex-col gap-2">
            <CurrencySelector
              selectedCurrency={formData.currency}
              onSelect={onCurrencyChange}
            />
            <select
              name="budget"
              value={formData.budget}
              onChange={onChange}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors text-sm"
            >
              <option value="" className="bg-gray-900">{t('form.select')}</option>
              {BUDGET_RANGES[formData.currency].map((range) => (
                <option key={range.value} value={range.value} className="bg-gray-900">
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </FormField>
      </div>

      <FormField label={`${t('form.message')} *`}>
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          required
          rows={5}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none"
          placeholder={t('form.messagePlaceholder')}
        />
      </FormField>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <SubmitButton isSubmitting={isSubmitting} label={t('form.submit')} loadingLabel={t('form.sending')} />
    </form>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      {children}
    </div>
  );
}

function CurrencySelector({
  selectedCurrency,
  onSelect,
}: {
  selectedCurrency: Currency;
  onSelect: (currency: Currency) => void;
}) {
  return (
    <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 w-fit">
      {CURRENCIES.map((curr) => (
        <button
          key={curr.code}
          type="button"
          onClick={() => onSelect(curr.code)}
          className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedCurrency === curr.code
              ? 'bg-cyan-500 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {curr.symbol}
        </button>
      ))}
    </div>
  );
}

function SubmitButton({
  isSubmitting,
  label,
  loadingLabel,
}: {
  isSubmitting: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 ${
        isSubmitting
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-cyan-500 to-primary hover:shadow-lg hover:shadow-cyan-500/25'
      }`}
    >
      {isSubmitting ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {loadingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}