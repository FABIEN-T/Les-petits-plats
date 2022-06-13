import { stringUpperCaseFirst } from "./functions.js"; // Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { stringNoAccent } from "./functions.js";

let ingredientsTagsList = [];
let appliancesTagsList = [];
let utensilsTagsList = [];
let classDom = "";
const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");
// const ingredientsItem = document.querySelectorAll(".ingredientsList > .itemList");
// console.log("ingredientsItem 1", ingredientsItem);

// Initialisations des listes de tags
export function initTagsArrays(data) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];

  Array.from(data).forEach((element) => {
    // pour chaque "ingedients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
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

  filterAndDisplay(ingredientsTags, appliancesTags, utensilsTags);
  // classDom = document.querySelectorAll(".ingredientsList > .itemList");
  // tagsListener(classDom, "ingredientsColorTag");
  // classDom = document.querySelectorAll(".appliancesList > .itemList");
  // tagsListener(classDom, "appliancesColorTag");
  // classDom = document.querySelectorAll(".utensilsList > .itemList");
  // tagsListener(classDom, "utensilsColorTag");
  threeTypeTagsListener();
}

// Recherche avancée : mise à jour de la liste de tags en fonction de la saisie
export function advancedSearch(data, arraySelectedFilter) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];
  // Création des listes filtrées à partir du tableau des recttes sélectionnées
  arraySelectedFilter.forEach((i) => {
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
  filterAndDisplay(ingredientsTags, appliancesTags, utensilsTags);
}

const inputsTags = document.querySelectorAll(".tagsDropdownInput");

// Détection du type de recherche avancée, affichage et recherche du mot
export function tagsInput() {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          console.log("a", e.target.value);
          displayTagsList(
            searchWordInList(e.target.value, ingredientsTagsList),
            ingredientsListDom
          );
          console.log(
            "truc",
            document.querySelectorAll(".ingredientsList > .itemList")
          );
          classDom = document.querySelectorAll(".ingredientsList > .itemList");
          tagsListener(classDom, "ingredientsColorTag");
          break;

        case "appliancesInput":
          console.log("b", e.target.value);
          displayTagsList(
            searchWordInList(e.target.value, appliancesTagsList),
            appliancesListDom
          );
          // // console.log("ingredientsItem", ingredientsItem);
          classDom = document.querySelectorAll(".appliancesList > .itemList");
          tagsListener(classDom, "appliancesColorTag");
          break;

        case "utensilsInput":
          console.log("c", e.target.value);
          displayTagsList(
            searchWordInList(e.target.value, utensilsTagsList),
            utensilsListDom
          );
          classDom = document.querySelectorAll(".utensilsList > .itemList");
          tagsListener(classDom, "utensilsColorTag");
          break;
        default:
      }
    });
  });
}

tagsInput();

// Affichage de la liste mise à jour
function displayTagsList(arrayList, classDom) {
  Array.from(classDom.children).forEach((tag) => {
    tag.remove();
  });
  arrayList.forEach((element) => {
    classDom.innerHTML += `<p class="itemList">${element}</p>`;
  });
}

// Recherche de l'expression saisie dans la liste de tags
function searchWordInList(valueInput, tagsList) {
  let arraySelectedTags = []; // initialisation du tableau des recettes sélectionnées
  console.log(valueInput);
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
  console.log("tagsList", tagsList);
  return tagsList;
}



function filterAndDisplay(ingredientsTags, appliancesTags, utensilsTags) {
  ingredientsTagsList = [...new Set(ingredientsTags)].sort();
  appliancesTagsList = [...new Set(appliancesTags)].sort();
  utensilsTagsList = [...new Set(utensilsTags)].sort();
  displayTagsList(ingredientsTagsList, ingredientsListDom);
  displayTagsList(appliancesTagsList, appliancesListDom);
  displayTagsList(utensilsTagsList.sort(), utensilsListDom);
}

// Affichage des tags

export function tagsListener(classDom, classColor) {
  console.log("classDom", classDom);
  classDom.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      console.log("listener ingredientsList");
      document.querySelector(".tagsContainer").innerHTML += `
      <div class="tag ${classColor}">
        <p>${e.target.innerHTML}</p>
        <em class="far fa-times-circle"></em>
      </div>`;
      closeTagsListener();
    });
  });
}

export function closeTagsListener() {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    // console.log(item);
    item.addEventListener("mousedown", (e) => {
      console.log("close", e.target);
      e.target.closest(".tag").remove();
    });
  });
}

export function threeTypeTagsListener() {
  classDom = document.querySelectorAll(".ingredientsList > .itemList");
  tagsListener(classDom, "ingredientsColorTag");
  classDom = document.querySelectorAll(".appliancesList > .itemList");
  tagsListener(classDom, "appliancesColorTag");
  classDom = document.querySelectorAll(".utensilsList > .itemList");
  tagsListener(classDom, "utensilsColorTag");
}












// export function tagsListener() {
//   // console.log("1", document.querySelectorAll(".ingredientsList > .itemList"));
//   // console.log(classDom);
//   // console.log(`"${classDom}"`);
//   // let bidule = `"${classDom}"`;
//   document.querySelectorAll(".ingredientsList > .itemList").forEach(item => {

//     item.addEventListener("mousedown", (e) => {
//       console.log("listener ingredientsList");
//       // console.log("clic", e.target.innerHTML);
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag ingredientColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })
//   document.querySelectorAll(".appliancesList > .itemList").forEach(item => {
//     item.addEventListener("mousedown", (e) => {
//       // console.log("clic", e.target.innerHTML);
//       console.log("listener .appliancesListt");
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag appliancesColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })
//   document.querySelectorAll(".utensilsList > .itemList").forEach(item => {
//     item.addEventListener("mousedown", (e) => {
//       // console.log("clic", e.target.innerHTML);
//       console.log("listener .utensilsList");
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag ustensilsColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })

// }
