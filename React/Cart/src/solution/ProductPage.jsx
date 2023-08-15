import { useState } from "react";
import Product from "./Product";
import PRODUCTS from "../products";

const ProductPage = () => {
    const [products, setProducts] = useState(PRODUCTS);
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