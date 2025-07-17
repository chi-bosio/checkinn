import { useEffect, useState } from "react";
import { getAdminProducts, deleteAdminProduct } from "../../api/productApi";

function Toast({ message, onClose }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 1800);
    const timer2 = setTimeout(onClose, 2200);
    return () => { clearTimeout(timer); clearTimeout(timer2); };
  }, [onClose]);
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 99999,
        pointerEvents: visible ? 'auto' : 'none',
        background: 'transparent',
      }}
    >
      <div
        style={{
          minWidth: 320,
          maxWidth: 380,
          background: '#fff',
          border: '2.5px solid #43be6a',
          borderRadius: 16,
          boxShadow: '0 6px 32px rgba(44,62,80,0.18)',
          padding: '2.1rem 2.2rem 1.7rem 2.2rem',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: 18,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.35s cubic-bezier(.4,1.3,.6,1), transform 0.35s cubic-bezier(.4,1.3,.6,1)',
        }}
      >
        <span style={{fontSize: 44, color: '#43be6a', marginBottom: 6, lineHeight: 1}}>✅</span>
        <div style={{fontWeight: 700, color: '#234567', fontSize: 18, textAlign: 'center', letterSpacing: 0.1}}>
          ¡Listo! El producto fue eliminado.
        </div>
      </div>
    </div>
  );
}

export default function AdminProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminProducts();
      setProducts(data || []);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await deleteAdminProduct(deleteId);
      setProducts(products.filter(p => p.id !== deleteId));
      setModalOpen(false);
      setDeleteId(null);
      setDeleteName("");
      setToast("Producto eliminado con éxito");
    } catch (err) {
      alert("Error al eliminar producto");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div style={{maxWidth:900, margin:'0 auto', width:'100%', paddingBottom:56, paddingTop:90}}>
      <h2 style={{fontFamily:'Montserrat, Inter, Arial, sans-serif', fontWeight:800, fontSize:24, color:'#234567', marginBottom:24}}>Lista de productos</h2>
      {loading && <div style={{padding:'2rem', textAlign:'center'}}>Cargando productos...</div>}
      {error && <div style={{padding:'2rem', textAlign:'center', color:'#b71c1c'}}>{error}</div>}
      {!loading && !error && (
        <table style={{width:'100%', borderCollapse:'separate', borderSpacing:0, background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(44,62,80,0.07)', overflow:'hidden'}}>
          <thead>
            <tr style={{background:'#f4f6fb', color:'#234567', fontWeight:700, fontSize:16}}>
              <th style={{padding:'1rem 1.2rem', textAlign:'left', borderBottom:'1px solid #eee'}}>ID</th>
              <th style={{padding:'1rem 1.2rem', textAlign:'left', borderBottom:'1px solid #eee'}}>Nombre</th>
              <th style={{padding:'1rem 1.2rem', textAlign:'center', borderBottom:'1px solid #eee'}}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}
                style={{transition:'background 0.2s, box-shadow 0.2s', background: hoveredRow===product.id ? '#f9fafc' : 'none', boxShadow: hoveredRow===product.id ? '0 2px 8px rgba(44,62,80,0.04)' : 'none'}}
                onMouseOver={()=>setHoveredRow(product.id)}
                onMouseOut={()=>setHoveredRow(null)}
              >
                <td style={{padding:'0.9rem 1.2rem', fontSize:15, color:'#5a5a5a', borderBottom:'1px solid #f0f0f0'}}>{product.id}</td>
                <td style={{padding:'0.9rem 1.2rem', fontSize:16, color:'#234567', fontWeight:600, borderBottom:'1px solid #f0f0f0'}}>{product.name}</td>
                <td style={{padding:'0.9rem 1.2rem', textAlign:'center', borderBottom:'1px solid #f0f0f0'}}>
                  <button
                    title="Eliminar producto"
                    style={{
                      background: hoveredBtn===product.id ? 'rgba(229,57,53,0.08)' : 'none',
                      border: hoveredBtn===product.id ? '1.5px solid #bbb' : 'none',
                      cursor:'pointer',
                      padding:'0.2rem 0.7rem',
                      display:'inline-flex',
                      alignItems:'center',
                      color:'#e53935',
                      fontWeight:700,
                      fontSize:15,
                      borderRadius:6,
                      transition:'background 0.2s, color 0.2s, border 0.2s',
                      outline: 'none',
                      boxShadow: 'none',
                    }}
                    onClick={()=>{setDeleteId(product.id);setDeleteName(product.name);setModalOpen(true);}}
                    onMouseOver={()=>setHoveredBtn(product.id)}
                    onMouseOut={()=>setHoveredBtn(null)}
                    onFocus={e=>e.target.style.background='none'}
                    onBlur={e=>e.target.style.background='none'}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{marginRight: hoveredBtn===product.id ? 6 : 0, transition:'margin 0.2s'}}>
                      <rect x="5" y="8" width="10" height="7" rx="2" fill="#e53935"/>
                      <rect x="8" y="10" width="1.5" height="3" rx="0.75" fill="#fff"/>
                      <rect x="10.5" y="10" width="1.5" height="3" rx="0.75" fill="#fff"/>
                      <rect x="7" y="5" width="6" height="2" rx="1" fill="#e53935"/>
                      <rect x="8.5" y="3" width="3" height="2" rx="1" fill="#ffd180"/>
                    </svg>
                    {hoveredBtn===product.id && <span>Eliminar</span>}
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={3} style={{padding:'2rem', textAlign:'center', color:'#aaa'}}>No hay productos para mostrar.</td></tr>
            )}
          </tbody>
        </table>
      )}
      {/* Modal de confirmación */}
      {modalOpen && (
        <div style={{position:'fixed', inset:0, background:'rgba(30,34,56,0.32)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div style={{background:'#fff', borderRadius:16, boxShadow:'0 4px 32px rgba(44,62,80,0.18)', padding:'2.2rem 2rem', minWidth:340, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem'}}>
            <div style={{fontSize:'1.2rem', color:'#b71c1c', fontWeight:700, marginBottom:'0.5rem'}}>
              ¿Estás seguro de que querés eliminar <span style={{color:'#e53935'}}>&quot;{deleteName}&quot;</span>?
            </div>
            <div style={{display:'flex', gap:'1.5rem', marginTop:'1rem'}}>
              <button style={{background:'#eee', color:'#234567', border:'none', borderRadius:8, fontWeight:600, fontSize:'1.05rem', padding:'0.7rem 1.7rem', cursor:'pointer'}} onClick={()=>{setModalOpen(false);setDeleteId(null);setDeleteName("");}} disabled={deleting}>Cancelar</button>
              <button style={{background:'#e53935', color:'#fff', border:'none', borderRadius:8, fontWeight:700, fontSize:'1.05rem', padding:'0.7rem 1.7rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(44,62,80,0.10)'}} onClick={handleDelete} disabled={deleting}>{deleting ? 'Eliminando...' : 'Eliminar'}</button>
            </div>
          </div>
        </div>
      )}
      {toast && <Toast message={toast} onClose={()=>setToast(null)} />}
    </div>
  );
} 