import { ProductsForm , CategoryForm} from "../../Components/FormsComponent";
import { RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BiCoffeeTogo } from "react-icons/bi";
import { ButtonFormTrigger } from "../../Components/ProductsViewComponent/ButtonFormTrigger";
import { Toaster } from "react-hot-toast";
import { useStore } from "../../Contexts/Store.context";
import {DataTable} from '../../Components/Table/data-table'
import {columns} from '../../Components/ProductTable/Columns'

export function Productos() {
	const productList = useSelector(
		(state: RootState) => state.Products.products
	);
	const [isProductFormOpen, setisProductFormOpen] = useState(false);
	const [isCategoryFormOpen, setisCategoryFormOpen] = useState(false);
	const { isProductToEdit, productToEdit } = useStore();
	return (
		<div className=' py-4 '>
			<div className=''>
				<h1 className='flex flex-row text-4xl font-bold '>
					<BiCoffeeTogo />
					Productos
				</h1>
				<span className='ml-2 text-lg font-bold text-primary '>
					{isProductToEdit
						? "Editar Producto"
						: isProductFormOpen
						? "Registrar Productos"
						: "Visualizar Productos"}
				</span>
				{(!isProductFormOpen &&  !isCategoryFormOpen)  && (
					<div className='mt-4 inline-flex w-screen justify-center gap-4'>
						<ButtonFormTrigger
						buttonText="Agregar Producto"
							triggerFunction={() => setisProductFormOpen(!isProductFormOpen)}
						/>
						<ButtonFormTrigger
						buttonText="Agregar Categoría"
							triggerFunction={() => setisCategoryFormOpen(!isCategoryFormOpen)}
						/>
					</div>
				)}
				{
					isCategoryFormOpen &&(
						<div>
							<CategoryForm setIsOpenForm={setisCategoryFormOpen}></CategoryForm>
						</div>
					)
				}
				{isProductFormOpen || isProductToEdit ? (
					<div className='mt-6 flex flex-col items-center'>
						<ProductsForm setIsOpenForm={setisProductFormOpen} />
					</div>
				) : (
					<>
						<DataTable
							columns={columns}
							data={productList}
							key={productList.length}
						/>
					</>
				)}
			</div>
			<Toaster />
		</div>
	);
}
