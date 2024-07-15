import { render, screen } from '@testing-library/react';
import React from 'react';
import FAQ from "@/app/ui/FAQ";

describe('FAQ component', () => {
    it('renders FAQ component', () => {
          render(<FAQ />);

        const accordionItems = screen.getAllByRole('button');
        expect(accordionItems).toHaveLength(5);
        expect(accordionItems[0]).toHaveTextContent("Comment puis-je contacter l'équipe ?");
        expect(accordionItems[1]).toHaveTextContent("Quels services offrez-vous ?");
        expect(accordionItems[2]).toHaveTextContent("Fournissez-vous des services de maintenance de sites Web ?");
        expect(accordionItems[3]).toHaveTextContent("Combien de temps faut-il pour concevoir et développer un site Web ?");
        expect(accordionItems[4]).toHaveTextContent("Avez-vous besoin d'un acompte pour les projets ?");

        const image = screen.getByRole('img', { name: /Faq image/i });
        expect(image).toBeInTheDocument();

        const faq = screen.getByTestId("faq");
        expect(faq).toHaveClass("grid", "grid-cols-5", "m-20")

    });
});
