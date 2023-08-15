const Product = ({ product }) => {
    return (
        <div className="product-info" >
            <p>{product.name}</p>
            <p>{(product.price).toFixed(2)}</p>
            <div className="add-cart">
                <button onClick={() => {
                    console.log('todo : ajouter le produit au panier')
                }}>Ajouter au panier</button>
            </div>
        </div >)
}

export default Product;