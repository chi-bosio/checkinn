import "./Main.css";
import { useEffect, useState } from "react";
import { getProductsPaginated } from "../../api/productApi";
import ProductList from "../ProductList/ProductList";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination-controls">
      <button onClick={() => onPageChange(0)} disabled={page === 0} title="Primera página">&laquo;</button>
      <button onClick={() => onPageChange(page - 1)} disabled={page === 0} title="Anterior">&#60;</button>
      <span>Página {page + 1} de {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={page + 1 >= totalPages} title="Siguiente">&#62;</button>
      <button onClick={() => onPageChange(totalPages - 1)} disabled={page + 1 >= totalPages} title="Última página">&raquo;</button>
    </div>
  );
}

function Main() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [seed, setSeed] = useState(null);

  const fetchProducts = async (pageNum = 0, currentSeed = null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProductsPaginated(pageNum, 10, currentSeed);
      setProducts(data.content || []);
      setTotalPages(data.totalPages || 1);
      if (data.seed && !seed) setSeed(data.seed);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, seed);
  }, [page, seed]);

  useEffect(() => {
    setSeed(null);
  }, []);

  return (
    <main className="main-content">
      <section className="search-section">Buscador</section>
      <section className="categories-section">Categorías</section>
      <section className="recommendations-section">
        <h2>Recomendaciones</h2>
        <ProductList products={products} loading={loading} error={error} />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </section>
    </main>
  );
}

export default Main;
