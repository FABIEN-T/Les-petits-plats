import { stringUpperCaseFirst } from "./functions.js"; // Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { stringNoAccent } from "./functions.js";

import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
import { simpleSearch } from "./searchBar.js";
import { removeCards } from "./functions.js";
import { refreshCards } from "./functions.js";
import { messageNoRecipe } from "./functions.js";

let ingredientsTagsList = [];
let appliancesTagsList = [];
let utensilsTagsList = [];
let classDom = "";
let tampon = [];
let tampon2 = [];
// let arrayTagsSelected = [];

const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");

// const ingredientsItemListDom = document.querySelectorAll(
//   ".ingredientsList > .itemList"
// );
// const appliancesItemListDom = document.querySelectorAll(
//   ".appliancesList > .itemList"
// );
// const utensilsItemListDom = document.querySelectorAll(
//   ".utensilsList > .itemList"
// );

const inputsTags = document.querySelectorAll(".tagsDropdownInput");

// Initialisations des listes de recherche avancée
export function initArraysLists(data) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];

  Array.from(data).forEach((element) => {
    // pour chaque "ingrédients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      // console.log(element.id);
      ingredientsTags.push(stringUpperCaseFirst(el.ingredient));
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    appliancesTags.push(element.appliance);

    // pour chaque "utensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      utensilsTags.push(stringUpperCaseFirst(el)); // Mettre en majuscule la première lettre du premier mot et enlever les accents
    });
  });

  filterAndDisplayLists(ingredientsTags, appliancesTags, utensilsTags);
  // console.log(ingredientsTags, appliancesTags, utensilsTags);
  // threeTypeTagsListener();
}

// Recherche avancée : mise à jour de la liste de tags en fonction de la saisie
export function updateLists(data) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];
  // console.log("TAG", arraySelectedFilter);
  // Création des listes filtrées à partir du tableau des recttes sélectionnées
  arraySelectedFilter.forEach((i) => {
    console.log(parseInt(i, 10));
    data[parseInt(i, 10) - 1].ingredients.forEach((el) => {
      ingredientsTags.push(stringUpperCaseFirst(el.ingredient));
    });
    appliancesTags.push(
      stringUpperCaseFirst(data[parseInt(i, 10) - 1].appliance)
    );
    data[parseInt(i, 10) - 1].ustensils.forEach((el) => {
      utensilsTags.push(stringUpperCaseFirst(el));
    });
  });
  filterAndDisplayLists(ingredientsTags, appliancesTags, utensilsTags);
  threeTypeTagsListener(data);
  console.log("update");
}

// Ecoute du clic sur les items des listes et Affichage des tags
function tagsListenerAndDisplay(data, classDom, classColor) {
  // console.log("TAG arraySelectedFilter", arraySelectedFilter);
  // let arrayTagsSelected = []; 
  classDom.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      document.querySelector(".tagsContainer").innerHTML += `
      <div class="tag ${classColor}">
        <p>${e.target.innerHTML}</p>
        <em class="far fa-times-circle"></em>
      </div>`;
      // debugger
      closeTagsListener(data);

      // console.log(".tag IN", document.querySelectorAll(".tag").length);
      arrayTagsSelected.push(e.target.innerHTML);
      // console.log("IN", arrayTagsSelected);
      sortBySubList(data);
      // refreshCards(data, arraySelectedFilter);
      allRecipesArray2.forEach((el) => {
        // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
        el.forEach((row) => {
          // SI l'expression saisie est contenue dans la recette
          if (row.includes(e.target.innerHTML)) {
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(el[0]);
            // et enlever les doublons
            arraySelectedFilter = arraySelected.filter((item, index) => {
              return arraySelected.indexOf(item) === index;
            });
          }
        });
      });
      console.log("TAGS", arraySelectedFilter);
      // updateLists(data, arraySelectedFilter);
    });
  });
  
} 

// Lors clic sur la croix : effacement du tag de la page html et du Dom
function closeTagsListener(data) {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    // console.log(item);
    item.addEventListener("mousedown", (e) => {
      // console.log("close", e.target);
      e.target.closest(".tag").remove();
      let closedTag = e.target.closest(".tag").children[0].innerText;
      // console.log("closedTag", closedTag);
      arrayTagsSelected = arrayTagsSelected.filter((x) => x !== closedTag);
      console.log("OUT", arrayTagsSelected);
      threeTypeTagsListener(data);
      sortBySubList(data);
      console.log("close");
    });
  });
}

// Détection du type de recherche avancée, recherche du mot
export function tagsInput(data) {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          console.log("a", e.target.value);
          displayLists(
            searchWordInList(e.target.value, ingredientsTagsList),
            ingredientsListDom
          );
          classDom = document.querySelectorAll(".ingredientsList > .itemList");
          tagsListenerAndDisplay(data, classDom, "ingredientsColorTag");
          break;

        case "appliancesInput":
          console.log("b", e.target.value);
          displayLists(
            searchWordInList(e.target.value, appliancesTagsList),
            appliancesListDom
          );
          // // console.log("ingredientsItem", ingredientsItem);
          classDom = document.querySelectorAll(".appliancesList > .itemList");
          tagsListenerAndDisplay(data, classDom, "appliancesColorTag");
          break;

        case "utensilsInput":
          console.log("c", e.target.value);
          displayLists(
            searchWordInList(e.target.value, utensilsTagsList),
            utensilsListDom
          );
          classDom = document.querySelectorAll(".utensilsList > .itemList");
          tagsListenerAndDisplay(data, classDom, "utensilsColorTag");
          break;
        default:
      }
    });
  });
}

