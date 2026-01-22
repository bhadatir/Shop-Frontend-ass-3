import { CartProvider, useCart } from "./Components/CartContext";
import Home from "./Components/Home";
import { ThemeContextProvider } from "./Components/ThemeContextProvider";

export default function App() {
  return (
    <ThemeContextProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </ThemeContextProvider>
  );
}

