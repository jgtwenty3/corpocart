import Hero from "@/components/hero";

import { createClient } from "@/utils/supabase/server";
import { getAllOwners, getAllProducts } from "./actions";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const products = await getAllProducts();
  const owners = await getAllOwners();
  
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
       
      </main>
    </>
  );
}
