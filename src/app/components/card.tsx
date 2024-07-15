'use client';

import React from 'react';
import Image from 'next/image';
import Button from './button';
import { inter } from '../ui/fonts';

interface CardProps {
    title: string;
    description: string;
    image: string;
    link: string;
    buttonText: string;
}

interface SlideDotsProps {
    totalDots: number;
    activeDot: number;
    onDotClick?: (index: number) => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, link, buttonText }) => {
    return (
        <div className={`${inter.className} grid grid-cols-2 shadow-slate-100 shadow-sm text-[#0C0C0C]`}>
            <div className='flex flex-col w-full mx-10'>
                <div className='items-center justify-center mx-10'>
                    <h1 className='text-5xl font-bold text-primary w-4/6 leading-snug'>{title}</h1>
                    <p className='text-lg mt-5 w-4/6 leading-snug'>{description}</p>
                </div>
                <div className='mt-10 items-start w-fit mx-10'>
                    <Button icon='/arrow-right.png' name={buttonText} link={link} borderStyle='rounded-xl px-8' fontStyle='font-se text-sm' bgColor='bg-primary' textColor='text-customWhite' />
                    <div className="mx-10 mt-5">
                        <SlideDots totalDots={3} activeDot={0} />
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center w-full'>
                <Image src={image} width={700} height={700} alt={title} />
            </div>
        </div>
    );
};

const SlideDots: React.FC<SlideDotsProps> = ({ totalDots, activeDot, onDotClick }) => {
    return (
        <div className="flex flex-wrap space-x-1 justify-center">
        {Array.from({ length: totalDots }, (_, index) => (
            <button
            type="button"
            key={index}
            className={`w-3 h-3 rounded-xl ${index === activeDot ? 'bg-sky-400' : 'bg-gray-400'}`}
            onClick={() => onDotClick?.(index)}
            />
        ))}
        </div>
    );
};

export default Card;
