import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "../../src/app/components/card";

describe("Card Component", () => {
    const cardProps = {
        title: "Prêt à propulser votre Business vers de nouveaux sommets de croissance ?",
        description: "Boostez votre entreprise avec notre expertise. Contactez-nous dès aujourd\"hui !",
        image: "/public/hero-image-1.png",
        link: "/",
        buttonText: "Contactez-nous"
    };

    it("renders correctly", () => {
        render(<Card {...cardProps} />);
        expect(screen.getByText(cardProps.title)).toBeInTheDocument();
        expect(screen.getByText(cardProps.description)).toBeInTheDocument();
        expect(screen.getByAltText(cardProps.title)).toBeInTheDocument();//check if image is rendered
        expect(screen.getByRole("link", { name: cardProps.buttonText })).toBeInTheDocument
    });
});