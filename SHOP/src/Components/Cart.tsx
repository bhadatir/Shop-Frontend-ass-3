import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../Redux/store';
import { removeFromCart, clearCart } from '../Redux/CartSlice';

export default function Cart(){

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch<AppDispatch>();

    return(
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
            {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
            ) : (
            <ul>
                {cartItems.map(item => (
                <li key={item.id} className="mb-2">
                    {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                    <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="ml-4 text-red-500"
                    >   
                    Remove
                    </button>
                    <button
                    onClick={() => dispatch(incInCart(item.id))}
                    className="ml-4 text-red-500"
                    >   
                    +
                    </button>
                </li>
                ))}
            </ul>
            )}
            <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
            <p className="mt-4 font-bold">Total Items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>
        </div>        
    )
}
