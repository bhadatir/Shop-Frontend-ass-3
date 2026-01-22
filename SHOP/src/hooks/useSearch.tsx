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

export const searchProduct = async (products: string): Promise<product[]> => {
  const { data } = await axios.get<product[]>(`https://dummyjson.com/products/search?q=${products}`);
  return data;
};

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
            axios.get(`https://dummyjson.com/products/search?q=${products}`, {
                params: {}
            })
            .then((res)=>{
                setFilteredProducts(res.data.products);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, [products]);

    return { filteredProducts, loading, error };
}