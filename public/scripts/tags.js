import { recipeCardsFactorie } from "./recipeCardsFactorie.js"; // Affichage de toutes les recettes au chargement de la page et lors des réinitialisations
import { stringUpperCaseFirst, stringNoAccent, removeCards, refreshCards, searchCommonId } from "./functions.js"; // Enlève l'accent sur la première lettre du mot et mise en capitale
// import { stringNoAccent } from "./functions.js"; // Enlève l'accent
// import { removeCards } from "./functions.js"; // Efface toutes les recetettes
// import { refreshCards } from "./functions.js"; // Affichage des recettes trouvées par la recherche
// import { searchCommonId } from "./functions.js"; // Recherche des recettes communes à la recherche simple et à la recherche avancée

let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
let classDom = ""; // type de liste (ingredients, appliances, utensils)
let indexTagClosed = 0; // variable récupérant l'indice du tag fermé
let tempTab = []; // tableau tampon

// const ingredientsListDom = document.querySelector(".ingredientsList");
// const appliancesListDom = document.querySelector(".appliancesList");
// const utensilsListDom = document.querySelector(".utensilsList");

const inputsTags = document.querySelectorAll(".tagsDropdownInput");

// Initialisations des listes de recherche avancée
export function initArraysLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];

  myData.forEach((element) => {
    // pour chaque "ingrédients", ajouter danns le tableau uniquement les valeurs de propriétés "ingredient"
    element.ingredients.forEach((el) => {
      // console.log(element.id);
      ingredientsList.push(stringUpperCaseFirst(el.ingredient));
    });

    // pour chaque "appliance", ajouter danns le tableau les valeurs de propriétés "appliance"
    appliancesList.push(element.appliance);

    // pour chaque "utensils", ajouter danns le tableau les valeurs de propriétés "appliance"
    element.ustensils.forEach((el) => {
      utensilsList.push(stringUpperCaseFirst(el)); // Mettre en majuscule la première lettre du premier mot et enlever les accents
    });
  });

  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList); // mets à jour, filtre et affiche les listes
  // console.log(ingredientsList, appliancesList, utensilsList);
}

// Recherche avancée : mise à jour de la liste de tags en fonction de la saisie (recherche simple)
export function updateLists() {
  let ingredientsList = [];
  let appliancesList = [];
  let utensilsList = [];

  // Création des listes filtrées à partir du tableau des recttes sélectionnées
  arrayIdSelectedFusion.forEach((i) => {
    // console.log(parseInt(i, 10));
    myData[parseInt(i, 10) - 1].ingredients.forEach((el) => {
      ingredientsList.push(stringUpperCaseFirst(el.ingredient));
    });
    appliancesList.push(
      stringUpperCaseFirst(myData[parseInt(i, 10) - 1].appliance)
    );
    myData[parseInt(i, 10) - 1].ustensils.forEach((el) => {
      utensilsList.push(stringUpperCaseFirst(el));
    });
  });
  filterAndDisplayLists(ingredientsList, appliancesList, utensilsList);
  threeTypeTagsListener();
}

// Filtrage (enlève les doublons, trie par oredre alphatbétique) et Appel des fonctions d'affichage des listes
function filterAndDisplayLists(ingredientsList, appliancesList, utensilsList) {
  ingredientsListFilter = [...new Set(ingredientsList)].sort();
  appliancesListFilter = [...new Set(appliancesList)].sort();
  utensilsListFilter = [...new Set(utensilsList)].sort();
  //Suppression du tag sélectionné de la liste
  arrayTagsSelected.forEach(tagSelected => {
    if (ingredientsListFilter.includes(tagSelected)) {
      ingredientsListFilter = ingredientsListFilter.filter(x => x !== tagSelected);
    }
    if (appliancesListFilter.includes(tagSelected)) {
      appliancesListFilter = appliancesListFilter.filter(x => x !== tagSelected);
    }
    if (utensilsListFilter.includes(tagSelected)) {
      utensilsListFilter = utensilsListFilter.filter(x => x !== tagSelected);
    }
  }) 
  displayLists(ingredientsListFilter, ingredientsListDom); // ingredientsListDom = document.querySelector(".ingredientsList");
  displayLists(appliancesListFilter, appliancesListDom);
  displayLists(utensilsListFilter, utensilsListDom);
}

// Affichage de la liste mise à jour
function displayLists(arrayList, classDom) {
  Array.from(classDom.children).forEach((item) => {
    item.remove(); // réinitialisation : efface tous les items
  });
  arrayList.forEach((item) => {
    classDom.innerHTML += `<p class="itemList">${item}</p>`; // ajoute dans le dom et affice chaque item de la liste passée en paramètre
  });
}

