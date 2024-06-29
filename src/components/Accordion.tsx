'use client'
import { useState } from 'react';
import { Transition } from '@headlessui/react';
interface Item{
    title:string;
    content:string;
}

 const Accordion=({ items, bgColor,hover, titleColor,contentColor }:{
     items:Item[],
     bgColor:string,
     hover:string,
     titleColor:string,
     contentColor:string
 })=> {
    const [openIndex, setOpenIndex] = useState(-1);

    return (
        <div className="w-full max-w-md p-2">
            {items.map((item, index) => (
                <div key={index} data-testId={`accordion-${index}`} className={`border-b   ${bgColor} hover:${hover} mb-2 rounded-lg font-inter`}>
                    <button
                        className="w-full px-4 py-2 text-left flex justify-between items-center"
                        onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                        <span className={`font-bold text-xl ${titleColor}`}>{item.title}</span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            {openIndex === index ?
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            }
                        </svg>
                    </button>
                    <Transition
                        show={openIndex === index}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-100 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <div className={`px-4 py-2 ${contentColor} text-[16px]`}>
                            {item.content}
                        </div>
                    </Transition>
                </div>
            ))}
        </div>
    );
}
export default Accordion;





