/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

//TODO: agregar la funcion para actualizar un producto
export const getProducts = async (userToken: string) =>
  await axios.get("http://localhost:3000/products", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const getProduct = async (id: string, userToken: string) =>
  await axios.get(`http://localhost:3000/products/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const createProduct = async (product: any, userToken: string) =>
  await axios.post("http://localhost:3000/products", product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteProduct = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/products/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    params: {
      id,
    }
  });