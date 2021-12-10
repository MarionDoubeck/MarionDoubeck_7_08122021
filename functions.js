function init_list_of_tags(list_of_recipies){
  console.log('dans init_list_of_tags');
  let list_of_tags=[];
  let tag=new Tag;
  for (const recipe of list_of_recipies){
    for (let i=0;i<recipe['ingredients'].length;i++){
      tag=new Tag(recipe['ingredients'][i]['ingredient'.toLowerCase()],'ingredients');
      if(list_of_tags.find(element=>(element.name==tag.name && element.type=='ingredients'))==undefined){
        list_of_tags.push(tag);
      }
    }
    tag=new Tag(recipe['appliance'].toLowerCase(),'appliance');
    if(list_of_tags.find(element=>(element.name==tag.name && element.type=='appliance'))==undefined){
      list_of_tags.push(tag);
    }
    for (let i=0;i<recipe['ustensils'].length;i++){
      tag=new Tag(recipe['ustensils'][i].toLowerCase(),'ustensils');
      if(list_of_tags.find(element=>(element.name==tag.name && element.type=='ustensils'))==undefined){
        list_of_tags.push(tag);
      }
    }
  }
  console.log(list_of_tags);
  return list_of_tags
}
////////////////////////////////////////////////////////////////////////////////////
function erase_search_bar(){
  console.log('dans erase_search_bar');
  document.getElementById('search_bar').value="";
}
////////////////////////////////////////////////////////////////////////////////////
function isInTag(value,list_of_tags){
  console.log('dans isInTag');
  value=value.toLowerCase()
  let test=0;
  let list_of_possible_tags=[];
  for (type of ['ingredients','appliance','ustensils']){
    for (tag of list_of_tags){
      if((tag.name).includes(value)){
        test=1;
        if(list_of_possible_tags.find((element)=>(element.name==tag.name && element.type==tag.type))==undefined){
          list_of_possible_tags.push(tag);
        }
      }
    }
  }
  if (test==0){
    return [false,'not a tag !']
  }else{
    return [true,list_of_possible_tags]
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
      if (list_of_displayed_tags.find(element=>(element.type=='ingredients' && element.name==ingredient))!=undefined){
        keep_it++;
      }
    }
    for (appliance of sorted_recipies_list[i]['appliance']){
      if (list_of_displayed_tags.find(element=>(element.type=='appliance' && element.name==appliance))!=undefined){
        keep_it++;
      }
    }
    for (ustensil of sorted_recipies_list[i]['ustensils']){
      if (list_of_displayed_tags.find(element=>(element.type=='ustensils' && element.name==ustensil))!=undefined){
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
function filter_advanced_search_fields(type,sorted_recipies_list,list_of_displayed_tags){
  console.log('dans filter_advanced_search_fields de type '+type);
  //trier le menu en ne gardant que ce qu'il y a dans la liste de recettes :
  switch (type){
    case 'ingredients':
      advanced_research=document.getElementById('search_bar_ingredients').value;
      //HtmlContent=[];
      list_of_the_field=[];
      for(recipe of sorted_recipies_list){
        for(nb_of_ingredients in recipe.ingredients){
          const myIngredient=recipe.ingredients[nb_of_ingredients].ingredient;
          if(list_of_the_field.find(element=>element==(myIngredient,'ingredients'))==undefined){
            //trier en plus par le champ de recherche avancée
            //if(recipe.ingredients[nb_of_ingredients].ingredient.includes(advanced_research)){
            //HtmlContent.push(myIngredient);
            list_of_the_field.push(new Tag(myIngredient,'ingredients'))
          //}
          }
        }
      }
      //HtmlContent=[... new Set(HtmlContent)];
      display_clickable_advanced_field(type,list_of_the_field,list_of_displayed_tags);
      break
    case 'appliance':
      advanced_research=document.getElementById('search_bar_appliance').value;
      HtmlContent=[];
      list_of_the_field=[];
      for(recipe of sorted_recipies_list){
        //trier en plus par le champ de recherche avancée
        //if(recipe.appliance.includes(advanced_research)){
          HtmlContent.push(recipe.appliance);
          list_of_the_field.push(new Tag(recipe.appliance,'appliance'))
        //}
      }
      HtmlContent=[... new Set(HtmlContent)];
      display_clickable_advanced_field(type,list_of_the_field,list_of_displayed_tags);
      break
    case 'ustensils':
      advanced_research=document.getElementById('search_bar_ustensils').value;
      HtmlContent=[];
      list_of_the_field=[];
      for(recipe of sorted_recipies_list){
        for(nb_of_ustensils in recipe.ustensils){
          //trier en plus par le champ de recherche avancée
          //if(recipe.ustensils[nb_of_ustensils].includes(advanced_research)){
            HtmlContent.push(recipe.ustensils[nb_of_ustensils]);
            list_of_the_field.push(new Tag(recipe.ustensils[nb_of_ustensils],'ustensils'));
          //}
        }
      }
      HtmlContent=[... new Set(HtmlContent)];
      display_clickable_advanced_field(type,list_of_the_field,list_of_displayed_tags);
      break
  }
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields_from_advanced_search_bar(type,list_of_tags,list_of_displayed_tags,tagName){
  console.log('dans filter(and display)advanced search fields from advanced search bar');
  research=document.getElementById('search_bar_'+type);
  to_display="";
  for (tag of list_of_tags){
    if (tag.name.includes(research)){
      to_display+='<a href=# onclick=display_tags('+list_of_displayed_tags+','+type+','+tag.name+'>'+tag.name+'<\a>';
    }
    if (tagName!=undefined && tag.name.includes(tagName)){
      to_display+='<a href=# onclick=display_tags('+list_of_displayed_tags+','+type+','+tag.name+'>'+tag.name+'<\a>';
    }
  }
  document.getElementById(type+'_list').innerHTML=to_display;
}
////////////////////////////////////////////////////////////////////////////////////
function display_no_result(){
  console.log('dans display_no_result');
  document.getElementById('recipies_container').innerHTML='Aucune recette ne correspond à votre critère... Vous pouvez chercher "tarte aux pommes", "poisson", etc.'
}
////////////////////////////////////////////////////////////////////////////////////
function display_recipies(sorted_recipies_list,list_of_displayed_tags){
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
    filter_advanced_search_fields(type,sorted_recipies_list,list_of_displayed_tags);
  }
}
////////////////////////////////////////////////////////////////////////////////////
function display_clickable_advanced_field(type,list_of_the_field,list_of_displayed_tags){
  console.log('dans display_clickable_advanced_field');
  for(tag of list_of_the_field){
    document.getElementById(type+'_list').innerHTML+='<a href=# onclick="display_tags('+list_of_displayed_tags+','+tag.type+','+tag.name+')">'+tag.name+'</a><br>';
  }
}
////////////////////////////////////////////////////////////////////////////////////
function display_tags(list_of_displayed_tags,type,newTag){
  console.log('dans display_tags');
  console.log("my displayed tags : "+list_of_displayed_tags.ingredients);
  console.log(type+' '+newTag);
  list_of_displayed_tags[type].push(newTag);
  list_of_displayed_tags[type]=[... new Set(list_of_displayed_tags[type])];
  tagCardHtml='';
  for (type of ['ingredients','appliance','ustensils']){
    for (let i=0; i<list_of_displayed_tags[type].length;i++){
      tagCardHtml+=`<span class="aTag">${list_of_displayed_tags[type][i]} <i class="fas fa-times"></i></span>`
    }
  }
  document.getElementById('search_tags').innerHTML=tagCardHtml;
  return list_of_displayed_tags;
}
////////////////////////////////////////////////////////////////////////////////////
function open_modal(){
  console.log('dans open_modal');
}