// Recherche de l'expression saisie dans la liste (recherche avancée)
function searchWordInList(valueInput, tagsList) {
  let arraySelectedTags = []; // initialisation du tableau des recettes sélectionnées
  // console.log(valueInput);
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

// Elémination des doublons, tri alphabétique et appel des fonctions d'affichage des listes
function filterAndDisplayLists(ingredientsTags, appliancesTags, utensilsTags) {
  ingredientsTagsList = [...new Set(ingredientsTags)].sort();
  appliancesTagsList = [...new Set(appliancesTags)].sort();
  utensilsTagsList = [...new Set(utensilsTags)].sort();
  displayLists(ingredientsTagsList, ingredientsListDom);
  displayLists(appliancesTagsList, appliancesListDom);
  displayLists(utensilsTagsList, utensilsListDom);
  console.log("Listes", ingredientsTagsList.length, appliancesTagsList.length, utensilsTagsList.length);
}

// Affichage de la liste mise à jour
function displayLists(arrayList, classDom) {
  Array.from(classDom.children).forEach((tag) => {
    tag.remove();
  });
  arrayList.forEach((element) => {
    classDom.innerHTML += `<p class="itemList">${element}</p>`;
  });
}

export function threeTypeTagsListener(data) {
  // tagsListenerAndDisplay(ingredientsItemListDom, "ingredientsColorTag");
  // tagsListenerAndDisplay(appliancesItemListDom, "appliancesColorTag");
  // tagsListenerAndDisplay(utensilsItemListDom, "utensilsColorTag");
  classDom = document.querySelectorAll(".ingredientsList > .itemList");
  tagsListenerAndDisplay(data, classDom, "ingredientsColorTag");
  classDom = document.querySelectorAll(".appliancesList > .itemList");
  tagsListenerAndDisplay(data, classDom, "appliancesColorTag");
  classDom = document.querySelectorAll(".utensilsList > .itemList");
  tagsListenerAndDisplay(data, classDom, "utensilsColorTag");
  // const tag = document.querySelectorAll(".tag");
  //     tag.forEach((el) => {
  //       return el;
  //     });
  tagsInput(data);
}

function sortBySubList(data) {
  console.log("1_sortBySubList", arrayTagsSelected);
  let arraySelected = [];

  if (document.querySelectorAll(".tag").length == 0) {
    tampon = [];
    tampon2 = [];
    console.log(document.querySelectorAll(".tag").length);
    removeCards();
    Array.from(data).forEach((recipe) => {
      recipeCardsFactorie(recipe);
    });
    initArraysLists(data);
    threeTypeTagsListener(data);
  } else {
    console.log("arrayTagsSelected Sort", arrayTagsSelected);
    arrayTagsSelected.forEach((tag) => {
      // console.log("tag", tag.toLowerCase());
      allRecipesArray2.forEach((el) => {
        // initialisation du tableau des recettes sélectionnées
        // Rechercher l'expression saisie dans  "name - ingredient - description" de chaque recette
        el.forEach((row) => {
          // SI l'expression saisie est contenue dans la recette
          if (row.includes(tag.toLowerCase())) {
            // console.log(row.includes(tag.toLowerCase()));
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(el[0]);
            // console.log("push0", arraySelected);
            tampon2 = arraySelected.filter((item, index, array) => {
              return array.indexOf(item) !== index;
            });
            // console.log("pré tampon2", arraySelected, tampon2)
            // et enlever les doublons
          }
        });
      });

      if (document.querySelectorAll(".tag").length == 1) {
        arraySelectedFilter = arraySelected;
        console.log("++++++++++");
        console.log("length == 1", arraySelectedFilter);
        console.log("-----------");
        
      }
      if (document.querySelectorAll(".tag").length == 2) {
        console.log("*********");
        console.log("length == 2", arraySelectedFilter);
        // console.log(arraySelectedFilter);
        console.log("-----------");
        let machin = arraySelected.filter((item, index, array) => {
          return array.indexOf(item) !== index;
        });
        // console.log("filter", machin);
        // arraySelectedFilter = arraySelected.filter((item, index) => {
        //   return arraySelected.indexOf(item) === index;
        // });
        arraySelectedFilter = [...new Set(machin)].sort(function (a, b) {
          return a - b;
        });
        tampon = arraySelectedFilter;
      }
      if (document.querySelectorAll(".tag").length > 2) {
        console.log("tampon", tampon);
        console.log("tampon2", tampon2);
        // console.log("OLD arraySelectedFilter", arraySelectedFilter);

        // arraySelected = arraySelected.concat(tampon);
        // console.log("Fin_arraySelected", arraySelected);
        // let machin = arraySelected.filter((item, index, array) => {
        //   return array.indexOf(item) !== index;
        // });
        // arraySelectedFilter = [...new Set(machin)].sort(function(a, b){
        //   return a - b;
        // });
        let enfin = tampon.concat(tampon2);
        console.log("enfin", enfin);
        enfin.filter((item, index, array) => {
          return array.indexOf(item) !== index;
        });
        arraySelected = enfin;
        console.log("Fin_arraySelected", arraySelected);
      }
      updateLists(data);
      console.log("2_sortBySubList", arraySelectedFilter);
      refreshCards(data, arraySelectedFilter);
    });
  }
}
