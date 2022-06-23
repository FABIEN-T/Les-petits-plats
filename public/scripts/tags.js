import { stringUpperCaseFirst } from "./functions.js"; // Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { stringNoAccent } from "./functions.js";

import { recipeCardsFactorie } from "./recipeCardsFactorie.js";
import { simpleSearch } from "./searchBar.js";
import { removeCards } from "./functions.js";
import { refreshCards } from "./functions.js";
// import { messageNoRecipe } from "./functions.js";
import { searchCommonId } from "./functions.js";

let ingredientsTagsList = [];
let appliancesTagsList = [];
let utensilsTagsList = [];
let classDom = "";
let tampon = [];
let tampon2 = [];
let tampon3 = [];
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
  filterAndDisplayLists(ingredientsTags, appliancesTags, utensilsTags); // mets à jour, filtre et affiche les listes
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
  // arraySelectedFusion = searchCommonId(
  //   arraySelectedFilter,
  //   arraySelectedFilter2
  // );
  // console.log("!!!!!!!!!!!");
  // console.log("updateLists", arraySelectedFilter, arraySelectedFilter2);
  // console.log("!!!!!!!!!!!");
  arraySelectedFusion.forEach((i) => {
    // console.log(parseInt(i, 10));
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
  // console.log("up", ingredientsTags, appliancesTags, utensilsTags);
  filterAndDisplayLists(ingredientsTags, appliancesTags, utensilsTags);
  threeTypeTagsListener(data);
  // console.log("update");
}

// Ecoute du clic sur les items des listes et Affichage des tags
function tagsListenerAndDisplay(data, classDom, classColor) {
  
  classDom.forEach((item) => {
    item.addEventListener("mousedown", (e) => {      
      // console.log("TagsListener arrayTagsSelected", arrayTagsSelected);
      if (!arrayTagsSelected.includes(e.target.innerHTML)) {  
      document.querySelector(".tagsContainer").innerHTML += `
      <div class="tag ${classColor}">
        <p>${e.target.innerHTML}</p>
        <em class="far fa-times-circle"></em>
      </div>`;
      closeTagsListener(data); 
      document.getElementById("form").reset();  
      arrayTagsSelected.push(e.target.innerHTML);
      // console.log("110 arrayTagsSelected", arrayTagsSelected);
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
            arraySelectedFilter2 = [...new Set(arraySelected)].sort();
          }
        });
      });
      // console.log("Selected-Listener", arraySelectedFilter, arraySelectedFilter2);
      // arraySelectedFusion = searchCommonId(
      //   arraySelectedFilter,
      //   arraySelectedFilter2
      // );
      // console.log("fusion listener", arraySelectedFusion);
      console.log("^^^^^^^^^^^^^^^^^^^");
      updateLists(data);
      refreshCards(data);
      // messageNoRecipe();
      // inputsTags.forEach(input => {
      //   console.log("input", input.id);
      //   input.id.reset();
      // })
      
    }
    });
  });
}

