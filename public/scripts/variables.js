
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
  // let array1 = [1,5,3,4,7,14];
  // let array2 = [1,2,9,6,7,13,14,15,16,3];
  // // let array1 = ['1','5','9','3','4','7','14'];
  // // let array2 = ['1','2','9','6','7','13','14','15','16','3'];
  // let result = [];
  // console.log(array1);
  // console.log(array2);
  
  
  // if (array1.length === 0) {
  //   result = array2;
  // }
  // if (array2.length === 0) {
  //   result = array1;
  // }
  // if (array1.length > 0 && array2.length > 0) {
  //   array1.forEach(e1=>{
  //     array2.forEach(e2 =>{
  //       if (e1 === e2) {
  //         result.push(e1);
  //       }
  //     })
  //   })
    // let array3 = (array1.concat(array2)).sort(function(a, b){
    //     return a - b;
    //   });
    // for (let i = 0; i < array3.length; i++) {
    //   if (array3.length>0) {
    //     // console.log(array3[array3.length - 1]);
    //     // console.log(array3[array3.length - 2]);
    //     console.log(array3[array3.length - i] === array3[array3.length - (i+1)]);
    //     if (array3[array3.length - i] === array3[array3.length - (i+1)]) {        
    //       array3.pop();
    //     }
    //   }
    //   }  
    // console.log(array3);
  
  // }
  
  // let resultSorted = result.sort(function(a, b){
  //   return a - b;
  // })
  // console.log("result", resultSorted); 
  