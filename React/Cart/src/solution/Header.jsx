import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav id='navbar'>
            <Link to="/">Produits</Link>
            <Link to="/cart">Panier</Link>
        </nav>
    )
};

export default Header;