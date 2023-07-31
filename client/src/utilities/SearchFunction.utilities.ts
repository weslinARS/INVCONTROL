/**
 * funcion que busca sin un objeto con el mismo valor en un array de objetos existe 
 * @param {object[]} array  - array de objetos
 * @param {string} searchValue  - valor a buscar
 * @param {string} key -  llave del objeto a buscar
 * @returns valor booleano. retorna true en caso de encontrar un objecto con el mismo valor en la llave especificada, en caso conrario
 * retorna false.
 * @example
 */
export const FindEqualValuesinObject = (
  array: object[],
  searchValue: string,
  key: string
): boolean => {
  return array.some(object => object[key as keyof object] === searchValue);
};
