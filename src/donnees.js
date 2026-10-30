// MEMBRE 4 — Données : lire et écrire les fichiers JSON de façon asynchrone.
// Fiche : fiches/4-donnees.md · Vérifier : npm run test:donnees
// À faire EN PREMIER : sans lireJson et chargerDonnees, l'application ne peut rien afficher.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Lit un fichier JSON et renvoie son contenu converti en valeur JavaScript.
// En cas de problème, lance une erreur claire qui garde l'erreur d'origine comme cause.
export async function lireJson(chemin) {
  //throw new Error("TODO Membre 4 : coder lireJson dans src/donnees.js");
    try{
      const contenu = await readFile(chemin, "utf-8");
      return JSON.parse(contenu);
    }catch (erreur){
      throw new Error(`Impossoble de lire le fichier JISON: ${chemin}`,{cause: erreur});
    }
  
}


// Lit les quatre fichiers EN MÊME TEMPS avec Promise.all.
// Renvoie { parcelles, cultures, releves, recoltes }.
export async function chargerDonnees(dossier) {
  //throw new Error("TODO Membre 4 : coder chargerDonnees dans src/donnees.js");
  const [parcelles, cultures, releves, recoltes] = await Promise.all([
        lireJson(join(dossier, "parcelles.json")),
        lireJson(join(dossier, "cultures.json")),
        lireJson(join(dossier, "releves.json")),
        lireJson(join(dossier, "recoltes.json"))
    ]);

    return {
        parcelles,
        cultures,
        releves,
        recoltes
    };
}

// Vérifie les textes tapés dans le terminal et renvoie un nouveau relevé.
// Exemple : creerReleve('p07', '64', '29', '2026-10-29')
//   → { parcelle: 'P07', date: '2026-10-29', humidite: 64, temperature: 29 }
export function creerReleve(parcelle, humiditeTexte, temperatureTexte, date) {
  //throw new Error("TODO Membre 4 : coder creerReleve dans src/donnees.js");
   const humidite = Number(humiditeTexte);
    const temperature = Number(temperatureTexte);

    if (!parcelle || !parcelle.trim()) {
        throw new Error("La parcelle est obligatoire.");
    }

    if (!Number.isFinite(humidite) || humidite < 0 || humidite > 100) {
        throw new Error("L'humidité doit être un nombre entre 0 et 100.");
    }

    if (!Number.isFinite(temperature)) {
        throw new Error("La température doit être un nombre valide.");
    }

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        throw new Error("La date doit respecter le format AAAA-MM-JJ.");
    }

    return {
        parcelle: parcelle.trim().toUpperCase(),
        date: date,
        humidite: humidite,
        temperature: temperature
    };
  
}

// Ajoute le relevé à la fin du fichier JSON, enregistre le fichier,
// puis renvoie le nouveau nombre de relevés.
export async function ajouterReleve(chemin, releve) {
  //throw new Error("TODO Membre 4 : coder ajouterReleve dans src/donnees.js");
}
