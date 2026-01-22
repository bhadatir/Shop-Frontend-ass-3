import { useState } from 'react'
import ShopNavbar from './ShopNavbar'
import ProductDetail from './ProductDetail'
import { useSearch } from '../hooks/useSearch';
import { useProduct } from '../hooks/useProduct';
import { useCategories } from '../hooks/useCategories';
import { useSearchByCat } from '../hooks/useSearchByCat';

export default function Home() {

    const [searchInput,setSearchInput] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const { products } = useProduct();
    const { filteredProducts } = useSearch(activeSearchTerm);
    const { categories } = useCategories();
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

    let contenetToDisplay = [];
   
    if(activeSearchTerm){
        contenetToDisplay = filteredProducts;
    }else if(activeCategory){
        contenetToDisplay = filteredProductsByCat;
    }else{
        contenetToDisplay = products;
    }

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
                        {categories.map((category: string) => (
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