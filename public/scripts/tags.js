import { stringUpperCaseFirst } from "./functions.js"; // Remplacement de l'accent sur prèmiere lettre du mot et mis en capitale

// let ingredientsTagsSorted = [];
// let applianceTagsSorted = [];
// let ustensilsTagsSorted = [];
const ingredientsList = document.querySelector(".ingredientsList");
const devicesList = document.querySelector(".devicesList");
const utensilsList = document.querySelector(".utensilsList");

export function initTagsArrays(data) {
  let ingredientsTags = [];
  let applianceTags = [];
  let ustensilsTags = [];

  Array.from(data).forEach((element) => {
    // pour chaque "ingedients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      ingredientsTags.push(stringUpperCaseFirst(el.ingredient));
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    applianceTags.push(element.appliance);

    // pour chaque "ustensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      ustensilsTags.push(stringUpperCaseFirst(el)); // Mettre en majuscule la première lettre du premier mot et enlever les accents
    });
  });

  // ingredientsTagsSorted = [...new Set(ingredientsTags)].sort();
  // applianceTagsSorted = [...new Set(applianceTags)].sort();
  // ustensilsTagsSorted = [...new Set(ustensilsTags)].sort();
  displayTagsList([...new Set(ingredientsTags)].sort(), ingredientsList);
  displayTagsList([...new Set(applianceTags)].sort(), devicesList);
  displayTagsList([...new Set(ustensilsTags)].sort(), utensilsList);

  // return {ingredientsTagsSorted, applianceTagsSorted, ustensilsTagsSorted};
}

export function match(data, arraySelectedFilter) {
  let ingredientsTags = [];
  let applianceTags = [];
  let ustensilsTags = [];
  arraySelectedFilter.forEach((i) => {
    data[parseInt(i, 10) - 1].ingredients.forEach((el) => {
      ingredientsTags.push(stringUpperCaseFirst(el.ingredient));
    });
    applianceTags.push(
      stringUpperCaseFirst(data[parseInt(i, 10) - 1].appliance)
    );
    data[parseInt(i, 10) - 1].ustensils.forEach((el) => {
      ustensilsTags.push(stringUpperCaseFirst(el));
    });
  });
  // console.log(
  //   "SB ingredientsTags",
  //   [...new Set(ingredientsTags)].sort()
  // );
  // console.log("applianceTags", [...new Set(applianceTags)].sort());
  // console.log("ustensilsTags", [...new Set(ustensilsTags)].sort());

  displayTagsList([...new Set(ingredientsTags)].sort(), ingredientsList);
  displayTagsList([...new Set(applianceTags)].sort(), devicesList);
  displayTagsList([...new Set(ustensilsTags)].sort(), utensilsList);
}

function displayTagsList(arrayList, classDom) {
  Array.from(classDom.children).forEach((tag) => {
    tag.remove();
  });
  arrayList.forEach((element) => {
    classDom.innerHTML += `<p class="itemList">${element}</p>`;
  });
}


