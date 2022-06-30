// Déclaration de Variables
const itemIngredients = document.querySelectorAll(".ingredientsList > p");
itemIngredients.forEach((item) => console.log("item", item));
// console.log("item", itemIngredients);

const ingredientsHeaderDropdownDom = document.querySelector(
  ".ingredientsDropdown"
);
const ingredientsListDom = document.querySelector(".ingredientsList");
const ingredientsArrow = document.querySelector(".arrowIngredients");
const ingredientsArrowClass = "arrowIngredients";


const appliancesHeaderDropdownDom = document.querySelector(
  ".appliancesDropdown"
);
const appliancesListDom = document.querySelector(".appliancesList");
const appliancesArrow = document.querySelector(".arrowAppliances");
const inappliancesArrowClass = "arrowAppliances";

const utensilsHeaderDropdownDom = document.querySelector(".utensilsDropdown");
const utensilsListDom = document.querySelector(".utensilsList");
const utensilsArrow = document.querySelector(".arrowUtensils");
const utensilsArrowClass = "arrowUtensils";

ingredientsListDom.style.display = "none";
appliancesListDom.style.display = "none";
utensilsListDom.style.display = "none";

// console.log("ingredientsObject", ingredientsObject);
// const {header, list, arrowClass, arrowClassText} = ingredientsObject;
// console.log("ok", ingredientsObject.header);

// const ingredientsObject = {
//   ingredientsHeaderDropdownDom,
//   ingredientsListDom,
//   ingredientsArrow,
//   ingredientsArrowClass,
// };
// essai(ingredientsObject);
// function essai(objet) {
//   console.log("essai", objet);
//   const {header, list, arrowClass, arrowClassText} = objet;
//   console.log("essai2", objet.header);
// }

export function dropdown() {
  // SOURIS : OUVERTURE du menu de tri
 

  // //SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  // ingredientsListDom.addEventListener("mousedown", (e) => {
  //   if (e.target.classList == "itemList") {
  //     closeDropdown(ingredientsObject );
  //   }
  // });

  ingredientsHeaderDropdownDom.addEventListener("mousedown", (e) => {
    // console.log("ingredientsArrow", ingredientsArrow.outerHTML);
    // console.log(
    //   "ingredientsArrow",
    //   ingredientsArrow.classList === "fas fa-chevron-up arrowsIngredient"
    // );
    // if (ingredientsListDom.style.display == "none") {
    if (ingredientsArrow.outerHTML.includes("down")) {
      openDropdown(
        ingredientsHeaderDropdownDom,
        ingredientsListDom,
        ingredientsArrow,
        ingredientsArrowClass
      );
    } else {
      closeDropdown(
        ingredientsHeaderDropdownDom,
        ingredientsListDom,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
  });
/////////////////////////////////////////////////
  //SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  ingredientsListDom.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        ingredientsHeaderDropdownDom,
        ingredientsListDom,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
  });

  appliancesHeaderDropdownDom.addEventListener("mousedown", () => {
    if (appliancesArrow.outerHTML.includes("down")) {
      openDropdown(
        appliancesHeaderDropdownDom,
        appliancesListDom,
        appliancesArrow,
        inappliancesArrowClass
      );
    } else {
      closeDropdown(
        appliancesHeaderDropdownDom,
        appliancesListDom,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
  });

  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  appliancesListDom.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        appliancesHeaderDropdownDom,
        appliancesListDom,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
  });

  utensilsHeaderDropdownDom.addEventListener("mousedown", () => {
    if (utensilsArrow.outerHTML.includes("down")) {
      openDropdown(
        utensilsHeaderDropdownDom,
        utensilsListDom,
        utensilsArrow,
        utensilsArrowClass
      );
    } else {
      closeDropdown(
        utensilsHeaderDropdownDom,
        utensilsListDom,
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });
  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  utensilsListDom.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        utensilsHeaderDropdownDom,
        utensilsListDom,
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !ingredientsHeaderDropdownDom.contains(e.target) &&
      ingredientsListDom.style.display == "block"
    ) {
      closeDropdown(
        ingredientsHeaderDropdownDom,
        ingredientsListDom,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
    if (
      !appliancesHeaderDropdownDom.contains(e.target) &&
      appliancesListDom.style.display == "block"
    ) {
      closeDropdown(
        appliancesHeaderDropdownDom,
        appliancesListDom,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
    if (
      !utensilsHeaderDropdownDom.contains(e.target) &&
      utensilsListDom.style.display == "block"
    ) {
      closeDropdown(
        utensilsHeaderDropdownDom,
        utensilsListDom,
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });
}

// Déclaration de la fonction d'ouverture du menu
// function openDropdown(header, list, arrowClass, arrowClassText) {
  function openDropdown(header, list, arrowClass, arrowClassText) {
  // const {header, list, arrowClass, arrowClassText} = objet;
  console.log("objet", header, list, arrowClass, arrowClassText);
  list.style.display = "block";
  header.style.width = "430px";
  header.style.borderRadius = "5px 5px 0px 0px";
  // console.log("arrowClassIN", arrowClass, arrowClass.classList);
  arrowClass.setAttribute("class", "fas fa-chevron-up");
  // arrowClass.replace("class", "fas fa-chevron-up");
  arrowClass.classList.add(arrowClassText); // flèche vers le haut
}

// Déclaration de la fonction de fermeture du menu
// function closeDropdown(header, list, arrowClass, arrowClassText) {
  function closeDropdown(header, list, arrowClass, arrowClassText) {
  // const {header, list, arrowClass, arrowClassText} = objet;
  console.log("close", list);
  list.style.display = "none";
  console.log("close2");
  header.style.width = "170px";
  header.style.borderRadius = "5px";
  // console.log("arrowClass1", arrowClass, arrowClass.classList);
  arrowClass.setAttribute("class", "fas fa-chevron-down"); // flèche vers le bas
  arrowClass.classList.add(arrowClassText);
  // console.log("arrowClass2", arrowClass, arrowClass.classList);
}



