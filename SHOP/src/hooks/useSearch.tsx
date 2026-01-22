import {useState,useEffect} from "react";

export function useSearch(products: string){

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!products){
            setFilteredProducts([]);
            return;
        }
        setLoading(true);
            fetch(`https://dummyjson.com/products/search?q=${products}`)
            .then((res)=>{
                if(!res.ok)
                {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data)=>{
                setFilteredProducts(data.products);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, [products]);

    return { filteredProducts, loading, error };
}