import { useEffect, useState } from "react";
import { getAllProducts } from "../../api/productApi";
import ProductList from "../ProductList/ProductList";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then(setProducts).catch(() => setProducts([]));
  }, []);
  return (
    <div style={{ paddingTop: 100 }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Catálogo de Productos</h2>
      <ProductList products={products} />
    </div>
  );
} 