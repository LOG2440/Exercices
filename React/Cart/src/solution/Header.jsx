import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "./CartContext";

const Header = () => {
    const { state } = useContext(CartContext);
    return (
        <nav id='navbar'>
            <Link to="/">Produits</Link>
            <Link to="/cart">Panier({state.products.length})</Link>
        </nav>
    )
};

export default Header;