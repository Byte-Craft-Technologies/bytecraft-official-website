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
    hoverColor?: string;
}

const Button: React.FC<ButtonProps> = ({ name, link, borderStyle, fontStyle, icon, bgColor, textColor, hoverColor }) => {
    return (
        <a
            href={link}
            className={`
                inline-flex items-center justify-center gap-2
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                ${bgColor} ${borderStyle} ${fontStyle} ${textColor}
                ${hoverColor ? `hover:${hoverColor}` : ''}
                shadow-lg hover:shadow-xl
            `}
        >
            <span>{name}</span>
            {icon && (
                <Image
                    src={icon}
                    className="transition-transform group-hover:translate-x-1"
                    width={20}
                    height={20}
                    alt=""
                />
            )}
        </a>
    )
}

export default Button