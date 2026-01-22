import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home"
import About from "../Components/About"
import Product from "../Components/Product"
import Cart from "../Components/Cart"
import App from "../App";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children: [
            { index: true, element: <Home /> },
            { path: "products", element: <Home /> },
            { path: "products/:id", element: <Product /> }, 
            // { path: "product/:id/customize" element: < /> }
            { path: "cart", element: <Cart /> },
        ],
    },
    {
        path:"/about",
        element: <About />,
    },
    {
        path:"/*",
        element:<h1>404 Not Found</h1>,
    }
])

