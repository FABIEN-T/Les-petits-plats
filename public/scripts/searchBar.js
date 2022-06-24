import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
import { messageNoRecipe, removeCards } from "./functions.js";
import { refreshCards } from "./functions.js";
import { stringNoAccent } from "./functions.js";
// import { messageNoRecipe } from "./functions.js";
import { searchCommonId } from "./functions.js";
import { initArraysLists } from "./tags.js";
import { tagsInput } from "./tags.js";
import { updateLists } from "./tags.js";
import { closeTagsListener } from "./tags.js";
// import { advancedSearch2 } from "./tags.js";
import { threeTypeTagsListener } from "./tags.js";
// import { recipesSelectionByTags } from "./tags.js";
// Déclaration de variables
// const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
// let recipeArray = []; // Tableau pour une recette contenant : id, name, description, ingredient
let arraySelected = []; // Tableau des id des recettes sélectionnées

// console.log(mydata[0].ingredients[0].ingredient);
// console.log(mydata[0].ustensils[0]);
// console.log("mydata", mydata[0].appliance);

// Gestion de la saisie dans la barre de recherche et envoi vers la fonction de recherche
export function displayRecipesSelected(data) {
  tagsInput(data);
  threeTypeTagsListener(data); // Ecoute du clic sur les items des 3 listes et Affichage des tags concernés
  const inputSearch = document.querySelector(".searchBarInput");
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS chercher l'expression saisie dans les recettes
      simpleSearch(e.target.value.toLowerCase(), data);
      // console.log("DPS if", arraySelectedFilter);
      // threeTypeTagsListener(data);
    } else {
      console.log("DPS else", arraySelectedFilter);

      // SINON effacer les recettes en cours d'affichage
      if (document.querySelectorAll(".tag").length == 0) {
        removeCards();
        console.log("1111111111");
        arraySelectedFilter = [];
        arraySelectedFilter2 = [];
        console.log(
          "SimpleSearch",
          arraySelectedFilter,
          arraySelectedFilter2,
          arraySelectedFusion
        );
        console.log("1111111111");
        initArraysLists(data);
        threeTypeTagsListener(data);
        document.querySelector(".messageNoRecipe > h2").innerHTML = "";
        // puis afficher toutes les recettes
        Array.from(data).forEach((recipe) => {
          recipeCardsFactorie(recipe);
        });
      } else {
        arraySelectedFilter = [];
        //   console.log("²²²²²²²²²²²²²²");
        // console.log("SimpleSearch", arraySelectedFilter, arraySelectedFilter2);
        // console.log("²²²²²²²²²²²²²²");
        arraySelectedFusion = searchCommonId(
          arraySelectedFilter,
          arraySelectedFilter2
        );
        // arraySelectedFusion = searchCommonId(arraySelectedFilter, arraySelectedFilter2);
        updateLists(data);
        refreshCards(data);
      }
    }
  });
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
export function simpleSearch(valueInput, data) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées
  arraySelectedFilter = [];
  error = false;
  console.log(
    "intoSEARCH arraySelectedFilter",
    error,
    arraySelected,
    arraySelectedFilter
  );
  allRecipesArray.forEach((el) => {
    // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
    el.forEach((row) => {
      if (row.includes(valueInput.toLowerCase())) {
        error = false;
        console.log("valueInput", valueInput);
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(el[0]);
        // console.log(arraySelected);
        // et enlever les doublons
        arraySelectedFilter = arraySelected.filter((item, index) => {
          return arraySelected.indexOf(item) === index;
        });
      }
    });
  });
  console.log("SS", arraySelectedFilter);
  if (arraySelectedFilter.length == 0) {
    // document.querySelector(".messageNoRecipe > h2").innerHTML = message;
    error = true;
    console.log("error", error);
    console.log("coucou");
    closeTagsListener(data);
    removeCards();
    messageNoRecipe();
    // document.querySelector(".messageNoRecipe > h2").innerHTML = message;
    arraySelectedFusion = [];
    updateLists(data);
  } else {
    arraySelectedFusion = searchCommonId(
      arraySelectedFilter,
      arraySelectedFilter2
    );
    console.log("&&&&&&&&&&&&&&");
    console.log(
      "SimpleSearch",
      arraySelectedFilter,
      arraySelectedFilter2,
      arraySelectedFusion
    );
    console.log("&&&&&&&&&&&&&&");
    updateLists(data);
    refreshCards(data);
  }
}

