import { useState } from "react";
import ProductForm from "../ProductForm/ProductForm";

export default function AdminPanel() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <button onClick={() => setShowForm(true)} className="btn-add">
        Agregar producto
      </button>

      {showForm && <ProductForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
