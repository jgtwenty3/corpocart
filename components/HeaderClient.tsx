'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes'; 

const HeaderClient = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme } = useTheme(); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getIconSrc = () => {
    if (menuOpen) {
      return theme === 'dark' ? '/icons/close-dark.svg' : '/icons/close-light.svg';
    } else {
      return theme === 'dark' ? '/icons/menu-dark.svg' : '/icons/menu-light.svg';
    }
  };

  return (
    <nav className="relative w-full md:w-full flex justify-between h-10">
      <div className="md:hidden flex gap-5 p-3 absolute right-3 top-3">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Image
            src={getIconSrc()} 
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