// ||  (arraySelectedFilter.length == 0 && document.querySelectorAll(".tag").length == 0)

// || (arraySelectedFilter.length == 0 && document.querySelectorAll(".tag").length ==0))

// export function simpleSearchObjet(data) {
//   arraySelected = []; // initialisation du tableau des recettes sélectionnées
//   data.forEach((dat) => {
//     console.log("objet id", dat.id);
//     console.log("objet ingredients", dat.ingredients);
//   });

// allRecipesArray.forEach((el) => {
//   // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
//   el.forEach((row) => {
//     // SI l'expression saisie est contenue dans la recette
//     if (row.includes(valueInput)) {
//       // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
//       arraySelected.push(el[0]);
//       // et enlever les doublons
//       arraySelectedFilter = arraySelected.filter((item, index) => {
//         return arraySelected.indexOf(item) === index;
//       });
//     }
//   });
// });
// }

// // Effacement de toutes les recettes
// export function removeCards() {
//   let htmlCards = Array.from(document.querySelector("#recipeList").children);
//   htmlCards.forEach((card) => {
//     card.remove();
//   });
// }

// // Affichage des recettes contenant l'expression
// export function refreshCards(data) {
//   let index = 0;
//   // Effacement de la liste de recettes
//   removeCards();
//   // Nouvel affichage des recettes sélectionnées
//   arraySelectedFilter.forEach((stg) => {
//     index = parseInt(stg, 10); // conversion de l'id string en id number
//     recipeCardsFactorie(data[index - 1]); // Décalage de -1, l'id 1 correspdant à l'index 0
//     // console.log(data[index - 1].id);
//   });
//   arraySelectedFilter = []; // Vider le tableau des id sélectionnées (Réinitialisation)
// }

// export function messageNoRecipe() {
//   // SI il n'y aucune recette d'affichée donc de trouvée
//   if (document.querySelectorAll("article").length === 0) {
//     // ALORS afficher message d'avertissement : "Aucune recette..."
//     document.querySelector(".messageNoRecipe > h2").innerHTML = message;
//   } else {
//     // SINON effacer message d'avertissement
//     document.querySelector(".messageNoRecipe > h2").innerHTML = "";
//   }
// }

// for (let recipe of recoveryData) {
//   recipeCardsFactorie(recipe);
// }

// let htmlCards = Array.from(document.querySelector("#recipeList").children);
// console.log("1 htmlCards", htmlCards);
// htmlCards.forEach((card) => {
//   // console.log("cardRecipe", cardRecipe);
//   card.remove();
// });

// if (arraySelected.length > 0) {
//   if (
//     arraySelected[arraySelected.length - 1] ===
//     arraySelected[arraySelected.length - 2]
//   ) {
//     arraySelected.pop();
//   }
// }

// SI il y a autant de mots de la base de données que de nonconcordances
// if (occurenceNumber === noMatched) {
//   // ALORS effacer toutes les recettes
//   removeCards();
//   // Afficher message d'avertissement : "Aucune recette..."
//   document.querySelector(".messageNoRecipe > h2").innerHTML = message;
// } else {
//   // SINON afficher les recettes sélectionnées
//   refreshCards();

//   // arrayIndex = [];
// console.log("97", arraySelectedFilter);
//
//   document.querySelector(".messageNoRecipe > h2").innerHTML = "";
// }
// console.log("occurenceNumber", occurenceNumber);
// console.log("noMatched", noMatched);
