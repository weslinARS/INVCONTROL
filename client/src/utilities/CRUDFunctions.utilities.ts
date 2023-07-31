/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from "lodash";

/**
 * funcion que agrega un item a un array
 * @param array - arrray al que se agregará el item
 * @param item - item que se agregará al array
 * @returns  - retorna un nuevo array con el item agregado
 */
export const Add = (array: any[], item: any) => {
  return [...array, item];
};

/**
 * funcion para remover un item de un arreglo 
 * @param array array al que se le removerá el item
 * @param id id del item que se removerá
 * @returns  retorna un nuevo array sin el item
 */
export const RemoveById = (array: any[], id: string) => {
  return array.filter((item: any) => item._id !== id);
};

/**
 * funcion para actualizar cierto item de un arreglo
 * @param array  array al que se le removerá el item
 * @param item  item que se actualizará
 * @returns retorna un nuevo array con el item actualizado
 */
export const UpdateArray = (array: any[], item: any) => {
  return _.map(array, function (arrayItem: any) {
    if (arrayItem._id === item._id) {
      return { ...item };
    }
    return { ...arrayItem };
  });
};
