import { useState } from "react";
import { createProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import "./AddProductForm.css";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!name.trim()) errors.name = "El nombre es obligatorio.";
    if (!description.trim()) errors.description = "La descripción es obligatoria.";
    if (!images.length) errors.images = "Debes subir al menos 5 imágenes.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
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
          onChange={(e) => { setName(e.target.value); setFieldErrors(f => ({...f, name: undefined})); }}
          onBlur={() => { if (!name.trim()) setFieldErrors(f => ({...f, name: "El nombre es obligatorio."})); }}
          className={fieldErrors.name ? "input-error" : ""}
        />
        {fieldErrors.name && (
          <div className="field-error-modern">
            <span className="field-error-icon" aria-hidden="true">⚠️</span>
            {fieldErrors.name}
          </div>
        )}
        <label>Descripción*</label>
        <textarea
          value={description}
          onChange={(e) => { setDescription(e.target.value); setFieldErrors(f => ({...f, description: undefined})); }}
          onBlur={() => { if (!description.trim()) setFieldErrors(f => ({...f, description: "La descripción es obligatoria."})); }}
          className={fieldErrors.description ? "input-error" : ""}
        />
        {fieldErrors.description && (
          <div className="field-error-modern">
            <span className="field-error-icon" aria-hidden="true">⚠️</span>
            {fieldErrors.description}
          </div>
        )}
        <label>Imágenes*</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => { setImages([...e.target.files]); setFieldErrors(f => ({...f, images: undefined})); }}
          onBlur={() => { if (!images.length) setFieldErrors(f => ({...f, images: "Debes subir al menos una imagen."})); }}
          className={fieldErrors.images ? "input-error" : ""}
        />
        {fieldErrors.images && (
          <div className="field-error-modern">
            <span className="field-error-icon" aria-hidden="true">⚠️</span>
            {fieldErrors.images}
          </div>
        )}
        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">¡Producto creado correctamente!</div>}
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