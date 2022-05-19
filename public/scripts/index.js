async function init() {
  // Récupère les datas de tous les photographes
  const { recipes } = await getRecipes();
  //   console.log(recipes);
  recipes.forEach((data) => {
    recipeCardsFactorie(data);
  });
}

async function getRecipes() {
  let response = await fetch("./data/recipes.json");
  return await response.json();
}

function recipeCardsFactorie(data) {
  // Récupération des datas l'objet photographers.json et décomposition
  const {
    name,
    ingredients,
    time,
    description,
  } = data;

  getRecipeCardDOM();
    
  function getRecipeCardDOM() {
    const recipeList = document.querySelector("#recipeList");

    // Création de l'élément article (card dal recette)
    const article = document.createElement("article");
    recipeList.appendChild(article);

    const photoRecipe = document.createElement("div");
    photoRecipe.classList.add("photoRecipe");
    article.appendChild(photoRecipe);
    photoRecipe.innerHTML = `
      <img
        src="./assets/images/limonade_coco.webp"
        alt="illustration"
        role="Image"
      />`  

    // Création de l'élément contenant le descriptif de la recette (nom, temps de cuisson, liste des ingrédients, texte de la recette)
    const recipe = document.createElement("div");
    recipe.classList.add("recipe");
    article.appendChild(recipe);

    // Création de l'élément contenant le nom de la recette et le temps de cuisson
    const headerRecipe = document.createElement("div");
    headerRecipe.classList.add("headerRecipe");
    recipe.appendChild(headerRecipe);
    headerRecipe.innerHTML = `
      <h2>${name}</h2>
      <div class="timeCook">
            <div
            class="iconTimeCook"
            tabindex="0"
            aria-label="Icône temps de cuisson"
            >
            <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                fill="black"
                />
            </svg>
            </div>
            <span>${time} min</span>
        </div>`;

    // Création de l'élément contenant la liste des ingrédients/appareils/ustensiles et la recette
    const descriptionRecipe = document.createElement("div");
    descriptionRecipe.classList.add("descriptionRecipe");   
    recipe.appendChild(descriptionRecipe);

    // Création de l'élément liste
    const list = document.createElement("ul");
    list.classList.add("list"); 
    list.setAttribute("aria-label", "liste des ingrédients, apprareils et ustensiles nécessaires");
    list.setAttribute("tabindex", "0");  
    descriptionRecipe.appendChild(list);

    // Création des items de la liste ingrédients
    ingredients.forEach((e) => {
      const { ingredient, quantity, unit } = e;
      let quantityVar = quantity;
      if (quantityVar == undefined) {
        // console.log("UNDEFINED")
        quantityVar = "";
      }
      let unitVar = unit;
      if (unitVar === undefined) {
        // console.log("UNDEFINED")
        unitVar = "";
      }
      const item = document.createElement("li");
      item.setAttribute("tabindex", "0");
      list.appendChild(item);
      item.innerHTML = `<strong> ${ingredient} :</strong> ${quantityVar} ${unitVar}`;
    });   
    
    const recipeText = document.createElement("p");
    recipeText.classList.add("recipeText");
    recipeText.setAttribute("tabindex", "0");
    descriptionRecipe.appendChild(recipeText);
    recipeText.innerHTML = `${description}`;
  }
}

init();


