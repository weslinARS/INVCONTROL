import axios from "axios";

//TODO: agregar la funcion para actualizar una categoria

export const getCategories = async (userToken: string) =>
  await axios.get("http://localhost:3000/category", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const getCategory = async (id: string, userToken: string) =>
  await axios.get(`http://localhost:3000/category/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const createCategory = async (category: JSON, userToken: string) =>
  await axios.post("http://localhost:3000/category", category, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
export const deleteCategory = async (id: string, userToken: string) =>
  await axios.delete(`http://localhost:3000/category/${id}`, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
