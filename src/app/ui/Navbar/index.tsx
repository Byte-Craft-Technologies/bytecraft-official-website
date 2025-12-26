'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { inter } from '../fonts';
import Button from '../../components/button';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const links = [
    { name: 'Accueil', href: '#' },
    { name: 'Services', href: '#', submenu: [{ name: 'Service 1', href: '#' }, { name: 'Service 2', href: '#' }] },
    { name: 'Réalisations', href: '#' },
    { name: 'Contact', href: '#' },
];

export default function NavBar() {
    const [selectedLink, setSelectedLink] = useState<string | null>('Accueil');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (name: string) => {
        setSelectedLink(name);
    };

    return (
        <header
            className={`${inter.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#0a0a1a]/95 backdrop-blur-md border-b border-white/5'
                    : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-primary flex items-center justify-center">
                        <span className="text-white font-bold text-xl">B</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-white leading-tight">
                            BYTECRAFT
                        </span>
                        <span className="text-[10px] font-medium text-cyan-400 tracking-[0.2em] uppercase">
                            Technologies
                        </span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <div key={link.name} className="relative">
                            {link.submenu ? (
                                <Menu as="div" className="relative">
                                    <MenuButton
                                        className="px-4 py-2 rounded-lg flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
                                        {link.name}
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </MenuButton>
                                    <MenuItems
                                        className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-[#0d1525] border border-white/10 p-2 shadow-xl shadow-black/50 focus:outline-none backdrop-blur-xl">
                                        {link.submenu.map((sub, index) => (
                                            <MenuItem key={index}>
                                                <Link
                                                    className="block w-full px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-cyan-400 transition-colors"
                                                    href={sub.href}>
                                                    {sub.name}
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            ) : (
                                <Link
                                    href={link.href}
                                    onClick={() => handleLinkClick(link.name)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors block ${
                                        selectedLink === link.name
                                            ? 'text-cyan-400'
                                            : 'text-gray-300 hover:text-cyan-400'
                                    }`}>
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA Button */}
                <Button
                    name="Demander un devis"
                    link="#"
                    borderStyle="rounded-full px-6 py-2.5"
                    fontStyle="text-sm font-semibold"
                    bgColor="bg-gradient-to-r from-cyan-500 to-primary hover:shadow-lg hover:shadow-cyan-500/20"
                    textColor="text-white"
                />
            </div>
        </header>
    );
}
