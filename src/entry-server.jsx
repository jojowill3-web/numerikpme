import { renderToStaticMarkup } from "react-dom/server";
import App from "./App.jsx";

// Rann paj la (onglet « accueil » par défaut) an HTML statik au moment du build.
// Ce balisage est injecté dans dist/index.html pour que les moteurs de recherche,
// les réseaux sociaux et les robots voient le contenu réel. Côté client,
// createRoot reprend ensuite le relais (voir main.jsx).
export function render() {
  return renderToStaticMarkup(<App />);
}
