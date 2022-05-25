const allRecipesArray = [];
let recipeArray = [];
let recoveryData = [];
let nombreL = 0;
let tabSelect = [];
let tabNumber = [];
let a = 0;

export function conversionArray(data) {  
  recoveryData = Array.from(data);
  recoveryData.forEach((element) => {    
    recipeArray.push(element.id.toString(), element.name, element.description);
    // console.log(element.id.toString());
    element.ingredients.forEach(el => {
      recipeArray.push(el.ingredient);
    })    
    // console.log("++++++++++++++++++++++++++++++++++++");
    allRecipesArray.push(recipeArray);
    recipeArray = [];
  });
  // console.log(allRecipesArray);
  console.log(allRecipesArray[0]);
}

export function searchWords() {
  allRecipesArray.forEach(el=>{
    // console.log("el", el);
    el.forEach((row) => {
      // console.log(row);
      if (row.includes("glaçon")) {
        tabSelect.push(el[0]);        
      } 
    })     
  })
  let b = "0";
  tabSelect.forEach((stg) => {
    b = parseInt(stg, 10);
    console.log("b", b);
    tabNumber.push(b);
  });
  console.log("tabparse", tabNumber);
}




// for (let i=0; i<tabSelect.length; i++) {
//   console.log("i", i);
//   // tabSelect[i] = parseInt(tabSelect[i], 10);
//   // console.log("2", tabSelect[i]);
// }

// function returnInt(element) {
//   return parseInt(element, 10);
// }
// console.log(['1', '2', '3']);
// const truc = ['1', '2', '3'];
// console.log("truc", truc.map(returnInt));

// const strgToNumberTab = tabSelect;
// console.log("strgToNumberTab", strgToNumberTab);
// console.log(strgToNumberTab.map(returnInt));
// console.log("string", tabSelect);

// console.log("number", tabSelect.map(returnInt));
// let tabNumber = [];
// let b = "0";
// tabSelect.forEach(stg => {  
//   b = parseInt(stg, 10);
//   console.log(b);
//   tabNumber.push(b);
// })



// console.log("tabNumber", tabNumber);
// console.log(parseInt(b, 10));

// let truc = tabSelect[0]
// console.log("2", tabSelect[0]);

// allRecipesArray.forEach(el=>{
//   console.log("el", el);
// })


// function filterText(arr, requete) {
//   return arr.filter(function (el) {
//     return el.toLowerCase().indexOf(requete.toLowerCase()) !== -1;
//   })
// }

// console.log(filterText(allRecipesArray, 'coco'));
// console.log(allRecipesArray.includes("coco"));
