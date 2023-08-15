import Product from "./Product";

const ProductPage = () => {
    return (
        <>
            <h1 className="center-text">Produits disponibles</h1>
            <div className="product-container">
                <Product product={{ name: 'TODO : Charger tous les produits dans une liste au chargement de la page', price: 12.34, id: 1 }} />
            </div>
        </>
    )
}

export default ProductPage;