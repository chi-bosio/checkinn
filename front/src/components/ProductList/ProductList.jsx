import React from "react";
import "./ProductList.css";

export default function ProductList({ products }) {
  return (
    <div className="product-list-grid">
      {products.slice(0, 10).map((product) => (
        <div className="product-card" key={product.id}>
          {product.images && product.images.length > 0 && (
            <img src={product.images[0]} alt={product.name} className="product-image" />
          )}
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
        </div>
      ))}
    </div>
  );
} 