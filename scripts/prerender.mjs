// Pré-rendu statique de la page d'accueil.
// Exécuté APRÈS `vite build` et `vite build --ssr`. Injecte le HTML rendu côté
// serveur dans dist/index.html (#root), pour le SEO et le partage social.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const { render } = await import(resolve(root, "dist-ssr/entry-server.js"));
const appHtml = render();

const indexPath = resolve(root, "dist/index.html");
let html = readFileSync(indexPath, "utf-8");

// Remplace le contenu de repli (<noscript>) par le balisage pré-rendu complet.
// Fonction de remplacement (et non chaîne) pour que les « $ » présents dans le
// balisage (ex. « 500M$ », « $125K ») restent littéraux.
const replaced = html.replace(
  /<div id="root">[\s\S]*?<\/div>(\s*<\/body>)/,
  (_match, tail) => `<div id="root">${appHtml}</div>${tail}`
);

if (replaced === html) {
  console.error("✗ Pré-rendu : balise #root introuvable dans dist/index.html");
  process.exit(1);
}

writeFileSync(indexPath, replaced);
console.log("✓ Page d'accueil pré-rendue dans dist/index.html (" + appHtml.length + " caractères)");
