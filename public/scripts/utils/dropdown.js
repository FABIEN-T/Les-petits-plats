// Déclaration des constantes
const ingredientsContainer = document.querySelector(".ingredientsContainer");
const ingredientsHeaderDropdown = document.querySelector(
  ".ingredientsDropdown"
);
const ingredientsList = document.querySelector(".ingredientsList");
const ingredientsArrow = document.querySelector(".arrowIngredients");

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
  // Gestion dropdown INGREDIENTS
  ingredientsHeaderDropdown.addEventListener("mousedown", () => {
    // SI clic dans input et chevron : "fa-chevron-down" (la liste n'est pas ouverte)
    // ALORS ouvrir Dropdown (liste)
    if (ingredientsArrow.outerHTML.includes("down")) {
      openDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    } else {
      // SINON chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
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

  // Gestion dropdown APPAREILS
  appliancesHeaderDropdown.addEventListener("mousedown", () => {
    // SI clic dans input et chevron : "fa-chevron-down" (la liste n'est pas ouverte)
    // ALORS ouvrir Dropdown (liste)
    if (appliancesArrow.outerHTML.includes("down")) {
      openDropdown(
        appliancesContainer,
        appliancesHeaderDropdown,
        appliancesList,
        appliancesArrow
      );
    } else {
      // SINON chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
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

  // Gestion dropdown USTENSILS
  utensilsHeaderDropdown.addEventListener("mousedown", () => {
    // SI clic dans input et chevron : "fa-chevron-down" (la liste n'est pas ouverte)
    // ALORS ouvrir Dropdown (liste)
    if (utensilsArrow.outerHTML.includes("down")) {
      openDropdown(
        utensilsContainer,
        utensilsHeaderDropdown,
        utensilsList,
        utensilsArrow
      );
    } else {
      // SINON chevron : "fa-chevron-up", fermer Dropdown (liste) qui est actuellement ouvert
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

  // GESTION du Clic extérieur à la liste
  document.addEventListener("click", (e) => {
    // SI la liste INGREDIENTS est ouverte
    // ET le clic n'est pas dans le champ de recherche INGREDIENTS
    // ALORS fermeture de la liste
    if (
      !ingredientsHeaderDropdown.contains(e.target) &&
      ingredientsList.classList.contains("listContainerOpen")
    ) {
      closeDropdown(
        ingredientsContainer,
        ingredientsHeaderDropdown,
        ingredientsList,
        ingredientsArrow
      );
    }
    // SI la liste APPAREILS est ouverte
    // ET le clic n'est pas dans le champ de recherche INGREDIENTS
    // ALORS fermeture de la liste
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
    // SI la liste USTENSILS est ouverte
    // ET le clic n'est pas dans le champ de recherche INGREDIENTS
    // ALORS fermeture de la liste
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
