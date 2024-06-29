'use client';
import React from 'react'
import Image from "next/image";

interface ButtonProps {
    name: string;
    link: string;
    borderStyle: string;
    fontStyle: string;
    icon?: string;
    bgColor: string;
    textColor: string;
    hoverColor?:string;
}

const Button: React.FC<ButtonProps> = ({name, link, borderStyle, fontStyle, icon, bgColor, textColor,hoverColor}) => {
    return (
        <a href={link}
           className={`border text-xl flex font-inter hover:${hoverColor} ${bgColor} ${borderStyle} ${fontStyle} ${textColor}  px-4 py-2`}>
            {icon && <Image src={icon}
                            className=" mr-2" width={30} height={30} alt=""/>}
            <span className="mx-auto my-auto">{name}</span>
        </a>
    )
}

export default Button