// const {
//   id,
//   name,
//   servings,
//   ingredients,
//   time,
//   description,
//   appliance,
//   ustensils,
// } = data;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//   console.log("id", id);
  //   console.log(name);
  //   console.log("servings", servings);
  //   console.log("=================");
  // ingredients.forEach((e) => {
  //   console.log(e);
  //   const { ingredient, quantity, unit } = e;
  //   console.log("ingredient", ingredient);
  //   console.log("quantity", quantity);
  //   console.log("unit", unit);
  //   console.log("-------------------");
  // });
  //   console.log("=================");
  //   console.log("time", time);
  //   console.log(description);
  //   console.log(appliance);
  //   ustensils.forEach((e) => {
  //     console.log("*****");
  //     const ustensils = e;
  //     console.log("ustensils", ustensils);
  //   });
  //   console.log("++++++++++++++++++++++");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// function getRecipeCardDOM() {
  //   // Injection du code HTML dans le DOM en prenant en compte les datas pour chaque recette (introduction de variables)

  //   const articleCode = `
  //   <article>
  //       <div class="photoRecipe">
  //           <img
  //             src="./assets/images/limonade_coco.webp"
  //             alt="illustration"
  //             role="Image"
  //           />
  //       </div>
  //       <div class="descriptionRecipe">
  //           <div class="headerRecipe">
  //             <h2>${name}</h2>
  //             <div class="timeCook">
  //                   <div
  //                   class="iconTimeCook"
  //                   tabindex="0"
  //                   aria-label="Icône temps de cuisson"
  //                   >
  //                   <svg
  //                       width="20"
  //                       height="20"
  //                       viewBox="0 0 20 20"
  //                       fill="none"
  //                       xmlns="http://www.w3.org/2000/svg"
  //                   >
  //                       <path
  //                       d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
  //                       fill="black"
  //                       />
  //                   </svg>
  //                   </div>
  //                   <span>${time} min</span>
  //               </div>
  //           </div>
  //           <div class="recipe">
  //               <ul class="ingredientsList"></ul>
  //               <div class="recipeText">${description}</div>
  //           </div>
  //       </div>
  //   </article>`;

  //   // const ingredientsList = document.createElement("ul");
  //   // ingredientsList.setAttribute("class", "ingredientsList");
  //   // document.querySelector(".paragraph").appendChild(ingredientsList);
  //   document.querySelector("#recipeList").innerHTML += articleCode;

  //   console.log("ingedients", ingredients.length);
  //   console.log("ingedients", data.length);
  //      ingredients.forEach((e) => {
  //             const { ingredient, quantity, unit } = e;
  //             let quantityVar = quantity;
  //             if (quantityVar == undefined) {
  //               // console.log("UNDEFINED")
  //               quantityVar = "";
  //             }
  //             let unitVar = unit;
  //             if (unitVar === undefined) {
  //               // console.log("UNDEFINED")
  //               unitVar = "";
  //             }
  //             const item = document.createElement("li");
  //             document.querySelector(".ingredientsList").appendChild(item);
  //             item.innerHTML = `<strong> ${ingredient} :</strong> ${quantityVar} ${unitVar}`;
  //           });
  // }

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Création de l'élément image et de son container
    // const image = document.createElement("img");
    // image.setAttribute("src", "./assets/images/limonade_coco.webp");
    // image.setAttribute("alt", "illustration");
    // photoRecipe.appendChild(image);


  // Création de l'élément nom de la recette
    // const h2 = document.createElement("h2");
    // h2.textContent = name;
    // h2.setAttribute("aria-label", name);
    // h2.setAttribute("role", "Text");
    // h2.setAttribute("tabindex", "0");
    // headerRecipe.appendChild(h2);

    // Création de l'élément contenant l'icône horloge et le temps de cuisson
    // const timeCook = document.createElement("div");
    // timeCook.classList.add("timeCook");
    // timeCook.setAttribute("aria-label", "temps de cuisson " + time + "minutes");
    // timeCook.setAttribute("tabindex", "0");
    // headerRecipe.appendChild(timeCook);
    // timeCook.innerHTML = `
    //   <div class="timeCook">
    //     <div
    //       class="iconTimeCook"
    //       tabindex="0"
    //       aria-label="Icône temps de cuisson"
    //       >
    //       <svg
    //           width="20"
    //           height="20"
    //           viewBox="0 0 20 20"
    //           fill="none"
    //           xmlns="http://www.w3.org/2000/svg"
    //       >
    //           <path
    //           d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
    //           fill="black"
    //           />
    //       </svg>
    //       </div>
    //       <span>${time} min</span>
    //     </div>          
    //   `;