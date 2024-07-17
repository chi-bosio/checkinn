import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import ProductCatalog from "./components/ProductCatalog/ProductCatalog";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import AdminLayout from "./components/AdminDashboard/AdminLayout";
import { Routes, Route, Navigate } from "react-router-dom";

// Simulación de función para verificar si el usuario es admin
// const isAdmin = () => { /* lógica de autenticación */ };

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        {/* Rutas protegidas para admins */}
        {/*
          Lógica para proteger rutas admin:
          - Verificar si el usuario es admin antes de ingresar (isAdmin())
          - Si no es admin, redireccionar a / o mostrar mensaje de acceso denegado
          - Manejar errores 403 o conflictos por nombres duplicados en los componentes
        */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminWelcome />} />
          <Route path="products" element={<AdminPanel />} />
          {/* Aquí puedes agregar más subrutas administrativas */}
        </Route>
        <Route path="/admin/products/new" element={<AddProductForm />} />
      </Routes>
      <Footer />
    </>
  );
}

function AdminWelcome() {
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'70vh', gap:'2.5rem'}}>
      {/* SVG ilustración dashboard */}
      <div style={{marginBottom:0}}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="10" y="30" width="100" height="60" rx="14" fill="#ff9800" fillOpacity="0.12"/>
          <rect x="20" y="40" width="80" height="40" rx="8" fill="#234567"/>
          <rect x="30" y="55" width="18" height="15" rx="3" fill="#ff9800"/>
          <rect x="54" y="50" width="14" height="20" rx="3" fill="#00b894"/>
          <rect x="74" y="60" width="16" height="10" rx="3" fill="#ffd180"/>
          <circle cx="60" cy="40" r="6" fill="#fff" fillOpacity="0.7"/>
        </svg>
      </div>
      <div style={{fontSize:'1.5rem', color:'#234567', fontWeight:800, textAlign:'center', marginBottom:'0.5rem'}}>
        ¡Bienvenido al Panel de Administración!
      </div>
      <div style={{fontSize:'1.1rem', color:'#5a5a5a', textAlign:'center', maxWidth:400, marginBottom:'1.5rem'}}>
        Selecciona una función del menú para comenzar a gestionar tu negocio.
      </div>
      {/* Widgets ficticios */}
      <div style={{display:'flex', gap:'2.5rem', marginTop:'1.5rem'}}>
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(44,62,80,0.07)', padding:'1.2rem 2.2rem', minWidth:120, textAlign:'center'}}>
          <div style={{fontSize:32, fontWeight:700, color:'#ff9800'}}>30</div>
          <div style={{fontSize:15, color:'#234567', fontWeight:600}}>Productos</div>
        </div>
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(44,62,80,0.07)', padding:'1.2rem 2.2rem', minWidth:120, textAlign:'center'}}>
          <div style={{fontSize:18, fontWeight:700, color:'#00b894'}}>●</div>
          <div style={{fontSize:15, color:'#234567', fontWeight:600}}>Sistema OK</div>
        </div>
        <div style={{background:'#fff', borderRadius:14, boxShadow:'0 2px 12px rgba(44,62,80,0.07)', padding:'1.2rem 2.2rem', minWidth:120, textAlign:'center'}}>
          <div style={{fontSize:16, fontWeight:700, color:'#234567'}}>Última actualización</div>
          <div style={{fontSize:15, color:'#5a5a5a'}}>hace 2 días</div>
        </div>
      </div>
    </div>
  );
}

export default App;
