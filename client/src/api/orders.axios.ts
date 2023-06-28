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
export const createOrder = async (order: JSON, userToken: string) =>
  await axios.post("http://localhost:3000/order", order, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteOrder = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/order/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
