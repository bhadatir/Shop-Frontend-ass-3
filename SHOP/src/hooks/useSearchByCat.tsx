import axios from "axios";
import {useState,useEffect} from "react";

export type product = {
    id: number;
    title: string;
    price: number;
    category: string;
    stock: number;
    thumbnail: string;
}

export const searchProductByCat = async (category: string): Promise<product[]> => {
  const { data } = await axios.get<product[]>(`https://dummyjson.com/products/category/${category}`);
  return data;
};

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
            axios.get(`https://dummyjson.com/products/category/${category}`, {
                params: {}
            })
            .then((res)=>{
                setCategories(res.data.products);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, [category]);

    return { filteredProductsByCat, loading, error };
}