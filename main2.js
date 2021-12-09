//initialisation des listes:
let sorted_recipies_list=recipies;
let ingredients_list=[];
let appliance_list=[];
let ustensils_list=[];

function maRecursive(sorted_recipies_list,ingredients_list,appliance_list,ustensils_list){
  //affichage de la liste de recettes:
  display_recipies(sorted_recipies_list);
  //écoute des barres de recherche et tri des listes:
  const search_bar=document.getElementById('search_bar');
  const search_bar_ingredients=document.getElementById('search_bar_ingredients');
  const search_bar_appliance=document.getElementById('search_bar_appliance');
  const search_bar_ustensils=document.getElementById('search_bar_ustensils');

  search_bar.addEventListener('input',(e)=>updateResearch(e.target.value,sorted_recipies_list,ingredients_list,appliance_list,ustensils_list));
  search_bar_ingredients.addEventListener('input',event=>get_and_display_sub_list_from_self_research(event,'ingredients',sorted_recipies_list,ingredients_list,appliance_list,ustensils_list));
  search_bar_appliance.addEventListener('input',event=>get_and_display_sub_list_from_self_research(event,'appliance',sorted_recipies_list,ingredients_list,appliance_list,ustensils_list));
  search_bar_ustensils.addEventListener('input',event=>get_and_display_sub_list_from_self_research(event,'ustensils',sorted_recipies_list,ingredients_list,appliance_list,ustensils_list));
}

maRecursive(sorted_recipies_list,ingredients_list,appliance_list,ustensils_list)
