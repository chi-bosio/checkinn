import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <Link to="/" className="logo-link" onClick={handleLinkClick}>
          <img src={logo} alt="Logo" className="logo" />
          <span className="tagline">
            Calidad que se siente. Estilo que perdura
          </span>
        </Link>
      </div>
      <button
        className={`hamburger${menuOpen ? " open" : ""}`}
        aria-label="Abrir menú"
        onClick={handleMenuToggle}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <nav className={`header-right${menuOpen ? " show" : ""}`}>
        <button className="header-button" onClick={handleLinkClick}>Crear cuenta</button>
        <button className="header-button" onClick={handleLinkClick}>Iniciar sesión</button>
      </nav>
    </header>
  );
}

export default Header;