// Ecoute du clic sur un tag en fonction du type et affichage
export function threeTypeTagsListener() {
  classDom = document.querySelectorAll(".ingredientsList > .itemList");
  tagsListenerAndDisplay(classDom, "ingredientsColor");
  classDom = document.querySelectorAll(".appliancesList > .itemList");
  tagsListenerAndDisplay(classDom, "appliancesColor");
  classDom = document.querySelectorAll(".utensilsList > .itemList");
  tagsListenerAndDisplay(classDom, "utensilsColor");
  tagsInput();
}

// Ecoute du clic sur les items des listes et Affichage des tags
function tagsListenerAndDisplay(classDom, classColor) {
  classDom.forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // Si le tableau des tags sélectionnés ne contient pas déjà le tag qui vient d'être cliqué
      if (!arrayTagsSelected.includes(e.target.innerHTML)) {
        // Création de l'élément HTML du tag
        document.querySelector(".tagsContainer").innerHTML += `
          <div class="tag ${classColor}">
            <p>${e.target.innerHTML}</p>
            <em class="far fa-times-circle"></em>
          </div>`;
        closeTagsListener(); // écoute du clic sur la croix des tags
        document.getElementById("formIngredients").reset();
        document.getElementById("formAppliances").reset();
        document.getElementById("formUtensils").reset(); // efface la saisie dans la recherche avancée
        arrayTagsSelected.push(e.target.innerHTML); // ajoute le nouveau tag dans le tableau des tags sélectionnés
        updateLists(); // mise à jour des listes de la recherche avancée
        searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
      }
    });
  });
}

// Efface le tag de la page html et du Dom lors clic sur la croix
export function closeTagsListener() {
  document.querySelectorAll(".fa-times-circle").forEach((item) => {
    item.addEventListener("mousedown", (e) => {
      // donne l'index du tag effacé dans la série des tags affichés
      indexTagClosed = arrayTagsSelected.indexOf(
        e.target.closest(".tag").children[0].innerText
      );
      // console.log("indexTagClosed", indexTagClosed);
      e.target.closest(".tag").remove(); // Efface le tag cliqué
      let closedTag = e.target.closest(".tag").children[0].innerText; // mémorise l'intitulé du tag fermé
      // console.log("closedTag", closedTag);
      arrayTagsSelected = arrayTagsSelected.filter((x) => x !== closedTag); // efface le tag du tableau des tags sélectionnés
      
      function updateAdvancedSearch() {
        let tamponTab = [];
      // let arraySelected2Spread = [];
      // console.log("AVANT arrayRecipesByEachTag", arrayRecipesByEachTag);
      arrayRecipesByEachTag.forEach(tab => tamponTab.push(...tab));
      // console.log("APRES arrayRecipesByEachTag", arrayRecipesByEachTag);
      // console.log("tamponTab", tamponTab);

      arrayRecipesByEachTag.forEach((array, index) => {
        if (arrayRecipesByEachTag.length > index + 1) {
          tamponTab = tamponTab.filter((item, index, array) => {
            return array.indexOf(item) !== index;
          });
        }
      });
      // console.log("tamponTab", tamponTab);
      arrayIdAdvancedSearch = tamponTab;
      arrayIdSelectedFusion = searchCommonId(
          arrayIdSimpleSearch,
          arrayIdAdvancedSearch
        );
      }
      // SI faute de frappe ou terme inconnu dans la recherche simple,
      if (error === true) {
        // console.log("remove");
        removeCards(); // effacer toutes les recettes
        arrayRecipesByEachTag.splice(indexTagClosed, 1);
        // console.log("ERROR close arrayRecipesByEachTag", arrayRecipesByEachTag);
        updateAdvancedSearch()
        // arrayIdAdvancedSearch = []; // réinitialiser la recheche avancée
        // document.querySelectorAll(".tag").map(tag => tag.remove());
        // document.querySelectorAll(".tag").forEach((tag) => tag.remove());
        // SINON enlever les recettes (id) du tag fermé de la mémoire "arrayRecipesByEachTag"
      } else {
        // console.log("avant SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag);
        arrayRecipesByEachTag.splice(indexTagClosed, 1);
        // console.log("après SPLICE arrayRecipesByEachTag", arrayRecipesByEachTag); 
        updateAdvancedSearch();      
        // searchTagInListsAndCrossArrayId(); // Recherche le tag dans les listes de la recherche avancée, et croise les résultats de la recherche simple et avancée
        // SI il n'y a aucun tag et que la recherche simple ne donne rien
        if (
          document.querySelectorAll(".tag").length == 0 &&
          arrayIdSimpleSearch.length == 0
        ) {
          myData.forEach((recipe) => {
            recipeCardsFactorie(recipe); // Réinitialisation : Affichage de toutes les recettes            
          });
          initArraysLists(); // Initialisations des listes de recherche avancée
          threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
          // SINON chercher les recettes en commen des tags restants dans la mémoire "arrayRecipesByEachTag"
          // EN COURS DE CONSTRUCTION
        } else {
          updateAdvancedSearch();          
          
          // console.log("arrayIdSelectedFusion", arrayIdSelectedFusion);
          refreshCards();          
          updateLists(); // mise à jour des listes de la recherche avancée
          threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
        }
      }
    });
  });
}

