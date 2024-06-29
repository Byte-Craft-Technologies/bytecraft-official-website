import Link from 'next/link';
import { inter } from '../fonts';
import Button from '../../components/button';
import { ChevronDown } from '../icons';


export default function NavBar() {
    return (
        <header className={`${inter.className} flex items-baseline text-black`}>
            <nav className="pt-2 pb-6 grid grid-cols-3 mx-24 justify-around">
                <div className='w-full'>
                    <Link href="#">Accueil</Link>
                </div>
                <div className='w-full text-[#8987A1] flex flex-wrap'>
                    <Link href="#">Services</Link>
                    <ChevronDown fill="#8987A1" size={16} height={16} width={16} className="" />
                </div>
                <div className='w-full text-[#8987A1]'>
                    <Link href="#">Réalisations</Link>
                </div>
            </nav>
            <div className='px-2'>
                <Button
                    name="Devis"
                    link="#"
                    borderStyle="rounded-xl px-8 py-2"
                    fontStyle="font-se text-base"
                    bgColor="bg-primary"
                    textColor="text-white"
                />
            </div>
        </header>
    );
}
