import * as Yup from 'yup'

export const SaleValidator = Yup.object({
  saleDate : Yup.date().required('La fecha de la venta es requerida'),
  saleProducts : Yup.array().of(
    Yup.object({
      soldProductCategory : Yup.string().required('La categoria del producto es requerida'),
      soldProductName : Yup.string().required('El nombre del producto es requerido'),
      soldProductQuantity : Yup.number().integer('Debe de ingresar un numero entero').required('La cantidad de producto vendido es requerido'),
      soldProductAmountCollected : Yup.number().required('El monto recaudado es requerido'),
      soldProductId : Yup.string().required('El id del producto vendido es requerido')
    }) 
  ).required('Debe agregar al menos un producto'),
})