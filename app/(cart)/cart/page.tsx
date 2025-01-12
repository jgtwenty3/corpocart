"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import ClientCart from "@/components/ClientCart";
import { getCartItems } from "@/app/actions";
export default async function CartPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const initialData = await getCartItems();

  return <ClientCart initialData={initialData} />;
}
