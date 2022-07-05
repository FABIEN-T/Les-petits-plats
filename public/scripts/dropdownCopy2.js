// Déclaration de Variable
// const dropdownContainer =  document.querySelector(".dropdownContainer");
// const inputChevron = document.querySelector(".inputChevron "); 

const ingredientsContainer = document.querySelector(".ingredientsContainer");
const ingredientsHeaderDropdown = document.querySelector(
  ".ingredientsDropdown"
);
const ingredientsList = document.querySelector(".ingredientsList");
const ingredientsArrow = document.querySelector(".arrowIngredients");

const ingredientsObjet = {
  ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
}
// console.log(ingredientsObjet);

const appliancesContainer = document.querySelector(".appliancesContainer");
const appliancesHeaderDropdown = document.querySelector(".appliancesDropdown");
const appliancesList = document.querySelector(".appliancesList");
const appliancesArrow = document.querySelector(".arrowAppliances");

const utensilsContainer = document.querySelector(".utensilsContainer");
const utensilsHeaderDropdown = document.querySelector(".utensilsDropdown");
const utensilsList = document.querySelector(".utensilsList");
const utensilsArrow = document.querySelector(".arrowUtensils");

// Déclaration de la fonction d'ouverture du menu
function openDropdown(container, header, list, arrowClass) {
  list.classList.replace("listContainer", "listContainerOpen"); 
  header.classList.replace("inputChevron", "inputChevronOpen");
  container.classList.replace("dropdownContainer", "dropdownContainerOpen");
  arrowClass.classList.replace("fa-chevron-down", "fa-chevron-up");
}

// Déclaration de la fonction de fermeture du menu
function closeDropdown(container, header, list, arrowClass) {
  list.classList.replace("listContainerOpen", "listContainer"); 
  header.classList.replace("inputChevronOpen", "inputChevron");
  container.classList.replace("dropdownContainerOpen", "dropdownContainer");
  arrowClass.classList.replace("fa-chevron-up", "fa-chevron-down");
}


export function dropdown() {
  const {ingredientsContainer,
    ingredientsHeaderDropdown,
    ingredientsList,
    ingredientsArrow} = ingredientsObjet;
  console.log("décomposition", ingredientsContainer,
  ingredientsHeaderDropdown,
  ingredientsList,
  ingredientsArrow);
  ingredientsHeaderDropdown.addEventListener("mousedown", (e) => {
    // SI clic dans input et class chevron : "fa-chevron-down" ALORS ouvrir Dropdown (liste)   
    if (ingredientsArrow.outerHTML.includes("down")) {
      openDropdown(        
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    }
  });
  // SI item de la liste (tag) cliqué ALORS fermeture du Dropdown (liste)
  ingredientsList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    }
  });

  appliancesHeaderDropdown.addEventListener("mousedown", () => {
    // SI clic dans input et class chevron : "fa-chevron-down" ALORS ouvrir Dropdown (liste)
    if (appliancesArrow.outerHTML.includes("down")) {
      openDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow
      );
    }
  });
  // SI item de la liste (tag) cliqué ALORS fermeture du Dropdown (liste)
  appliancesList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow
      );
    }
  });

  utensilsHeaderDropdown.addEventListener("mousedown", () => {
    // SI clic dans input et class chevron : "fa-chevron-down" ALORS ouvrir Dropdown (liste)
    if (utensilsArrow.outerHTML.includes("down")) {
      openDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow
      );
    }
  });
  // SI item de la liste (tag) cliqué ALORS fermeture du Dropdown (liste)
  utensilsList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow
      );
    }
  });

  // Clic extérieur à la liste 
  document.addEventListener("click", (e) => {
    if (
      !ingredientsHeaderDropdown.contains(e.target) &&
      ingredientsList.classList.contains("listContainerOpen")
      // ingredientsList.style.transform == "translateY(0px)"
    ) {
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    }
    if (
      !appliancesHeaderDropdown.contains(e.target) &&
      appliancesList.classList.contains("listContainerOpen")
    ) {
      closeDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow
      );
    }
    if (
      !utensilsHeaderDropdown.contains(e.target) &&
      utensilsList.classList.contains("listContainerOpen")
    ) {
      closeDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow
      );
    }
  });
}

// // Déclaration de la fonction d'ouverture du menu
// function openDropdown(container, header, list, arrowClass) {
//   list.classList.replace("listContainer", "listContainerOpen"); 
//   header.classList.replace("inputChevron", "inputChevronOpen");
//   container.classList.replace("dropdownContainer", "dropdownContainerOpen");
//   arrowClass.classList.replace("fa-chevron-down", "fa-chevron-up");
// }

// // Déclaration de la fonction de fermeture du menu
// function closeDropdown(container, header, list, arrowClass) {
//   list.classList.replace("listContainerOpen", "listContainer"); 
//   header.classList.replace("inputChevronOpen", "inputChevron");
//   container.classList.replace("dropdownContainerOpen", "dropdownContainer");
//   arrowClass.classList.replace("fa-chevron-up", "fa-chevron-down");
// }

















// ingredientsContainer.style.width = "170px";
// appliancesContainer.style.width = "170px";
// utensilsContainer.style.width = "170px";
// ingredientsContainer.style.height = "69px";
// appliancesContainer.style.height = "69px";
// utensilsContainer.style.height = "69px";

// console.log("ingredientsObject", ingredientsObject);
// const {header, list, arrowClass, arrowClassText} = ingredientsObject;
// console.log("ok", ingredientsObject.header);

// const ingredientsObject = {
//   ingredientsHeaderDropdown,
//   ingredientsList,
//   ingredientsArrow,
//   ingredientsArrowClass,
// };
// essai(ingredientsObject);
// function essai(objet) {
//   console.log("essai", objet);
//   const {header, list, arrowClass, arrowClassText} = objet;
//   console.log("essai2", objet.header);
// }

// //SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
// ingredientsList.addEventListener("mousedown", (e) => {
//   if (e.target.classList == "itemList") {
//     closeDropdown(ingredientsObject );
//   }
// });
