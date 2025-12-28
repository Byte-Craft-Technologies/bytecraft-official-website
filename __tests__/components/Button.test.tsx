import "@testing-library/jest-dom"
import {render, screen, waitFor} from "@testing-library/react";
import Button from "@/app/components/button";

describe("Button component",()=>{
    it("should render",()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE

        const button = screen.getByText("testButton"); //ACT

        expect(button).toBeInTheDocument();

    })
    it("should have specified tailwind classes",()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE

        const button = screen.getByRole("link"); //ACT

        //ASSERT
        expect(button).toHaveClass("rounded-lg","font-inter","bg-blue","text-white");
        expect(button).toHaveAttribute("href", "#");
        expect(button).toHaveTextContent("testButton");

    })
    it("should have specified tailwind classes",()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       hoverColor="bg-blue-400"
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue-600"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE

        const button = screen.getByRole("link"); //ACT

        //ASSERT
        expect(button).toHaveClass("rounded-lg","font-inter","bg-blue-600","hover:bg-blue-400","text-white");
        expect(button).toHaveAttribute("href", "#");
        expect(button).toHaveTextContent("testButton");

    })
    it("should not have icon",async()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE

        await waitFor(() => {
            const icon = document.querySelector("img");
            expect(icon).not.toBeInTheDocument();
        });
    })

    it("should  have icon",async ()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       icon={"/icon1.png"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE


        await waitFor(() => {
                 const icon = document.querySelector("img");
            expect(icon).toBeInTheDocument();
        });
    })

    it("icon should have class",async ()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       icon={"/icon1.png"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE


        await waitFor(() => {
            const icon = document.querySelector("img");
            expect(icon).toHaveClass("transition-transform");
        });
    })

    it("icon should have width",async ()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       icon={"/icon1.png"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE


        await waitFor(() => {
            const icon = document.querySelector("img");
            expect(icon).toHaveAttribute("width","20");
        });
    })
    it("icon should have height",async ()=>{
        render(<Button name={"testButton"}
                       borderStyle={"rounded-lg"}
                       icon={"/icon1.png"}
                       fontStyle={"font-inter"}
                       bgColor={"bg-blue"}
                       textColor={"text-white"}
                       link={"#"}/>) //ARRANGE


        await waitFor(() => {
            const icon = document.querySelector("img");
            expect(icon).toHaveAttribute("height","20");
        });
    })
})