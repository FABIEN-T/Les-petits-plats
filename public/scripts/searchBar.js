import { recipeCardsFactorie } from "./recipeCardsFactorie.js";

// Déclaration de variables
const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
let recipeArray = []; // Tableau pour une recette contenant : id, name, description, ingredient
let recoveryData = []; // json mis sous forme de tableau
let arraySelected = []; // Tableau des id des recettes sélectionnées
let arraySelectedFilter = []; // Tableau des id des recettes sélectionnées sans doublons
const message =
  "Aucune recette ne correspond à votre critère… </br> vous pouvez chercher « tarte aux pommes », « poisson », etc...";

// Gestion de la saisie dans la barre de recherche et envoi vers la fonction de recherche
export function displayRecipesSelected(data) {
  conversionArray(data);
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS chercher l'expression saisie dans les recettes
      searchWords(e.target.value, data);
    } else if (e.target.value.length < 3) {
      // SINON effacer les recettes en cours d'affichage
      removeCards();
      document.querySelector(".messageNoRecipe > h2").innerHTML = "";
      // puis afficher toutes les recettes
      for (let recipe of recoveryData) {
        recipeCardsFactorie(recipe);
      }
    }
  });
}

// Conversion du json en tableau puis
// création d'un tableau pour chaque recette incluant
// id - name - ingredient - description
function conversionArray(data) {
  recoveryData = Array.from(data);
  for (let element of recoveryData) {
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
  }
  // console.log("allRecipesArray", allRecipesArray);
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
function searchWords(valueInput, data) {
  console.log("valueInput", valueInput);
  arraySelected = []; // initialisation du tableau des recettes sélectionnées
  // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
  for (let row of allRecipesArray) {
    // SI l'expression saisie est contenue dans la recette
    for (let elmt of row) {
      if (elmt.includes(valueInput)) {
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(row[0]);
        // et enlever les doublons
        if (arraySelected.length > 0) {
          if (
            arraySelected[arraySelected.length - 1] ===
            arraySelected[arraySelected.length - 2]
          ) {
            arraySelected.pop();
            // return arraySelected;
          }
        }
      }
      // console.log("arraySelected", arraySelected);
      
    }

  }

  refreshCards(data);
  messageNoRecipe();
}

// Effacement de toutes les recettes
function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  for (let recipeCard of htmlCards) {
    recipeCard.remove();
  }
}

// Affichage des recettes contenant l'expression
function refreshCards(data) {
  let index = 0;
  // Effacement de la liste de recettes
  removeCards();
  // Nouvel affichage des recettes sélectionnées
  for (let stg of arraySelected) {
    index = parseInt(stg, 10); // conversion de l'id string en id number
    recipeCardsFactorie(data[index - 1]); // Décalage de -1, l'id 1 correspdant à l'index 0
  }
  arraySelected = []; // Vider le tableau des id sélectionnées (Réinitialisation)
  console.log("arraySelected", arraySelected);
}

function messageNoRecipe() {
  // SI il n'y aucune recette d'affichée donc de trouvée
  if (document.querySelectorAll("article").length === 0) {
    // ALORS afficher message d'avertissement : "Aucune recette..."
    document.querySelector(".messageNoRecipe > h2").innerHTML = message;
  } else {
    // SINON effacer message d'avertissement
    document.querySelector(".messageNoRecipe > h2").innerHTML = "";
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
