import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const MENU = [
  { label: "Gestión de productos", path: "/admin/products" },
  // Puedes agregar más ítems aquí
];

export default function AdminLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [access, setAccess] = useState(null); // null: loading, true: ok, false: denied
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      fetch("/api/admin/validate", { credentials: "include" })
        .then((res) => setAccess(res.ok))
        .catch(() => setAccess(false));
    }
  }, [isMobile]);

  if (isMobile) {
    return (
      <div style={{position:'fixed', inset:0, background:'rgba(30,34,56,0.92)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div style={{background:'#fff', borderRadius:18, boxShadow:'0 4px 32px rgba(44,62,80,0.18)', padding:'2.5rem 2rem', maxWidth:340, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center', gap:'1.5rem'}}>
          <div style={{fontSize:'1.25rem', color:'#1a2238', fontWeight:700, marginBottom:'0.5rem'}}>Panel de administración no disponible en dispositivos móviles.</div>
          <button style={{background:'#ff9800', color:'#fff', border:'none', borderRadius:8, fontWeight:600, fontSize:'1.1rem', padding:'0.7rem 2.2rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(44,62,80,0.10)'}} onClick={()=>navigate('/')}>Aceptar</button>
        </div>
      </div>
    );
  }

  if (access === null) {
    return <div style={{ padding: "3rem", textAlign: "center" }}>Verificando acceso...</div>;
  }
  if (!access) {
    return <div style={{ padding: "3rem", textAlign: "center", color: "#b71c1c" }}>Acceso denegado.</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}>
      <aside style={{ width: 260, background: "#1a2238", color: "#fff", padding: "2.5rem 1.5rem", boxShadow: "2px 0 12px rgba(44,62,80,0.07)", display: "flex", flexDirection: "column", gap: "2rem" }}>
        <h2 style={{ fontFamily: 'Montserrat, Inter, Arial, sans-serif', fontWeight: 800, fontSize: 24, margin: 0, marginBottom: 32 }}>Administración</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {MENU.map((item) => (
            <a key={item.path} href={item.path} style={{ color: location.pathname === item.path ? '#ff9800' : "#fff", textDecoration: "none", fontSize: 18, fontWeight: 600, borderRadius: 8, padding: "0.5rem 1rem", transition: "background 0.2s, color 0.2s", background: location.pathname === item.path ? 'rgba(255,152,0,0.08)' : 'none' }}
              onMouseOver={e => e.currentTarget.style.background = "#22304a"}
              onMouseOut={e => e.currentTarget.style.background = location.pathname === item.path ? 'rgba(255,152,0,0.08)' : 'none'}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "3rem 2.5rem" }}>
        <Outlet />
      </main>
    </div>
  );
} 