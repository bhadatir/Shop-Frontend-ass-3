import { Outlet } from "react-router-dom";
import ShopNavbar from "./Components/ShopNavbar";

export default function App() {
  return (
    <>
        <ShopNavbar />
        <Outlet />   
    </>
  );
}


