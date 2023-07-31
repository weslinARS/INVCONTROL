import * as yup from 'yup';

export const OrderSchema = yup.object(
  {
    orderDate: yup.string().required('Fecha requerida'),
    orderDeliveryDate: yup.string().required('Fecha de entrega requerida'),
    orderProducts : yup.array().of(
      yup.object(
        {
          orderedProductName: yup.string().required('Nombre requerido'),
          orderedProductQuantity: yup.number().required('Cantidad requerida').integer('La cantidad debe ser un número entero').positive('La cantidad debe ser un número positivo').min(1, 'La cantidad debe ser mayor a 0'),
          orderedProductPrice: yup.number().required('Precio requerido').positive('El precio debe ser un número positivo'),
          orderedProductCategory: yup.string().required('Categoría requerida'),
          orderedProductId: yup.string().required('Id requerido'),
        }
      )
    )
  }
)