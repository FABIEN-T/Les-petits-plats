// VARIABLES GLOBALES UTILISEES SUR L'ENSEMBLE DES FICHIERS JS

// Tableau incluant les éléments "id, name, ingredient, description"
// de toutes les recettes pour la recherche simple
const allRecipesSimpleSearch = []; 
// Tableau incluant les éléments "id, ingredient, appliance, ustensils
// de toutes les recettes pour la recherche avancée
const allRecipesAdvancedSearch = [];

// variable, si true : indique à la fonction "closeTagsListener()" que la recherche simple ne donne aucune recette
let error = false; 
let myData; // json dans un tableau

let arrayIdSimpleSearch = []; // Tableau des id des recettes sélectionnées sans doublons dans la recherche simple
let arrayIdAdvancedSearch = []; // Tableau des id des recettes sélectionnées sans doublons dans la recherche avancée
let arrayIdSelectedFusion = []; // Fusion des 2 précédents tableaux, on ne garde que les id communs

let ingredientsListFilter = []; // tableau contenant la liste filtrée des ingrédients
let appliancesListFilter = []; // tableau contenant la liste filtrée des appareils
let utensilsListFilter = []; // tableau contenant la liste filtrée des ustensiles
