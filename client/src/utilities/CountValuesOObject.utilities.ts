/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * funcion que cuenta los valores de un propiedad de un objeto
 * @param {any[]} array arrego de objetos para contar 
 * @param {string}key llave del objeto a contar 
 */
export const countValuesOArray = (array : any[], key : string): void => {
  console.log('entrooooooooooooooooo', array);
  for(const  item of array){
    console.log(item);
  }
}