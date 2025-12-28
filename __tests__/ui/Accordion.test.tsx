import Accordion from "@/app/components/accordion";
import "@testing-library/jest-dom"
import {screen, render, fireEvent, waitFor,} from "@testing-library/react";

describe("Accordion", () => {
    const items = [
        {title: "title 1", content: "Content 1"},
        {title: "title 2", content: "Content 2"}
    ];
    beforeEach(() => {
        render(<Accordion titleColor ={"text-slate-600"} contentColor={"text-slate-600"} items={items} bgColor="bg-white" hover="bg-gray-100"/>);
    });


    it("has the correct classes", () => {
        const div = screen.getByTestId("accordion-0");
        expect(div).toHaveClass("bg-white");
        expect(div).toHaveClass("hover:bg-gray-100");
    });
    it("expands  on click", async () => {
        const button = screen.getByText(/title 1/i);

        fireEvent.click(button);
        await waitFor(async () => {
            const content = await screen.findByText(/Content 1/i);
            expect(content).toBeInTheDocument();
            expect(content).toHaveClass("text-slate-600")
        });

        expect(screen.queryByText(/Content 2/i)).not.toBeInTheDocument();
    });

    it("collapse on click two times", async () => {

        const button = screen.getByText(/title 1/i);
        fireEvent.click(button);

        // Wait for content to appear
        await waitFor(() => {
            expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
        });

        // Click again to collapse
        fireEvent.click(button);

        expect(button).toHaveClass("font-bold","text-slate-600")

        // Wait for transition to complete and content to disappear
        await waitFor(() => {
            expect(screen.queryByText(/Content 1/i)).not.toBeInTheDocument();
        }, { timeout: 500 });
    });

    it("collapse on click other item click", async () => {

        const button1 = screen.getByText(/title 1/i);
        const button = screen.getByText(/title 2/i);

        fireEvent.click(button1);

        // Wait for content 1 to appear
        await waitFor(() => {
            expect(screen.getByText(/Content 1/i)).toBeInTheDocument();
        });

        // Click on button 2
        fireEvent.click(button);

        // Wait for content 1 to disappear and content 2 to appear
        await waitFor(() => {
            expect(screen.queryByText(/Content 1/i)).not.toBeInTheDocument();
        }, { timeout: 500 });

        expect(screen.getByText(/Content 2/i)).toBeInTheDocument();
    });
})
