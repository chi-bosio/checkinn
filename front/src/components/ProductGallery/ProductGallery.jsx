import React, { useState } from "react";
import "./ProductGallery.css";

function GalleryModal({ images, open, onClose, initialIndex = 0 }) {
  const [current, setCurrent] = useState(initialIndex);
  if (!open) return null;
  const goPrev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const goNext = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <div className="gallery-modal" onClick={e => e.stopPropagation()}>
        <button className="gallery-modal-close" onClick={onClose}>&times;</button>
        <div className="gallery-modal-image-row">
          <button className="gallery-modal-arrow left" onClick={goPrev}>&#8249;</button>
          <img
            src={images[current].startsWith('http') ? images[current] : `http://localhost:8080/api${images[current]}`}
            alt={`Imagen ${current + 1}`}
            className="gallery-modal-image"
          />
          <button className="gallery-modal-arrow right" onClick={goNext}>&#8250;</button>
        </div>
        <div className="gallery-modal-thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.startsWith('http') ? img : `http://localhost:8080/api${img}`}
              alt={`Miniatura ${idx + 1}`}
              className={`gallery-modal-thumb${current === idx ? " selected" : ""}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductGallery({ images = [], description = "", onViewMore }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  // La primera imagen es la principal, las siguientes 4 son secundarias
  const mainImage = images[0];
  const secondaryImages = images.slice(1, 5);

  return (
    <>
      <div className="product-gallery-container">
        <div className="gallery-left">
          {mainImage && (
            <img
              src={mainImage.startsWith('http') ? mainImage : `http://localhost:8080/api${mainImage}`}
              alt="Imagen principal"
              className="gallery-main-image"
              onClick={() => { setModalImageIndex(0); setModalOpen(true); }}
              style={{ cursor: 'pointer' }}
            />
          )}
          {description && (
            <div className="gallery-main-description">{description}</div>
          )}
        </div>
        <div className="gallery-right">
          <div className="gallery-grid">
            {secondaryImages.map((img, idx) => (
              <img
                key={idx}
                src={img.startsWith('http') ? img : `http://localhost:8080/api${img}`}
                alt={`Imagen secundaria ${idx + 1}`}
                className="gallery-secondary-image"
                onClick={() => { setModalImageIndex(idx + 1); setModalOpen(true); }}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <button className="gallery-view-more" onClick={() => { setModalImageIndex(0); setModalOpen(true); }}>
            Ver más
          </button>
        </div>
      </div>
      <GalleryModal images={images} open={modalOpen} onClose={() => setModalOpen(false)} initialIndex={modalImageIndex} />
    </>
  );
} 