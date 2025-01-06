'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const HeaderClient = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="relative w-full md:w-full flex justify-between items-center h-16">
      {/* <div className="flex items-center gap-5 font-semibold text-md md:text-3xl p-5 text-2xl">
        <Link href={"/"}>CORP-O-CART</Link>
      </div> */}
      <div className="md:hidden flex items-center gap-5 p-3 absolute right-3 top-3">
        <button onClick={toggleMenu} className="focus:outline-none border-2 border-darkText">
          <Image
            src={menuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            alt={menuOpen ? "Close menu" : "Open menu"}
            width={24}
            height={24}
          />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full bg-darkText text-black shadow-lg md:hidden z-10 p-5 border-2 border-black ">
          <div className="flex flex-col items-end p-4">
            <Link href={"/products"} className="py-2" onClick={toggleMenu}>PRODUCTS</Link>
            <Link href={"/owners"} className="py-2" onClick={toggleMenu}>OWNERS</Link>
            <Link href={"/sign-in"} className="py-2" onClick={toggleMenu}>SIGN IN</Link>
            <Link href={"/sign-up"} className="py-2" onClick={toggleMenu}>SIGN UP</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default HeaderClient;
