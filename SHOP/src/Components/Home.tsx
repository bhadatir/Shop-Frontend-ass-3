import { useState } from 'react'
import ShopNavbar from './ShopNavbar'
import ProductDetail from './ProductDetail'
import { useAllProduct, useCategories, useProductSearch, type Product } from '../hooks/useProducts';

export default function Home() {

    const [searchInput,setSearchInput] = useState('');
    const [activeSearchTerm, setActiveSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('');

    const{ data: allProducts, isLoading: isLoadingAll, error: errorAll } = useAllProduct();
    const{ data: categories } = useCategories();

    const{ data: searchResult, isLoading: isLoadingSearch } = useProductSearch(activeSearchTerm);
    const{ data: categoryResult, isLoading: isLoadingCategory } = useProductSearch(activeCategory);

    function handleSearch(){
        setActiveSearchTerm(searchInput);
        setActiveCategory('');
    }

    function handelCategoryChange(e: React.ChangeEvent<HTMLSelectElement>){
        const selected = e.target.value;
        setActiveCategory(selected);
        setActiveSearchTerm('');
        setSearchInput('');
    }

    let contenetToDisplay: Product[] = [];
    let isLoading = isLoadingAll;
    let error = errorAll;
   
    if(activeSearchTerm){
        contenetToDisplay = searchResult || [];
        isLoading = isLoadingSearch;
        error = null;
    }else if(activeCategory){
        contenetToDisplay = categoryResult || [];
        isLoading = isLoadingCategory;
        error = null;
    }else{
        contenetToDisplay = allProducts || [];
    }

    if (isLoading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ShopNavbar />

            <div className="mx-auto px-4 pt-24 flex">
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
                <div className="p-2 ml-4 border">
                    <select className="p-1" onChange={handelCategoryChange} value={activeCategory}>
                        <option value="">All</option>
                        {categories?.map((category) => (
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

