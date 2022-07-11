import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import {
  removeCards, // Effacement de toutes les recettes
  refreshCards, // Affichage des recettes trouvées par la recherche des recettes communes à la recherche principale et à la recherche avancée
} from "../utils/functions.js";

import { mainSearch } from "./mainSearch.js";

import {
  initArraysLists, // Initialisations des listes de recherche avancée
  updateLists, // Mise à jour des listse de tags en fonction la sélection commune à la recherche principale et avancée
  threeTypeTagsListener, // Ecoute du clic sur un tag en fonction du type et affichage
} from "./tags.js";

// AFFICHAGE DES RECETTES SELECTIONEES
export function displayRecipesSelected() {
  threeTypeTagsListener(); // Ecouter clic sur les items des 3 listes et affichage des tags concernés

  // Gestion de la saisie dans la barre de recherche principale
  const inputSearch = document.querySelector(".mainSearchInput");
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS recherche l'expression saisie dans les recettes
      mainSearch(e.target.value.toLowerCase());
      refreshCards();
    } else {
      // SINON SI il y a moins de 3 caractères et aucun tag sélectionné
      if (document.querySelectorAll(".tag").length == 0) {
        removeCards(); // effacer les recettes en cours d'affichage
        arrayIdMainSearch = []; // réinitialiser le tableau des id filtrés (recherche principale)
        arrayIdAdvancedSearch = []; // réinitialiser le tableau des id filtrés (recherche avancée)
        initArraysLists(); // réinitialiser les listes de recherche avancée
        threeTypeTagsListener(); // écouter le clic sur un tag en fonction du type et affichage
        document.querySelector(".messageNoRecipe").innerHTML = `<h2></h2>`; // enlever le message d'avertissement
        // puis réafficher toutes les recettes
        recipesData.forEach((recipe) => {
          recipeCardsFactorie(recipe);
        });
      } else {
        // SINON SI il y a moins de 3 caractères et au moins  un tag sélectionné
        arrayIdMainSearch = []; // initialiser le tableau des des id filtrés (recherche principale)
        // Les recettes à afficher sont celles de la recherche avancée
        arrayIdSelectedFusion = arrayIdAdvancedSearch;
        updateLists(); // mise à jour des listes de la recherche avancée
        // refreshCards(); // mise à jour de l'affichage des recettes
      }
    }
  });
}