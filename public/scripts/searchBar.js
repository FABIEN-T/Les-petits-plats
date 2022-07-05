import { recipeCardsFactorie } from "./recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import {
  messageNoRecipe,
  removeCards,
  refreshCards,
  searchCommonId,
} from "./functions.js";
// import { refreshCards } from "./functions.js"; // Affichage des recettes trouvées par la recherche
// import { searchCommonId } from "./functions.js"; // Recherche des recettes communes à la recherche simple et à la recherche avancée
import {
  initArraysLists,
  tagsInput,
  updateLists,
  closeTagsListener,
  threeTypeTagsListener,
  searchTagInListsAndCrossArrayId,
} from "./tags.js";
// import { tagsInput } from "./tags.js";
// import { updateLists } from "./tags.js";
// import { closeTagsListener } from "./tags.js";
// import { threeTypeTagsListener } from "./tags.js";

let arraySelected = []; // Tableau des id des recettes sélectionnées (recherche simple)

// AFFICHAGE DES RECETTES SELECTIONEES
export function displayRecipesSelected() {
  tagsInput(); // Ecoute des événnements de saisie dans la recherche avancée
  threeTypeTagsListener(); // Ecoute du clic sur les items des 3 listes et affichage des tags concernés

  // Gestion de la saisie dans la barre de recherche simple
  const inputSearch = document.querySelector(".searchBarInput");
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS cherche l'expression saisie dans les recettes
      simpleSearch(e.target.value.toLowerCase(), myData);
    } else {
      // SI il n'y a pas de tags sélectionnés
      if (document.querySelectorAll(".tag").length == 0) {
        removeCards(); // effacer les recettes en cours d'affichage
        arrayIdSimpleSearch = []; // réinitialiser le tableau des id filtrés (recherche simple)
        arrayIdAdvancedSearch = []; // réinitialiser le tableau des id filtrés (recherche avancée)
        initArraysLists();
        threeTypeTagsListener();
        document.querySelector(".messageNoRecipe").innerHTML = `<h2></h2>`;
        // puis afficher toutes les recettes
        myData.forEach((recipe) => {
          recipeCardsFactorie(recipe);
        });
      } else {
        // SINON
        arrayIdSimpleSearch = []; // initialisation du tableau des recettes sélectionnées et filtrées (recherche simple)
        // Recettes à afficher sont celles de la recherche avancée
        arrayIdSelectedFusion = arrayIdAdvancedSearch;
        updateLists(); // mise à jour des listes de la recherche avancée
        refreshCards(); // mise à jour de l'affichage des recettes
      }
    }
  });
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
export function simpleSearch(valueInput) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées (recherche simple)
  arrayIdSimpleSearch = []; // initialisation du tableau des recettes sélectionnées et filtrées (recherche simple)
  error = false; // variable, si true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
  // Recherche l'expression saisie dans  "name - ingredient - description" de chaque recette
  allRecipesSimpleSearch.forEach((recipe) => {
    recipe.forEach((element) => {
      if (element.includes(valueInput.toLowerCase())) {
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(recipe[0]);
      }
    });    
  });
  // Enlever les doublons
  arrayIdSimpleSearch = arraySelected.filter((item, index) => {
    return arraySelected.indexOf(item) === index;
  });
  // arrayIdSimpleSearch = arraySelected
  // arrayIdSimpleSearch = [...new Set(arraySelected)];

  // for (let i = 0; i < allRecipesSimpleSearch.length; i++) {
  //   let recipe = allRecipesSimpleSearch[i];
  //   // console.log("recipe", recipe);
  //   for (let j = 0; j < recipe.length; j++) {
  //     let element = recipe[j];
  //     // console.log("element", element);
  //     if (element.includes(valueInput.toLowerCase())) {
  //       arraySelected.push(recipe[0]);
  //       if (arraySelected.length > 0) {
  //           if (
  //             arraySelected[arraySelected.length - 1] ===
  //             arraySelected[arraySelected.length - 2]
  //           ) { arraySelected.pop();}
  //       }
  //     }
  //   }    
  // }
  // arrayIdSimpleSearch = arraySelected;
  // console.log("SimpleSearch", arrayIdSimpleSearch);

  // SI la saisie n'a pas de correspondance (faute de frappe ou terme non contenu dans la base de données)
  if (arrayIdSimpleSearch.length == 0) {
    error = true; // true : indique à la fonction "closeTagsListener()"que la saisie ne donne aucune recette
    console.log("error", error);
    removeCards(); // efface toutes les recettes
    messageNoRecipe(); // affiche message d'avertissement
    // closeTagsListener(); // écoute le clic sur fermeture de tags
    // console.log
    // let bidule = arrayIdSelectedFusion;
    arrayIdSelectedFusion = []; // vide le tableau des recettes communes à la recherche simple et à la recherche avancée
    updateLists(); // mise à jour des listes de la recherche avancée
    // arrayIdSelectedFusion = bidule;
    console.log("ERROR arrayIdSelectedFusion", arrayIdSelectedFusion);
  } else {
    // searchTagInListsAndCrossArrayId();
    // SINON (si correspondance), Recherche des recettes communes à la recherche simple et à la recherche avancée
    // arrayIdAdvancedSearch =
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
    refreshCards(); // mise à jour de l'affichage des recettes
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
