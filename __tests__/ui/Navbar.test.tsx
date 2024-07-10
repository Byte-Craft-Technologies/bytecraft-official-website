import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../../src/app/ui/Navbar';

describe('NavBar', () => {
    test('renders NavBar component', () => {
        render(<NavBar />);
        expect(screen.getByText('Accueil')).toBeInTheDocument();
        expect(screen.getByText('Services')).toBeInTheDocument();
        expect(screen.getByText('Réalisations')).toBeInTheDocument();
        expect(screen.getByText('Devis')).toBeInTheDocument();
    });

    test('toggles submenu visibility on click', async () => {
        render(<NavBar />);
        const servicesLink = screen.getByText('Services');
        expect(screen.queryByText('Service 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Service 2')).not.toBeInTheDocument();

        await userEvent.click(servicesLink);

        expect(screen.getByText('Service 1')).toBeInTheDocument();
        expect(screen.getByText('Service 2')).toBeInTheDocument();
    });

    test('hides submenu when a different link is clicked', async () => {
        render(<NavBar />);
        const servicesLink = screen.getByText('Services');

        await userEvent.click(servicesLink);
        expect(screen.getByText('Service 1')).toBeInTheDocument();
        expect(screen.getByText('Service 2')).toBeInTheDocument();

        await userEvent.click(servicesLink);
        expect(screen.queryByText('Service 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Service 2')).not.toBeInTheDocument();
    });
});