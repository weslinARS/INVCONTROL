import axios from "axios";

//TODO: agregar la funcion para actualizar un proveedor
export const getSuppliers = async (userToken: string) =>
  await axios.get("http://localhost:3000/suppliers", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const getSupplier = async (id: string, userToken: string) =>
  await axios.get(`http://localhost:3000/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const createSupplier = async (supplier: JSON, userToken: string) =>
  await axios.post("http://localhost:3000/suppliers", supplier, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

export const deleteSupplier = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/suppliers/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
