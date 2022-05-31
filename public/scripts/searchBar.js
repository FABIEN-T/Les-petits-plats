import { recipeCardsFactorie } from "./cardsRecipesFactory.js";

const allRecipesArray = [];
let recipeArray = [];
let recoveryData = [];
let arraySelected = [];
let word = "";

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
    // console.log("recipeArray", recipeArray);
    allRecipesArray.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });
}

function capture() { 
  // DÉTECTION DE LA SAISIE L'INPUT DE LA BARRE DE RECHERCHE
  const inputSearch = document.querySelector('input[type="text"]');
  inputSearch.addEventListener("input", (e) => {
    // console.log(e.target.value);    
    if(e.target.value.length > 2) {
      console.log(">=3");
      word = e.target.value;
      // console.log("word", word);
      return word;   
      // searchWords(word, data); 
    }    
  });  
  // console.log("word-in2", word);
}

export function searchWords(data) {
  let word2 = capture();
  console.log(word2);
  // capture();
  // console.log("word searchWords", capture());
  // console.log("word-out", word);
  allRecipesArray.forEach((el) => {
    el.forEach((row) => {      
      if (row.includes(word2)) {
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
    // console.log("arraySelected debut", arraySelected);
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
    console.log("non vide", !word == "");
    console.log("word END", word);
    let htmlCards = Array.from(document.querySelector("#recipeList").children);
    htmlCards.forEach((cardRecipe) => {
      // console.log("cardRecipe", cardRecipe);
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
