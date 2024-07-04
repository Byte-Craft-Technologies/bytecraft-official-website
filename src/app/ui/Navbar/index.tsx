'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { inter } from '../fonts';
import Button from '../../components/button';
import { ChevronDown } from '../icons';

const links = [
  { name: 'Accueil', href: '#' },
  { name: 'Services', href: '#', submenu: [{ name: 'Service 1', href: '#' }, { name: 'Service 2', href: '#' }] },
  { name: 'Réalisations', href: '#' },
];

export default function NavBar() {
  const [submenuVisibility, setSubmenuVisibility] = useState<{ [key: string]: boolean }>({});
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setSubmenuVisibility((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLinkClick = (name: string) => {
    setSelectedLink(name);
    if (links.find(link => link.name === name)?.submenu) {
      return false;
    }
  };

  return (
    <header className={`${inter.className} flex items-center justify-around text-black w-full shadow-sm shadow-slate-200`}>
      <div className='pt-2 pb-6 items-start'>Logo</div>
      <div className='flex items-baseline'>
        <nav className="pt-2 pb-6 grid grid-cols-3 mx-24 justify-around">
          {links.map((link) => (
            <div key={link.name} className={`w-full pr-8 ${selectedLink === link.name ? 'text-black' : 'text-[#8987A1]'}`}>
              {link.submenu ? (
                <div className='text-[#8987A1] pr-6'>
                  <Link href="#" onClick={() => { toggleSubmenu(link.name); handleLinkClick(link.name); }} className='flex flex-wrap'>
                    {link.name}
                    <ChevronDown fill="#8987A1" size={16} height={16} width={16} className="mx-1 mt-1.5" />
                  </Link>
                  {submenuVisibility[link.name] && (
                    <div className="flex flex-col absolute bg-white shadow-slate-200 shadow-xl mt-1 px-10 py-5">
                      {link.submenu.map((subItem) => (
                        <div key={subItem.name} className='justify-center' >
                          <div className='my-3 w-auto'>
                            <Link href={subItem.href} onClick={() => handleLinkClick(subItem.name)}>{subItem.name}</Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={link.href} onClick={() => handleLinkClick(link.name)}>{link.name}</Link>
              )}
            </div>
          ))}
        </nav>
        <div className='px-1 pt-0'>
          <Button
            name="Devis"
            link="#"
            borderStyle="rounded-xl px-8"
            fontStyle="font-se text-sm"
            bgColor="bg-primary"
            textColor="text-white"
          />
        </div>
      </div>
    </header>
  );
}