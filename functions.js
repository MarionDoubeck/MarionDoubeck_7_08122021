function init_list_of_tags(list_of_recipies){
  console.log('dans init_list_of_tags');
  let list_of_tags={
    "ingredients":[],
    "appliance":[],
    "ustensils":[],
  };
  for (const recipe of list_of_recipies){
    for (let i=0;i<recipe['ingredients'].length;i++){
      //ajouter les if not already in pour éviter les doublons
      list_of_tags.ingredients=list_of_tags.ingredients.concat(recipe['ingredients'][i]['ingredient']);
    }
    //ajouter les if not already in pour éviter les doublons
    list_of_tags.appliance=list_of_tags.appliance.concat(recipe['appliance']);
    //ajouter les if not already in pour éviter les doublons
    list_of_tags.ustensils=list_of_tags.ustensils.concat(recipe['ustensils']);
  }
  return list_of_tags
}
////////////////////////////////////////////////////////////////////////////////////
function erase_search_bar(){
  console.log('dans erase_search_bar');
  document.getElementById('search_bar').value="";
}
////////////////////////////////////////////////////////////////////////////////////
function isTag(value,list_of_tags){
  console.log('dans isTag');
  if(list_of_tags.ingredients.indexOf(value)>0 || list_of_tags.appliance.indexOf(value)>0 || list_of_tags.ustensils.indexOf(value)>0){
    return true
  }else{
    return false
  }
}
////////////////////////////////////////////////////////////////////////////////////
function filter_recipies(sorted_recipies_list,list_of_displayed_tags){
  console.log('dans filter_recipies');
  //filter by tags :
  const number_of_recipies=sorted_recipies_list.length;
  newList=[];
  for (let i=0;i<number_of_recipies;i++){
    let keep_it=0;
    for (ingredient of sorted_recipies_list[i]['ingredients']){
      if (list_of_displayed_tags['ingredients'].includes(ingredient)){
        keep_it++;
      }
    }
    for (appliance of sorted_recipies_list[i]['appliance']){
      if (list_of_displayed_tags['appliance'].includes(appliance)){
        keep_it++;
      }
    }
    for (ustensil of sorted_recipies_list[i]['ustensils']){
      if (list_of_displayed_tags['ustensils'].includes(ustensil)){
        keep_it++;
      }
    }
    if (keep_it>0){
      newList.push(sorted_recipies_list[i])
    }
  }
  if (newList==[]){
    display_no_result();
    return
  }else{
    //filter par la barre de recherche
    const research=document.getElementById('search_bar').value;
    //couper research en plusieurs mots avec les espaces
    const number_of_recipies=sorted_recipies_list.length;
    for (let i=0;i<number_of_recipies;i++){
      const title=sorted_recipies_list[i].name;
      const ingredients=sorted_recipies_list[i].ingredients;
      const description=sorted_recipies_list[i].description;
      if (title.includes(research) || ingredients.includes(research) || description.includes(research)){
        newList.push(sorted_recipies_list[i]);
      }
    }
    if (newList==[]){
      display_no_result();
      return
    }else{
      display_recipies(newList);
      return
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields(type,sorted_recipies_list){
  console.log('dans filter_advanced_search_fields de type '+type);
  //trier le menu en ne gardant que ce qu'il y a dans la liste de recettes :
  switch (type){
    case 'ingredients':
      advanced_research=document.getElementById('search_bar_ingredients').value;
      HtmlContent=[];
      for(recipe of sorted_recipies_list){
        for(nb_of_ingredients in recipe.ingredients){
          //trier en plus par le champ de recherche avancée
          if(recipe.ingredients[nb_of_ingredients].ingredient.includes(advanced_research)){
            HtmlContent.push(recipe.ingredients[nb_of_ingredients].ingredient);
          }
        }
      }
      display_clickable_advanced_field(type,HtmlContent);
      break
    case 'appliance':
      advanced_research=document.getElementById('search_bar_appliance').value;
      HtmlContent=[];
      for(recipe of sorted_recipies_list){
        //trier en plus par le champ de recherche avancée
        if(recipe.appliance.includes(advanced_research)){
          HtmlContent.push(recipe.appliance);
        }
      }
      display_clickable_advanced_field(type,HtmlContent);
      break
    case 'ustensils':
      advanced_research=document.getElementById('search_bar_ustensils').value;
      HtmlContent=[];
      for(recipe of sorted_recipies_list){
        for(nb_of_ustensils in recipe.ustensils){
          //trier en plus par le champ de recherche avancée
          if(recipe.ustensils[nb_of_ustensils].includes(advanced_research)){
            HtmlContent.push(recipe.ustensils[nb_of_ustensils]);
          }
        }
      }
      display_clickable_advanced_field(type,HtmlContent);
      break
  }
}
////////////////////////////////////////////////////////////////////////////////////
function display_no_result(){
  console.log('dans display_no_result');
  document.getElementById('recipies_container').innerHTML='Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.'
}
////////////////////////////////////////////////////////////////////////////////////
function display_recipies(sorted_recipies_list){
  console.log('dans display_recipies');
  const recipiesContainer=document.getElementById("recipies_container");
  recipiesContainer.innerHTML="";
  let recipeCardHtml="";
  for(const recipe of sorted_recipies_list){ 
    const recipeModel=recipe_factory(recipe,recipeCardHtml);
    recipeCardHtml=recipeModel.getRecipeCardDOM();
  }
  recipiesContainer.innerHTML=recipeCardHtml;
  //addeventlistener =>open modal
  for (type of ['ingredients','appliance','ustensils']){
    filter_advanced_search_fields(type,sorted_recipies_list);
  }
}
////////////////////////////////////////////////////////////////////////////////////
function display_clickable_advanced_field(type,list_of_the_field){
  console.log('dans display_clickable_advanced_field');
  document.getElementById(type+'_list').innerHTML=list_of_the_field.join('<br>');
  //addEventListner => click => displayTags
}
////////////////////////////////////////////////////////////////////////////////////
function display_tags(list_of_displayed_tags,[type,newTag]){
  console.log('dans display_tags');
  list_of_displayed_tags.type.push(newTag);
  list_of_displayed_tags.type=[... new Set(list_of_displayed_tags.type)];
  tagCardHtml='';
  for (type of ['ingredients','appliance','ustensils']){
    for (let i=0; i<list_of_displayed_tags.type.length;i++){
      tagCardHtml+=`<span class="aTag">${list_of_displayed_tags.type[i]} <i class="fas fa-times"></i></span>`
    }
  }
  document.getElementById('search_tags').innerHTML=tagCardHtml;
  return list_of_displayed_tags;
}
////////////////////////////////////////////////////////////////////////////////////
function open_modal(){
  console.log('dans open_modal');
}