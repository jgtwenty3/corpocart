

export default function Header() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-8 justify-center items-center">
      <img src = "/images/cartlogo.png" className="w-96"/>
      </div>
      <p className="heartbeat text-5xl lg:text-7xl !leading-tight mx-auto max-w-xl text-center font-bagel">
        BUY! BUY! BUY!
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
