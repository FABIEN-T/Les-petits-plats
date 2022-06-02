import { recipeCardsFactorie } from "./recipeCardsFactorie.js";

const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
let recipeArray = []; // Tableau pour une recette contenant : id, name, description, ingredient
let recoveryData = []; // json mis sous forme de tableau
let arraySelected = []; // Tableau des id des recettes sélectionnées
let arraySelectedFilter = []; // Tableau des id des recettes sélectionnées sans doublons
let occurenceNumber = 0; // nombre de mots comparés dans la base de données
let noMatched = 0; // nombre de fois où l'expression saisie ne cooreponds à aucune occurence
const message = "Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc."
// Effacement de toutes les recettes
function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  htmlCards.forEach((card) => {
    card.remove();
  });
}

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

// Gestion de la saisie dans la barre de recherche et envoi vers la fonction de recherche
export function displayRecipesSelected(data) {
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {
      // ALORS chercher l'expression saisie dans les recettes
      searchWords(e.target.value, data);
    } 
    else if (e.target.value.length < 3) {
      // SINON effacer les recettes en cours d'affichage
      removeCards();
      // puis afficher toutes les recettes
      for (let recipe of recoveryData) {
        recipeCardsFactorie(recipe);
      }
    }
  });
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
function searchWords(valueInput, data) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées
  occurenceNumber = 0;
  noMatched = 0;
  allRecipesArray.forEach((el) => {
    // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
    el.forEach((row) => {
      occurenceNumber++;
      // SI l'expression saisie est contenue dans la recette
      if (row.includes(valueInput)) {
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(el[0]);
        // et enlever les doublons
        arraySelectedFilter = arraySelected.filter((item, index) => {
          return arraySelected.indexOf(item) === index;
        });
      }
      if (!row.includes(valueInput)) {
        // SI non concordance incrémenter noMatched (non concordance)
        noMatched++;
      }
    });
  });
  // SI il y a autant de mots de la base de données que de nonconcordances
  if (occurenceNumber === noMatched) {
    // ALORS effacer toutes les recettes
    removeCards();
    document.querySelector(".messageNoRecipe").innerHTML = message;
  } else {
    document.querySelector(".messageNoRecipe").innerHTML = "";
    // SINON afficher les recettes sélectionnées
    refreshCards(arraySelectedFilter, valueInput);
  }
  console.log("occurenceNumber", occurenceNumber);
  console.log("noMatched", noMatched);

  // Effacement de toutes les recettes puis affichage des recettes contenant l'expression
  function refreshCards(arrayIndex, valueInput) {
    let index = 0;
    // Si l'expression dans la barre de recherche fait au moins 3 lettres :
    // Effacement de la liste de recettes
    // Avant nouvel affichage des recettes sélectionnées
    if (valueInput.length >= 3) {
      removeCards();
      arrayIndex.forEach((stg) => {
        index = parseInt(stg, 10); // conversion de l'id string en id number
        recipeCardsFactorie(data[index - 1]); // Décalage de -1, l'id 1 correspdant à l'index 0
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
