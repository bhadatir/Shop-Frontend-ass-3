import {useState,useEffect} from "react";

export function useCategories(){

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            fetch('https://dummyjson.com/products/category-list')
            .then((res)=>{
                if(!res.ok)
                {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data)=>{
                setCategories(data);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, []);

    return { categories, loading, error };
}