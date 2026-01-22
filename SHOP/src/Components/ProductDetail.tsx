import type { AppDispatch } from "../Redux/Store";
import { useDispatch } from "react-redux";
import { addToCart } from '../Redux/CartSlice';
import { useNavigate } from "react-router-dom";

type ProductDetailProps = {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    img: string;
}

function ProductDetail({ id, name, price, category, stock, img }:ProductDetailProps) {    
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    function handelProduct(id: number){
        console.log("Product ID:", id);
        navigate(`/products/${id}`);
    }

    const handleAdd = (id: number, name: string, price: number) => {
        dispatch(addToCart({ id, name, price, quantity: 1 }));
        alert(`${name} added to cart!`);
    };

    return (
        <>
        <div className="product-detail p-4 border m-4" >
            <img src={img} alt={name} key={id} onClick={() => handelProduct(id)}/>
            <h2>{name}</h2>
            <p>{category}</p>
            <p>Price: ${price.toFixed(2)}</p>
            <div>
                <p>{`Stock: ${stock} available`}</p>
                {stock === 0 && <div className="text-red-200 font-bold bg-red-600 m-1">Out of Stock</div>}
                {stock > 0 && stock < 5 && <div className="text-orange-200 font-bold bg-orange-600 m-1">Limited Quantity</div>}
                {price > 500 && <div className="text-yellow-200 font-bold bg-yellow-600 m-1">Premium</div>}
            </div>
            <button
                onClick={() => handleAdd(id, name, price)}
                disabled={stock === 0}
                className={"bg-blue-500 text-black"}
            >
                Add to Cart
            </button>
        </div>
        </>
    );
};

export default ProductDetail;

