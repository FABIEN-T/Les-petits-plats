import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
import { initTagsArrays } from "./tags.js"
import { match } from "./tags.js"
// import { tagsSelected } from "./tagsSelected.js"

// Déclaration de variables
const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
let allTags = {};
let recipeArray = []; // Tableau pour une recette contenant : id, name, description, ingredient
let arraySelected = []; // Tableau des id des recettes sélectionnées
let arraySelectedFilter = []; // Tableau des id des recettes sélectionnées sans doublons
let ingredientsTagsMatched = [];
let applianceTagsMatched = [];
let ustensilsTagsMatched = [];
const message =
  "Aucune recette ne correspond à votre critère… </br> vous pouvez chercher « tarte aux pommes », « poisson », etc...";

// Gestion de la saisie dans la barre de recherche et envoi vers la fonction de recherche
export function displayRecipesSelected(data) {
  conversionArray(data);
  initTagsArrays(data);
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    // SI il y au moins 3 caractères dans la barre de recherche
    if (e.target.value.length >= 3) {      
      // ALORS chercher l'expression saisie dans les recettes
      searchWords(e.target.value, data);      
    } else if (e.target.value.length < 3) {
      // SINON effacer les recettes en cours d'affichage
      removeCards();
      initTagsArrays(data);
      document.querySelector(".messageNoRecipe > h2").innerHTML = "";
      // puis afficher toutes les recettes
      Array.from(data).forEach((recipe) => {
        recipeCardsFactorie(recipe);
      });
    }
  });
}

// Conversion du json en tableau puis
// création d'un tableau pour chaque recette incluant
// id - name - ingredient - description
function conversionArray(data) {
  // recoveryData = Array.from(data);
  Array.from(data).forEach((element) => {
    // mettre dans le tableau de la recette : id, name, description
    recipeArray.push(
      element.id.toString(),
      element.name.toLowerCase(),
      element.description.toLowerCase()
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter danns le tableau uniquement les propriétés "ingredient"
      recipeArray.push(el.ingredient.toLowerCase());
    });
    allRecipesArray.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });
}

// Recherche de l'expression saisie dans chaque recette (son titre, ses ingredients, sa description)
function searchWords(valueInput, data) {
  arraySelected = []; // initialisation du tableau des recettes sélectionnées
  allRecipesArray.forEach((el) => {
    // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
    el.forEach((row) => {
      // SI l'expression saisie est contenue dans la recette
      if (row.includes(valueInput)) {
        // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
        arraySelected.push(el[0]);
        // et enlever les doublons
        arraySelectedFilter = arraySelected.filter((item, index) => {
          return arraySelected.indexOf(item) === index;
        });
      }
    });
  });
  match(data, arraySelectedFilter);
  refreshCards(data);  
  messageNoRecipe();
}

// Effacement de toutes les recettes
function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  // console.log("hey", document.querySelector("#recipeList").children, htmlCards);
  htmlCards.forEach((card) => {
    card.remove();
  });
}

// Affichage des recettes contenant l'expression
function refreshCards(data) {
  let index = 0;
  // Effacement de la liste de recettes
  removeCards();  
  // Nouvel affichage des recettes sélectionnées
  arraySelectedFilter.forEach((stg) => {
    index = parseInt(stg, 10); // conversion de l'id string en id number
    recipeCardsFactorie(data[index - 1]); // Décalage de -1, l'id 1 correspdant à l'index 0
  });
  arraySelectedFilter = []; // Vider le tableau des id sélectionnées (Réinitialisation)
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

const ingredientsList = document.querySelector(".ingredientsList");
const devicesList = document.querySelector(".devicesList");
const utensilsList = document.querySelector(".utensilsList");
















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
