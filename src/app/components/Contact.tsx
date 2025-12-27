'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

const Contact = () => {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    currency: 'FCFA',
    message: '',
  });

  const currencies = [
    { code: 'FCFA', symbol: 'FCFA', name: 'Franc CFA' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dollar US' },
  ];

  const budgetRanges = {
    FCFA: [
      { value: 'small', label: '< 500 000 FCFA' },
      { value: 'medium', label: '500 000 - 2 000 000 FCFA' },
      { value: 'large', label: '2 000 000 - 5 000 000 FCFA' },
      { value: 'enterprise', label: '> 5 000 000 FCFA' },
    ],
    EUR: [
      { value: 'small', label: '< 800 €' },
      { value: 'medium', label: '800 - 3 000 €' },
      { value: 'large', label: '3 000 - 8 000 €' },
      { value: 'enterprise', label: '> 8 000 €' },
    ],
    USD: [
      { value: 'small', label: '< $850' },
      { value: 'medium', label: '$850 - $3,200' },
      { value: 'large', label: '$3,200 - $8,500' },
      { value: 'enterprise', label: '> $8,500' },
    ],
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        budget: '',
        currency: 'FCFA',
        message: '',
      });
    }, 3000);
  };

  const handleCurrencyChange = (currency: string) => {
    setFormData({ ...formData, currency, budget: '' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#0d1525] to-[#0a0a1a] relative overflow-hidden" id="contact">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info cards */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-primary flex items-center justify-center text-white text-xl mb-4">
                  📧
                </div>
                <h3 className="text-white font-semibold mb-1">{t('email')}</h3>
                <a href="mailto:bytecraft.technologies@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  bytecraft.technologies@gmail.com
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl mb-4">
                  📱
                </div>
                <h3 className="text-white font-semibold mb-1">{t('whatsapp')}</h3>
                <a href="https://wa.me/0601147224" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  +33 601147224
                </a>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl mb-4">
                  📍
                </div>
                <h3 className="text-white font-semibold mb-1">{t('location')}</h3>
                <p className="text-gray-400">Porto-novo, Bénin</p>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-white font-semibold mb-4">{t('followUs')}</h3>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="https://github.com/Byte-Craft-Technologies" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-primary/10 border border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                  ⚡
                </div>
                <div>
                  <div className="text-white font-medium">{t('responseTime')}</div>
                  <div className="text-gray-400 text-sm">{t('responseTimeDesc')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white text-4xl mx-auto mb-6">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{t('form.successTitle')}</h3>
                  <p className="text-gray-400">{t('form.successMessage')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.name')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.email')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.phone')}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                        placeholder="+229 00 00 00 00"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.company')}
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.projectType')} *
                      </label>
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
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
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('form.budget')}
                      </label>
                      <div className="flex flex-col gap-2">
                        {/* Currency selector */}
                        <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 w-fit">
                          {currencies.map((curr) => (
                            <button
                              key={curr.code}
                              type="button"
                              onClick={() => handleCurrencyChange(curr.code)}
                              className={`px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                formData.currency === curr.code
                                  ? 'bg-cyan-500 text-white'
                                  : 'text-gray-400 hover:text-white'
                              }`}
                            >
                              {curr.symbol}
                            </button>
                          ))}
                        </div>
                        {/* Budget select */}
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors text-sm"
                        >
                          <option value="" className="bg-gray-900">{t('form.select')}</option>
                          {budgetRanges[formData.currency as keyof typeof budgetRanges].map((range) => (
                            <option key={range.value} value={range.value} className="bg-gray-900">
                              {range.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t('form.message')} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-colors resize-none"
                      placeholder={t('form.messagePlaceholder')}
                    />
                  </div>

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
                        {t('form.sending')}
                      </span>
                    ) : (
                      t('form.submit')
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;