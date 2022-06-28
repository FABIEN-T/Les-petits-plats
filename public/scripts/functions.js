// Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
// let recipeArray = [];

// Conversion du json en tableau en gardant pour chaque recette : id - name - ingredient - description
// Utilisé pour la recherche simple
export function conversionJsonToArraySimpleSearch() { 
  let recipeArray = [];
    myData.forEach((element) => {
    recipeArray.push(      
      element.id.toString(),
      stringNoAccent((element.name.charAt(0)).toLowerCase()) + element.name.substring(1),
      stringNoAccent((element.description.charAt(0)).toLowerCase()) + element.description.substring(1),
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter dans le tableau uniquement les propriétés "ingredient"
      recipeArray.push(
        stringNoAccent((el.ingredient.charAt(0)).toLowerCase()) + el.ingredient.substring(1))
    });
    allRecipesSimpleSearch.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });  
  // console.log("allRecipesSimpleSearch", allRecipesSimpleSearch);
}

// Conversion du json en tableau en gardant pour chaque recette : ingredient - appareils - ustensiles
// Utilisé pour la recherche avancée
export function conversionJsonToArrayAdvancedSearch() {
  let recipeArray = [];
    myData.forEach((element) => {
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
    allRecipesAdvancedSearch.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette    
  });  
  // console.log("allRecipesAdvancedSearch", allRecipesAdvancedSearch);   
}

// Recherche des recettes communes à la recherche simple et à la recherche avancée
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

// Enlève l'accent l'accent sur la première lettre du mot et mise en capitale
export function stringUpperCaseFirst(word) {  
  return stringNoAccent(word.charAt(0)).toUpperCase() + word.substring(1);
}

// Enlève l'accent
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

// Affichage ou effacement du message d'avertissement : "Aucune recette ne correspond à votre critère…"
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

// Affichage des recettes trouvées par la recherche
export function refreshCards() {  
  let index = 0;  
  // Effacement de la liste de recettes
  removeCards();
  // console.log("refresh arrayIdSelectedFusion", arrayIdSelectedFusion);
  // Nouvel affichage des recettes sélectionnées
  arrayIdSelectedFusion.forEach((stg) => {  
    // console.log("refreshCards", stg);  
    index = parseInt(stg, 10); // conversion de l'id string en id number
    // console.log("refreshCards", index);
    recipeCardsFactorie(myData[index - 1]); // Décalage de -1, l'id 1 correspondant à l'index 0
  });
  messageNoRecipe();
  // arrayIdSimpleSearch = []; // Vider le tableau des id sélectionnées (Réinitialisation)
  // console.log("refresh", arrayIdAdvancedSearch, arrayIdSelectedFusion); 
}


// span.addEventListener('click', function() {
//   let result = classes.toggle("c");

//   if (result) {
//     span.textContent = `'c' ajouté ; classList vaut désormais "${classes}".`;
//   } else {
//     span.textContent = `'c' retiré ; classList vaut désormais "${classes}".`;
//   }
// })


