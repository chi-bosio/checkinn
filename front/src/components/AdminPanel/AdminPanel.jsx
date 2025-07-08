import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import { getAllProducts } from "../../api/productApi";
import ProductList from "../ProductList/ProductList";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <button onClick={() => navigate("/admin/products/new")} className="btn-add">
        Agregar producto
      </button>
      <div style={{ width: "100%", marginTop: "2rem" }}>
        <ProductList products={products} />
      </div>
    </div>
  );
}
