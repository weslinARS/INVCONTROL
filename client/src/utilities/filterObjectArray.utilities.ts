import dayjs from 'dayjs';
import _ from 'lodash';

/**
 * funcion que devuelve un arreglo de objetos filtrados por una propiedad en especifico 
 * @param {any[]} objectArray arreglo de objetos a filtrar 
 * @param  {string}filterKey clave de la propiedad del objeto al filtrar
 * @param {string} filterValue valor de la propiedad a filtrar
 * @returns {any[]} arreglo con los objeto filtrados
 */
export const filterObjectArray = (objectArray : any[], filterKey : string, filterValue : string)=> {
  return _.filter(objectArray, (object : any) => {
    return object[filterKey] === filterValue;
  });
}

export const  filterObjectByMonth = (objectArray : any[], filterKey : string, Month: number)=> {
  return _.filter(objectArray, (object : any) => {
    const date = new Date(object[filterKey]);
    const month = date.getMonth()+1;
    if (month === Number(Month)) {
      return object;
    }
  });
}

export const filterObjectsByDate = (objectArray : any[], filterKey : string, date: Date)=> {
  const dateFormatted = dayjs().format('YYYY-MM-DD');
  return _.filter(objectArray, (object : any) => {
    const date = dayjs(object[filterKey]).get('date')+1;
    const objectDate =dayjs(object[filterKey]).format('YYYY-MM')+"-"+date.toString();
    if (objectDate === dateFormatted) {
      return object;
    }
  });
}