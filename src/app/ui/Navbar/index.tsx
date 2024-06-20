import Link from 'next/link';
import { inter } from '../fonts';

export default function NaveNav() {
    return (
        <header className={`${inter.className} h-12 w-full grid grid-cols-3 text-black`}>
            <div />
            <nav className="w-full grid grid-cols-3 justify-around">
                <div className='w-full'>
                    <Link href="#">Accueil</Link>
                </div>
                <div className='w-full text-[#8987A1]'>
                    <Link href="#">Services</Link>
                </div>
                <div className='w-full text-[#8987A1]'>
                    <Link href="#">Réalisations</Link>
                </div>
            </nav>
            <div className='w-3/5 grid grid-cols-1 text-right'>
                Devis
            </div>
        </header>
    );
}
