import _ from 'lodash';

/**
 * función que busca un objeto en un array de objetos por medio de una clave y un valor 
 * @param {any[]} Array array de oojetos para buscar 
 * @param {string} key clave del objeto a buscar
 * @param {string} value valor de la clave del objeto a buscar
 * @returns  objeto encontrado
 */
export const GetObjectFromArray = (Array : any[], key : string,value : string) =>
{
  return _.find(Array, function(o) { return o[key] === value; });
}