const search_bar=document.getElementById('search_bar');
const search_bar_ingredients=document.getElementById('search_bar_ingredients');
const search_bar_appliance=document.getElementById('search_bar_appliance');
const search_bar_ustensils=document.getElementById('search_bar_ustensils');
let list_of_tags=init_list_of_tags(recipies);
let list_of_displayed_tags=[];
let ingredients_list=[];
let appliance_list=[];
let ustensils_list=[];
display_recipies(recipies);
//////////////////////////////////////////////////
search_bar.addEventListener('input',(e)=>{
  let sorted_recipies_list=recipies;
  if(e.target.value.length>=3){
    const [bool,possibleTags]=isInTag(e.target.value,list_of_tags);
    /* if(bool==true){
      sorted_recipies_list=filter_recipies(sorted_recipies_list,list_of_displayed_tags);
      for (possibleTag of possibleTags){
        filter_advanced_search_fields_from_advanced_search_bar(possibleTag.type,list_of_tags,list_of_displayed_tags,possibleTag.name);
      } 
    }else{*/
      sorted_recipies_list=filter_recipies(sorted_recipies_list,list_of_displayed_tags);
    //};
  }else{
    return
  }
})
search_bar_ingredients.addEventListener('input',(e)=>{
  console.log("j'ai tappé dans ingredients "+e.target.value);
  ingredients_list=filter_advanced_search_fields('ingredients',filter_recipies(recipies,list_of_displayed_tags));
  display_clickable_advanced_field(ingredients_list);
})
search_bar_appliance.addEventListener('input',()=>{
  appliance_list=filter_advanced_search_fields('appliance',filter_recipies(recipies,list_of_displayed_tags));
  display_clickable_advanced_field(appliance_list);
})
search_bar_ustensils.addEventListener('input',()=>{
  ustensils_list=filter_advanced_search_fields('ustensils',filter_recipies(recipies,list_of_displayed_tags));
  display_clickable_advanced_field(ustensils_list);
})

