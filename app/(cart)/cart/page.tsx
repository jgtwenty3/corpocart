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

  const { cartItems, shares } = await getCartItems();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <ul className="flex-1 mt-5 md:pr-5 border-r-2 border-gray-300">
            {cartItems.map((item) => (
              <li key={item.id} className="border-b-2 border-gray-300 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-gray-500">Owner: {item.owner_name}</p>
                    <p className="text-sm text-gray-500">Ownership Type: {item.owner_type}</p>
                  </div>
                  <div className="text-right">
                    <button className="bg-darkText text-black px-4 py-2 rounded-md hover:bg-black hover:text-white">
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {shares && (
            <div className="flex-shrink-0 mt-5 md:mt-0 md:ml-10 md:pl-5">
              <div className="p-4 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-lg font-semibold mb-3">Your Cart is Owned By:</h2>
                <p className="text-sm text-gray-500">Megacorporations: {(shares.megacorpShare * 100).toFixed(2)}%</p>
                <p className="text-sm text-gray-500">Private Equity: {(shares.privateEquityShare * 100).toFixed(2)}%</p>
                <p className="text-sm text-gray-500">Founder or Family Owned Share: {(shares.founderOwnedShare * 100).toFixed(2)}%</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
