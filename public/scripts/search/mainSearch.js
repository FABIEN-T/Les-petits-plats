import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import {
  messageNoRecipe, // Affichage ou effacement du message d'avertissement : "Aucune recette..."
  removeCards, // Effacement de toutes les recettes
  refreshCards, // Affichage des recettes trouvées par la recherche des recettes communes à la recherche principale et à la recherche avancée
  searchCommonId, // Recherche des recettes communes à la recherche principale et à la recherche avancée
} from "../utils/functions.js";

import { updateLists } from "./tags.js"; // Mise à jour des listse de tags en fonction la sélection commune à la recherche principale et avancée

let arraySelected = []; // Tableau des id des recettes sélectionnées (recherche principale)


// Recherche de l'expression saisie, dans chaque recette (son titre, ses ingredients, sa description)
// Croisement avec les recettes sélectionnées avac la recherche avancée
export function mainSearch(valueInput) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées (recherche principale)
  arrayIdMainSearch = []; // initialisation du tableau des recettes sélectionnées ET filtrées (recherche principale)
  error = false; // variable, si true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
  
  // Recherche l'expression saisie dans  "name - ingredient - description" de chaque recette

  // allRecipesMainSearch.forEach((recipe) => {
  //   recipe.forEach((element) => {
  //     if (element.includes(valueInput.toLowerCase())) {
  //       // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
  //       arraySelected.push(recipe[0]);
  //     }
  //   });
  // });
  // // Enlever les doublons
  // arrayIdMainSearch = arraySelected.filter((item, index) => {
  //   return arraySelected.indexOf(item) === index;
  // });
  // arrayIdMainSearch = arraySelected
  // arrayIdMainSearch = [...new Set(arraySelected)];

  for (let i = 0; i < allRecipesMainSearch.length; i++) {
    let recipe = allRecipesMainSearch[i]; // pour chaque recette
    for (let j = 0; j < recipe.length; j++) { // chaque élément "name - ingredient - description"
      let element = recipe[j];
      if (element.includes(valueInput.toLowerCase())) { // SI la saisie est incluse
        // ALORS mettre l'ID de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(recipe[0]);
      }
    }
  }
  arrayIdMainSearch = [...new Set(arraySelected)];

  // SI la saisie n'a pas de correspondance (faute de frappe ou terme non contenu dans la base de données)
  if (arrayIdMainSearch.length == 0) {
    error = true; // true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
    removeCards(); // efface toutes les recettes
    messageNoRecipe(); // affiche message d'avertissement
    arrayIdSelectedFusion = []; // vide le tableau des recettes communes à la recherche principale et à la recherche avancée
    updateLists(); // mise à jour des listes de la recherche avancée
    // console.log("ERROR arrayIdSelectedFusion", arrayIdSelectedFusion);
  } else {
    // SINON (si correspondance), Recherche des recettes communes à la recherche principale et à la recherche avancée
    arrayIdSelectedFusion = searchCommonId(
      arrayIdMainSearch, // tableau des id filtrés (recherche principale)
      arrayIdAdvancedSearch // tableau des id filtrés (recherche avancée)
    );
    console.log(
      "arrayIdSelectedFusion",
      arrayIdMainSearch,
      arrayIdAdvancedSearch,
      arrayIdSelectedFusion
    );
    updateLists(); // mise à jour des listes de la recherche avancée
    // refreshCards(); // mise à jour de l'affichage des recettes
  }
}

// allRecipesMainSearch.forEach((recipe) => {
//   recipe.forEach((element) => {
//     if (element.includes(valueInput.toLowerCase())) {
//       arraySelected.push(recipe[0]);
//       arrayIdMainSearch = arraySelected.filter((item, index) => {
//         return arraySelected.indexOf(item) === index;
//       });
//     }
//   });
// });

// for (i = 0; i < allRecipesMainSearch.length; i++) {
//   let row = allRecipesMainSearch[i];
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

// allRecipesMainSearch.forEach((recipe) => {
//   recipe.forEach((element) => {
//     if (element.includes(valueInput.toLowerCase())) {
//       arraySelected.push(recipe[0]);
//       arrayIdMainSearch = arraySelected.filter((item, index) => {
//         return arraySelected.indexOf(item) === index;
//       });
//     }
//   });
// });

// for (i = 0; i < allRecipesMainSearch.length; i++) {
//   let element = allRecipesMainSearch[i];
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
