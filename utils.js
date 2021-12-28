function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
////////////////////////////////////////////////////////////////////////////////////
function test_by_word(len,research,recipe,word,sorted_recipies_list){
  let test=0;
  let brk=0;
  let len2=word.length;
  if(len>len2){
      return[sorted_recipies_list,0];
  }else{
      for(let i=0;i<len;i++){
          if(research[i]==word[i]){
              test++;
          }else{
              break;
          }
      }
      if(test==len){
          let dont=0;
          for(const alreadyIn of sorted_recipies_list){
              if(recipe==alreadyIn){
                  dont++;
                  break;
              }
          }
          if(dont==0){
              sorted_recipies_list.push(recipe);
          }
          brk=1;
      }
      return([sorted_recipies_list,brk]);
  }
}