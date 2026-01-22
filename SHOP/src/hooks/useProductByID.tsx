import {useState,useEffect} from "react";

export function useProductByID(id: number){

    const [ProductsByID, setProductsByID] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            fetch(`https://dummyjson.com/products/${id}`)
            .then((res)=>{
                if(!res.ok)
                {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data)=>{
                setProductsByID(data);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, []);

    return { ProductsByID, loading, error };
}