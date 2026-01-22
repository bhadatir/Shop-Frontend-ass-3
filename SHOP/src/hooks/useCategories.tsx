import {useState,useEffect} from "react";
import axios from "axios";

export const fetchProductsCat = async (): Promise<string[]> => {
  const { data } = await axios.get<string[]>('https://dummyjson.com/products/category-list');
  return data;
};

export function useCategories(){

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products/category-list', {
            params: {}
        })
        .then((res)=>{
            setCategories(res.data);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, []);

    return { categories, loading, error };
}
