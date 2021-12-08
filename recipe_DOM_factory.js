function recipe_factory(recipe,recipeCardHtml){
  const {id,name,servings,ingredients,time,ustensiles}=recipe;
  function getRecipeCardDOM(){
    recipeCardHtml+=`
    <div class="a_recipe">
      <div class="recipe_pic"></div>
      <div class="recipe_top">
        <span class="recipe_name">${recipe.name}</span>
        <span class="recipe_time"><i class="far fa-clock"></i> ${recipe.time} min</span>
      </div>
      <div class="recipe_bottom">
        <div class="recipe_ingredients">
    `
    for(const ingredient of recipe.ingredients){
      recipeCardHtml+=`<span class="bold">${ingredient.ingredient}</span>`
      if (ingredient.quantity){
        recipeCardHtml+=`<span class="bold">:</span> ${ingredient.quantity}`
      };
      if (ingredient.unit){
        recipeCardHtml+=`${ingredient.unit}`
      };
      recipeCardHtml+=`<br>`
    }


    recipeCardHtml+=`
          </div>
        <div class="recipe_description">${recipe.description}</div>
      </div>
    </div>
    `
    return recipeCardHtml;
  }
  return {getRecipeCardDOM}
}


