// Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js";
// Enlève l'accent sur la première lettre du mot et mise en capitale
// Efface toutes les recettes
// Affichage des recettes trouvées par la recherche
// Recherche des recettes communes à la recherche simple et à la recherche avancée
import {
  stringUpperCaseFirst,
  stringNoAccent,
  removeCards,
  refreshCards,
  searchCommonId,
} from "../utils/functions.js";

let arrayRecipesByEachTag = []; // tableau contenant la liste de recettes (id) pour chaque Tag
let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
let classDom = ""; // type de classe CSS pour les listes (ingredientsList, appliancesList, utensilsList)
let arrayTagsSelected = []; // tableau contenant les noms des tags sélectionnés
let indexTagClosed = 0; // variable récupérant l'indice du tag fermé dans le tableau arrayTagsSelected
let tempTab = []; // tableau tampon

const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");

const inputsTags = document.querySelectorAll(".dropdownInput");

// Initialisations des listes de recherche avancée
export function initArraysLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];
  // console.log(data);
  myData.forEach((element) => {
    // pour chaque "ingrédients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      // console.log(element.id);
      ingredientsList.push(stringUpperCaseFirst(el.ingredient));
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    appliancesList.push(element.appliance);

    // pour chaque "utensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      utensilsList.push(stringUpperCaseFirst(el)); // Mettre en majuscule et enlever l'accent sur la première lettre
    });
  });

  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList); // Filtrer doublons, trier par ordre alphabétique et afficher les listes
  // console.log(ingredientsList, appliancesList, utensilsList);
}

// Mise à jour des liste de tags en fonction de la sélection commune à la recherche simple et avancée
export function updateLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];

  // Création des listes filtrées à partir du tableau des recettes sélectionnées
  arrayIdSelectedFusion.forEach((i) => {
    // console.log(parseInt(i, 10));
    myData[parseInt(i, 10) - 1].ingredients.forEach((el) => {
      ingredientsList.push(stringUpperCaseFirst(el.ingredient));
    });
    appliancesList.push(
      stringUpperCaseFirst(myData[parseInt(i, 10) - 1].appliance)
    );
    myData[parseInt(i, 10) - 1].ustensils.forEach((el) => {
      utensilsList.push(stringUpperCaseFirst(el));
    });
  });
  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList); // Filtrer doublons, trier par ordre alphabétique et afficher les listes
  threeTypeTagsListener(); // Ecouter clic sur un tag en fonction du type et affichage
}

// Filtrer les listes (enlève les doublons, trie par ordre alphatbétique, enlève un tag sélectionné)
// Appeler les fonctions d'affichage des listes mises à jour
function filterAndDisplayLists(ingredientsList, appliancesList, utensilsList) {
  ingredientsListFilter = [...new Set(ingredientsList)].sort();
  appliancesListFilter = [...new Set(appliancesList)].sort();
  utensilsListFilter = [...new Set(utensilsList)].sort();
  //Supprimer le tag sélectionné de la liste
  arrayTagsSelected.forEach((tagSelected) => {
    if (ingredientsListFilter.includes(tagSelected)) {
      ingredientsListFilter = ingredientsListFilter.filter(
        (x) => x !== tagSelected
      );
    }
    if (appliancesListFilter.includes(tagSelected)) {
      appliancesListFilter = appliancesListFilter.filter(
        (x) => x !== tagSelected
      );
    }
    if (utensilsListFilter.includes(tagSelected)) {
      utensilsListFilter = utensilsListFilter.filter((x) => x !== tagSelected);
    }
  });
  displayLists(ingredientsListFilter, ingredientsListDom); // ingredientsListDom = document.querySelector(".ingredientsList");
  displayLists(appliancesListFilter, appliancesListDom);
  displayLists(utensilsListFilter, utensilsListDom);
}

