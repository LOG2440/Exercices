import { useEffect, useState } from "react";
import Product from "./Product";
import PRODUCTS from "../products";

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Simuler un chargement des items
        const fetchProducts = () => PRODUCTS;
        
        setProducts(fetchProducts());
    }, []);
    return (
        <>
            <h1 className="center-text">Produits disponibles</h1>
            <div className="product-container">
                {products.map((product) => <Product product={product} key={product.id} />)}
            </div>
        </>
    )
}

export default ProductPage;