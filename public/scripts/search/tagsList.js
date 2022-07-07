import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import { stringUpperCaseFirst, stringNoAccent, removeCards, refreshCards, searchCommonId } from "../utils/functions.js"; // Enlève l'accent sur la première lettre du mot et mise en capitale
import { tagsListenerAndDisplay } from "./tagsSearch.js";
import { tagsInput } from "./tagsInput.js";

// let arrayRecipesByEachTag = []; // garde en mémoire la liste de recettes (id) pour chaque Tag
// let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
// let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
// let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
// let classDom = ""; // type de liste (ingredients, appliances, utensils)
// let indexTagClosed = 0; // variable récupérant l'indice du tag fermé
// let tempTab = []; // tableau tampon
let arrayTagsSelected = [];

const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");

// const inputsTags = document.querySelectorAll(".dropdownInput");

// Initialisations des listes de recherche avancée
export function initArraysLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];

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
      utensilsList.push(stringUpperCaseFirst(el)); // Mettre en majuscule la première lettre du premier mot et enlever les accents
    });
  });

  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList); // mets à jour, filtre et affiche les listes
  // console.log(ingredientsList, appliancesList, utensilsList);
}

// Recherche avancée : mise à jour de la liste de tags en fonction de la saisie (recherche simple)
export function updateLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];

  // Création des listes filtrées à partir du tableau des recttes sélectionnées
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
  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList);
  threeTypeTagsListener();
}

// Filtrage (enlève les doublons, trie par oredre alphatbétique) et Appel des fonctions d'affichage des listes
function filterAndDisplayLists(ingredientsList, appliancesList, utensilsList) {
  ingredientsListFilter = [...new Set(ingredientsList)].sort();
  appliancesListFilter = [...new Set(appliancesList)].sort();
  utensilsListFilter = [...new Set(utensilsList)].sort();
  //Suppression du tag sélectionné de la liste
  arrayTagsSelected.forEach(tagSelected => {
    if (ingredientsListFilter.includes(tagSelected)) {
      ingredientsListFilter = ingredientsListFilter.filter(x => x !== tagSelected);
    }
    if (appliancesListFilter.includes(tagSelected)) {
      appliancesListFilter = appliancesListFilter.filter(x => x !== tagSelected);
    }
    if (utensilsListFilter.includes(tagSelected)) {
      utensilsListFilter = utensilsListFilter.filter(x => x !== tagSelected);
    }
  }) 
  displayLists(ingredientsListFilter, ingredientsListDom); // ingredientsListDom = document.querySelector(".ingredientsList");
  displayLists(appliancesListFilter, appliancesListDom);
  displayLists(utensilsListFilter, utensilsListDom);
}

// Affichage de la liste mise à jour
export function displayLists(arrayList, classDom) {
  Array.from(classDom.children).forEach((item) => {
    item.remove(); // réinitialisation : efface tous les items
  });
  arrayList.forEach((item) => {
    classDom.innerHTML += `<p class="itemList">${item}</p>`; // ajoute dans le dom et affice chaque item de la liste passée en paramètre
  });
}

// Ecoute du clic sur un tag en fonction du type et affichage
export function threeTypeTagsListener() {
  classDom = document.querySelectorAll(".ingredientsList > .itemList");
  tagsListenerAndDisplay(classDom, "ingredientsColor");
  classDom = document.querySelectorAll(".appliancesList > .itemList");
  tagsListenerAndDisplay(classDom, "appliancesColor");
  classDom = document.querySelectorAll(".utensilsList > .itemList");
  tagsListenerAndDisplay(classDom, "utensilsColor");
  tagsInput();
}

