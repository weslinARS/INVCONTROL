import React from 'react'
import {IProduct} from '../../interfaces/IProduct.interface'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../Store/store';

interface IProductModalContentProps {
  productToView:IProduct
}
export default function ProductModalContent({productToView}:IProductModalContentProps) {
  return (
    <div className='w-full md:w-[300px] py-4 px-2 bg-slate-200 rounded-md shadow-md shadow-slate-500/50'>
      <div className='flex flex-col prose'>
        <h3>Informacion del producto</h3>
        <span>Nombre del producto: {productToView.productName}</span>
        <span>Descripcion del producto: {productToView.productDescription}</span>
        <span>Precio del producto: C$ {productToView.productPrice}</span>
        <span>Cantidad del producto: {productToView.productStock}</span>
      </div>
    </div>
  )
}
