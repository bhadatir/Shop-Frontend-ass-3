import {useState,useEffect} from "react";

export function useSearchByCat(category: string){

    const [filteredProductsByCat, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!category){
            setCategories([]);
            return;
        }
        setLoading(true);
            fetch(`https://dummyjson.com/products/category/${category}`)
            .then((res)=>{
                if(!res.ok)
                {
                    throw new Error("Failed to fetch products");
                }
                return res.json();
            })
            .then((data)=>{
                setCategories(data.products);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, [category]);

    return { filteredProductsByCat, loading, error };
}