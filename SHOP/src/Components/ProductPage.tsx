import { useProductByID } from "../hooks/useProductByID"

type ProductPageProps = {
    id: number;
}

export default function Productpage({id}: ProductPageProps){
    const { ProductsByID, loading, error } = useProductByID(id);
    return (
        <div className="product-detail">
            {loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p>Error: {error}</p>
            ) : ProductsByID ? (
            <div>
                <img className="mx-auto w-48" src={ProductsByID.thumbnail} alt={ProductsByID.title} />
                <h1>{ProductsByID.title}</h1>
                <p>{ProductsByID.description}</p>
                <p>Price: ${ProductsByID.price}</p>
                <p>Discount: {ProductsByID.discountPercentage}%</p>
                <p>Rating: {ProductsByID.rating}</p>
                <p>Stock: {ProductsByID.stock}</p>
                <p>Brand: {ProductsByID.brand}</p>
            </div>
            ) : null}
        </div>
    );
}