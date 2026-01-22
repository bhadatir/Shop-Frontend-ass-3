import { useState } from 'react';
import {useCart} from "./CartContext"
import {useTheme} from "./ThemeContextProvider"

function ShopNavbar() {

    const [showCart, setShowCart] = useState(false);
    const { cart, totalItems, removeFromCart } = useCart();
    const { theme, toggleTheme } = useTheme();

    return (
        <>
        <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full">
            <div className="flex justify-between ">
            <div className={ `font-bold text-[25px] ${theme === 'dark' ? 'text-white' : 'text-black'}` }>Vendor Portal</div>
            <div className="space-x-4">
                <button onClick={() => setShowCart(true)} className="text-black">View Cart</button>
                <button onClick={toggleTheme} className="text-black">
                    Toggle Theme
                </button>
            </div>
            </div>
        </nav>
        {showCart && (
            <div className="fixed inset-0 bg-transparent flex items-center justify-center">
            <div className="bg-gray-200 p-8 w-196">
                <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
                {cart.length === 0 ? (
                <p>Your cart is empty.</p>
                ) : (
                <ul>
                    {cart.map(item => (
                    <li key={item.id} className="mb-2">
                        {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                        <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500"
                        >   
                        Remove
                        </button>
                    </li>
                    ))}
                </ul>
                )}
                <p className="mt-4 font-bold">Total Items: {totalItems}</p>
                <button onClick={() => setShowCart(false)} className="mt-4 text-black">
                Close
                </button>
            </div>
            </div>
        )}
        </>
    );
};

export default ShopNavbar;
