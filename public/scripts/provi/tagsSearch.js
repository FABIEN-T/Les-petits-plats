import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import { stringUpperCaseFirst, stringNoAccent, removeCards, refreshCards, searchCommonId } from "../utils/functions.js"; // Enlève l'accent sur la première lettre du mot et mise en capitale
import { initArraysLists, updateLists, threeTypeTagsListener } from "./tagsList.js";

let arrayRecipesByEachTag = []; // garde en mémoire la liste de recettes (id) pour chaque Tag
// let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
// let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
// let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
// let classDom = ""; // type de liste (ingredients, appliances, utensils)
let indexTagClosed = 0; // variable récupérant l'indice du tag fermé
let tempTab = []; // tableau tampon
let arrayTagsSelected = [];

// const ingredientsListDom = document.querySelector(".ingredientsList");
// const appliancesListDom = document.querySelector(".appliancesList");
// const utensilsListDom = document.querySelector(".utensilsList");

// const inputsTags = document.querySelectorAll(".dropdownInput");

// Ecoute du clic sur les items des listes et Affichage des tags
export function tagsListenerAndDisplay(classDom, classColor) {
  classDom.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // Si le tableau des tags sélectionnés ne contient pas déjà le tag qui vient d'être cliqué
      if (!arrayTagsSelected.includes(e.target.innerHTML)) {
        // Création de l'élément HTML du tag
        document.querySelector(".tagsContainer").innerHTML += `
          <div class="tag ${classColor}">
            <p>${e.target.innerHTML}</p>
            <em class="far fa-times-circle"></em>
          </div>`;
        closeTagsListener(); // écoute du clic sur la croix des tags
        document.getElementById("formIngredients").reset();
        document.getElementById("formAppliances").reset();
        document.getElementById("formUtensils").reset(); // efface la saisie dans la recherche avancée
        arrayTagsSelected.push(e.target.innerHTML); // ajoute le nouveau tag dans le tableau des tags sélectionnés
        updateLists(); // mise à jour des listes de la recherche avancée
        searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
      }
    });
  });
}

// Efface le tag de la page html et du Dom lors clic sur la croix
export function closeTagsListener() {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // donne l'index du tag effacé dans la série des tags affichés
      indexTagClosed = arrayTagsSelected.indexOf(
        e.target.closest(".tag").children[0].innerText
      );
      // console.log("indexTagClosed", indexTagClosed);
      e.target.closest(".tag").remove(); // Efface le tag cliqué
      let closedTag = e.target.closest(".tag").children[0].innerText; // mémorise l'intitulé du tag fermé
      // console.log("closedTag", closedTag);
      arrayTagsSelected = arrayTagsSelected.filter((x) => x !== closedTag); // efface le tag du tableau des tags sélectionnés
      
      function updateAdvancedSearch() {
        let tamponTab = [];
      // let arraySelected2Spread = [];
      // console.log("AVANT arrayRecipesByEachTag", arrayRecipesByEachTag);
      arrayRecipesByEachTag.forEach(tab => tamponTab.push(...tab));
      // console.log("APRES arrayRecipesByEachTag", arrayRecipesByEachTag);
      // console.log("tamponTab", tamponTab);

      arrayRecipesByEachTag.forEach((array, index) => {
        if (arrayRecipesByEachTag.length > index + 1) {
          tamponTab = tamponTab.filter((item, index, array) => {
            return array.indexOf(item) !== index;
          });
        }
      });
      // console.log("tamponTab", tamponTab);
      arrayIdAdvancedSearch = tamponTab;
      arrayIdSelectedFusion = searchCommonId(
          arrayIdSimpleSearch,
          arrayIdAdvancedSearch
        );
      }
      // SI faute de frappe ou terme inconnu dans la recherche simple,
      if (error === true) {
        // console.log("remove");
        removeCards(); // effacer toutes les recettes
        arrayRecipesByEachTag.splice(indexTagClosed, 1);
        // console.log("ERROR close arrayRecipesByEachTag", arrayRecipesByEachTag);
        updateAdvancedSearch();
        updateLists(); //NEW
        // arrayIdAdvancedSearch = []; // réinitialiser la recheche avancée
        // document.querySelectorAll(".tag").map(tag => tag.remove());
        // document.querySelectorAll(".tag").forEach((tag) => tag.remove());
        // SINON enlever les recettes (id) du tag fermé de la mémoire "arrayRecipesByEachTag"
      } else {
        // console.log("avant SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag);
        arrayRecipesByEachTag.splice(indexTagClosed, 1);
        // console.log("après SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag); 
        updateAdvancedSearch();      
        // searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
        // SI il n'y a aucun tag et que la recherche simple ne donne rien
        if (
          document.querySelectorAll(".tag").length == 0 &&
          arrayIdSimpleSearch.length == 0
        ) {
          myData.forEach((recipe) => {
            recipeCardsFactorie(recipe); // Réinitialisation : Affichage de toutes les recettes            
          });
          initArraysLists(); // Initialisations des listes de recherche avancée
          threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
          updateAdvancedSearch(); //NEW
          // SINON chercher les recettes en commen des tags restants dans la mémoire "arrayRecipesByEachTag"
          // EN COURS DE CONSTRUCTION
        } else {
          updateAdvancedSearch();          
          
          // console.log("arrayIdSelectedFusion", arrayIdSelectedFusion);
          refreshCards();          
          updateLists(); // mise à jour des listes de la recherche avancée
          threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
        }
      }
    });
  });
}

