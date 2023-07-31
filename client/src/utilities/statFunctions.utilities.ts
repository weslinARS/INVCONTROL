/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import _ from "lodash";
import { object } from "yup";
import { sortObjectArray } from "./SortFunctions.utilities";

/**
 * funcion que calcula el promedio de un arreglo de elementos que tienen dos niveles de profundidad
 * @param {any[]}array Arreglo de elementos a promediar
 * @param {string}level1Key clave del primer nivel de profundidad de los elementos del arreglo
 * @param {string} level2Key clave del segundo nivel de profundidad de los elementos del arreglo
 */
export function getAverage2level(
	array: any[],
	level1Key: string,
	level2Key: string
): number {
	let sum = 0;
	let count = 0;
	_.forEach(array, (item) => {
		_.forEach(Array.from(item[level1Key]), (item3) => {
			sum += item3[level2Key];
			count++;
		});
	});
	const average = sum / count;
	return average;
}

/**
 * funcion que calcula el promedio de un arreglo de elementos que tienen un nivel de profundidad
 * @param {any[]}array Arreglo de elementos a promediar
 * @param {string}levelKey clave del nivel de profundidad de los elementos del arreglo
 * @returns {number} promedio de los elementos del arreglo
 */

export function getAverage1level(array: any[], levelKey: string): number {
	let sum = 0;
	let count = 0;
	_.forEach(array, (item) => {
		sum += item[levelKey];
		count++;
	});
	const average = sum / count;
	return average;
}
/**
 * funcion para obtener la frecuencia de un arreglo de elementos que tienen un nivel de profundidad
 * @param array arreglo de elementos a sumar
 * @param levelKey clave del nivel de profundidad de los elementos del arreglo
 * @returns frecuencia de los elementos del arreglo
 */
export function getFrequency1level(array: any[], levelKey: string): any {
	const frequency: any = [];
	let sum = 0;
	_.forEach(array, (item) => {
		const propertyValue = item[levelKey];
		sum++;
		if (
			frequency.findIndex((item) => item["name"] == propertyValue) == -1
		) {
			//no existe
			frequency.push({
				name: propertyValue,
				counter: 1,
			});
		} else {
			//existe
			const index = frequency.findIndex(
				(item) => item["name"] == propertyValue
			);
			frequency[index].counter++;
		}
	});
	// adding percentage to each frequency item
	_.forEach(frequency, (item) => {
		item["percentage"] = ((item["counter"] * 100) / sum).toFixed(1);
	});
	return frequency;
}
/**
 * funcion para obtener la frecuencia de un arreglo de elementos que tienen dos niveles de profundidad
 * @param array arreglo de elementos a sumar
 * @param level1Key clave del primer nivel de profundidad de los elementos del arreglo
 * @param level2Key clave del segundo nivel de profundidad de los elementos del arreglo
 * @returns frecuencia de los elementos del arreglo
 */
export function getFrequency2level(
	array: any[],
	level1Key: string,
	level2Key: string
): any {
	const frequency: any = {};
	_.forEach(array, (item) => {
		_.forEach(Array.from(item[level1Key]), (item2) => {
			console.table(item2);
			const propertyValue = item2[level2Key];
			frequency[propertyValue] = (frequency[propertyValue] || 0) + 1;
		});
	});

	return frequency;
}
export function getTotal1level(array: any[], levelKey: string): number {
	let sum = 0;
	_.forEach(array, (item) => {
		sum += item[levelKey];
	});
	return sum;
}
/**
 * funcion para obtener el total de un arreglo de elementos que tienen dos niveles de profundidad
 * @param array arreglo de elementos a sumar
 * @param level1Key clave del primer nivel de profundidad de los elementos del arreglo
 * @param level2Key clave del segundo nivel de profundidad de los elementos del arreglo
 * @param tag propiedad del segundo nivel de profundidad de los elementos del arreglo por la que se sumaran los elementos
 * @returns total de los elementos del arreglo
 */
