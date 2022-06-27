// const ingredientsListDom = document.querySelector(".ingredientsList");
// const appliancesListDom = document.querySelector(".appliancesList");
// const utensilsListDom = document.querySelector(".utensilsList");

// const ingredientsItemListDom = document.querySelectorAll(
//   ".ingredientsList > .itemList"
// );
// const appliancesItemListDom = document.querySelectorAll(
//   ".appliancesList > .itemList"
// );
// const utensilsItemListDom = document.querySelectorAll(".utensilsList > .itemList");
const allRecipesSimpleSearch = []; // Tableau incluant toutes les recettes sous forme de tableau
const allRecipesAdvancedSearch = [];

let error = false;
let myData;
let arrayRecipesByEachTag = []; // garde en mémoire la liste de recettes (id) pour chaque Tag
let arrayIdSimpleSearch = []; // Tableau des id des recettes sélectionnées sans doublons
let arrayIdAdvancedSearch = [];
let arrayIdSelectedFusion = [];
let arrayTagsSelected = [];
const message =
  "Aucune recette ne correspond à votre critère… </br> vous pouvez chercher « tarte aux pommes », « poisson », etc...";

// classDom = document.querySelectorAll(".ingredientsList > .itemList");
// tagsListenerAndDisplay(classDom, "ingredientsColorTag");
// classDom = document.querySelectorAll(".appliancesList > .itemList");
// tagsListenerAndDisplay(classDom, "appliancesColorTag");
// classDom = document.querySelectorAll(".utensilsList > .itemList");
// tagsListenerAndDisplay(classDom, "utensilsColorTag");

// export function tagsListenerAndDisplay() {
//   // console.log("1", document.querySelectorAll(".ingredientsList > .itemList"));
//   // console.log(classDom);
//   // console.log(`"${classDom}"`);
//   // let bidule = `"${classDom}"`;
//   document.querySelectorAll(".ingredientsList > .itemList").forEach(item => {

//     item.addEventListener("mousedown", (e) => {
//       console.log("listener ingredientsList");
//       // console.log("clic", e.target.innerHTML);
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag ingredientColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })
//   document.querySelectorAll(".appliancesList > .itemList").forEach(item => {
//     item.addEventListener("mousedown", (e) => {
//       // console.log("clic", e.target.innerHTML);
//       console.log("listener .appliancesListt");
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag appliancesColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })
//   document.querySelectorAll(".utensilsList > .itemList").forEach(item => {
//     item.addEventListener("mousedown", (e) => {
//       // console.log("clic", e.target.innerHTML);
//       console.log("listener .utensilsList");
//       document.querySelector(".tagsContainer").innerHTML += `
//       <div class="tag ustensilsColor">
//         <p>${e.target.innerHTML}</p>
//         <em class="far fa-times-circle"></em>
//       </div>`;
//       closeTagsListener()
//     });
//   })


