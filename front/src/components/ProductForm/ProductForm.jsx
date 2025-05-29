import { useState } from "react";
import { createProduct } from "../api/productApi";

export default function ProductForm({ onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createProduct({ name, description }, images);
      onClose();
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear producto");
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="product-form">
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
        <button type="submit">Guardar Producto</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
