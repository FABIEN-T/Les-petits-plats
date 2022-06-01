import { recipeCardsFactorie } from "./recipeCardsFactorie.js";

const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
let recipeArray = []; // Tableau pour une recette contenant : id, name, description, ingredient
let recoveryData = []; // json mis sous forme de tableau
let arraySelected = []; // Tableau des id des recettes sélectionnées
let arraySelectedFilter = []; // Tableau des id des recettes sélectionnées sans doublons

// Conversion du json en tableau puis 
// création d'un tableau pour chaque recette incluant
// id - name - ingredient - description
export function conversionArray(data) {
  recoveryData = Array.from(data);
  recoveryData.forEach((element) => {
    // mettre dans le tableau de la recette : id, name, description
    recipeArray.push(
      element.id.toString(),
      element.name.toLowerCase(),
      element.description.toLowerCase()
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter danns le tableau uniquement les propirétés "ingredient"
      recipeArray.push(el.ingredient.toLowerCase());
    });
    allRecipesArray.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });
}

// Effacement de toutes les recettes
function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  
  htmlCards.forEach((card) => {
    card.remove();
    // console.log("EFFACEMENT2");
  });
}

// Gestion de la saisie dans la barre de recherche et envoi vers la fonction de recherche
export function displayRecipesSelected(data) {
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS chercher le mot saisi dans les recettes 
      searchWords(e.target.value, data);
    } else {
      // SINON afficher toutes les recettes
      // if ()
      removeCards();
      console.log(document.querySelector("#recipeList").children);
      for (let recipe of recoveryData) {
        recipeCardsFactorie(recipe);
      }
    }    
  });
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
function searchWords(word, data) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées
  allRecipesArray.forEach((el) => {
    // Rechercher le mot saisi dans  "name - ingredient - description" de chaque recette
    el.forEach((row) => {
      // SI le mot saisi est contenu dans la recette
      if (row.includes(word)) {
        console.log("word2", word, row.includes(word));
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(el[0]);
        // Enlever les doublons
        arraySelectedFilter = arraySelected.filter((item, index) => {
          return arraySelected.indexOf(item) === index;
        });
      }
      else {
        // console.log("word3", word, (row.includes(word)));
        // arraySelected = [];
        removeCards();
        // console.log("EFFACEMENT");
      }
      refreshCards();
    });
  });

  // Effacement de toutes les recettes puis affichage des recettes contenant l'expression
  function refreshCards() {
    let index = 0;
    // Si l'expression dans la barre de recherche fait au moins 3 lettres :
    // Effacement de la liste de recettes
    // avant nouvel affichage des recettes sélectionnées
    if (word.length >= 3) {
      removeCards();
      arraySelectedFilter.forEach((stg) => {
        index = parseInt(stg, 10);
        // console.log(data[index - 1]);
        recipeCardsFactorie(data[index - 1]);
      });
    }
  }
}










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
