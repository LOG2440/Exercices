import React, { useReducer } from "react";
import CartContext from "./CartContext";
import reducer from "./reducer";

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { products: [] });
    return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartProvider;