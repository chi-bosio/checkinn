import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";
import { getAllProducts } from "../../api/productApi";
import ProductList from "../ProductList/ProductList";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAllProducts()
      .then((data) => setProducts(data.content || []))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-panel">
      <button onClick={() => navigate("/admin/products/new")} className="btn-add">
        Agregar producto
      </button>
      <div style={{ width: "100%", marginTop: "1rem" }}>
        <ProductList products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}
