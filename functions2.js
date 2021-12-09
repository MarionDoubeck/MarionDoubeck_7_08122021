function display_recipies(sorted_recipies_list){
  const recipiesContainer=document.getElementById("recipies_container");
  recipiesContainer.innerHTML="";
  let recipeCardHtml="";
  for(const recipe of sorted_recipies_list){ 
    const recipeModel=recipe_factory(recipe,recipeCardHtml);
    recipeCardHtml=recipeModel.getRecipeCardDOM();
  }
  recipiesContainer.innerHTML=recipeCardHtml;
}
////////////////////////////////////////////////////////////////////////////////////
function get_and_display_sub_list_from_main_research(type,sorted_recipies_list){
  const number_of_recipies=sorted_recipies_list.length;
  let list=[];
  if (type!="ustensils" && type !="appliance" && type !="ingredients"){
    console.log("le type de liste entré dans 'display_sub_list' est erroné : entrez 'ustensils' ou 'appliance' ou 'ingredients'");
    return
  }
  //build list
    if(type=='ingredients'){
      for (let i=0;i<number_of_recipies;i++){
        for (let j=0;j<sorted_recipies_list[i][type].length;j++){
          list.push(sorted_recipies_list[i][type][j]['ingredient']);
        }; 
      }
    }else if(type=='ustensils'){
      for (let i=0;i<number_of_recipies;i++){
        for (let j=0;j<sorted_recipies_list[i][type].length;j++){
          list.push(sorted_recipies_list[i][type][j]);
        }; 
      }
    }else{
      for (let i=0;i<number_of_recipies;i++){
        list.push(sorted_recipies_list[i][type]);
      }
    }
  //erase duplicates
  list=[... new Set(list)];
  //display
  const my_drop_list=document.getElementById(type+'_list');
  my_drop_list.innerHTML=list.join('<br>');
  return list
}
////////////////////////////////////////////////////////////////////////////////////
function updateSortedRecipiesList(research,sorted_recipies_list){
  //couper research en plusieurs mots avec les espaces
  const number_of_recipies=sorted_recipies_list.length;
  newList=[];
  for (let k=0;k<number_of_recipies;k++){
    const title=sorted_recipies_list[k].name;
    const ingredients=sorted_recipies_list[k].ingredients;
    const description=sorted_recipies_list[k].description;
    if (title.includes(research) || ingredients.includes(research) || description.includes(research)){
      newList.push(sorted_recipies_list[k]);
    }
  }
  return newList;
}
////////////////////////////////////////////////////////////////////////////////////
function updateResearch(research,sorted_recipies_list,ingredients_list,appliance_list,ustensils_list){
    if(research.length<3){
      return
      //let newList=updateResearchToZero();
    }else{
      let newList=updateSortedRecipiesList(research,sorted_recipies_list);
      display_recipies(newList);
      let ingredients_list=get_and_display_sub_list_from_main_research('ingredients',newList);
      let appliance_list=get_and_display_sub_list_from_main_research('appliance',newList);
      let ustensils_list=get_and_display_sub_list_from_main_research('ustensils',newList);
      maRecursive(newList,ingredients_list,appliance_list,ustensils_list)
    }
}
////////////////////////////////////////////////////////////////////////////////////
function get_and_display_sub_list_from_self_research(event,type,sorted_recipies_list,ingredients_list,appliance_list,ustensils_list){
  let research=event.target.value;
  let new_type_list=[];
  let list=[];
  switch (type+'_list'){
    case 'ingredients_list':
      list=ingredients_list;
      break;
    case 'appliance_list': 
      list=appliance_list;
      break;
    case 'ustensils_list': 
      list=ustensils_list;
      break;
  }
  if (research.length<3){
    return
  }else{
    for(let k=0;k<list.length;k++){
      if (list[k].includes(research)){
        new_type_list.push(list[k]);
      }
    }
  }
  switch (type+'_list'){
    case 'ingredients_list':
      get_sorted_list_from_sub_lists(sorted_recipies_list,new_type_list,appliance_list,ustensils_list);
      maRecursive(sorted_recipies_list,new_type_list,appliance_list,ustensils_list);
      break;
    case 'appliance_list':
      get_sorted_list_from_sub_lists(sorted_recipies_list,new_type_list,appliance_list,ustensils_list);
      maRecursive(sorted_recipies_list,ingredients_list,new_type_list,ustensils_list);
      break;
    case 'ustensils_list':
      get_sorted_list_from_sub_lists(sorted_recipies_list,new_type_list,appliance_list,ustensils_list);
      maRecursive(sorted_recipies_list,ingredients_list,appliance_list,new_type_list);
      break;
  }
  
}


//si un des ingrédients de la recette n'est pas dans la liste des ingredients, virer la recette de la liste
function get_sorted_list_from_sub_lists(sorted_recipies_list,ingredients_list,appliance_list,ustensils_list){
  const newList=sorted_recipies_list.filter(recipe=>{
    recipe['ingredients'].forEach(ingredient=>ingredients_list.includes(ingredient));
  })
  console.log(newList);
}