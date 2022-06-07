let tagsIngredients = [];
let tagsIngredientsFilter = [];
let tagsAppliance = [];
let tagsApplianceFilter = [];
let tagsUstensils = [];
let tagsUstensilsFilter = [];

export function initTagsArrays(data) {
  // console.log(data)
  Array.from(data).forEach((element) => {
    // pour chaque "ingedients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      tagsIngredients.push(el.ingredient);
    });
    tagsIngredientsFilter = tagsIngredients.filter((item, index) => {
      return tagsIngredients.indexOf(item) === index;
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    tagsAppliance.push(element.appliance);
    tagsApplianceFilter = tagsAppliance.filter((item, index) => {
      return tagsAppliance.indexOf(item) === index;
    });
    // pour chaque "ustensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      tagsUstensils.push(el);
    });
    tagsUstensilsFilter = tagsUstensils.filter((item, index) => {
      return tagsUstensils.indexOf(item) === index;
    });
  });

  arraySort(tagsIngredientsFilter);
  arraySort(tagsApplianceFilter);
  // arrayFilter(tagsAppliance);
  arraySort(tagsUstensilsFilter);

  //   console.log("ingredients", tagsIngredients);
  //   console.log("ingredients", tagsIngredientsFilter);
  //   //   console.log("appliance", tagsAppliance);
  //   console.log("appliance", tagsApplianceFilter);
  //   // //   console.log("ustensils", tagsUstensils);
  //   console.log("ustensils", tagsUstensilsFilter);

  displaytags();
}

function arrayFilter(arrayToFilter) {
  arrayToFilter.filter((item, index) => {
    return arrayToFilter.indexOf(item) === index;
  });
  // console.log("arrayToFilter", arrayToFilter);
}

function arraySort(arrayToSort) {
  return arrayToSort.sort(function (a, b) {
    return a.localeCompare(b);
  });
}

function displaytags() {
  //   const divIngredients = document.createElement("div");
  //   document
  //     .querySelector(".ingredientsContainer")
  //     .insertAdjacentElement("beforeend", divIngredients);
  //   tagsIngredientsFilter.forEach((element) => {
  //     divIngredients.innerHTML += element;
  //   });

  const divAppliance = document.createElement("div");
  divAppliance.classList.add("devicesList")
  document
    .querySelector(".devicesContainer")
    .insertAdjacentElement("beforeend", divAppliance);
  tagsApplianceFilter.forEach((element) => {
    divAppliance.innerHTML += element + "</br>";
  });
}
