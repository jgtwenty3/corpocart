'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';

const HeaderClient = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconSrc, setIconSrc] = useState('/icons/menu-light.svg'); // Default to light mode icon
  const { theme, resolvedTheme } = useTheme(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setIconSrc(menuOpen
      ? (resolvedTheme || theme) === 'dark' ? '/icons/close-dark.svg' : '/icons/close-light.svg'
      : (resolvedTheme || theme) === 'dark' ? '/icons/menu-dark.svg' : '/icons/menu-light.svg'
    );
  }, [menuOpen, theme, resolvedTheme]);

  return (
    <nav className="relative w-full md:w-full flex justify-between h-10">
      <div className="md:hidden flex gap-5 p-3 absolute right-0 top-3">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Image
            src={iconSrc} 
            alt={menuOpen ? "Close menu" : "Open menu"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-white text-black shadow-xl shadow-black md:hidden z-10 p-5 border-2 border-black">
          <div className="flex flex-col items-end p-4">
            <Link href="/products" className="py-2" onClick={toggleMenu}>PRODUCTS</Link>
            <Link href="/owners" className="py-2" onClick={toggleMenu}>OWNERS</Link>
            <Link href="/sign-in" className="py-2" onClick={toggleMenu}>SIGN IN</Link>
            <Link href="/sign-up" className="py-2" onClick={toggleMenu}>SIGN UP</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderClient;
