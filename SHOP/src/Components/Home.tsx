import { useState } from 'react'
import ShopNavbar from './ShopNavbar'
import ProductDetail from './ProductDetail'
import { searchProduct, useSearch, type product } from '../hooks/useSearch';
import { fetchAllProduct, useProduct } from '../hooks/useProduct';
import { searchProductByCat, useSearchByCat } from '../hooks/useSearchByCat';
import { useQuery } from "@tanstack/react-query";
import { fetchProductsCat } from "../hooks/useCategories";

export default function Home() {

    const [searchInput,setSearchInput] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const { products } = useProduct();
    const { filteredProducts } = useSearch(activeSearchTerm);
    const { filteredProductsByCat } = useSearchByCat(activeCategory);

    function handleSearch(){
        setActiveSearchTerm(searchInput);
        setActiveCategory('');
    }

    function handelCenterChange(e: React.ChangeEvent<HTMLSelectElement>){
        const selected = e.target.value;
        setActiveCategory(selected);
        setActiveSearchTerm('');
        setSearchInput('');
    }

    const { data, error, isLoading, isError } = useQuery<string[], Error>({
        queryKey: ["productCategories"],
        queryFn: fetchProductsCat, 
    });

    const { data : pro, error : proError, isLoading : proIsLoading, isError : proIsError } = useQuery<product[], Error>({
        queryKey: ["product"],
        queryFn: () => searchProduct( searchInput ), 
    });
    console.log("Products from useQuery:", pro);

    const { data : allProduct, error : allProductError, isLoading : allProductIsLoading, isError : allProductIsError } = useQuery<product[], Error>({
        queryKey: ["allProduct"],
        queryFn: fetchAllProduct, 
    });
    console.log("All Products from useQuery:", allProduct);

    const { data: proByCat, error: proByCatError, isLoading: proByCatIsLoading, isError: proByCatIsError } = useQuery<product[], Error>({
        queryKey: ["productsByCategory"],
        queryFn: () => searchProductByCat( activeCategory ), 
    });
    console.log("Products By Category from useQuery:", proByCat);

    let contenetToDisplay = [];
   
    if(activeSearchTerm){
        contenetToDisplay = pro || [];
    }else if(activeCategory){
        contenetToDisplay = filteredProductsByCat;
    }else{
        contenetToDisplay = products;
    }

    console.log("Content to Display:", contenetToDisplay);

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ShopNavbar />
            <div className="mt-25 ml-10 flex p-1 w-full ">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full p-2 mr-4 border"
                />
                <button onClick={handleSearch} className="text-black">
                    Search
                </button>
                <div className="ml-4 mr-20">
                    <select className="p-2 border" onChange={handelCenterChange}>
                        <option value="">All</option>
                        {Array.isArray(data) && data.map((category: string) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <h3 className="mt-5 ml-8 font-bold">
            {activeSearchTerm ? `Results for "${activeSearchTerm}"` : activeCategory ? `Category: "${activeCategory}"` : 'All Products'}
            </h3>  

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
                {contenetToDisplay && contenetToDisplay.length > 0 ? (                  
                    contenetToDisplay.map((product: any) => (
                        <div className="product-item" key={product.id}>
                            <ProductDetail
                                id={product.id}
                                name={product.title}
                                price={product.price}
                                category={product.category}
                                stock={product.stock}
                                img={product.thumbnail}
                            />
                        </div>
                    ))
                ) : (<p>No products found</p>
                )}
                </div>
        </div>
    );
}

