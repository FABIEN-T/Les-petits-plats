let TagsIngredients = [];
let TagsIngredientsFilter = [];
let TagsAppliance = [];
let TagsApplianceFilter = [];
let TagsUstensils = [];
let TagsUstensilsFilter = [];

export function initTagsArrays(data) {
  // console.log(data)
  Array.from(data).forEach((element) => {
     // pour chaque "ingedients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"  
    element.ingredients.forEach((el) => {     
      TagsIngredients.push(el.ingredient);
    });
    TagsIngredientsFilter = TagsIngredients.filter((item, index) => {
      return TagsIngredients.indexOf(item) === index;
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    TagsAppliance.push(element.appliance);
    TagsApplianceFilter = TagsAppliance.filter((item, index) => {
      return TagsAppliance.indexOf(item) === index;
    });
    // pour chaque "ustensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      TagsUstensils.push(el);
    });
    TagsUstensilsFilter = TagsUstensils.filter((item, index) => {
      return TagsUstensils.indexOf(item) === index;
    });
  });

  arraySort(TagsIngredientsFilter);
  arraySort(TagsApplianceFilter);
  // arrayFilter(TagsAppliance);
  arraySort(TagsUstensilsFilter);

  //   console.log("ingredients", TagsIngredients);
  console.log("ingredients", TagsIngredientsFilter);
  //   console.log("appliance", TagsAppliance);
  console.log("appliance", TagsApplianceFilter);
  // //   console.log("ustensils", TagsUstensils);
  console.log("ustensils", TagsUstensilsFilter);
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

function displayTgas() {

}
