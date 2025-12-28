'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inter } from '../fonts';
import Button from '../../components/button';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function NavBar() {
    const t = useTranslations('nav');
    const [selectedLink, setSelectedLink] = useState<string | null>('home');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const links = [
        { key: 'home', href: '#' },
        { key: 'services', href: '#services' },
        { key: 'realisations', href: '#realisations' },
        { key: 'team', href: '#team' },
        { key: 'faq', href: '#faq' },
        { key: 'contact', href: '#contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (key: string) => {
        setSelectedLink(key);
        setMobileMenuOpen(false);
    };

    return (
        <header
            className={`${inter.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'glass-strong border-b border-neon-subtle'
                    : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-primary flex items-center justify-center shadow-neon-cyan">
                        <span className="text-dark-950 font-semibold text-heading">B</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-heading font-semibold text-light leading-tight">
                            BYTECRAFT
                        </span>
                        <span className="text-caption font-regular text-neon-cyan tracking-[0.2em] uppercase">
                            Technologies
                        </span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.key}
                            href={link.href}
                            onClick={() => handleLinkClick(link.key)}
                            className={`px-4 py-2 rounded-lg text-caption font-semibold transition-colors ${
                                selectedLink === link.key
                                    ? 'text-neon-cyan text-glow-cyan'
                                    : 'text-light-300 hover:text-neon-cyan'
                            }`}>
                            {t(link.key)}
                        </Link>
                    ))}
                </nav>

                {/* Right side: Language Switcher + CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <Button
                        name={t('cta')}
                        link="#contact"
                        borderStyle="rounded-full px-6 py-2"
                        fontStyle="text-caption font-semibold"
                        bgColor="bg-gradient-to-r from-cyan-500 to-primary hover:shadow-lg hover:shadow-cyan-500/20"
                        textColor="text-white"
                    />
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 text-light"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden glass-strong border-t border-neon-subtle">
                    <nav className="px-6 py-4 flex flex-col gap-2">
                        {links.map((link) => (
                            <Link
                                key={link.key}
                                href={link.href}
                                onClick={() => handleLinkClick(link.key)}
                                className={`px-4 py-3 rounded-lg text-caption font-semibold transition-colors ${
                                    selectedLink === link.key
                                        ? 'text-cyan-400 bg-white/5'
                                        : 'text-gray-300 hover:text-cyan-400'
                                }`}>
                                {t(link.key)}
                            </Link>
                        ))}
                        <div className="pt-4 flex items-center justify-between">
                            <LanguageSwitcher />
                            <Button
                                name={t('cta')}
                                link="#contact"
                                borderStyle="rounded-full px-4 py-2"
                                fontStyle="text-sm font-semibold"
                                bgColor="bg-gradient-to-r from-cyan-500 to-primary"
                                textColor="text-white"
                            />
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}