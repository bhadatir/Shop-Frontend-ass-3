import {useCart} from "./CartContext";
import Productpage from "./ProductPage";
import {useState,useRef, useEffect} from "react";
import ReservationTimer from "./ReservationTimer";
import {useTheme} from "./ThemeContextProvider"

type ProductDetailProps = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    img: string;
}

function ProductDetail({ id, name, price, category, stock, img }:ProductDetailProps) {    
    const [productPage, setProductPage] = useState<number | null>(null);
    const [haveCoupan, setHaveCoupan] = useState(false);
    const [haveCorrectCoupan, setHaveCorrectCoupan] = useState(false);
    const [reserve, setReserve] = useState(false);

    const { theme } = useTheme();
    const { addToCart } = useCart();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (haveCoupan && inputRef.current) {
            inputRef.current.focus();
        }
    }, [haveCoupan]);
    
    function handelProduct(id: number){
        console.log("Product ID:", id);
        setProductPage(id);
    }
    function handelDiscount(){
        setHaveCoupan(false);
        setHaveCorrectCoupan(true);
    }

    function handleFocusInput(){
        setHaveCoupan(true);
    };

    return (
        <>
        <div className="product-detail p-4 border m-4" >
            <img src={img} alt={name} key={id} onClick={() => handelProduct(id)}/>
            <h2 className={theme === 'dark' ? 'text-white bg-gray-400' : 'text-black'}>{name}</h2>
            <p>{category}</p>
            { !haveCorrectCoupan ? <p>Price: ${price.toFixed(2)}</p> : <p>Price: ${(price * 0.9).toFixed(2)} (10% off applied)</p>}
            <div>
                {!reserve ? <p>{`Stock: ${stock} available`}</p> : <p>{`Stock: ${stock - 1} available (1 item reserved)`}</p>}
                {stock === 0 && <div className="text-red-200 font-bold bg-red-600 m-1">Out of Stock</div>}
                {stock > 0 && stock < 5 && <div className="text-orange-200 font-bold bg-orange-600 m-1">Limited Quantity</div>}
                {price > 500 && <div className="text-yellow-200 font-bold bg-yellow-600 m-1">Premium</div>}
            </div>
            <button
                onClick={() => addToCart({ id, name, price, quantity: 1 })}
                disabled={stock === 0}
                className={"bg-blue-500 text-black"}
            >
                Add to Cart
            </button>
            {!haveCoupan && <a href="#" className="mt-2 flex" onClick={handleFocusInput} >Have a Coupon?</a>}

            {haveCoupan && 
                <div className="mt-2">
                    <input ref={inputRef} type="text" placeholder="Enter Coupon Code" className="p-1 w-40"/>
                    <button className="text-black" onClick={handelDiscount}>Apply</button>
                </div>
            } 
            {!reserve && <button className="text-black" onClick={() => setReserve(true)}>Reserve</button>}
            {reserve && <ReservationTimer />}

        </div>
        {productPage && <div className="fixed inset-0 bg-transparent flex items-center justify-center">
                <div className="bg-gray-200 p-8 w-196">
                    <button onClick={() => setProductPage(null)} className="float-right text-gray-600 mb-5">X</button>
                    <Productpage id={productPage} />
                </div>
        </div>}
        </>
    );
};

export default ProductDetail;