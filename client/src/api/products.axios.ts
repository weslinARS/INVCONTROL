/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";

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
export const createProduct = async (
  product: any,
  userToken: string
): Promise<AxiosResponse> =>
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
    },
  });

export const updateProduct = async (
  id: string,
  product: any,
  userToken: string
) =>
  await axios.put(`http://localhost:3000/products/${id}`, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
