'use client'
import React from 'react'
import Image from 'next/image'
import Button from '@/app/components/button'
import { inter, roboto } from '../fonts'

function About() {
    return (
        <div className='grid grid-cols-2 gap-10 ml-20 mt-24'>
            <div className='w-full' data-testId="image-container">
                <Image
                    src="/about.png" width={604} height={632} alt='' />
            </div>

            <div className='flex flex-col my-28' data-testId="details-container">

                <h1 className={`${roboto.className} font-bold text-4xl text-primary mb-8`}>À propos de nous</h1>

                <div className={`${inter.className} mb-6 mr-4 text-xl font-normal`}>
                    <p className={`mb-4`}>
                        Bien plus qu&apos;un simple prestataire, nous avons la volonté d&apos;être un véritable partenaire technique pour nos clients.
                    </p>

                    <p className={`mb-4`}>
                        Nous commençons toujours par nous imprégner des spécificités de votre entreprise et des objectifs commerciaux, techniques et fonctionnels que vous souhaitez atteindre.
                    </p>

                    <p>
                        Adopter cette stratégie permet aux experts de notre agence web d&apos;être force de proposition et de vous proposer un accompagnement personnalisé pour un résultat sur mesure,
                        à la hauteur de vos ambitions.
                    </p>

                </div>
                <div className='mt-4 w-32'>
                    <Button name='Voir plus' link='#'  borderStyle='rounded-full' hoverColor={"bg-secondary"} bgColor="bg-primary" fontStyle='font-normal' textColor='text-white' />

                </div>
            </div>
        </div>
    )
}

export default About
