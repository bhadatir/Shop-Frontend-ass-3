import { Outlet } from "react-router-dom";
import ShopNavbar from "./Components/ShopNavbar";
import { ThemeContextProvider } from "./Components/ThemeContextProvider";

export default function App() {
  return (
    <>
    <ThemeContextProvider>
        <ShopNavbar />
        <Outlet />
    </ThemeContextProvider>      
    </>
  );
}


