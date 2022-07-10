import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import {
  messageNoRecipe, // Affichage ou effacement du message d'avertissement : "Aucune recette..."
  removeCards, // Effacement de toutes les recettes
  refreshCards, // Affichage des recettes trouvées par la recherche des recettes communes à la recherche simple et à la recherche avancée
  searchCommonId, // Recherche des recettes communes à la recherche simple et à la recherche avancée
} from "../utils/functions.js";

import {
  initArraysLists, // Initialisations des listes de recherche avancée
  tagsInput, // Détection de la saisie dans un champ de recherche avancée et recherche de l'expression dans la liste associée
  updateLists, // Mise à jour des listse de tags en fonction la sélection commune à la recherche simple et avancée
  threeTypeTagsListener, // Ecoute du clic sur un tag en fonction du type et affichage
} from "./tags.js";

let arraySelected = []; // Tableau des id des recettes sélectionnées (recherche simple)


// Recherche de l'expression saisie, dans chaque recette (son titre, ses ingredients, sa description)
// Croisement avec les recettes sélectionnées avac la recherche avancée
export function simpleSearch(valueInput) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées (recherche simple)
  arrayIdSimpleSearch = []; // initialisation du tableau des recettes sélectionnées ET filtrées (recherche simple)
  error = false; // variable, si true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
  
  // Recherche l'expression saisie dans  "name - ingredient - description" de chaque recette
  // allRecipesSimpleSearch.forEach((recipe) => {
  //   recipe.forEach((element) => {
  //     if (element.includes(valueInput.toLowerCase())) {
  //       // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
  //       arraySelected.push(recipe[0]);
  //     }
  //   });
  // });
  // // Enlever les doublons
  // arrayIdSimpleSearch = arraySelected.filter((item, index) => {
  //   return arraySelected.indexOf(item) === index;
  // });
  // arrayIdSimpleSearch = arraySelected
  // arrayIdSimpleSearch = [...new Set(arraySelected)];

  for (let i = 0; i < allRecipesSimpleSearch.length; i++) {
    let recipe = allRecipesSimpleSearch[i]; // pour chaque recette
    for (let j = 0; j < recipe.length; j++) { // chaque élément "name - ingredient - description"
      let element = recipe[j];
      if (element.includes(valueInput.toLowerCase())) { // SI la saisie est incluse
        // ALORS mettre l'ID de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(recipe[0]);
      }
    }
  }
  arrayIdSimpleSearch = [...new Set(arraySelected)];

  // SI la saisie n'a pas de correspondance (faute de frappe ou terme non contenu dans la base de données)
  if (arrayIdSimpleSearch.length == 0) {
    error = true; // true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
    removeCards(); // efface toutes les recettes
    messageNoRecipe(); // affiche message d'avertissement
    // !!! bug ?
    arrayIdSelectedFusion = []; // vide le tableau des recettes communes à la recherche simple et à la recherche avancée
    updateLists(); // mise à jour des listes de la recherche avancée
    // console.log("ERROR arrayIdSelectedFusion", arrayIdSelectedFusion);
  } else {
    // SINON (si correspondance), Recherche des recettes communes à la recherche simple et à la recherche avancée
    arrayIdSelectedFusion = searchCommonId(
      arrayIdSimpleSearch, // tableau des id filtrés (recherche simple)
      arrayIdAdvancedSearch // tableau des id filtrés (recherche avancée)
    );
    console.log(
      "arrayIdSelectedFusion",
      arrayIdSimpleSearch,
      arrayIdAdvancedSearch,
      arrayIdSelectedFusion
    );
    updateLists(); // mise à jour des listes de la recherche avancée
    // refreshCards(); // mise à jour de l'affichage des recettes
  }
}

// allRecipesSimpleSearch.forEach((recipe) => {
//   recipe.forEach((element) => {
//     if (element.includes(valueInput.toLowerCase())) {
//       arraySelected.push(recipe[0]);
//       arrayIdSimpleSearch = arraySelected.filter((item, index) => {
//         return arraySelected.indexOf(item) === index;
//       });
//     }
//   });
// });

// for (i = 0; i < allRecipesSimpleSearch.length; i++) {
//   let row = allRecipesSimpleSearch[i];
//   for (j = 0; j < row.length; j++) {
//     if (row.includes(valueInput)) {
//       arraySelected.push(row[0]);
//       if (arraySelected.length > 0) {
//           if (
//             arraySelected[arraySelected.length - 1] ===
//             arraySelected[arraySelected.length - 2]
//           ) { arraySelected.pop();}
//       }
//     }
//   }
// }

// allRecipesSimpleSearch.forEach((recipe) => {
//   recipe.forEach((element) => {
//     if (element.includes(valueInput.toLowerCase())) {
//       arraySelected.push(recipe[0]);
//       arrayIdSimpleSearch = arraySelected.filter((item, index) => {
//         return arraySelected.indexOf(item) === index;
//       });
//     }
//   });
// });

// for (i = 0; i < allRecipesSimpleSearch.length; i++) {
//   let element = allRecipesSimpleSearch[i];
//   for (j = 0; j < element.length; j++) {
//     if (element.includes(valueInput)) {
//       arraySelected.push(row[0]);
//       if (arraySelected.length > 0) {
//           if (
//             arraySelected[arraySelected.length - 1] ===
//             arraySelected[arraySelected.length - 2]
//           ) { arraySelected.pop();}
//       }
//     }
//   }
// }
