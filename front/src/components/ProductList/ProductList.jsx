import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

export default function ProductList({ products, loading, error }) {
  if (loading) return <div className="product-list-loader">Cargando productos...</div>;
  if (error) return <div className="product-list-error">{error}</div>;
  if (!products || products.length === 0) return <div className="product-list-empty">No hay productos para mostrar.</div>;

  return (
    <div className="product-list-grid">
      {products.map((product) => (
        <Link
          to={`/products/${product.id}`}
          className="product-card-link"
          key={product.id}
        >
          <div className="product-card">
            {product.imageUrls && product.imageUrls.length > 0 && (
              <img
                src={product.imageUrls[0].startsWith('http') ? product.imageUrls[0] : `http://localhost:8080/api${product.imageUrls[0]}`}
                alt={product.name}
                className="product-image"
              />
            )}
            <h3 className="product-title">{product.name}</h3>
            <div className="product-description-hover">
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 