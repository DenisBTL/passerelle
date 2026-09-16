import React from "react";
import { useEffect, useRef, useState } from "react";
import { solutions, stages } from "../data";
import Icon from "./Icon";

export default function Dialog({ onClose, children, label }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = oldOverflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="detail-dialog"
      aria-label={label}
      onKeyDownCapture={(event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose();
        }
      }}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = ref.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <button
        className="icon-button dialog-close"
        autoFocus
        onClick={onClose}
        aria-label="Fermer la fenêtre"
      >
        <Icon name="close" />
      </button>
      <div className="dialog-content">{children}</div>
    </dialog>
  );
}

export function SearchContent({ onIdea, onSolution }) {
  const [query, setQuery] = useState("");
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const entries = [
    ...stages.map((s) => ({ ...s, title: s.label, type: "Étape du parcours" })),
    ...solutions.map((s) => ({ ...s, type: "Connexion" })),
  ];
  const found = entries.filter((item) =>
    normalize(`${item.title} ${item.description}`).includes(
      normalize(query.trim()),
    ),
  );
  return (
    <>
      <p className="eyebrow">Explorer le collectif</p>
      <h2>Une connexion en tête ?</h2>
      <label className="search-field">
        <span className="sr-only">
          Rechercher dans le parcours et les solutions
        </span>
        <Icon name="search" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Un besoin, une étape, une solution…"
        />
      </label>
      <p className="result-count" aria-live="polite">
        {found.length} résultat{found.length !== 1 ? "s" : ""}
      </p>
      <div className="search-results">
        {found.map((item) => (
          <button
            key={item.id}
            onClick={() =>
              item.type === "Connexion" ? onSolution(item) : onIdea(item.id)
            }
          >
            <span>
              <small>{item.type}</small>
              <strong>{item.title}</strong>
            </span>
            <Icon name="arrow" size={18} />
          </button>
        ))}
        {found.length === 0 && (
          <p>
            Aucune connexion trouvée. Essayez « stocks », « clients » ou
            partagez votre idée.
          </p>
        )}
      </div>
      {found.length === 0 && (
        <button className="button primary" onClick={() => onIdea()}>
          Déposer une idée <Icon name="plus" size={17} />
        </button>
      )}
    </>
  );
}
