import axios from "axios";
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
export const createSale = async (sale: JSON, userToken: string) =>
  await axios.post("http://localhost:3000/sales", sale, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteSale = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/sales/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
