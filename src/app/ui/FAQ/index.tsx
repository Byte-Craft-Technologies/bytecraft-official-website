'use client';

import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import Image from "next/image";
import { useTranslations } from 'next-intl';

function FAQ() {
    const t = useTranslations('faq');
    const [openIndex, setOpenIndex] = useState(-1);

    const items = [
        { questionKey: 'questions.q1', answerKey: 'questions.a1' },
        { questionKey: 'questions.q2', answerKey: 'questions.a2' },
        { questionKey: 'questions.q3', answerKey: 'questions.a3' },
        { questionKey: 'questions.q4', answerKey: 'questions.a4' },
        { questionKey: 'questions.q5', answerKey: 'questions.a5' },
        { questionKey: 'questions.q6', answerKey: 'questions.a6' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-[#0a0a1a] to-[#0d1525] relative overflow-hidden" id="faq">
            {/* Background decorations */}
            <div className="absolute top-20 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />

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

                <div className="grid lg:grid-cols-2 gap-12 items-start" data-testid="faq">
                    {/* Image side */}
                    <div className="relative lg:sticky lg:top-32">
                        <div className="relative">
                            {/* Main image card */}
                            <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                <Image
                                    src="/faq.svg"
                                    width={400}
                                    height={300}
                                    alt="FAQ illustration"
                                    className="w-full h-auto opacity-90"
                                />

                                {/* Floating card */}
                                <div className="absolute -right-4 -bottom-4 bg-gradient-to-r from-cyan-500 to-primary rounded-2xl p-5 text-white shadow-lg shadow-cyan-500/20">
                                    <div className="text-2xl font-bold">24h</div>
                                    <div className="text-white/80 text-xs">{t('responseTime')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Contact card */}
                        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                            <h3 className="font-semibold text-white mb-2">{t('contactTitle')}</h3>
                            <p className="text-gray-400 text-sm mb-4">{t('contactDescription')}</p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-primary text-white rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
                            >
                                {t('contactButton')}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Accordion side */}
                    <div className="space-y-4">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                data-testid={`accordion-${index}`}
                                className={`group bg-white/5 backdrop-blur-sm rounded-2xl border transition-all duration-300 ${
                                    openIndex === index
                                        ? 'border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                                        : 'border-white/10 hover:border-white/20'
                                }`}
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                                >
                                    <span className={`font-semibold transition-colors ${
                                        openIndex === index ? 'text-cyan-400' : 'text-white'
                                    }`}>
                                        {t(item.questionKey)}
                                    </span>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                        openIndex === index
                                            ? 'bg-cyan-500 text-white'
                                            : 'bg-white/10 text-gray-400 group-hover:bg-white/20'
                                    }`}>
                                        <svg
                                            className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <Transition
                                    show={openIndex === index}
                                    enter="transition-all duration-300 ease-out"
                                    enterFrom="max-h-0 opacity-0"
                                    enterTo="max-h-96 opacity-100"
                                    leave="transition-all duration-200 ease-in"
                                    leaveFrom="max-h-96 opacity-100"
                                    leaveTo="max-h-0 opacity-0"
                                >
                                    <div className="px-6 pb-5 overflow-hidden">
                                        <div className="pt-2 border-t border-white/10">
                                            <p className="pt-4 text-gray-400 leading-relaxed">
                                                {t(item.answerKey)}
                                            </p>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;