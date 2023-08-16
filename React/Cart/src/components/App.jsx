import Header from "./Header";
import ProductPage from "./ProductPage";
import Cart from "./Cart";

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