// Lors clic sur la croix : effacement du tag de la page html et du Dom
export function closeTagsListener(data) {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    // console.log(item);
    item.addEventListener("mousedown", (e) => {
      // console.log("close", e.target);
      e.target.closest(".tag").remove();
      let closedTag = e.target.closest(".tag").children[0].innerText;
      // console.log("closedTag", closedTag);
      arrayTagsSelected = arrayTagsSelected.filter((x) => x !== closedTag);
      console.log("error", error);
      if (error === true) {
        removeCards();
        arraySelectedFilter2 = [];
        // document.querySelectorAll(".tag").map(tag => tag.remove());
        document.querySelectorAll(".tag").forEach(tag => tag.remove());
      } else {
        sortBySubList(data);
      console.log("close arrayTagsSelected", arrayTagsSelected);
      console.log("close arraySelectedFilter1&2", arraySelectedFilter, arraySelectedFilter2);
      console.log("close arraySelectedFusion", arraySelectedFusion);
      console.log("length", document.querySelectorAll(".tag").length);
      // if (document.querySelectorAll(".tag").length == 0 && arraySelectedFilter.length == 0) {
      //   Array.from(data).forEach((recipe) => {
      //     recipeCardsFactorie(recipe);
      //     initArraysLists(data);
      //     threeTypeTagsListener(data);
      //   });
      // } else {
      
      threeTypeTagsListener(data);
      }          
      
      // }
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

// Recherche de l'expression saisie (dans la barre de recherche avancée) dans la liste
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
    ) { arraySelectedTags.push(tag); }
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
  // console.log("Listes", ingredientsTagsList.length, appliancesTagsList.length, utensilsTagsList.length);
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
  // console.log("1_sortBySubList", arrayTagsSelected);
  // console.log("in to");
  let arraySelected = [];
  let arraySuperSelected = [];

  // Si il n'y a pas de tags, réinitialiser l'affichage de toutes les recettes et listes
  if (document.querySelectorAll(".tag").length == 0) {
    console.log("sort 0 arrayTagsSelected", arrayTagsSelected, arraySelectedFilter2);
    arraySelectedFilter2 =[];
    // arraySelectedFusion = searchCommonId(
    //   arraySelectedFilter,
    //   arraySelectedFilter2
    // );
    tampon = [];
    tampon2 = [];
    tampon3 = [];
    console.log(document.querySelectorAll(".tag").length);
    // arraySelectedFilter = [];
    removeCards();
    Array.from(data).forEach((recipe) => {
      recipeCardsFactorie(recipe);
    });
    initArraysLists(data);
    threeTypeTagsListener(data);
    arraySelectedFusion = searchCommonId(
      arraySelectedFilter,
      arraySelectedFilter2
    );
    if (arraySelectedFilter.length == 0) {
      Array.from(data).forEach((recipe) => {
        recipeCardsFactorie(recipe);
      });
    }
    else {
      refreshCards(data);
    }
    console.log("sort 0 arrayTagsSelected", arrayTagsSelected, arraySelectedFilter2, arraySelectedFusion);
  } else {
    // SINON chercher les recettes incluant le tag
    
    // Créer un tableau avec les id des recettes incluant le tag
    [...new Set(arrayTagsSelected)].forEach((tag) => {
      // console.log("tag", tag);
      // console.log("Sort arrayTagsSelected", [...new Set(arrayTagsSelected)]);
      arraySelected = [];
      // console.log("tag", tag.toLowerCase());
      allRecipesArray2.forEach((el) => {
        // Rechercher le tag saisie dans chaque recette
        el.forEach((row) => {
          // SI l'expression saisie est contenue dans la recette
          if (row.includes(tag.toLowerCase())) {
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(el[0]);
          }
        });
      });
      arraySuperSelected.push(arraySelected);
      // console.log("ELSE arraySelected", arraySelected);
      // console.log("ELSE arraySuperSelected", arraySuperSelected);
    });
    if (document.querySelectorAll(".tag").length == 1) {
      arraySelectedFilter2 = arraySelected;
      // console.log("=1 | arraySelectedFilter2", arraySelectedFilter2);
      arraySelectedFusion = searchCommonId(
        arraySelectedFilter,
        arraySelectedFilter2
      );
      // console.log("=1 | arraySelectedFusion", arraySelectedFusion);
      updateLists(data);
      refreshCards(data);
    }
    if (document.querySelectorAll(".tag").length > 1) {
      // console.log("arraySuperSelected.length >>>1", arraySuperSelected.length-1);
      // for (
      //   let i = 0;
      //   // i < arraySuperSelected.length - (arraySuperSelected.length - 1);
      //   // i = 1;
      //   i++
      // ) {
        // console.log("count i", i);
        // tampon = arraySuperSelected[0].filter((x) =>
        //   arraySuperSelected[1].includes(x)
        // );
        console.log("arraySelected", arraySelected);
        console.log("arraySelectedFilter2", arraySelectedFilter2);
        console.log("arraySuperSelected", arraySuperSelected);
        console.log("tampon2", tampon2);
        tampon = arraySuperSelected[0].filter((x) =>
          arraySuperSelected[1].includes(x)
        );
        tampon = arraySelectedFilter2.filter((x) =>
          arraySuperSelected[arraySuperSelected.length - 1].includes(x)
        );
        // console.log("tampon", tampon, i);
        // console.log("arraySuperSelected.length", arraySuperSelected.length, arraySuperSelected.length - 1, arraySuperSelected.length - (arraySuperSelected.length - 1));
        console.log("arraySuperSelected", arraySuperSelected);
        console.log("tampon", tampon);
        // tampon2 = arraySelected.filter((x) => tampon.includes(x));
        // console.log("tampon2", tampon2);
      // }
      arraySelectedFilter2 = tampon;
      arraySelectedFusion = searchCommonId(
        arraySelectedFilter,
        arraySelectedFilter2
      );
      console.log(">1 | arraySelectedFilter", arraySelectedFilter);
      console.log(">1 | arraySelectedFilter2", arraySelectedFilter2);
      console.log(">1 | arraySelectedFusion", arraySelectedFusion);
      updateLists(data);
      refreshCards(data);
    }
  }
  
  // console.log("Sort End | arraySelectedFusion", arraySelectedFusion);
}






























// if (document.querySelectorAll(".tag").length > 2) {
//   console.log("arraySuperSelected.length >>>2", arraySuperSelected.length-(arraySuperSelected.length-1));
//     // console.log("arraySuperSelected[0]", arraySuperSelected[0]);
//     // console.log("arraySuperSelected[1]", arraySuperSelected[1]);
//     // tampon2 = arraySuperSelected[0].filter(x => arraySuperSelected[1].includes(x));
//     for (let i =0; i < arraySuperSelected.length-(arraySuperSelected.length-1); i++) {
//       tampon3 = arraySuperSelected[i].filter(x => arraySuperSelected[i+1].includes(x));
//       console.log("tampon3", tampon3, i);
//       console.log("arraySelected t3", arraySelected);
//       tampon2 = arraySelected.filter(x => tampon3.includes(x));
//       console.log("tampon2", tampon2);
//     }
//   arraySelectedFilter2 = tampon2;
// }
// tampon2 = arraySelected.filter(x => tampon.includes(x));
// tampon = arraySelected;
// console.log("tampon2", tampon2);
// console.log("tampon", tampon);
// let intersection = tampon2.filter(x => arraySelected.includes(x));
// console.log("intersection", [...new Set(intersection)]);
// console.log("arraySelected", arraySelected);

// if (document.querySelectorAll(".tag").length == 2) {
//   console.log("arraySelectedFilter2 =2", arraySelectedFilter2);
//   // console.log("*********");
//   // console.log("length == 2", arraySelectedFilter2);
//   // // console.log(arraySelectedFilter);
//   // console.log("*********");
//   // let intersection = array1.filter(x => array2.includes(x));
//   // console.log("intersection", intersection);
//   // console.log("tampon2", tampon2);
// console.log("%%%%%%%%%%%%%%%");
// console.log("arraySelected", arraySelected);
// // console.log("arraySelectedFilter2", arraySelectedFilter2);
// // console.log("tampon2", tampon2);
//   // let intersection = arraySelected.filter(x => tampon2.includes(x));

//   // console.log("intersection", intersection);
//   let machin = arraySelected.filter((item, index, array) => {
//     return array.indexOf(item) !== index;
//   });
//   // console.log("filter", machin);
//   // arraySelectedFilter = arraySelected.filter((item, index) => {
//   //   return arraySelected.indexOf(item) === index;
//   // });
//   arraySelectedFilter2 = [...new Set(machin)].sort(function (a, b) {
//     return a - b;
//   });
//   // tampon = arraySelectedFilter2;
//   // console.log("tampon", tampon);
// }
// if (document.querySelectorAll(".tag").length > 2) {
//   console.log("tampon >2", tampon);
//   console.log("tampon2 >2", tampon2);
//   // console.log("OLD arraySelectedFilter", arraySelectedFilter);

//   // arraySelected = arraySelected.concat(tampon);
//   // console.log("Fin_arraySelected", arraySelected);
//   // let machin = arraySelected.filter((item, index, array) => {
//   //   return array.indexOf(item) !== index;
//   // });
//   // arraySelectedFilter = [...new Set(machin)].sort(function(a, b){
//   //   return a - b;
//   // });
//   // highResult = intersection.filter(x => array3.includes(x))
//   // console.log("highResult", highResult);
//   let enfin = tampon.concat(tampon3);
//   console.log("enfin", enfin);
//   enfin.filter((item, index, array) => {
//     return array.indexOf(item) !== index;
//   });
//   arraySelected = enfin;
//   console.log("Fin_arraySelected", arraySelected);
// }
// arraySelectedFusion = searchCommonId(arraySelectedFilter, arraySelectedFilter2);
// updateLists(data);
// // console.log(",,,,,,,,,,,,,,,,,,,,");
// // console.log("Fin_sortBySubList", arraySelectedFilter, arraySelectedFilter2, arraySelectedFusion);
// // console.log(",,,,,,,,,,,,,,,,,,,,");
// refreshCards(data);
