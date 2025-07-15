import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <img src={logo} alt="CheckInn logo" className="footer-logo" />
        <span className="footer-text">
          &copy; {new Date().getFullYear()} CheckInn. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
} 