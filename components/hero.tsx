import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center">
       
        {/* <img src="/images/cartlogo.png" className="w-40 md:w-80" /> */}
      </div>
      <div className="flex flex-col items-center m-10 p-5 text-xl">
        <h1 className="text-3xl">Welcome to</h1>
        <h1 className="text-3xl mb-5">Corp-O-Cart</h1>
        <h2 className="mt-5">
          Check out products and who owns them. 
        </h2>
        <p className="mt-2">You wouldn't want to accidentally spend money on a brand that didn't inscrease shareholder profits... </p>
        <p className="text-4xl mt-5 mb-10">would you?</p>
        <p className="heartbeat text-4xl lg:text-7xl !leading-tight mx-auto max-w-xl text-center">
          BUY! BUY! BUY!
        </p>
      </div>
      <div>
        This information is gathered to the best of my ability and is updated when possible. Please do your own research.
      </div>
    </div>
  );
}
