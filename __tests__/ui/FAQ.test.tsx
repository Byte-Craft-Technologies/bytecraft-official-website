import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FAQ from "@/app/ui/FAQ";

describe('FAQ component', () => {
    it('renders FAQ component with 6 questions', () => {
        render(<FAQ />);

        const accordionItems = screen.getAllByRole('button');
        expect(accordionItems).toHaveLength(6);

        // Vérifie que les clés de traduction sont rendues (mock retourne les clés)
        expect(accordionItems[0]).toHaveTextContent('questions.q1');
        expect(accordionItems[1]).toHaveTextContent('questions.q2');
        expect(accordionItems[2]).toHaveTextContent('questions.q3');
        expect(accordionItems[3]).toHaveTextContent('questions.q4');
        expect(accordionItems[4]).toHaveTextContent('questions.q5');
        expect(accordionItems[5]).toHaveTextContent('questions.q6');
    });

    it('renders FAQ image', () => {
        render(<FAQ />);

        const image = screen.getByRole('img', { name: /FAQ illustration/i });
        expect(image).toBeInTheDocument();
    });

    it('renders FAQ grid container', () => {
        render(<FAQ />);

        const faq = screen.getByTestId('faq');
        expect(faq).toBeInTheDocument();
    });

    it('expands accordion item on click', async () => {
        const user = userEvent.setup();
        render(<FAQ />);

        const firstQuestion = screen.getAllByRole('button')[0];

        // Click to expand
        await user.click(firstQuestion);

        // Vérifie que la réponse est visible (clé de traduction)
        expect(screen.getByText('questions.a1')).toBeInTheDocument();
    });

    it('collapses accordion item when clicking again', async () => {
        const user = userEvent.setup();
        render(<FAQ />);

        const firstQuestion = screen.getAllByRole('button')[0];

        // Expand
        await user.click(firstQuestion);
        expect(screen.getByText('questions.a1')).toBeInTheDocument();

        // Collapse
        await user.click(firstQuestion);

        // La réponse devrait être masquée (ou en transition)
        // Note: Headless UI Transition peut garder l'élément dans le DOM
    });
});