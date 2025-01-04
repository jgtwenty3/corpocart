import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getAllProducts } from "../actions";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const products = await getAllProducts();

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <h1>Welcome, {user.email}!</h1>
      <h2>Products:</h2>
      <ul>
        {products && products.length > 0 ? (
          products.map(product => (
            <li key={product.id}>{product.name} - {product.category}</li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
}

