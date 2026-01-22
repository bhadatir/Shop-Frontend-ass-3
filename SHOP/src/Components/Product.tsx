import { useParams } from "react-router-dom"
import { useSingleProduct } from "../hooks/useProducts";

export default function Product(){
    const { id } = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : 0;

    const {data: product, isLoading,error} = useSingleProduct(numericId);
        
        if(isLoading) return <p>Loading...</p>;
        if(error) return <p>Error: {error.message}</p>;
        if(!product) return null;
    
    return(
        <div className="p-6 flex gap-6">
    
        <img
            className="mx-auto"
            src={product.thumbnail}
            alt={product.title}
        />

        <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800 font-bold">Price: ${product.price}</p>
            <p className="text-gray-500">Discount: {product.discountPercentage}%</p>
            <p className="text-yellow-500 font-bold">Rating: {product.rating}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <p className="text-gray-600">Brand: {product.brand}</p>
        </div>
        </div>
    )
}