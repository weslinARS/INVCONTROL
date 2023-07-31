import axios from "axios";
//TODO: agregar la funcion para actualizar un pedido

export const getOrders = async (userToken: string) =>
  await axios.get("http://localhost:3000/order", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const getOrder = async (id: string, userToken: string) =>
  await axios.get(`http://localhost:3000/order/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const createOrder = async (order: any, userToken: string) =>
  await axios.post("http://localhost:3000/order", order, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteOrder = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/order/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

export const updateOrder = async (
  id: string,
  order: any,
  userToken: string
) =>
  await axios.put(`http://localhost:3000/order/${id}`, order, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  });
