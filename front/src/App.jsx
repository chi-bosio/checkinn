import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import AddProductForm from "./components/AddProductForm/AddProductForm";
import ProductCatalog from "./components/ProductCatalog/ProductCatalog";
import { Routes, Route, Navigate } from "react-router-dom";

// Simulación de función para verificar si el usuario es admin
// const isAdmin = () => { /* lógica de autenticación */ };

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Página pública: Home */}
        <Route path="/" element={<Main />} />
        {/* Página pública: Catálogo */}
        <Route path="/products" element={<ProductCatalog />} />
        {/* Rutas protegidas para admins */}
        {/*
          Lógica para proteger rutas admin:
          - Verificar si el usuario es admin antes de ingresar (isAdmin())
          - Si no es admin, redireccionar a / o mostrar mensaje de acceso denegado
          - Manejar errores 403 o conflictos por nombres duplicados en los componentes
        */}
        <Route path="/admin/products" element={
          // isAdmin() ? <AdminPanel /> : <Navigate to="/" replace />
          <AdminPanel />
        } />
        <Route path="/admin/products/new" element={
          // isAdmin() ? <AddProductForm /> : <Navigate to="/" replace />
          <AddProductForm />
        } />
      </Routes>
    </>
  );
}

export default App;
