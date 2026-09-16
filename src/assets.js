// Préfixe les fichiers de `public/` avec la base Vite (`/passerelle/` sur GitHub Pages).
export function asset(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
