import Accordion from '@/app/components/Accordion';
import React from 'react';
import Image from "next/image";

const items = [
    {
        title: "Comment puis-je contacter l'équipe ?",
        content: "Vous pouvez nous joindre via notre formulaire de contact sur notre site Web ou en nous envoyant un e-mail à Bytecraft@20.com. Nous répondons généralement dans les 24 heures."
    },
    {
        title: "Quels services offrez-vous ?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since"
    },
    {
        title: "Fournissez-vous des services de maintenance de sites Web ?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since"
    }
    , {
        title: "Combien de temps faut-il pour concevoir et développer un site Web ?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since"
    }, {
        title: "Avez-vous besoin d'un acompte pour les projets ?",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since"
    }
];

function FAQ() {
    return (
        <div className="grid grid-cols-5 m-20" data-testId={"faq"}>
            <div className='col-span-2'>
                <Image src="/faq.svg" width={377} height={289} alt="Faq image"/>
            </div>
            <div className={"col-span-3 "}>
            <Accordion items={items} bgColor={"bg-[#D3E8ED]"} titleColor={"text-black"} contentColor={"text-[#8987A1]"} />
            </div>
        </div>
    );
}

export default FAQ;
