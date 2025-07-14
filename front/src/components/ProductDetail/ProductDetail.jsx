import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import ProductGallery from "../ProductGallery/ProductGallery";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductById(id).then((data) => {
      setProduct(data);
    }).catch(() => setProduct(null));
  }, [id]);

  if (!product) return <div className="product-detail-loading">Cargando...</div>;

  const images = product.imageUrls || [];

  const handleViewMore = () => {
    // Aquí se podría abrir un modal o slider con todas las imágenes
    // Por ahora solo loguea
    console.log("Ver más imágenes", images);
  };

  return (
    <div className="product-detail-container">
      <header className="product-detail-header">
        <h2 className="product-detail-title">{product.name}</h2>
        <button className="product-detail-back" onClick={() => navigate(-1)} title="Volver atrás">
          &#8592;
        </button>
      </header>
      <div className="product-detail-body product-detail-body-column">
      <ProductGallery images={images} description={product.description} onViewMore={handleViewMore} />
      </div>
    </div>
  );
} 