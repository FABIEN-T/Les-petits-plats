// Déclaration de Variables
const ingredientsContainer = document.querySelector(".ingredientsContainer");
const ingredientsHeaderDropdown = document.querySelector(
  ".ingredientsDropdown"
);
const ingredientsList = document.querySelector(".ingredientsList");
const ingredientsArrow = document.querySelector(".arrowIngredients");
const ingredientsArrowClass = "arrowIngredients";

const appliancesContainer = document.querySelector(".appliancesContainer");
const appliancesHeaderDropdown = document.querySelector(".appliancesDropdown");
const appliancesList = document.querySelector(".appliancesList");
const appliancesArrow = document.querySelector(".arrowAppliances");
const appliancesArrowClass = "arrowAppliances";

const utensilsContainer = document.querySelector(".utensilsContainer");
const utensilsHeaderDropdown = document.querySelector(".utensilsDropdown");
const utensilsList = document.querySelector(".utensilsList");
const utensilsArrow = document.querySelector(".arrowUtensils");
const utensilsArrowClass = "arrowUtensils";

// ingredientsList.style.display = "none";
// appliancesList.style.display = "none";
// utensilsList.style.display = "none";
let positionBlockY = -2000;

ingredientsList.style.transform = "translateY( " + positionBlockY + "px)";
appliancesList.style.transform = "translateY( " + positionBlockY + "px)";
utensilsList.style.transform = "translateY( " + positionBlockY + "px)";

ingredientsContainer.style.width = "170px";
appliancesContainer.style.width = "170px";
utensilsContainer.style.width = "170px";

ingredientsContainer.style.height = "69px";
appliancesContainer.style.height = "69px";
utensilsContainer.style.height = "69px";

export function dropdown() {
  ingredientsHeaderDropdown.addEventListener("mousedown", (e) => {
    // if (ingredientsList.style.display == "none") {
    // SI clic dans input et class chevron : "fa-chevron-down" ALORS ouvrir Dropdown (liste)
    if (ingredientsArrow.outerHTML.includes("down")) {
      openDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
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
        ingredientsArrow,
        ingredientsArrowClass
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
        appliancesArrow,
        appliancesArrowClass
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        appliancesArrowClass
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
        appliancesArrow,
        appliancesArrowClass
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
        utensilsArrow,
        utensilsArrowClass
      );
    } else {
      // SINON class chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
      closeDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow,
        utensilsArrowClass
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
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !ingredientsHeaderDropdown.contains(e.target) &&
      // ingredientsList.style.display == "block"
      ingredientsList.style.transform == "translateY(0px)"
    ) {
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
    if (
      !appliancesHeaderDropdown.contains(e.target) &&
      // appliancesList.style.display == "block"
      appliancesList.style.transform == "translateY(0px)"
    ) {
      closeDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        appliancesArrowClass
      );
    }
    if (
      !utensilsHeaderDropdown.contains(e.target) &&
      // utensilsList.style.display == "block"
      utensilsList.style.transform == "translateY(0px)"
    ) {
      closeDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });
}

// Déclaration de la fonction d'ouverture du menu
// function openDropdown(header, list, arrowClass, arrowClassText) {
function openDropdown(container, header, list, arrowClass, arrowClassText) {
  // const {header, list, arrowClass, arrowClassText} = objet;
  // console.log("objet", header, list, arrowClass, arrowClassText);
  // list.style.display = "block";
  list.style.transform = "translateY(0px)";
  header.style.width = "586px";
  header.style.borderRadius = "5px 5px 0px 0px";
  container.style.width = "586px";
  container.style.height = "300px";
  // console.log("arrowClassIN", arrowClass, arrowClass.classList);
  arrowClass.setAttribute("class", "fas fa-chevron-up");
  // arrowClass.replace("class", "fas fa-chevron-up");
  arrowClass.classList.add(arrowClassText); // flèche vers le haut
}

// Déclaration de la fonction de fermeture du menu
// function closeDropdown(header, list, arrowClass, arrowClassText) {
function closeDropdown(container, header, list, arrowClass, arrowClassText) {
  // const {header, list, arrowClass, arrowClassText} = objet;
  // console.log("close", list);
  // list.style.display = "none";
  container.style.width = "170px";
  container.style.height = "69px";
  list.style.transform = "translateY( " + positionBlockY + "px)";
  // console.log("close2");
  header.style.width = "170px";
  header.style.borderRadius = "5px";
  // console.log("arrowClass1", arrowClass, arrowClass.classList);
  arrowClass.setAttribute("class", "fas fa-chevron-down"); // flèche vers le bas
  arrowClass.classList.add(arrowClassText);
  // console.log("arrowClass2", arrowClass, arrowClass.classList);
}

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
