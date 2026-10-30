// ÉQUIPE — Rapport : assembler le travail des quatre membres.
// Fiche : fiches/5-equipe-rapport.md · Vérifier : npm run test:rapport
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { surfaceTotale } from "./parcelles.js";
import { alertesIrrigation } from "./irrigation.js";
import { bilanRecoltes, classerParRevenu } from "./recoltes.js";

// Renvoie les id des alertes qui ont cet état, séparés par ', ', ou 'aucune'.
export function listerParEtat(alertes, etat) {
  //throw new Error("TODO Équipe : coder listerParEtat dans src/rapport.js");
  const resultats = alertes
        .filter(alerte => alerte.etat === etat)
        .map(alerte => alerte.id);

    if (resultats.length === 0) {
        return "aucune";
    }

    return resultats.join(", ");
}

// Renvoie le texte complet du rapport (voir fiches/5-equipe-rapport.md).
export function construireRapport(donnees, date) {
  //throw new Error("TODO Équipe : coder construireRapport dans src/rapport.js");
  const { parcelles, cultures, releves, recoltes } = donnees;

    // Surface totale
    const surface = surfaceTotale(parcelles);

    // Alertes d'irrigation
    const alertes = alertesIrrigation(parcelles, releves, cultures);

    const aArroser = listerParEtat(alertes, "ARROSER");
    const aDrainer = listerParEtat(alertes, "DRAINER");
    const sansReleve = listerParEtat(alertes, "INCONNU");

    // Bilan des récoltes
    const bilan = bilanRecoltes(parcelles, recoltes, cultures);

    // Production totale
    const productionTotale = bilan.reduce(
        (total, parcelle) => total + parcelle.kg,
        0
    );

    // Revenu total
    const revenuTotal = bilan.reduce(
        (total, parcelle) => total + parcelle.revenu,
        0
    );

    // Meilleure parcelle
    const classement = classerParRevenu(bilan);
    const meilleureParcelle = classement[0];

    const lignes = [
        `=== RAPPORT AGRISUIVI DU ${date} ===`,
        `Parcelles suivies : ${parcelles.length}`,
        `Surface totale : ${surface} ha`,
        "",
        "--- Irrigation ---",
        `À arroser : ${aArroser}`,
        `À drainer : ${aDrainer}`,
        `Sans relevé : ${sansReleve}`,
        "",
        "--- Récoltes ---",
        `Production totale : ${productionTotale} kg`,
        `Revenu estimé : ${revenuTotal} FCFA`,
        `Meilleure parcelle : ${meilleureParcelle.id} (${meilleureParcelle.producteur}) avec ${meilleureParcelle.revenu} FCFA`
    ];

    return lignes.join("\n") + "\n";
}

// Écrit le texte dans le fichier demandé. Crée le dossier s'il n'existe pas.
export async function enregistrerRapport(chemin, texte) {
  //throw new Error("TODO Équipe : coder enregistrerRapport dans src/rapport.js");
  const dossier = dirname(chemin);

    await mkdir(dossier, { recursive: true });

    await writeFile(chemin, texte, "utf8");

}