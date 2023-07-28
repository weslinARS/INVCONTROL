/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
//TODO: agregar la funcion para actualizar una venta


export const getSales = async (userToken: string) =>
  await axios.get("http://localhost:3000/sales", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const getSale = async (id: string, userToken: string) =>
  await axios.get(`http://localhost:3000/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const createSale = async (sale: any, userToken: string):Promise<AxiosResponse> =>
  await axios.post("http://localhost:3000/sales", sale, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteSale = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
