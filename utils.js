
function add_key_word(newWord,recipe,list){
  let dont=0;
  for (const item of list){
    if (item.word==newWord && item.recipe==recipe){
      dont++;
    }
  }
  if(dont==0){
    list.push(new Keyword(newWord,recipe));
  }
}