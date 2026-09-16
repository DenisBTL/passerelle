import React from "react";
import { useState } from "react";
import { navigation, project } from "../data";
import Icon, { GrapeMark } from "./Icon";

export function Brand({ onClick, small = false }) {
  return (
    <button
      className={`brand ${small ? "brand-small" : ""}`}
      onClick={onClick}
      aria-label={`${project.name} — Accueil`}
    >
      <GrapeMark />
      <span>
        <span className="brand-name">{project.name}</span>
        <span className="brand-baseline">{project.baseline}</span>
      </span>
    </button>
  );
}

export default function Header({ active, onNavigate, onSearch }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand onClick={() => navigate("journey")} />
        <nav
          id="main-navigation"
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Navigation principale"
        >
          {navigation.map((item) => (
            <button
              key={item.id}
              className={
                active === item.id ? "nav-button active" : "nav-button"
              }
              aria-current={active === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <button
            className="icon-button search-button"
            onClick={onSearch}
            aria-label="Rechercher une solution"
          >
            <Icon name="search" />
          </button>
          <button
            className="button primary join-button"
            onClick={() => navigate("join")}
          >
            Rejoindre le projet <Icon name="arrow" size={18} />
          </button>
          <button
            className="icon-button mobile-menu"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <Brand small onClick={() => onNavigate("journey")} />
      <nav aria-label="Navigation de pied de page">
        {navigation
          .filter((n) => n.id !== "idea")
          .map((n) => (
            <button key={n.id} onClick={() => onNavigate(n.id)}>
              {n.label}
            </button>
          ))}
      </nav>
      <p>
        Une initiative collective
        <br />
        pour une viticulture plus connectée.
      </p>
      <span className="footer-signature">
        Des passerelles.
        <br />
        <em>Et du lien pour demain.</em>
      </span>
    </footer>
  );
}
