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

export const fetchAllProduct = async (): Promise<product[]> => {
  const { data } = await axios.get<product[]>('https://dummyjson.com/products');
  return data;
};

export function useProduct()
{
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://dummyjson.com/products', {
            params: {}
        })
        .then((res)=>{
            setProducts(res.data.products);
            setLoading(false);
        })
        .catch((error)=>{
            setError(error.message);
            setLoading(false);
        });
    }, []);

    return { products, loading, error };
}