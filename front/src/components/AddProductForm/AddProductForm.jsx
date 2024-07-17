import { useState } from "react";
import { createProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import "./AddProductForm.css";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await createProduct({ name, description }, images);
      setSuccess(true);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-form-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <h3>Agregar Nuevo Producto</h3>
        <label>Nombre*</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Descripción*</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Imágenes*</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          required
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">¡Producto creado correctamente!</p>}
        <div className="form-buttons">
          <button type="submit" disabled={loading || success}>
            {loading ? "Guardando..." : "Guardar Producto"}
          </button>
          <button type="button" onClick={() => navigate("/admin/products")}
            disabled={loading || success}>Cancelar</button>
        </div>
      </form>
    </div>
  );
} 