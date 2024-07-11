import About from "@/app/ui/About";
import "@testing-library/jest-dom"
import {screen, render, fireEvent, waitFor,} from "@testing-library/react";

describe("About component", () => {

    it("should render the image container", () => {
        render(<About/>);
        const imageContainer = screen.getByTestId("image-container");
        expect(imageContainer).toBeInTheDocument();
    });

    it("should render the image", () => {
        render(<About/>);
        const image = screen.getByAltText("");
        expect(image).toBeInTheDocument();
    });

    it("should render the details container", () => {
        render(<About/>);
        const detailsContainer = screen.getByTestId("details-container");
        expect(detailsContainer).toBeInTheDocument();
    });

    it("should render the title", () => {
        render(<About/>);
        const title = screen.getByText(/À propos de nous/i);
        expect(title).toBeInTheDocument();
    });

    it("should render the paragraphs", () => {
        render(<About/>);
        const paragraphs = screen.getAllByRole("paragraph");
        expect(paragraphs.length).toBe(3);
        expect(paragraphs[1]).toHaveClass("mb-4")
    });

    it("should render the button with correct text", () => {
        render(<About/>);
        const button = screen.getByRole("link");
        expect(button).toBeInTheDocument();
    });

    it("should render the button with correct styles", () => {
        render(<About/>);
        const button = screen.getByRole("link");
        expect(button).toHaveClass("bg-primary");
        expect(button).toHaveClass("text-white");
        expect(button).toHaveClass("hover:bg-secondary");

    });
});

