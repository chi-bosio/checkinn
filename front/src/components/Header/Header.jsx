import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";

function Header() {
  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo" />
          <span className="tagline">
            Calidad que se siente. Estilo que perdura
          </span>
        </Link>
      </div>
      <div className="header-right">
        <button className="header-button">Crear cuenta</button>
        <button className="header-button">Iniciar sesión</button>
      </div>
    </header>
  );
}

export default Header;
