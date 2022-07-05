// import { variables } from './variables.js'
import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
// import { conversionJsonToArraySimpleSearch } from './searchBar.js'

import { conversionJsonToArraySimpleSearch, conversionJsonToArrayAdvancedSearch } from "./functions.js";
// import { conversionJsonToArrayAdvancedSearch } from "./functions.js";
import { initArraysLists } from "./tags.js";
import { displayRecipesSelected } from "./searchBar.js";
import { dropdown} from "./dropdownCopy.js"

// LANCEMENT DU PROGRAMME D'INITIALISATION
// variables();
init();

// DECLARATION DU PROGRAMME D'INITIALISATION
async function init() {
  await fetch("./data/recipes.json")
    .then((response) => response.json())
    .then((response) => {
      myData = response.recipes;
      // console.log("myData", myData);
      myData.forEach((data) => {
        recipeCardsFactorie(data); // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
      });
      // Conversion du json en tableau en gardant pour chaque recette : id - name - ingredient - description
      // Utilisé pour la recherche simple
      conversionJsonToArraySimpleSearch();
      // Conversion du json en tableau en gardant pour chaque recette : ingredient - appareils - ustensiles
      // Utilisé pour la recherche avancée
      conversionJsonToArrayAdvancedSearch();
      // Initialisation des listes de la recherche avancée
      initArraysLists();
      // Affichage des recettes en fonction d'une expression saisie dans la barre de recherche
      // Et/ou en fonction des tags sélectionnés
      displayRecipesSelected();
      dropdown();
    })
    .catch((err) => console.error(err));
}