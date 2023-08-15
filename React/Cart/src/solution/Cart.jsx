import { useContext } from "react";
import CartContext from "./CartContext";
import { ACTIONS } from "./reducer";

const Cart = () => {
    const { state, dispatch } = useContext(CartContext);
    return (
        <>
            <h1>Votre panier</h1>
            {state.products.map(product =>
                <div className='product-cart' key={product.id}>
                    <span>{product.name} </span>
                    <span>{product.price}</span>
                    <button onClick={() => {
                        dispatch({ type: ACTIONS.DELETE, payload: { id: product.id } })
                    }}>
                        X
                    </button>
                </div>
            )}
            <p>Prix total : {(state.products.reduce((acc, x) => { return acc + x.price }, 0)).toFixed(2)}$</p>
            <button style={{ backgroundColor: "red", color: "white" }}
                onClick={() => dispatch({ type: ACTIONS.EMPTY })}>Vider le panier</button >
        </>
    )
}

export default Cart;