// Recherche les tags dans les listes de la recherche avancée,
// croise le tableau des recettes sélectionnées dans de la recherche avancée
// avec celui de la recherche simple
// et ne garde que les recettes en commun
// searchTaginListAndCrossArrayId
export function searchTagInListsAndCrossArrayId() {
  let arraySelected = [];
  let arraySuperSelected = [];

  // Si il n'y a pas de tags, réinitialiser l'affichage de toutes les recettes et listes
  if (document.querySelectorAll(".tag").length == 0) {
    arrayIdAdvancedSearch = [];
    tempTab = [];
    // arrayIdSimpleSearch = [];
    removeCards(); // Efface toutes les recettes
    myData.forEach((recipe) => {
      recipeCardsFactorie(recipe); // Réinitialisation : Affichage de toutes les recettes
    });
    initArraysLists(); // Initialisations des listes de recherche avancée
    threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
    // Recherche des recettes communes à la recherche simple et à la recherche avancée
    arrayIdSelectedFusion = arrayIdSimpleSearch;
    // SI il n'y a pas de recettes trouvées avec la echerche simple
    if (arrayIdSimpleSearch.length == 0) {
      myData.forEach((recipe) => {
        recipeCardsFactorie(recipe); // ALORS Réinitialisation : Affichage de toutes les recettes
      });
    } else {
      refreshCards(); // SINON afficher les recettes correspondant à la recherche simple
    }
  } else {
    // SINON chercher les recettes incluant le tag
    // console.log("arrayTagsSelected", arrayTagsSelected);
    [...new Set(arrayTagsSelected)].forEach((tag) => {
      arraySelected = [];
      allRecipesAdvancedSearch.forEach((recipe) => {
        // Rechercher le tag saisie dans chaque recette
        recipe.forEach((element) => {
          // SI l'expression saisie est contenue dans la recette
          // console.log("Test", tag, element, stringUpperCaseFirst(element).includes(tag));
          if (element.includes(tag.toLowerCase()) || stringUpperCaseFirst(element).includes(tag)) {
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(recipe[0]);
          }
        });
        // console.log("arraySelected", arraySelected);
      });
      arraySuperSelected.push([...new Set(arraySelected)]); // Ajouter tableau des recettes sélectionnées (id) du tag
      // console.log("ELSE arraySelected", arraySelected);
      // console.log("ELSE arraySuperSelected", arraySuperSelected);
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });
    // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
    // SI il y a 1 tag
    if (document.querySelectorAll(".tag").length == 1) {
      arrayIdAdvancedSearch = arraySelected; // la recherche avancée correspond à la première recherche de tag
      // Recherche des recettes communes à la recherche simple et à la recherche avancée
      arrayIdSelectedFusion = searchCommonId(arrayIdSimpleSearch, 
        [...new Set(arrayIdAdvancedSearch)]);
      arrayRecipesByEachTag = arraySuperSelected;
      // arrayRecipesByEachTag.push(arraySelected); // mémorise pour chaque tag, la liste de recettes (id)
      // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
      updateLists(); // mise à jour des listes de la recherche avancée
      refreshCards(); // afficher les recettes communes à la recherche simple et à la recherche avancée
    }
    // SI il y a plus d'un tag
    if (document.querySelectorAll(".tag").length > 1) {
      // console.log("arraySuperSelected.length >>>1", arraySuperSelected);
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // console.log("arraySuperSelected", arraySuperSelected);      
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // Recherche des id communs entre la précédente recherche avancée et la nouvelle
      tempTab = arrayIdAdvancedSearch.filter((x) =>
        arraySuperSelected[arraySuperSelected.length - 1].includes(x)
      );
      // console.log("tempTab", tempTab);
      arrayIdAdvancedSearch = tempTab; // affecte le résultat de la recherche des id communs entre la précédente recherche avancée et la nouvelle
      // console.log("searchTag PUSH !!!!");
      arrayRecipesByEachTag = arraySuperSelected;
      // arrayRecipesByEachTag.push(arrayIdAdvancedSearch); // Mémorisation de la liste des recettes ppour chaque tag
      // console.log(">1 | arrayRecipesByEachTag", arrayRecipesByEachTag);
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      arrayIdSelectedFusion = searchCommonId(
        arrayIdSimpleSearch,
        arrayIdAdvancedSearch
      );
      // console.log(">1 | arrayIdSimpleSearch", arrayIdSimpleSearch);
      // console.log(">1 | arrayIdAdvancedSearch", arrayIdAdvancedSearch);      
      updateLists(); // mise à jour des listes de la recherche avancée
      refreshCards(); // afficher les recettes communes à la recherche simple et à la recherche avancée
    }
  }
}