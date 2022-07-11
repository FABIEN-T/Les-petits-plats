import { recipeCardsFactorie } from "./utils/recipeCardsFactorie.js";
import {
  conversionJsonToArrayMainSearch,
  conversionJsonToArrayAdvancedSearch,
} from "./search/initArraySearch.js";
import { initArraysLists } from "./search/tags.js";
import { displayRecipesSelected } from "./search/displayRecipesSelected.js";
import { dropdown } from "./utils/dropdown.js";

// LANCEMENT DU PROGRAMME D'INITIALISATION
init();

// DECLARATION DU PROGRAMME D'INITIALISATION
async function init() {
  await fetch("./data/recipes.json")
    .then((response) => response.json())
    .then((response) => {
      recipesData = response.recipes; // récupération du json dans un tableau
      recipesData.forEach((recipe) => {
        recipeCardsFactorie(recipe); // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
      });
      // Conversion du json en tableau en gardant pour chaque recette :
      // id - name - ingredient - description
      // Utilisé pour la recherche principale
      conversionJsonToArrayMainSearch(recipesData);
      // Conversion du json en tableau en gardant pour chaque recette :
      // ingredient - appareils - ustensiles
      // Utilisé pour la recherche avancée
      conversionJsonToArrayAdvancedSearch(recipesData);
      // Initialisation des listes de la recherche avancée
      initArraysLists();
      // Affichage des recettes en fonction d'une expression saisie dans la barre principale de recherche
      // Et/Ou en fonction des tags sélectionnés
      displayRecipesSelected();
      // Gestion graphique des champs de la recherche avancée et des listes
      dropdown();
    })
    .catch((err) => console.error(err));
}