// Recherche les tags dans les listes de la recherche avancée,
// croise le tableau des recettes sélectionnées dans de la recherche avancée
// avec celui de la recherche simple
// et ne garde que les recettes en commun
// searchTaginListAndCrossArrayId
export function searchTagInListsAndCrossArrayId() {
  let arraySelected = [];
  let arraySuperSelected = [];

  // Si il n'y a pas de tags, réinitialiser l'affichage de toutes les recettes et listes
  if (document.querySelectorAll(".tag").length == 0) {
    arrayIdAdvancedSearch = [];
    tempTab = [];
    // arrayIdSimpleSearch = [];
    removeCards(); // Efface toutes les recettes
    myData.forEach((recipe) => {
      recipeCardsFactorie(recipe); // Réinitialisation : Affichage de toutes les recettes
    });
    initArraysLists(); // Initialisations des listes de recherche avancée
    threeTypeTagsListener(); // Ecoute du clic sur un tag et affichage
    // Recherche des recettes communes à la recherche simple et à la recherche avancée
    arrayIdSelectedFusion = arrayIdSimpleSearch;
    // SI il n'y a pas de recettes trouvées avec la echerche simple
    if (arrayIdSimpleSearch.length == 0) {
      myData.forEach((recipe) => {
        recipeCardsFactorie(recipe); // ALORS Réinitialisation : Affichage de toutes les recettes
      });
    } else {
      refreshCards(); // SINON afficher les recettes correspondant à la recherche simple
    }
  } else {
    // SINON chercher les recettes incluant le tag
    // console.log("arrayTagsSelected", arrayTagsSelected);
    [...new Set(arrayTagsSelected)].forEach((tag) => {
      arraySelected = [];
      allRecipesAdvancedSearch.forEach((recipe) => {
        // Rechercher le tag saisie dans chaque recette
        recipe.forEach((element) => {
          // SI l'expression saisie est contenue dans la recette
          // console.log("Test", tag, element, stringUpperCaseFirst(element).includes(tag));
          if (element.includes(tag.toLowerCase()) || stringUpperCaseFirst(element).includes(tag)) {
            // ALORS mettre l'id de la recette dans le tableau des recettes sélectionnées
            arraySelected.push(recipe[0]);
          }
        });
        // console.log("arraySelected", arraySelected);
      });
      arraySuperSelected.push([...new Set(arraySelected)]); // Ajouter tableau des recettes sélectionnées (id) du tag
      // console.log("ELSE arraySelected", arraySelected);
      // console.log("ELSE arraySuperSelected", arraySuperSelected);
      // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    });
    // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
    // SI il y a 1 tag
    if (document.querySelectorAll(".tag").length == 1) {
      arrayIdAdvancedSearch = arraySelected; // la recherche avancée correspond à la première recherche de tag
      // Recherche des recettes communes à la recherche simple et à la recherche avancée
      arrayIdSelectedFusion = searchCommonId(arrayIdSimpleSearch, 
        [...new Set(arrayIdAdvancedSearch)]);
      arrayRecipesByEachTag = arraySuperSelected;
      // arrayRecipesByEachTag.push(arraySelected); // mémorise pour chaque tag, la liste de recettes (id)
      // console.log("searchTag arrayRecipesByEachTag", arrayRecipesByEachTag);
      updateLists(); // mise à jour des listes de la recherche avancée
      refreshCards(); // afficher les recettes communes à la recherche simple et à la recherche avancée
    }
    // SI il y a plus d'un tag
    if (document.querySelectorAll(".tag").length > 1) {
      // console.log("arraySuperSelected.length >>>1", arraySuperSelected);
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // console.log("arraySuperSelected", arraySuperSelected);      
      // console.log("arrayIdAdvancedSearch", arrayIdAdvancedSearch);
      // Recherche des id communs entre la précédente recherche avancée et la nouvelle
      tempTab = arrayIdAdvancedSearch.filter((x) =>
        arraySuperSelected[arraySuperSelected.length - 1].includes(x)
      );
      // console.log("tempTab", tempTab);
      arrayIdAdvancedSearch = tempTab; // affecte le résultat de la recherche des id communs entre la précédente recherche avancée et la nouvelle
      // console.log("searchTag PUSH !!!!");
      arrayRecipesByEachTag = arraySuperSelected;
      // arrayRecipesByEachTag.push(arrayIdAdvancedSearch); // Mémorisation de la liste des recettes ppour chaque tag
      // console.log(">1 | arrayRecipesByEachTag", arrayRecipesByEachTag);
      // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      arrayIdSelectedFusion = searchCommonId(
        arrayIdSimpleSearch,
        arrayIdAdvancedSearch
      );
      // console.log(">1 | arrayIdSimpleSearch", arrayIdSimpleSearch);
      // console.log(">1 | arrayIdAdvancedSearch", arrayIdAdvancedSearch);      
      updateLists(); // mise à jour des listes de la recherche avancée
      refreshCards(); // afficher les recettes communes à la recherche simple et à la recherche avancée
    }
  }
}

// Détection du type de recherche avancée, recherche du mot
export function tagsInput() {
  inputsTags.forEach((inputVar) => {
    inputVar.addEventListener("input", (e) => {
      switch (e.target.id) {
        case "ingredientsInput":
          // console.log("a", e.target.value);
          displayLists(
            searchWordInList(e.target.value, ingredientsListFilter),
            ingredientsListDom
          );
          classDom = document.querySelectorAll(".ingredientsList > .itemList");
          tagsListenerAndDisplay(classDom, "ingredientsColor");
          break;

        case "appliancesInput":
          // console.log("b", e.target.value);
          displayLists(
            searchWordInList(e.target.value, appliancesListFilter),
            appliancesListDom
          );
          // // console.log("ingredientsItem", ingredientsItem);
          classDom = document.querySelectorAll(".appliancesList > .itemList");
          tagsListenerAndDisplay(classDom, "appliancesColor");
          break;

        case "utensilsInput":
          // console.log("c", e.target.value);
          displayLists(
            searchWordInList(e.target.value, utensilsListFilter),
            utensilsListDom
          );
          classDom = document.querySelectorAll(".utensilsList > .itemList");
          tagsListenerAndDisplay(classDom, "utensilsColor");
          break;
        default:
      }
    });
  });
}

// Recherche de l'expression saisie (dans la barre de recherche avancée) dans la liste
function searchWordInList(valueInput, tagsList) {
  let arraySelectedTags = []; // initialisation du tableau des recettes sélectionnées
  // console.log(valueInput);
  tagsList.forEach((tag) => {
    if (
      tag.includes(valueInput) ||
      tag.includes(
        stringNoAccent(valueInput.charAt(0)).toUpperCase() +
          valueInput.substring(1)
      )
    ) {
      arraySelectedTags.push(tag);
    }
  });
  tagsList = arraySelectedTags;
  // console.log("tagsList", tagsList);
  return tagsList;
}





// searchTagInListsAndCrossArrayId();
          // let provi = arraySelected2Spread.filter((item, index, array) => {
          //   return array.indexOf(item) !== index;
          // });
          // console.log("provi", provi);
          // let provi2 = provi.filter((item, index, array) => {
          //   return array.indexOf(item) !== index;
          // });
          // console.log("provi2", provi2);
          // let provi3 = provi2.filter((item, index, array) => {
          //   return array.indexOf(item) !== index;
          // });
          // console.log("provi3", provi3);
          // let provi4 = provi3.filter((item, index, array) => {
          //   return array.indexOf(item) !== index;
          // });
          // console.log("provi5", provi4);

          // for (let i=0; i=arrayRecipesByEachTag.length-2; i++) {
          //   tamponTab = arrayRecipesByEachTag.filter((item, index, array) => {
          //     return array.indexOf(item) !== index;
          //   });
          // }

          // let result = [...new Set([...provi4])];
          // console.log("result", result);

          // arrayRecipesByEachTag
          // tamponTab = arrayRecipesByEachTag[0].filter((x) =>
          // arrayRecipesByEachTag[1].includes(x));

          // for (let i=0; i=arrayRecipesByEachTag.length-1; i++) {
          //   // console.log("tamponTab", tamponTab);
          //   tamponTab = arrayRecipesByEachTag[i].filter((x) =>
          // arrayRecipesByEachTag[i+1].includes(x));
          // }

          // tamponTab = arrayRecipesByEachTag.filter((x) =>
          // arrayRecipesByEachTag.includes(x));
          // tamponTab = arrayIdAdvancedSearch.filter((x) =>
          //   arrayRecipesByEachTag[arrayRecipesByEachTag.length - 1].includes(x)
          // );

          // console.log("arrayRecipesByEachTag", arrayRecipesByEachTag);
          // console.log("tamponTab", tamponTab);
          // arrayIdSelectedFusion = searchCommonId(
          //   arrayIdSimpleSearch,
          //   arrayIdAdvancedSearch
          // );
          // refreshCards();