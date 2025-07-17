import { useEffect, useState } from "react";

const MENU = [
  { label: "Gestión de productos", path: "/admin/products" },
  // Puedes agregar más ítems aquí
];

export default function AdminDashboard() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [access, setAccess] = useState(null); // null: loading, true: ok, false: denied

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
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
      <div style={{ padding: "3rem 1rem", textAlign: "center", fontSize: "1.2rem", color: "#b71c1c" }}>
        Panel de administración no disponible en dispositivos móviles.
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
            <a key={item.path} href={item.path} style={{ color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 600, borderRadius: 8, padding: "0.5rem 1rem", transition: "background 0.2s" }}
              onMouseOver={e => e.currentTarget.style.background = "#22304a"}
              onMouseOut={e => e.currentTarget.style.background = "none"}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "3rem 2.5rem" }}>
        <div style={{ fontSize: 22, color: "#234567", fontWeight: 700, marginBottom: 24 }}>
          Selecciona una función del menú para comenzar.
        </div>
        {/* Aquí puedes renderizar el contenido de la función seleccionada en el futuro */}
      </main>
    </div>
  );
} 