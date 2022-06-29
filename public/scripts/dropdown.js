// Déclaration de Variables
const ingredientsHeaderDropdownDom = document.querySelector(
  ".ingredientsDropdown"
);
const appliancesHeaderDropdownDom = document.querySelector(
    ".appliancesDropdown"
  );
  const utensilsHeaderDropdownDom = document.querySelector(
    ".utensilsDropdown"
  );

const ingredientsListDom = document.querySelector(".ingredientsList");
const arrowIngredientsDom = document.querySelector(".arrowIngredients");
const arrowIngredientsClass = "arrowIngredients";

const appliancesListDom = document.querySelector(".appliancesList");
const arrowAppliancesDom = document.querySelector(".arrowAppliances");
const arrowAppliancesClass = "arrowAppliances";

const utensilsListDom = document.querySelector(".utensilsList");
const arrowUtensilsDom = document.querySelector(".arrowUtensils");
const arrowUtensilsClass = "arrowUtensils";


ingredientsListDom.style.display = "none";
appliancesListDom.style.display = "none";
utensilsListDom.style.display = "none";
console.log("arrowClass", arrowIngredientsDom);

export function dropdown() {
  // SOURIS : OUVERTURE du menu de tri
 // SOURIS : OUVERTURE du menu de tri
  ingredientsHeaderDropdownDom.addEventListener("mousedown", () => {
    openDropdown(ingredientsListDom, arrowIngredientsDom, arrowIngredientsClass);
  });
  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  ingredientsListDom.addEventListener("mousedown", () => {
    closeDropdown(ingredientsListDom, arrowIngredientsDom, arrowIngredientsClass);
  });  

  appliancesHeaderDropdownDom.addEventListener("mousedown", () => {
    openDropdown(appliancesListDom, arrowAppliancesDom, arrowAppliancesClass);
  });
  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  appliancesListDom.addEventListener("mousedown", () => {
    closeDropdown(appliancesListDom, arrowAppliancesDom, arrowAppliancesClass);
  });

  utensilsHeaderDropdownDom.addEventListener("mousedown", () => {
    openDropdown(utensilsListDom, arrowUtensilsDom, arrowUtensilsClass);
  });
  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  utensilsListDom.addEventListener("mousedown", () => {
    closeDropdown(utensilsListDom, arrowUtensilsDom, arrowUtensilsClass);
  });

  document.addEventListener("click", (e) => {
    if (!ingredientsHeaderDropdownDom.contains(e.target)) {
      closeDropdown(ingredientsListDom, arrowIngredientsDom, arrowIngredientsClass);
    }
    if (!appliancesHeaderDropdownDom.contains(e.target)) {
        closeDropdown(appliancesListDom, arrowAppliancesDom, arrowAppliancesClass);
    }
    if (!utensilsHeaderDropdownDom.contains(e.target)) {  
      closeDropdown(utensilsListDom, arrowUtensilsDom, arrowUtensilsClass);
    };
  });
}

// Déclaration de la fonction d'ouverture du menu
function openDropdown(list, arrowClass, arrowClassText) {
  list.style.display = "block";
  console.log("arrowClass", arrowClass);
  arrowClass.setAttribute("class","fas fa-chevron-up");
  arrowClass.classList.add(arrowClassText); // flèche vers le haut
}

// Déclaration de la fonction de fermeture du menu
function closeDropdown(list, arrowClass, arrowClassText) {    
  list.style.display = "none";
  console.log("arrowClass", arrowClass, arrowClassText);
  arrowClass.setAttribute("class", "fas fa-chevron-down"); // flèche vers le bas
  arrowClass.classList.add(arrowClassText);
}
