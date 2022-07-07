import { recipeCardsFactorie } from "../utils/recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import { stringUpperCaseFirst, stringNoAccent, removeCards, refreshCards, searchCommonId } from "../utils/functions.js"; // Enlève l'accent sur la première lettre du mot et mise en capitale
import { tagsListenerAndDisplay } from "./tagsSearch.js";
import { displayLists } from "./tagsList.js";

// let arrayRecipesByEachTag = []; // garde en mémoire la liste de recettes (id) pour chaque Tag
// let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
// let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
// let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
// let classDom = ""; // type de liste (ingredients, appliances, utensils)
// let indexTagClosed = 0; // variable récupérant l'indice du tag fermé
// let tempTab = []; // tableau tampon
// let arrayTagsSelected = [];

const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");

const inputsTags = document.querySelectorAll(".dropdownInput");


// Détection du type de recherche avancée, recherche du mot
export function tagsInput() {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          console.log("A", ingredientsListFilter);
          console.log("a", e.target.value);
          displayLists(
            searchWordInList(e.target.value, ingredientsListFilter),
            ingredientsListDom
          );
          classDom = document.querySelectorAll(".ingredientsList > .itemList");
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

// Recherche de l'expression saisie (dans la barre de recherche avancée) dans la liste
function searchWordInList(valueInput, tagsList) {
  let arraySelectedTags = []; // initialisation du tableau des recettes sélectionnées
  console.log("searchWordInList", tagsList);
  tagsList.forEach((tag) => {
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