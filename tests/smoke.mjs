import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  executablePath:
    process.env.BROWSER_PATH ||
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const errors = [];
const page = await browser.newPage({
  viewport: { width: 1672, height: 1050 },
  deviceScaleFactor: 1,
});
page.on("pageerror", (error) => errors.push(error.message));
page.on("response", (response) => {
  if (response.status() >= 400)
    errors.push(`${response.status()} ${response.url()}`);
});
await mkdir("artifacts", { recursive: true });

try {
  await page.goto(baseURL);
  await page
    .getByRole("heading", {
      name: "Relier les solutions de la vigne à la vente",
    })
    .waitFor();
  await page.evaluate(() => document.fonts.ready);
  assert.equal(await page.locator(".stage-button").count(), 9);
  assert.equal(await page.locator(".network-solution").count(), 7);
  assert.equal(
    await page
      .locator("img")
      .evaluateAll((images) =>
        images.every((image) => image.complete && image.naturalWidth > 0),
      ),
    true,
  );
  await page.screenshot({ path: "artifacts/desktop.png", fullPage: true });
  await page.evaluate(() => {
    window.__navigationMarker = "same-document";
  });

  for (const stage of [
    "Parcelles",
    "Vendanges",
    "Cuverie",
    "Mises",
    "Stocks",
    "Ventes",
    "Clients",
    "Administratif",
    "Après-vente / Fidélisation",
  ]) {
    await page
      .getByRole("button", { name: `Déposer une idée : ${stage}`, exact: true })
      .click();
    assert.equal(
      await page.locator('select[name="stage"] option:checked').textContent(),
      stage,
    );
  }
  await page
    .getByRole("button", { name: "Déposer une idée : Stocks", exact: true })
    .click();
  await page
    .getByLabel("Nom de la solution / structure")
    .fill("Domaine de démonstration");
  await page
    .getByLabel("Problème rencontré")
    .fill("Les disponibilités sont ressaisies après chaque commande.");
  await page
    .getByLabel("Idée de passerelle")
    .fill("Relier les stocks aux commandes du caveau.");
  await page
    .getByLabel("Votre email", { exact: true })
    .fill("bonjour@example.test");

  const nav = page.getByRole("navigation", { name: "Navigation principale" });
  await nav.getByRole("button", { name: "Le projet", exact: true }).click();
  await page
    .getByRole("button", { name: "Nos engagements", exact: true })
    .click();
  assert.equal(
    await page
      .getByRole("heading", { name: "Garder un écosystème ouvert" })
      .count(),
    1,
  );
  await page
    .getByRole("button", { name: "Comment ça marche", exact: true })
    .click();
  assert.equal(await page.locator(".value-card").count(), 3);
  await nav.getByRole("button", { name: "Parcours", exact: true }).click();
  assert.equal(
    await page.getByLabel("Nom de la solution / structure").inputValue(),
    "Domaine de démonstration",
  );
  assert.equal(await page.getByLabel("Étape concernée").inputValue(), "stocks");
  await page.getByRole("button", { name: "Envoyer mon idée" }).click();
  await page
    .getByRole("heading", { name: "Une belle connexion en perspective !" })
    .waitFor();
  await page.getByRole("button", { name: "Proposer une autre idée" }).click();
  assert.equal(
    await page.getByLabel("Votre email", { exact: true }).inputValue(),
    "",
  );
  await page.getByRole("button", { name: "Envoyer mon idée" }).click();
  assert.equal(
    await page
      .locator(".idea-card form")
      .evaluate((form) => form.checkValidity()),
    false,
  );

  await nav.getByRole("button", { name: "Solutions", exact: true }).click();
  await page
    .getByRole("button", { name: "Administratif & export", exact: true })
    .click();
  assert.equal(await page.locator(".solutions-grid .solution-card").count(), 2);
  await page
    .getByRole("button", { name: "Découvrir Informations légales & export" })
    .click();
  await page.getByRole("dialog").waitFor();
  await page.keyboard.press("Escape");
  assert.equal(await page.getByRole("dialog").count(), 0);
  await page
    .getByRole("button", { name: "Découvrir Accises & fiscalité" })
    .click();
  await page
    .getByRole("button", { name: "Proposer une idée à cette étape" })
    .click();
  assert.equal(
    await page.getByLabel("Étape concernée").inputValue(),
    "administratif",
  );
  await page.getByRole("button", { name: "Replier le formulaire" }).click();
  await page
    .getByRole("button", { name: /Et si la prochaine passerelle/ })
    .click();
  await page.getByLabel("Étape concernée").waitFor();

  await page
    .getByRole("button", { name: /De la parcelle à l’export.*Lire le cas/ })
    .click();
  await page
    .getByRole("heading", { name: "La passerelle à imaginer" })
    .waitFor();
  await page.getByRole("button", { name: "J’ai un besoin similaire" }).click();
  assert.equal(
    await page.getByLabel("Étape concernée").inputValue(),
    "administratif",
  );

  await page.getByRole("button", { name: "Rechercher une solution" }).click();
  await page.getByRole("searchbox").fill("fidelisation");
  assert.equal(await page.locator(".search-results > button").count(), 1);
  await page.getByRole("searchbox").fill("zzzzzz");
  await page.getByText("Aucune connexion trouvée.", { exact: false }).waitFor();
  await page.keyboard.press("Escape");

  await nav.getByRole("button", { name: "Contact", exact: true }).click();
  await page.getByLabel("Votre nom", { exact: true }).fill("Camille Martin");
  await page.getByLabel("Votre structure").fill("Domaine de démonstration");
  await page
    .getByLabel("Votre email", { exact: true })
    .fill("camille@example.test");
  await page
    .getByLabel("Votre message", { exact: true })
    .fill("Nous souhaitons échanger sur les connexions métier.");
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await page
    .getByRole("heading", { name: "Merci pour votre intérêt !" })
    .waitFor();
  await page
    .getByRole("button", { name: "Rejoindre le projet", exact: true })
    .click();
  await page.getByLabel("Votre nom", { exact: true }).fill("Camille Martin");
  await page.getByLabel("Votre structure").fill("Domaine de démonstration");
  await page
    .getByLabel("Votre email", { exact: true })
    .fill("camille@example.test");
  await page
    .getByLabel("Vous représentez")
    .selectOption({ label: "Un domaine viticole" });
  await page
    .getByLabel("Comment aimeriez-vous contribuer ?")
    .fill("Participer à la définition des échanges de données.");
  await page.getByRole("button", { name: "Exprimer mon intérêt" }).click();
  await page
    .getByRole("heading", { name: "Merci pour votre intérêt !" })
    .waitFor();
  assert.equal(
    await page.evaluate(() => window.__navigationMarker),
    "same-document",
  );
  assert.equal(new URL(page.url()).pathname, "/");
  assert.equal(new URL(page.url()).hash, "");

  await nav.getByRole("button", { name: "Parcours", exact: true }).click();
  for (const width of [1440, 1280, 1100, 800, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      true,
      `Débordement à ${width}px`,
    );
    if ([1440, 390].includes(width))
      await page.screenshot({
        path: `artifacts/${width === 390 ? "mobile" : "desktop-1440"}.png`,
        fullPage: true,
      });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  // Sur mobile, sélectionner une étape filtre les projets sans ouvrir le formulaire.
  const explorer = page.getByRole("region", {
    name: "Explorer les projets par étape",
  });
  await explorer.waitFor();
  const draftStageBefore = await page
    .getByLabel("Étape concernée")
    .inputValue();
  const expectedProjects = [
    ["Parcelles", 1],
    ["Vendanges", 1],
    ["Cuverie", 1],
    ["Mises", 2],
    ["Stocks", 2],
    ["Ventes", 3],
    ["Clients", 2],
    ["Administratif", 2],
    ["Après-vente / Fidélisation", 2],
  ];
  for (const [label, count] of expectedProjects) {
    await explorer
      .getByRole("button", { name: `Voir les projets : ${label}`, exact: true })
      .click();
    assert.equal(
      await explorer.locator("#stage-projects-title").textContent(),
      label,
    );
    assert.equal(await explorer.locator(".stage-project-card").count(), count);
    assert.equal(
      await explorer
        .locator('.mobile-stage-button[aria-pressed="true"]')
        .count(),
      1,
    );
    assert.equal(
      await page.getByLabel("Étape concernée").inputValue(),
      draftStageBefore,
    );
  }
  assert.equal(
    await explorer
      .locator(".mobile-stage-scroll")
      .evaluate((el) => el.scrollWidth > el.clientWidth && el.scrollLeft > 0),
    true,
  );
  assert.equal(
    await explorer
      .getByRole("button", { name: "Étape suivante", exact: true })
      .isDisabled(),
    true,
  );
  await explorer
    .getByRole("button", { name: "Étape précédente", exact: true })
    .click();
  assert.equal(
    await explorer.locator("#stage-projects-title").textContent(),
    "Administratif",
  );
  await explorer
    .getByRole("button", { name: "Voir les projets : Cuverie", exact: true })
    .focus();
  await page.keyboard.press("Home");
  assert.equal(
    await explorer.locator("#stage-projects-title").textContent(),
    "Parcelles",
  );
  await page.keyboard.press("ArrowRight");
  assert.equal(
    await explorer.locator("#stage-projects-title").textContent(),
    "Vendanges",
  );
  await explorer
    .getByRole("button", { name: "Voir les projets : Cuverie", exact: true })
    .click();
  await explorer
    .getByRole("button", {
      name: "Découvrir le projet : Du lot à la bouteille",
      exact: true,
    })
    .click();
  await page.getByRole("dialog").waitFor();
  await page
    .getByRole("button", { name: "Proposer une idée à cette étape" })
    .click();
  assert.equal(
    await page.getByLabel("Étape concernée").inputValue(),
    "cuverie",
  );
  await explorer
    .getByRole("button", { name: "Voir les projets : Clients", exact: true })
    .click();
  await explorer
    .getByRole("button", { name: "Proposer une idée pour cette étape" })
    .click();
  assert.equal(
    await page.getByLabel("Étape concernée").inputValue(),
    "clients",
  );
  assert.equal(
    await page.evaluate(() => window.__navigationMarker),
    "same-document",
  );
  await explorer.screenshot({ path: "artifacts/mobile-projects.png" });
  await page.getByRole("button", { name: "Ouvrir le menu" }).click();
  await nav.getByRole("button", { name: "Solutions", exact: true }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Ouvrir le menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page
    .getByRole("button", { name: "Commerce & relation client" })
    .click();
  assert.equal(await page.locator(".solutions-grid .solution-card").count(), 3);
  await page
    .getByRole("button", { name: "Découvrir Box & échantillons" })
    .click();
  await page
    .getByRole("button", { name: "Proposer une idée à cette étape" })
    .click();
  assert.equal(
    await page.getByLabel("Étape concernée").inputValue(),
    "clients",
  );
  assert.deepEqual(
    errors,
    [],
    "Erreurs du navigateur ou ressources manquantes",
  );
  console.log(
    "OK : 9 étapes, navigation sans rechargement, conservation de saisie, 3 formulaires, filtres, recherche, modales, cas d’usage et 7 largeurs responsive.",
  );
} finally {
  await browser.close();
}
