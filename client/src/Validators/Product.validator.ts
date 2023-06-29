import * as Yup from "yup";
export const ProductValidator = Yup.object({
  productName: Yup.string().required("Ingrese el nombre del produto"),
  productPrice: Yup.number()
    .required("Ingrese el precio del producto")
    .min(1, "el precio debe ser mayor a 0"),
  productStock: Yup.number()
    .required("Ingrese el stock del producto")
    .integer("El numero debe de ser entero")
    .min(1, "El stock debe ser mayor a 0"),
  productSupplierId: Yup.string().required("Ingrese el proveedor del producto"),
  productCategory: Yup.string().required("Ingrese la categoria del producto"),
  productDescription: Yup.string().required(
    "Ingrese la descripcion del producto"
  ),
});
