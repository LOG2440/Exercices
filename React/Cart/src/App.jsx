import Header from "./components/Header";
import ProductPage from "./components/ProductPage";
import Cart from "./components/Cart";

export default function App() {
  return (
    <>
      <h1>TODO : séparer en 2 routes la page de produits (/) et le panier (/cart) dans Header</h1>
      <Header></Header>
      <ProductPage />
      <Cart />
    </>
  );
}