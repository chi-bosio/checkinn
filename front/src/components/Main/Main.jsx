import "./Main.css";
import { useEffect, useState } from "react";
import { getRandomProducts } from "../../api/productApi";
import ProductList from "../ProductList/ProductList";

function Main() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getRandomProducts().then(setProducts).catch(() => setProducts([]));
  }, []);
  return (
    <main className="main-content">
      <section className="search-section">Buscador</section>
      <section className="categories-section">Categorías</section>
      <section className="recommendations-section">
        <h2>Recomendaciones</h2>
        <ProductList products={products} />
      </section>
    </main>
  );
}

export default Main;
