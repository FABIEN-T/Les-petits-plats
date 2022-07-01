// Déclaration de Variables
const itemIngredients = document.querySelectorAll(".ingredientsList > p");
itemIngredients.forEach((item) => console.log("item", item));
// console.log("item", itemIngredients);

const ingredientsHeaderDropdown = document.querySelector(
  ".ingredientsDropdown"
);
const ingredientsList = document.querySelector(".ingredientsList");
const ingredientsArrow = document.querySelector(".arrowIngredients");
const ingredientsArrowClass = "arrowIngredients";

const appliancesHeaderDropdown = document.querySelector(
  ".appliancesDropdown"
);
const appliancesList = document.querySelector(".appliancesList");
const appliancesArrow = document.querySelector(".arrowAppliances");
const inappliancesArrowClass = "arrowAppliances";

const utensilsHeaderDropdown = document.querySelector(".utensilsDropdown");
const utensilsList = document.querySelector(".utensilsList");
const utensilsArrow = document.querySelector(".arrowUtensils");
const utensilsArrowClass = "arrowUtensils";

ingredientsList.style.display = "none";
appliancesList.style.display = "none";
utensilsList.style.display = "none";

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

export function dropdown() {
  // SOURIS : OUVERTURE du menu de tri
 

  // //SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  // ingredientsList.addEventListener("mousedown", (e) => {
  //   if (e.target.classList == "itemList") {
  //     closeDropdown(ingredientsObject );
  //   }
  // });

  ingredientsHeaderDropdown.addEventListener("mousedown", (e) => {
    // console.log("ingredientsArrow", ingredientsArrow.outerHTML);
    // console.log(
    //   "ingredientsArrow",
    //   ingredientsArrow.classList === "fas fa-chevron-up arrowsIngredient"
    // );
    // if (ingredientsList.style.display == "none") {
    if (ingredientsArrow.outerHTML.includes("down")) {
      openDropdown(
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    } else {
      closeDropdown(
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
  });
/////////////////////////////////////////////////
  //SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  ingredientsList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
  });

  appliancesHeaderDropdown.addEventListener("mousedown", () => {
    if (appliancesArrow.outerHTML.includes("down")) {
      openDropdown(
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        inappliancesArrowClass
      );
    } else {
      closeDropdown(
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
  });

  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  appliancesList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
  });

  utensilsHeaderDropdown.addEventListener("mousedown", () => {
    if (utensilsArrow.outerHTML.includes("down")) {
      openDropdown(
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow,
        utensilsArrowClass
      );
    } else {
      closeDropdown(
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow,
        utensilsArrowClass
      );
    }
  });
  // SOURIS : FERMETURE du menu de tri QUAND un type de tri est sélectionné
  utensilsList.addEventListener("mousedown", (e) => {
    if (e.target.classList == "itemList") {
      closeDropdown(
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
      ingredientsList.style.display == "block"
    ) {
      closeDropdown(
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow,
        ingredientsArrowClass
      );
    }
    if (
      !appliancesHeaderDropdown.contains(e.target) &&
      appliancesList.style.display == "block"
    ) {
      closeDropdown(
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow,
        inappliancesArrowClass
      );
    }
    if (
      !utensilsHeaderDropdown.contains(e.target) &&
      utensilsList.style.display == "block"
    ) {
      closeDropdown(
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