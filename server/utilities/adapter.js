export const adapedtObjectArray = (array) =>{
  const newArray = productsArray.map((element)=>{
    delete element._doc.__v;	
    return element;
  })
  return newArray;
}