// Afficher la liste mise à jour
function displayLists(arrayList, classDom) {
  Array.from(classDom.children).forEach((item) => {
    item.remove(); // Réinitialisation : efface tous les items (tags) de la liste
  });
  arrayList.forEach((item) => {
    classDom.innerHTML += `<p class="itemList">${item}</p>`; // Ajoutr dans le dom et afficher chaque item de la liste passée en paramètre
  });
}

// Ecouter clic sur un tag en fonction du type et afficher
export function threeTypeTagsListener() {
  classDom = document.querySelectorAll(".ingredientsList > .itemList");
  tagsListenerAndDisplay(classDom, "ingredientsColor");
  classDom = document.querySelectorAll(".appliancesList > .itemList");
  tagsListenerAndDisplay(classDom, "appliancesColor");
  classDom = document.querySelectorAll(".utensilsList > .itemList");
  tagsListenerAndDisplay(classDom, "utensilsColor");
  tagsInput();
}

// Ecoute clic sur les items des listes (tags),
// Affiche les tags, Effacer la saisie dans les inputs de recherche avancée
function tagsListenerAndDisplay(classDom, classColor) {
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
        document.getElementById("formIngredients").reset(); // efface la saisie dans la recherche avancée
        document.getElementById("formAppliances").reset();
        document.getElementById("formUtensils").reset();
        arrayTagsSelected.push(e.target.innerHTML); // ajoute le nouveau tag dans le tableau des tags sélectionnés
        updateLists(); // mise à jour des listes de la recherche avancée
        searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
      }
    });
  });
}

// Efface le tag de la page html et du Dom lors du clic sur la croix
// Actualise les recettes 
export function closeTagsListener() {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // Récupérer l'index du tag effacé dans la série des tags affichés
      indexTagClosed = arrayTagsSelected.indexOf(
        e.target.closest(".tag").children[0].innerText
      );
      e.target.closest(".tag").remove(); // Effacer le tag cliqué
      let closedTag = e.target.closest(".tag").children[0].innerText; // Récupèrer l'intitulé du tag fermé
      arrayTagsSelected = arrayTagsSelected.filter((x) => x !== closedTag); // Effacer le tag du tableau des tags sélectionnés

      // Filtre les id communs à chaque tag et actualise les recettes sélectionnées
      function updateAdvancedSearch() {
        let arrayConcat = []; 
        // console.log("AVANT arrayRecipesByEachTag", arrayRecipesByEachTag);
        arrayRecipesByEachTag.forEach((tab) => arrayConcat.push(...tab)); // Concatèner les id des tags ouverts
        // console.log("APRES arrayRecipesByEachTag", arrayRecipesByEachTag);
        // console.log("arrayConcat", arrayConcat);        
        arrayRecipesByEachTag.forEach((array, index) => { // Filtrer les id communs à chaque tag
          if (arrayRecipesByEachTag.length > index + 1) {
            arrayConcat = arrayConcat.filter((item, index, array) => {
              return array.indexOf(item) !== index;
            });
          }
        });
        // console.log("arrayConcat", arrayConcat);
        arrayIdAdvancedSearch = arrayConcat;
        // Actualiser les recettes communes à la recherche simple et à la recherche avancée
        arrayIdSelectedFusion = searchCommonId(
          arrayIdSimpleSearch,
          arrayIdAdvancedSearch
        );        
      }
      arrayRecipesByEachTag.splice(indexTagClosed, 1); // Enlever le tableau contenant la liste de recettes (id) du tag fermé
      // updateAdvancedSearch(); // Filtrer les id communs à chaque tag et actualise les recettes sélectionnées
      // SI faute de frappe ou terme inconnu dans la recherche simple,
      if (error === true) {
        removeCards(); // ALORS effacer toutes les recettes
        // arrayRecipesByEachTag.splice(indexTagClosed, 1); 
        // console.log("ERROR close arrayRecipesByEachTag", arrayRecipesByEachTag);
        updateAdvancedSearch(); // Filtrer les id communs à chaque tag et actualiser les recettes sélectionnées
        // arrayIdAdvancedSearch = []; // réinitialiser la recheche avancée
        // document.querySelectorAll(".tag").map(tag => tag.remove());
        // document.querySelectorAll(".tag").forEach((tag) => tag.remove());
        // SINON enlever les recettes (id) du tag fermé de la mémoire "arrayRecipesByEachTag"
      } else {
        // console.log("avant SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag);
        // arrayRecipesByEachTag.splice(indexTagClosed, 1);
        // console.log("après SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag);
        updateAdvancedSearch(); // Filtrer les id communs à chaque tag et actualise les recettes sélectionnées
        // searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
        // SI il n'y a aucun tag et que la recherche simple ne donne rien
        if (
          document.querySelectorAll(".tag").length == 0 &&
          arrayIdSimpleSearch.length == 0
        ) {
          myData.forEach((recipe) => {
            recipeCardsFactorie(recipe); // Réafficher toutes les recettes
          });
          initArraysLists(); // Initialiser les listes de recherche avancée
          threeTypeTagsListener(); // Ecouter clic sur un tag et afficher le tag
          // SINON chercher les recettes en commun des tags restants dans la mémoire "arrayRecipesByEachTag"
          // EN COURS DE REPARATION
        } else {
          updateAdvancedSearch(); // Filtrer les id communs à chaque tag et actualise les recettes sélectionnées
          // console.log("arrayIdSelectedFusion", arrayIdSelectedFusion);
          refreshCards(); // Afficher es recettes trouvées par la recherche
          updateLists(); // mise à jour des listes de la recherche avancée
          threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
        }
      }
    });
  });
}

