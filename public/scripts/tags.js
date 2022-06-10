import { stringUpperCaseFirst } from "./functions.js"; // Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale
import { stringNoAccent } from "./functions.js";
// let ingredientsTagsSorted = [];
// let appliancesTagsSorted = [];
// let utensilsTagsSorted = [];
const ingredientsListDom = document.querySelector(".ingredientsList");
const appliancesListDom = document.querySelector(".appliancesList");
const utensilsListDom = document.querySelector(".utensilsList");
let ingredientsTagsList = [];
let appliancesTagsList = [];
let utensilsTagsList = [];

export function initTagsArrays(data) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];

  Array.from(data).forEach((element) => {
    // pour chaque "ingedients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      ingredientsTags.push(stringUpperCaseFirst(el.ingredient));
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    appliancesTags.push(element.appliance);

    // pour chaque "utensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      utensilsTags.push(stringUpperCaseFirst(el)); // Mettre en majuscule la première lettre du premier mot et enlever les accents
    });
  });

  ingredientsTagsList = [...new Set(ingredientsTags)].sort();
  appliancesTagsList = [...new Set(appliancesTags)].sort();
  utensilsTagsList = [...new Set(utensilsTags)].sort();
  
  console.log("34", appliancesTagsList);

  displayTagsList([...new Set(ingredientsTags)].sort(), ingredientsListDom);
  displayTagsList([...new Set(appliancesTags)].sort(), appliancesListDom);
  displayTagsList([...new Set(utensilsTags)].sort(), utensilsListDom);

  // return {ingredientsTagsSorted, appliancesTagsSorted, utensilsTagsSorted};
}

export function match(data, arraySelectedFilter) {
  let ingredientsTags = [];
  let appliancesTags = [];
  let utensilsTags = [];
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
  console.log("match ingredientsTags", [...new Set(ingredientsTags)].sort());
  console.log("appliancesTags", [...new Set(appliancesTags)].sort());
  // console.log("utensilsTags", [...new Set(utensilsTags)].sort());
  ingredientsTagsList = [...new Set(ingredientsTags)].sort();
  displayTagsList([...new Set(ingredientsTags)].sort(), ingredientsListDom);
  displayTagsList([...new Set(appliancesTags)].sort(), appliancesListDom);
  displayTagsList([...new Set(utensilsTags)].sort(), utensilsListDom);
}

function displayTagsList(arrayList, classDom) {
  Array.from(classDom.children).forEach((tag) => {
    tag.remove();
  });
  arrayList.forEach((element) => {
    classDom.innerHTML += `<p class="itemList">${element}</p>`;
  });
}

const inputsTags = document.querySelectorAll(".tagsDropdownInput");
function tagsInput() {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          console.log("a", e.target.value);
          console.log(ingredientsTagsList);
          // let bidule = searchWordInTags(e.target.value, ingredientsTagsList);
          displayTagsList(searchWordInTags(e.target.value, ingredientsTagsList), ingredientsListDom);
          break;
        case "appliancesInput":
          console.log("b", e.target.value);
          displayTagsList(searchWordInTags(e.target.value, appliancesTagsList), appliancesListDom);
          break;
        case "utensilsInput":
          console.log("c", e.target.value);
          displayTagsList(searchWordInTags(e.target.value, utensilsTagsList), utensilsListDom);
          break;
        default:
      }
    });
  });
}

tagsInput();

function searchWordInTags(valueInput, tagsList) {
  let arraySelectedTags = []; // initialisation du tableau des recettes sélectionnées
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
  return tagsList;
}
