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

export const searchProductById = async (id: number): Promise<product> => {
  const { data } = await axios.get<product>(`https://dummyjson.com/products/${id}`);
  return data;
};

export function useProductByID(id: number){

    const [ProductsByID, setProductsByID] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            axios.get(`https://dummyjson.com/products/${id}`, {
                params: {}
            })
            .then((res)=>{
                setProductsByID(res.data);
                setLoading(false);
            })
            .catch((error)=>{
                setError(error.message);
                setLoading(false);
            });
        }, []);



    return { ProductsByID, loading, error };
}