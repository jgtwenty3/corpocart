import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getCartItems } from "@/app/actions"; // Import the getCartItems function

export default async function CartPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const cartItems = await getCartItems();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.length > 0 ? (
        <ul className="mt-5">
          {cartItems.map((item) => (
            <li key={item.id} className="mb-3">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5">Your cart is empty.</p>
      )}
    </div>
  );
}
