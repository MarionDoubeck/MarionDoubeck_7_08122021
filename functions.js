function init_list_of_tags(list_of_recipies){
  console.log('dans init_list_of_tags');
  let list_of_tags=[];
  let tag=new Tag;
  for(const recipe of list_of_recipies){
    for(let  i=0;i<recipe.ingredients.length;i++){
      tag=new Tag(recipe['ingredients'][i]['ingredient'].toLowerCase(),'ingredients');
      let alreadyIn=0;
      for(let  k=0;k<list_of_tags.length;k++){
        if(list_of_tags[k].name==tag.name && list_of_tags[k].type=="ingredients"){
          alreadyIn++;
        }
      }
      if (alreadyIn==0){
        list_of_tags.push(tag);
      }
    }
    tag=new Tag(recipe['appliance'].toLowerCase(),'appliance');
    let alreadyIn=0;
    for(let  k=0;k<list_of_tags.length;k++){
      if(list_of_tags[k].name==tag.name && list_of_tags[k].type=="appliance"){
        alreadyIn++;
      }
    }
    if (alreadyIn==0){
      list_of_tags.push(tag);
    }
    for(let  i=0;i<recipe['ustensils'].length;i++){
      tag=new Tag(recipe['ustensils'][i].toLowerCase(),'ustensils');
      let alreadyIn=0;
      for(let k=0;k<list_of_tags.length;k++){
        if(list_of_tags[k].name==tag.name && list_of_tags[k].type=="ustensils"){
          alreadyIn++;
        }
      }
    }
    if (alreadyIn==0){
      list_of_tags.push(tag);
    }
  }
  return list_of_tags;
}
////////////////////////////////////////////////////////////////////////////////////
function filter_recipies(recipies){
  console.log('dans filter_recipies');
  //build list of displayed tags:
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.innerText,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  //filter by tags :
  let new_list_of_recipies=[];
  let item="";
  let addIt=0;
  for (const  recipe of recipies){
    for(const  tag of list_of_displayed_tags){
      tag.name=tag.name.toLowerCase();
      if(tag.type=='appliance'){
        item=recipe[tag.type].toLowerCase();
        if (item==tag.name){
          addIt++;
        }
      }else{
        for(const  temp of recipe[tag.type]){
          if(tag.type=="ingredients"){
            item=temp['ingredient'].toLowerCase();
            if (item==tag.name){
              addIt++;
            }
          }else{
            item=temp.toLowerCase();
            if (item==tag.name){
              addIt++;
            }
          }
        }
      }
    }
    if(addIt==list_of_displayed_tags.length){
      new_list_of_recipies.push(recipe);
    }
    addIt=0;
  }
  //filter par la barre de recherche
  const research=document.getElementById('search_bar').value.toLowerCase();
  if (research.length==0){
    display_recipies(new_list_of_recipies,recipies);
    return;
  }
  let sorted_recipies_list=[];
  const len=research.length;
  let word="";
  let brk=0;
  for(const recipe of new_list_of_recipies){
    brk=0;
    //test sur le nom
    for (word of recipe.name.split(' ')){
        word=word.toLowerCase();
        [sorted_recipies_list,brk]=test_by_word(len,research,recipe,word,sorted_recipies_list);
        if(brk==1){
            break;
        }
    }
    //test sur les ingredients
    if (brk==0){
        for(item of recipe.ingredients){
            word=item.ingredient.toLowerCase();
            [sorted_recipies_list,brk]=test_by_word(len,research,recipe,word,sorted_recipies_list);
            if(brk==1){
                break;
            }
        }
    }
    //test sur la description
    if(brk==0){
        for(word of recipe.description.split(' ')){
            word=word.toLowerCase();
            [sorted_recipies_list,brk]=test_by_word(len,research,recipe,word,sorted_recipies_list);
            if(brk==1){
                break;
            }
        }
    }
  }
  display_recipies(sorted_recipies_list,recipies);
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields(type,sorted_recipies_list,recipies){
  console.log('dans filter_advanced_search_fields de type '+type);
  //trier le menu en ne gardant que ce qu'il y a dans la liste de recettes :
  switch (type){
    case 'ingredients':
      list_of_the_field=[];
      for(const recipe of sorted_recipies_list){
        for(const nb_of_ingredients in recipe.ingredients){
          const myIngredient=recipe.ingredients[nb_of_ingredients].ingredient.toLowerCase();
          let alreadyIn=0;
          for(const element of list_of_the_field){
            if(element.name==myIngredient){
              alreadyIn++;
            }
          }
          if(alreadyIn==0){
            list_of_the_field.push(new Tag(myIngredient,'ingredients'))
          }
        }
      }
      display_clickable_advanced_field(type,list_of_the_field,recipies);
      break
    case 'appliance':
      advanced_research=document.getElementById('search_bar_appliance').value;
      list_of_the_field=[];
      for(const recipe of sorted_recipies_list){
        const myAppliance=recipe.appliance.toLowerCase();
        alreadyIn=0;
        for(const element of list_of_the_field){
          if(element.name==myAppliance){
            alreadyIn++;
          }
        }
        if(alreadyIn==0){
          list_of_the_field.push(new Tag(myAppliance,'appliance'));
        }
      }
      display_clickable_advanced_field(type,list_of_the_field,recipies);
      break
    case 'ustensils':
      list_of_the_field=[];
      for(const recipe of sorted_recipies_list){
        for(const nb_of_ustensils in recipe.ustensils){
          const myUstensil=recipe.ustensils[nb_of_ustensils].toLowerCase();
          let alreadyIn=0;
          for(const element of list_of_the_field){
            if(element.name==myUstensil){
              alreadyIn++;
            }
          }
          if(alreadyIn==0){
            list_of_the_field.push(new Tag(myUstensil,'ustensils'))
          }
        }
      }
      display_clickable_advanced_field(type,list_of_the_field,recipies);
      break
  }
}
////////////////////////////////////////////////////////////////////////////////////
function filter_advanced_search_fields_from_advanced_search_bar(type,list_of_tags,recipies){
  console.log('dans filter(and display)advanced search fields from advanced search bar');
  research=document.getElementById('search_bar_'+type).value.toLowerCase();
  if(research.length==0){
    filter_recipies(recipies);
  }
  let list_of_the_field=[];
  for (const tag of list_of_tags){
    if(tag.type==type && research.length<=tag.name.length){
      for(let i=0;i+research.length<=tag.name.length;i++){
        let test=0;
        for (let j=0;j<research.length;j++){
          if(tag.name[i+j]==research[j]){
            test++;
          }
        }
        if(test==research.length){
          list_of_the_field.push(tag);
          break
        }
      }
    }
  }
  display_clickable_advanced_field(type,list_of_the_field,recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function display_no_result(){
  console.log('dans display_no_result');
  document.getElementById("recipies_container").innerHTML="Aucune recette ne correspond ?? votre crit??re... Vous pouvez chercher 'tarte aux pommes', 'poisson', etc.";
  
}
////////////////////////////////////////////////////////////////////////////////////
function display_recipies(sorted_recipies_list,recipies){
  console.log('dans display_recipies');
  const recipiesContainer=document.getElementById("recipies_container");
  recipiesContainer.innerHTML="";
  if(sorted_recipies_list.length==0){
    display_no_result();
  }else{
    let recipeCardHtml="";
    for(const recipe of sorted_recipies_list){ 
      const recipeModel=recipe_factory(recipe,recipeCardHtml,recipies);
      recipeCardHtml=recipeModel.getRecipeCardDOM();
    }
    recipiesContainer.innerHTML=recipeCardHtml;
  }
  for (const type of ['ingredients','appliance','ustensils']){
    filter_advanced_search_fields(type,sorted_recipies_list,recipies);
  }
  document.querySelectorAll('.a_recipe').forEach(element => {
    element.addEventListener('click',(e)=>open_modal(e,recipies))
  });
}
////////////////////////////////////////////////////////////////////////////////////
function display_clickable_advanced_field(type,list_of_the_field,recipies){
  console.log('dans display_clickable_advanced_field');
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.textContent,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  document.getElementById(type+'_list').innerHTML="";
  for(let  i=0;i<list_of_the_field.length;i++){;
    let tag=list_of_the_field[i];
    let dont=0;
    for(const aTag of list_of_displayed_tags){
      if(aTag.type==tag.type && aTag.name==tag.name){
        dont++;
      }
    }
    if(dont==0){
      let newItem=document.createElement("div");
    newItem.className="tags_in_menu";
    newItem.textContent=capitalizeFirstLetter(tag.name);
    document.getElementById(type+'_list').appendChild(newItem); 
    newItem.addEventListener('click',()=>display_tags(list_of_the_field[i],recipies));  
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////
function display_tags(newTag,recipies){
  console.log('dans display_tags, j\'ajoute :'+newTag.name);
  let list_of_displayed_tags=[];
  let list=document.querySelectorAll(".aTag");
  list.forEach(displayed_tag => {
    let aTag=new Tag(displayed_tag.textContent,displayed_tag.classList[1]);
    list_of_displayed_tags.push(aTag);
  });
  list_of_displayed_tags.push(newTag);
  list_of_displayed_tags=[... new Set(list_of_displayed_tags)];
  tagCardHtml='';
  for (let i=0; i<list_of_displayed_tags.length;i++){
    tagCardHtml+=`<span class="aTag ${list_of_displayed_tags[i].type}">${capitalizeFirstLetter(list_of_displayed_tags[i].name)}<i class="fas fa-times close_tag"></i></span>`
  }
  document.getElementById('tags').innerHTML=tagCardHtml;
  document.querySelectorAll('.close_tag').forEach(element => {
    element.addEventListener('click',(e)=>{
      remove_tag(e,recipies);
    })
  });
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function remove_tag(e,recipies){
  e.target.parentNode.remove();
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function erase(e){
  document.getElementById("search_bar_"+e.target.parentNode.id).value="";
}
////////////////////////////////////////////////////////////////////////////////////
function erase_search_bar(recipies){
  document.getElementById("search_bar").value="";
  filter_recipies(recipies)
}
////////////////////////////////////////////////////////////////////////////////////
function open_modal(e,recipies){
  let recipe_id=e.target.closest(".a_recipe").id.split("_")[1];
  console.log(recipe_id);
  document.getElementById('chosen_recipe').classList.remove("hidden");
  if(recipe_id!=0){
    let recipe={};
    for(const element of recipies){
      if (element.id==recipe_id){
        recipe=element;
        break
      }
    }
    let list_of_ingredients=[];
    for (const item of recipe.ingredients){
      list_of_ingredients.push('</br>'+item.ingredient);
    }
    document.querySelector('.recipe_content').innerHTML=`
    <div id="recipe_info">
      <div>Pour ${recipe.servings} personne(s)<br></div>
      <div>Temps de pr??paration : ${recipe.time} minutes<br></div>
      <div>Ingredients : ${list_of_ingredients}<br></div>
      <div>Appareil : ${recipe.appliance}<br></div>
      <div>Ustensiles : ${recipe.ustensils}<br></div>
    </div>
    <div id="modal_right">
      <div id="modal_name">${recipe.name}</div>
      <div id="modal_description">${recipe.description}</div>
    </div>
    `;
  }
  document.getElementById('close_button').addEventListener("click",()=>{
    document.getElementById('chosen_recipe').classList.add("hidden");
  })
}