// Recherche les tags dans les listes de la recherche avancée,
// croise le tableau des recettes sélectionnées (id) dans la recherche avancée
// avec celui de la recherche simple
// et ne garde que les recettes en commun
export function searchTagInListsAndCrossArrayId() {
  let arraySelected = []; // tableau des recettes (id) du tag sélectionné
  let arraySuperSelected = []; // tableau contenant les tableaux des recettes (id) de chaque tag sélectionné

  // SI il n'y a pas de tags, afficher  les recettes et listes de la recherche simple
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
    // SINON chercher les recettes incluant les tags sélectionnés
    // console.log("arrayTagsSelected", arrayTagsSelected);
    [...new Set(arrayTagsSelected)].forEach((tag) => {
      arraySelected = [];
      allRecipesAdvancedSearch.forEach((recipe) => {
        // Rechercher le tag saisie dans chaque recette
        recipe.forEach((element) => {
          // SI le tag sélectionné est dans la recette
          // console.log("Test", tag, element, stringUpperCaseFirst(element).includes(tag));
          if (
            element.includes(tag.toLowerCase()) ||
            stringUpperCaseFirst(element).includes(tag)
          ) {
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(recipe[0]);
          }
        });
        // console.log("arraySelected", arraySelected);
      });
      arraySuperSelected.push([...new Set(arraySelected)]); // Ajouter tableau des recettes x (id) du tag sélectionné 
      // console.log("ELSE arraySelected", arraySelected);
      // console.log("ELSE arraySuperSelected", arraySuperSelected);
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });
    // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
    // SI il y a 1 tag
    if (document.querySelectorAll(".tag").length == 1) {
      arrayIdAdvancedSearch = arraySelected; // La recherche avancée correspond à la première recherche de tag
      // Sélectionner les recettes communes à la recherche simple et à la recherche avancée
      arrayIdSelectedFusion = searchCommonId(arrayIdSimpleSearch, [
        ...new Set(arrayIdAdvancedSearch),
      ]);
      arrayRecipesByEachTag = arraySuperSelected; // Affecter tableau contenant la liste de recettes (id) pour chaque Tag
      // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
      updateLists(); // Mettre à jour des listes de la recherche avancée
      refreshCards(); // Afficher les recettes communes à la recherche simple et à la recherche avancée
    }
    // SI il y a plus d'un tag
    if (document.querySelectorAll(".tag").length > 1) {
      // console.log("arraySuperSelected.length >>>1", arraySuperSelected);
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // console.log("arraySuperSelected", arraySuperSelected);
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // Rechercher des id communs entre la précédente recherche avancée et la nouvelle
      tempTab = arrayIdAdvancedSearch.filter((x) =>
        arraySuperSelected[arraySuperSelected.length - 1].includes(x)
      );
      // console.log("tempTab", tempTab);
      arrayIdAdvancedSearch = tempTab; // Mémoriser le résultat de la recherche des id communs entre la précédente recherche avancée et la nouvelle
      // console.log("searchTag PUSH !!!!");
      arrayRecipesByEachTag = arraySuperSelected; // Mémoriser tableau contenant la liste de recettes (id) pour chaque Tag
      // arrayRecipesByEachTag.push(arrayIdAdvancedSearch); // Mémorisation de la liste des recettes ppour chaque tag
      // console.log(">1 | arrayRecipesByEachTag", arrayRecipesByEachTag);
      // Actualiser les recettes communes à la recherche simple et à la recherche avancée
      arrayIdSelectedFusion = searchCommonId(
        arrayIdSimpleSearch,
        arrayIdAdvancedSearch
      );
      // console.log(">1 | arrayIdSimpleSearch", arrayIdSimpleSearch);
      // console.log(">1 | arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      updateLists(); // Mettre à jour des listes de la recherche avancée
      refreshCards(); // Afficher les recettes communes à la recherche simple et à la recherche avancée
    }
  }
}

