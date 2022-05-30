import { recipeCardsFactorie } from "./cardsRecipesFactory.js";

const allRecipesArray = [];
let recipeArray = [];
let recoveryData = [];
let arraySelected = [];
let word = "coco";

export function conversionArray(data) {
  recoveryData = Array.from(data);
  recoveryData.forEach((element) => {
    recipeArray.push(
      element.id.toString(),
      element.name.toLowerCase(),
      element.description.toLowerCase()
    );
    // console.log("ingredients", element.ingredients);
    element.ingredients.forEach((el) => {
      recipeArray.push(el.ingredient.toLowerCase());
    });
    // console.log("++++++++++++++++++++++++++++++++++++");
    allRecipesArray.push(recipeArray);
    recipeArray = [];
  });
}

function capture() {  
  // DÉTECTION DE LA SAISIE L'INPUT DE LA BARRE DE RECHERCHE
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    console.log(e.target.value);
    // return e.target.value;
    word = e.target.value;
    // e.target.value = e.target.value.replace(/^[\s]/, ""); // supprime les espaces en début de chaîne
    // e.target.value = e.target.value.replace(/[\s]+/g, " "); // remplace les espaces successifs au milieu de la chaîne par un seul espace
    // e.target.value = e.target.value.replace(/[-]+/g, "-"); // remplace de multiples tirets successifs par un seul tiret
    // e.target.value = e.target.value.replace(/[']+/g, "'"); // remplace de multiples apostrophes successifs par un seul apostrophe
    // firstNameValue = e.target.value;
    console.log("word-in", word);
    // return word;    
  });  
}


export function searchWords(data) {
  capture();
  console.log("word-out", word);
  allRecipesArray.forEach((el) => {
    el.forEach((row) => {      
      if (row.includes(word)) {
        arraySelected.push(el[0]);
        if (arraySelected.length > 0) {
          if (
            arraySelected[arraySelected.length - 1] ===
            arraySelected[arraySelected.length - 2]
          ) {
            arraySelected.pop();
          }
        }
      }
    });
    console.log("arraySelected", arraySelected);
  });
  //  console.log("e.target.value", e.target.value);
  // console.log("Search", word, arraySelected);
  let index = 0;
  // Si aucune expression dans la barre : Effacement de la liste de recettes avant son nouvel affichage prenant en compte les cards sélectionnées
  // console.log("word", word);
  // if (!word == "") {
  //   console.log("worry");
  // }
  if (!word == "") {
    console.log("word END", word);
    let htmlCards = Array.from(document.querySelector("#recipeList").children);
    htmlCards.forEach((cardRecipe) => {
      cardRecipe.remove();
    });
    console.log("end_Search", arraySelected);
    arraySelected.forEach((stg) => {
      index = parseInt(stg, 10);
      recipeCardsFactorie(data[index - 1]);
    });
  }
}











// function filterText(arr, requete) {
//   return arr.filter(function (el) {
//     return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
//   })
// }
