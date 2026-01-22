import { NavLink, type NavLinkProps } from 'react-router-dom';
// import {useTheme} from "./ThemeContextProvider"

export default function ShopNavbar() {
    
    // const { theme, toggleTheme } = useTheme();

    const linkStyle: NavLinkProps["style"] = ({ isActive }) => ({
        color: isActive ? "red" : "white",
        fontWeight: isActive ? "bold" as const : "normal" as const,
        textDecoration: "none",
        margin: "0 10px",
    });

    return (
        <nav className="flex bg-gray-600 p-4 fixed top-0 left-0 w-full">
            <div className="flex justify-between w-full">
                <h3 className="font-bold text-[20px] text-white">Shop</h3>
                <ul className="flex">
                    <li>
                        <NavLink to="/" style={linkStyle} end>
                            Products
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/products" style={linkStyle}>Products</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/cart" style={linkStyle}>Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={linkStyle}>About</NavLink>
                    </li>
                </ul>
                {/* <button onClick={toggleTheme} className="text-black">
                    Toggle Theme
                </button> */}
            </div>
        </nav>
    )
}
