let sorted_recipies=recipies;

const recipiesContainer=document.getElementById("recipies_container");
recipiesContainer.innerHTML="";
let recipeCardHtml="";
for(const recipe of sorted_recipies){ 
  const recipeModel=recipe_factory(recipe,recipeCardHtml);
  recipeCardHtml=recipeModel.getRecipeCardDOM();
}
recipiesContainer.innerHTML=recipeCardHtml;