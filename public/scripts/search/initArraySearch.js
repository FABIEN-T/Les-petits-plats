import { stringNoAccent } from "../utils/functions.js"; // Enlève l'accent sur la première lettre du mot et mise en capitale


// Conversion du json en tableau en gardant pour chaque recette : id - name - ingredient - description
// Utilisé pour la recherche simple
export function conversionJsonToArraySimpleSearch(data) {
  let recipeArray = [];
  data.forEach((element) => {
    recipeArray.push(
      element.id.toString(),
      stringNoAccent(element.name.charAt(0).toLowerCase()) +
        element.name.substring(1),
      stringNoAccent(element.description.charAt(0).toLowerCase()) +
        element.description.substring(1)
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter dans le tableau uniquement les propriétés "ingredient"
      recipeArray.push(
        stringNoAccent(el.ingredient.charAt(0).toLowerCase()) +
          el.ingredient.substring(1)
      );
    });
    allRecipesSimpleSearch.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });
  console.log("allRecipesSimpleSearch", allRecipesSimpleSearch);
}

// Conversion du json en tableau en gardant pour chaque recette : ingredient - appareils - ustensiles
// Utilisé pour la recherche avancée
export function conversionJsonToArrayAdvancedSearch(data) {
  let recipeArray = [];
  data.forEach((element) => {
    // mettre dans le tableau de la recette : id, name, description
    recipeArray.push(
      element.id.toString()
      // element.name.toLowerCase(),
      // element.description.toLowerCase()
    );
    element.ingredients.forEach((el) => {
      // pour chaque "ingedients", ajouter danns le tableau uniquement les propriétés "ingredient"
      recipeArray.push(el.ingredient.toLowerCase());
    });
    recipeArray.push(element.appliance.toLowerCase());
    element.ustensils.forEach((el) => {
      recipeArray.push(el.toLowerCase());
    });
    allRecipesAdvancedSearch.push(recipeArray); // le resultat est envoyé dans le tableau de toutes les recettes
    recipeArray = []; // on vide le tableau pour la prochaine recette
  });
  // console.log("allRecipesAdvancedSearch", allRecipesAdvancedSearch);
}

