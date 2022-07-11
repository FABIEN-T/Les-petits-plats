// VARIABLES GLOBALES UTILISEES SUR L'ENSEMBLE DES FICHIERS JS

// Tableau incluant les éléments "id, name, ingredient, description"
// de toutes les recettes pour la recherche principale
const allRecipesMainSearch = [];
// Tableau incluant les éléments "id, ingredient, appliance, ustensils
// de toutes les recettes pour la recherche avancée
const allRecipesAdvancedSearch = [];

// variable, si true : indique à la fonction "closeTagsListener()" que la recherche principale ne donne aucune recette
let error = false;

let recipesData; // json dans un tableau

let arrayIdMainSearch = []; // Tableau des id des recettes sélectionnées sans doublons dans la recherche principale
let arrayIdAdvancedSearch = []; // Tableau des id des recettes sélectionnées sans doublons dans la recherche avancée
let arrayIdSelectedFusion = []; // Fusion des 2 précédents tableaux, on ne garde que les id communs

let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
