export function recipeCardsFactorie(data) {
  // Récupération des datas l'objet photographers.json et décomposition
  const { name, ingredients, time, description } = data;
  getRecipeCardDOM();

  function getRecipeCardDOM() {
    const recipeList = document.querySelector("#recipeList");

    // Création de l'élément article (card de la recette)
    const article = document.createElement("article");
    recipeList.appendChild(article);
    
    article.innerHTML = `
    <div class="photoRecipe">
      <img
        src="./assets/images/illustation-recette.jpg"
        alt="illustration"
        role="Image"
      />
    </div>`;
/*<div class="recipe">
    <div class="headerRecipe">
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
        </div>*/ 

   

    // Création de l'élément contenant le descriptif de la recette (nom, temps de cuisson, liste des ingrédients, texte de la recette)
    const recipe = document.createElement("div");
    recipe.classList.add("recipe");
    article.appendChild(recipe);
    recipe.innerHTML = `
      <div class="headerRecipe">
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
    list.setAttribute(
      "aria-label",
      "liste des ingrédients, appareils et ustensiles nécessaires"
    );
    list.setAttribute("tabindex", "0");
    descriptionRecipe.appendChild(list);

    // Création des items de la liste ingrédients
    ingredients.forEach((composant) => {
      const item = document.createElement("li");
      item.setAttribute("tabindex", "0");
      list.appendChild(item); 
      item.innerHTML = `<strong> ${composant.ingredient} :</strong>
      ${composant?.quantity ?? ""} ${composant?.unit ?? ""}`;
    }); 

    const recipeText = document.createElement("p");
    recipeText.classList.add("recipeText");
    recipeText.setAttribute("tabindex", "0");
    descriptionRecipe.appendChild(recipeText);
    recipeText.innerHTML = `${description}`;
  }
}

/* <svg
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
</svg> */

// // Création des items de la liste ingrédients
// ingredients.forEach((composant) => {
//   // const { ingredient, quantity, unit } = composant;
//   // let quantityVar = quantity;
//   // if (quantityVar == undefined) {
//   //   quantityVar = "";
//   // }
//   // let unitVar = unit;
//   // if (unitVar === undefined) {
//   //   unitVar = "";
//   // }
//   const item = document.createElement("li");
//   item.setAttribute("tabindex", "0");
//   list.appendChild(item);
//   // item.innerHTML = `<strong> ${ingredient} :</strong> ${quantityVar} ${unitVar}`;
//   item.innerHTML = `<strong> ${composant.ingredient} :</strong> ${
//     composant?.quantity ?? ""
//   } ${composant?.unit ?? ""}`;
// });



// recipeList.innerHTML = `
//       <article>
//         <div class="photoRecipe">
//             <img
//               src="./assets/images/illustation-recette.jpg"
//               alt="illustration"
//               role="Image"
//             />
//         </div>
//         <div class="descriptionRecipe">
//             <div class="headerRecipe">
//               <h2>${name}</h2>
//               <div class="timeCook">
//                     <div
//                     class="iconTimeCook"
//                     tabindex="0"
//                     aria-label="Icône temps de cuisson"
//                     >
//                     <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 20 20"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path
//                         d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
//                         fill="black"
//                         />
//                     </svg>
//                     </div>
//                     <span>${time} min</span>
//                 </div>
//             </div>
//             <div class="descriptionRecipe">
//               <ul class="list" tabindex="0" aria-label="liste des ingrédients, appareils et ustensiles nécessaires">
//               ${ingredients}
//               </ul>
//               <p class="recipeText" tabindex="0">${description}</p>
//             </div>          
//       </article>`;