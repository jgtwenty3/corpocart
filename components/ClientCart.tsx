"use client";

import { useState } from 'react';
import { getCartItems, deleteFromCart } from "@/app/actions";
import ActionButton from "@/components/ActionButton";
import Link from 'next/link';  // Import Link from next

type CartItem = {
  cart_id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  category: string;
  owner_name: string;
  owner_type: string;
};

type Shares = {
  megacorpShare: number;
  privateEquityShare: number;
  founderOwnedShare: number;
};

type ClientCartProps = {
  initialData: {
    cartItems: CartItem[];
    shares: Shares;
  };
};

const getOwnershipTypeClass = (owner_type: string) => {
  switch (owner_type) {
    case 'Founder or Family Owned':
      return 'text-green text-md'; 
    case 'Megacorporation':
      return 'text-darkText text-md';
    case 'Private Equity':
      return 'text-orange text-md';
    case 'Co-Op or Employee Owned':
      return 'text-lightText text-md';
    default:
      return 'text-gray-500'; 
  }
};

const ClientCart = ({ initialData }: ClientCartProps) => {
  const [cartItems, setCartItems] = useState(initialData.cartItems);
  const [shares, setShares] = useState(initialData.shares);
  const [loading, setLoading] = useState(false);

  console.log("Initial Cart Items: ", initialData.cartItems);
  console.log("Current Cart Items: ", cartItems);

  const refreshCart = async () => {
    setLoading(true);
    const data = await getCartItems();
    setCartItems(data.cartItems);
    setShares(data.shares);
    setLoading(false);
  };

  const handleRemoveItem = async (productId: string) => {
    setLoading(true);
    console.log("Removing Product ID:", productId);

    if (productId) {
      try {
        const response = await deleteFromCart(productId);

        if (response.status === "success") {
          await refreshCart();  
        } else {
          console.error('Failed to remove item:', response.message);
          alert("Failed to remove item: " + response.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert("Error occurred while removing item");
      }
    } else {
      console.error("Invalid Product ID:", productId);
    }

    setLoading(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {loading ? (
        <div>Loading...</div>
      ) : cartItems.length > 0 ? (
        <div className="flex flex-col md:flex-row">
          <ul className="flex-1 mt-5 md:pr-5 border-r-2 border-gray-300 p-2">
            {cartItems.map((item) => (
              <Link href={`/products/${item.product_id}`} key={item.cart_id} passHref> {/* Wrap each item in a Link */}
                <li className="border-b-2 border-gray-300 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">{item.product_name}</h2>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="text-sm text-gray-500">Owner: {item.owner_name}</p>
                      <p className={getOwnershipTypeClass(item.owner_type)}>Ownership Type: {item.owner_type}</p>
                    </div>
                    <div className="text-right md:ml-10">
                    <ActionButton onClick={() => { handleRemoveItem(item.product_id); }}>
                      Remove
                    </ActionButton>
                    </div>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
          {shares && (
            <div className="flex-shrink-0 mt-5 md:mt-0 md:ml-10 md:pl-5">
              <div className="p-4 bg-gray-100 rounded-md shadow-md">
                <h2 className="text-xl text-black font-semibold mb-3">Your Cart is Owned By:</h2>
                <p className="text-lg text-gray-500">Megacorporations: <span className='text-darkText'>{(shares.megacorpShare * 100).toFixed(2)}%</span></p>
                <p className="text-lg text-gray-500">Private Equity: <span className='text-orange'>{(shares.privateEquityShare * 100).toFixed(2)}%</span></p>
                <p className="text-lg text-gray-500">Founder or Family Owned: <span className='text-green'>{(shares.founderOwnedShare * 100).toFixed(2)}%</span></p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-5 text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default ClientCart;