export function getTotal2level(
	array: any[],
	level1Key: string,
	level2Key: string,
	tag: string
) {
	const total = [];
	let sum = 0;
	_.forEach(array, (item) => {
		_.forEach(Array.from(item[level1Key]), (item2) => {
			const tagValue: string = item2[tag];
			sum += item2[level2Key];
			if (total.findIndex((item) => item["name"] == tagValue) == -1) {
				//no existe
				total.push({
					name: item2[tag as keyof typeof object],
					counter: +item2[level2Key],
				});
			} else {
				//existe
				const index = total.findIndex(
					(item) => item["name"] == tagValue
				);
				total[index].counter += item2[level2Key];
			}
		});
		// adding percentage to each total item
		_.forEach(total, (item) => {
			item["percentage"] = ((item["counter"] * 100) / sum).toFixed(1);
		});
	});
	return total;
}

/**
 * funcion para ordenar un arreglo por una propiedad especifica
 * @param array array a ordenar
 * @param property propiedad por la que se ordenara el array
 * @param order  orden del array, puede ser "asc" o "desc"
 * @returns array ordenado
 */
export function orderArrayByProperty(
	array: any[],
	property: string,
	order: "asc" | "desc"
) {
	const orderedArray = _.orderBy(array, [property], [order]);
	return orderedArray;
}

/**
 * funcion para contar los elementos de un arreglo de acuerdo a una propiedad booleana especifica
 * @param array arreglo de elementos a filtrar
 * @param propertyKey  propiedad por la que se filtrara el arreglo
 * @param propertyValue  valor de la propiedad por la que se contara  false o true
 * @returns numero de elementos que cumplen con la condicion
 */
export function getTotalBooleanValues(
	array: any[],
	propertyKey: string,
	propertyValue: boolean
): number {
	let count = 0;
	_.forEach(array, (item) => {
		if (item[propertyKey] == propertyValue) count++;
	});
	return count;
}
/**
 * funcion para contar los elementos de un arreglo de acuerdo a una propiedad booleana especifica
 * @param array arreglo de elementos a filtrar
 * @param propertyKey  propiedad por la que se filtrara el arreglo
 * @param propertyValue  valor de la propiedad por la que se contara  false o true
 * @returns numero de elementos que cumplen con la condicion
 */
export function getFreqBoolean1Level(
	array: any[],
	propertyKey: string,
	propertyValue: boolean,
	tag: string
): any[] {
	const frequency: any[] = [];
	let sum = 0;
	_.forEach(array, (item) => {
		if (item[propertyKey] == propertyValue) {
			sum++;
			const tagValue = item[tag];
			if (frequency.findIndex((item) => item["name"] == tagValue) == -1) {
				//no existe
				frequency.push({
					name: tagValue,
					counter: 1,
				});
			} else {
				//existe
				const index = frequency.findIndex(
					(item) => item["name"] == tagValue
				);
				frequency[index].counter++;
			}
		}
	});
	// adding percentage to each total item
	_.forEach(frequency, (item) => {
		item["percentage"] = ((item["counter"] * 100) / sum).toFixed(1);
	});
	return frequency;
}

/**
 * funcion que devuelve la frecuencia con la que se repite un valor del arreglo de referencia en el arreglo objetivo
 * @param targetArray
 * @param referenceArray
 * @param targetKey
 * @param referenceKey
 * @param tag
 */
export function getArrayReferencesFromArray(
	targetArray: any[],
	referenceArray: any[],
	targetKey: string,
	referenceKey: string,
	tag: string
) {
	const targetA = _.cloneDeep(targetArray);
	let frequency = [];
	_.forEach(referenceArray, (referenceAitem) => {
		_.forEach(targetA, (TargetAItem) => {
			if (referenceAitem[referenceKey] == TargetAItem[targetKey]) {
				if (
					frequency.findIndex(
						(item) => item["name"] == referenceAitem[tag]
					) == -1
				) {
					// no existe
					frequency.push({
						name: referenceAitem[tag],
						counter: 1,
					});
				} else {
					// existe
					const index = frequency.findIndex(
						(item) => item["name"] == referenceAitem[tag]
					);
					frequency[index].counter++;
				}
			}
		});
	});
	frequency = sortObjectArray(frequency, "counter", "desc");
	return frequency;
}
