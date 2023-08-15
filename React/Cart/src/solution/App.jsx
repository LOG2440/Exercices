import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import ProductPage from "./ProductPage";
import Cart from "./Cart";
import CartProvider from "./CartProvider";

export default function App() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Header></Header>
                <Routes>
                    <Route exact path="/" element={<ProductPage />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}