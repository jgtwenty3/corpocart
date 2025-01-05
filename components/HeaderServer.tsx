import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

const HeaderServer = () => (
  <div className="w-full flex justify-between items-center p-3 text-sm">
    <div className="flex items-center gap-5 font-semibold text-2xl md:text-3xl">
      <Link href={"/"}>CORP-O-CART</Link>
    </div>
    <div className="hidden md:flex items-center gap-5">
      <Link href={"/products"}>PRODUCTS</Link>
      <Link href={"/owners"}>OWNERS</Link>
      {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
    </div>
  </div>
);

export default HeaderServer;
