import { useContext } from "react";
import CartContext from "./CartContext";
import { ACTIONS } from "./reducer";
const Product = ({ product }) => {
    const { dispatch } = useContext(CartContext);
    return (
        <div className="product-info" >
            <p>{product.name}</p>
            <p>{(product.price).toFixed(2)}</p>
            <div className="add-cart">
                <button onClick={() => {
                    dispatch({ type: ACTIONS.ADD, payload: { product } })
                }}>Ajouter au panier</button>
            </div>
        </div >)
}

export default Product;