// Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
let recipeArray = [];


export function conversionJsonToArray(data) { 
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
  // Array.from(mydata).forEach((element) => {
  //   // mettre dans le tableau de la recette : id, name, description
  //   recipeArray.push(
  //     element.id.toString(),
  //     element.name.toLowerCase(),
  //     element.description.toLowerCase()
  //   );
  //   element.ingredients.forEach((el) => {
  //     // pour chaque "ingedients", ajouter danns le tableau uniquement les propriétés "ingredient"
  //     recipeArray.push(el.ingredient.toLowerCase());
  //   });
  //   allRecipesArray.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
  //   recipeArray = []; // on vide le tableau pour la prochaine recette
  // });
  // console.log("allRecipesArray", allRecipesArray);
}

export function conversionJsonToArray2(data) {
  Array.from(data).forEach((element) => {
    // mettre dans le tableau de la recette : id, name, description
    recipeArray.push(
      element.id.toString(),
      // element.name.toLowerCase(),
      // element.description.toLowerCase()
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter danns le tableau uniquement les propriétés "ingredient"
      recipeArray.push(el.ingredient.toLowerCase());
    });
    recipeArray.push(      
      element.appliance.toLowerCase(),      
    );
    element.ustensils.forEach((el) => {
      recipeArray.push(el.toLowerCase())
      }
    )
    allRecipesArray2.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette    
  });  
  // console.log("allRecipesArray2", allRecipesArray2);   
}

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
    arrayFinal = arrayConcat.filter((item, index, array) => {
      return array.indexOf(item) !== index;
    });
  }
  return [...new Set(arrayFinal)];
}




// ************************** OK **********************************
export function stringUpperCaseFirst(word) {  
  return stringNoAccent(word.charAt(0)).toUpperCase() + word.substring(1);
}

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

// Effacement de toutes les recettes
export function removeCards() {
  let htmlCards = Array.from(document.querySelector("#recipeList").children);
  htmlCards.forEach((card) => {
    card.remove();
  });
}

// Affichage des recettes contenant l'expression
export function refreshCards(data) {  
  let index = 0;  
  // Effacement de la liste de recettes
  removeCards();
  // Nouvel affichage des recettes sélectionnées
  arraySelectedFusion.forEach((stg) => {  
    // console.log("refreshCards", stg);  
    index = parseInt(stg, 10); // conversion de l'id string en id number
    // console.log("refreshCards", index);
    recipeCardsFactorie(data[index - 1]); // Décalage de -1, l'id 1 correspondant à l'index 0
    // console.log(data[index - 1].id);
  });
  // arraySelectedFilter = []; // Vider le tableau des id sélectionnées (Réinitialisation)
  // console.log("refresh", arraySelectedFusion); 
}

export function messageNoRecipe() {
  // SI il n'y aucune recette d'affichée donc de trouvée
  if (document.querySelectorAll("article").length === 0) {
    // ALORS afficher message d'avertissement : "Aucune recette..."
    document.querySelector(".messageNoRecipe > h2").innerHTML = message;
  } else {
    // SINON effacer message d'avertissement
    document.querySelector(".messageNoRecipe > h2").innerHTML = "";
  }
}
