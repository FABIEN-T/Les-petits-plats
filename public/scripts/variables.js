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
const allRecipesArray = []; // Tableau incluant toutes les recettes sous forme de tableau
const allRecipesArray2 = [];

let error = true;
let mydata;
let arraySelectedFilter = []; // Tableau des id des recettes sélectionnées sans doublons
let arraySelectedFilter2 = [];
let arraySelectedFusion = [];
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

// ***************************ESSAIS**************************
// }
// [1,5,9,3,4,7,14];
// [1,2,9,6,7,13,14,15,16,3]
// [1, 5, 3, 4, 7, 14, 1, 2, 9, 6, 7, 13, 14, 15, 16, 3, 1, 4];
let array1 = [1, 5, 3, 4, 7, 14];
let array2 = [1, 2, 9, 6, 7, 13, 14, 15, 16, 3];
let array3 = [1, 4];
// let array1 = ['1','5','9','3','4','7','14'];
// let array2 = ['1','2','9','6','7','13','14','15','16','3'];
// let concat = [];
// let concat2 = [];
// let result = [];
// let highResult =[];
// console.log(array1);
// console.log(array2);
// console.log(array3);

// concat = array1.concat(array2).sort(function (a, b) {
//   return a - b;
// });

// let intersection = array1.filter(x => array2.includes(x));
// console.log("intersection", intersection);
// highResult = intersection.filter(x => array3.includes(x))
// console.log("highResult", highResult);

// let differenceA1 = array1.filter(x => !array2.includes(x));
// // console.log("differenceA1", differenceA1);

// let differenceA2 = array2.filter(x => !array1.includes(x));
// // console.log("differenceA2", differenceA2);


// let differenceSym = array1
//                  .filter(x => !array2.includes(x))
//                  .concat(array2.filter(x => !array1.includes(x)));
// console.log("differenceSym", differenceSym);



// concat2 = array3.concat(concat).sort(function (a, b) {
//   return a - b;
// });


// result = [...new Set(array3)];

// result = concat.filter((value, index, array) => {
//   return array.indexOf(value) !== index;
// });

// let resultMap =[];
// resultMap = concat.map((value, index, array) => {
//   array.indexOf(value) !== index;
// });

// // highResult = result.map(x => )


// console.log(concat2);
// console.log("reslut", result, resultMap);














// if (array1.length === 0) {
//   result = array2;
// }
// if (array2.length === 0) {
//   result = array1;
// }
// if (array1.length > 0 && array2.length > 0) {
// array1.forEach(e1=>{
//   array2.forEach(e2 =>{
//     if (e1 === e2) {
//       result.push(e1);
//     }
//   })
// })

// array3 = (array1.concat(array2)).sort(function(a, b){
//     return a - b;
//   });
// array3 = [...new Set(array3)];

// console.log(array3);

// }

// let resultSorted = result.sort(function(a, b){
//   return a - b;
// })
// console.log("result", resultSorted);