// Détecter la saisie dans un champ de recherche avancée et recherches de l'expression dans la liste associée
export function tagsInput() {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          // console.log("a", e.target.value);
          // Afficher la liste mise à jour
          displayLists(
            // Recherche de l'expression saisie dans la liste
            // Retourne la liste des items (tags) à afficher dans la liste
            searchWordInList(e.target.value, ingredientsListFilter),            
            ingredientsListDom
          );
          classDom = document.querySelectorAll(".ingredientsList > .itemList");
          // Ecouter clic sur les items des listes (tags),
          // Afficher les tags, Effacer la saisie dans les inputs de recherche avancée
          tagsListenerAndDisplay(classDom, "ingredientsColor");
          break;

        case "appliancesInput":
          // console.log("b", e.target.value);
          displayLists(
            searchWordInList(e.target.value, appliancesListFilter),
            appliancesListDom
          );
          // // console.log("ingredientsItem", ingredientsItem);
          classDom = document.querySelectorAll(".appliancesList > .itemList");
          tagsListenerAndDisplay(classDom, "appliancesColor");
          break;

        case "utensilsInput":
          // console.log("c", e.target.value);
          displayLists(
            searchWordInList(e.target.value, utensilsListFilter),
            utensilsListDom
          );
          classDom = document.querySelectorAll(".utensilsList > .itemList");
          tagsListenerAndDisplay(classDom, "utensilsColor");
          break;
        default:
      }
    });
  });
}

// Recherche de l'expression saisie (barre de recherche avancée) dans la liste
// Retourne la liste des items (tags) à afficher dans la liste
function searchWordInList(valueInput, tagsList) {
  let arraySelectedTags = []; // Initialiser le tableau des recettes sélectionnées
  // console.log(valueInput);
  tagsList.forEach((tag) => { // Rechercher l'expression dans la liste actuelle
    if (
      tag.includes(valueInput) ||
      tag.includes(
        stringNoAccent(valueInput.charAt(0)).toUpperCase() +
          valueInput.substring(1)
      )
    ) {
      arraySelectedTags.push(tag);
    }
  });
  tagsList = arraySelectedTags;
  // console.log("tagsList", tagsList);
  return tagsList;
}