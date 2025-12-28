import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../../src/app/ui/Navbar';

describe('NavBar', () => {
    it('renders NavBar component with navigation links', () => {
        render(<NavBar />);

        // Le mock useTranslations retourne les clés
        expect(screen.getByText('home')).toBeInTheDocument();
        expect(screen.getByText('services')).toBeInTheDocument();
        expect(screen.getByText('realisations')).toBeInTheDocument();
        expect(screen.getByText('faq')).toBeInTheDocument();
        expect(screen.getByText('contact')).toBeInTheDocument();
    });

    it('renders logo', () => {
        render(<NavBar />);

        expect(screen.getByText('BYTECRAFT')).toBeInTheDocument();
        expect(screen.getByText('Technologies')).toBeInTheDocument();
    });

    it('renders CTA button', () => {
        render(<NavBar />);

        // Le CTA utilise aussi useTranslations
        expect(screen.getByText('cta')).toBeInTheDocument();
    });

    it('highlights active link on click', async () => {
        const user = userEvent.setup();
        render(<NavBar />);

        const servicesLink = screen.getByText('services');
        await user.click(servicesLink);

        // Vérifie que le lien a la classe active (text-neon-cyan)
        expect(servicesLink).toHaveClass('text-neon-cyan');
    });

    it('renders mobile menu button on small screens', () => {
        render(<NavBar />);

        // Il y a plusieurs boutons (language switcher + hamburger)
        const buttons = screen.getAllByRole('button');
        expect(buttons.length).toBeGreaterThan(0);

        // Le bouton hamburger a la classe md:hidden
        const hamburgerButton = buttons.find(btn => btn.classList.contains('md:hidden'));
        expect(hamburgerButton).toBeInTheDocument();
    });
});