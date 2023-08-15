
const Cart = () => {
    return (
        <>
            <h1>Votre panier</h1>
            {[{ name: 'TODO: Charger les produits de l\'état partagé', price: 12.34, id: 1 }].map(product =>
                <div className='product-cart' key={product.id}>
                    <span>{product.name} </span>
                    <span>{product.price}</span>
                    <button onClick={() => {
                        console.log('retier le produit du panier')
                    }}>
                        X
                    </button>
                </div>
            )}
            <p>Prix total : TODO {(12.345).toFixed(2)}$</p>
            <button style={{ backgroundColor: "red", color: "white" }}
                onClick={() => { console.log('TODO : vider le panier') }}>Vider le panier</button >
        </>
    )
}

export default Cart;