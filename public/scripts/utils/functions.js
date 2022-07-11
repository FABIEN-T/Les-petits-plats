import { recipeCardsFactorie } from "./recipeCardsFactorie.js";

// Recherche des recettes communes à la recherche principale et à la recherche avancée
export function searchCommonId(array1, array2) {
  let arrayFinal = [];
  let arrayConcat = [];

  if (array1.length === 0) {
    arrayFinal = array2;
  }
  if (array2.length === 0) {
    arrayFinal = array1;
  }
  if (array1.length > 0 && array2.length > 0) {
    arrayConcat = array1.concat(array2).sort((a, b) => {
      return a - b;
    });
    // Enlèvement des doublons
    arrayFinal = arrayConcat.filter((item, index, array) => {
      return array.indexOf(item) !== index;
    });
  }
  return arrayFinal;
}

// Enlève l'accent sur la première lettre du mot et mise en capitale
export function stringUpperCaseFirst(word) {
  return stringNoAccent(word.charAt(0)).toUpperCase() + word.substring(1);
}

// Enlève l'accent d'une lettre
export function stringNoAccent(letter) {
  let accent = "áàâäãåçéèêëíïîìñóòôöõúùûüýÁÀÂÄÃÅÇÉÈÊËÍÏÎÌÑÓÒÔÖÕÚÙÛÜÝ",
    noAccent = "aaaaaaceeeeiiiinooooouuuuyAAAAAACEEEEIIIINOOOOOUUUUY",
    letterNoAccent = "";
  letterNoAccent =
    accent.indexOf(letter) !== -1
      ? noAccent.charAt(accent.indexOf(letter))
      : letter;
  return letterNoAccent;
}

// Affichage ou effacement du message d'avertissement :
// "Aucune recette ne correspond à votre critère…"
export function messageNoRecipe() {
  const message =
    "Aucune recette ne correspond à votre critère… </br> vous pouvez chercher « tarte aux pommes », « poisson », etc...";
  // SI il n'y aucune recette d'affichée donc de trouvée
  if (document.querySelectorAll("article").length === 0) {
    // ALORS afficher message d'avertissement
    document.querySelector(
      ".messageNoRecipe"
    ).innerHTML = `<h2>${message}</h2>`;
  } else {
    // SINON effacer message d'avertissement
    document.querySelector(".messageNoRecipe").innerHTML = `<h2></h2>`;
  }
}

// Effacement de toutes les recettes
export function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  htmlCards.forEach((card) => {
    card.remove();
  });
}

// Affichage des recettes trouvées par la recherche
export function refreshCards() {
  let index = 0;
  // Effacement de la liste de recettes
  removeCards();
  // Nouvel affichage des recettes sélectionnées
  arrayIdSelectedFusion.forEach((stg) => {
    index = parseInt(stg, 10); // conversion de l'id string en id number
    recipeCardsFactorie(recipesData[index - 1]); // Décalage de -1, l'id 1 correspondant à l'index 0
  });
  messageNoRecipe();
}
