export function variables() {
  const ingredientsListDom = document.querySelector(".ingredientsList");
  const appliancesListDom = document.querySelector(".appliancesList");
  const utensilsListDom = document.querySelector(".utensilsList");

  const ingredientsItemListDom = document.querySelectorAll(
    ".ingredientsList > .itemList"
  );
  const appliancesItemListDom = document.querySelectorAll(
    ".appliancesList > .itemList"
  );
  const utensilsItemListDom = document.querySelectorAll(".utensilsList > .itemList");
}
