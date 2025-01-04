import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllOwners, getAllProducts } from "../actions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const products = await getAllProducts();
  const owners = await getAllOwners();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h2 className="font-bagel text-2xl">CHECK OUT PRODUCTS:</h2>
      <ul className="font-elite">
        {products && products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>{product.name} - {product.category}</li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
      <h2 className="font-bagel text-2xl">OWNERS:</h2>
      <ul className="font-elite">
        {owners && owners.length > 0 ? (
          owners.map(owner => (
            <li key={owner.id}>{owner.name} - {owner.owner_type}</li>
          ))
        ) : (
          <li>No owners found</li>
        )}
      </ul>
    </div>
  );
}
