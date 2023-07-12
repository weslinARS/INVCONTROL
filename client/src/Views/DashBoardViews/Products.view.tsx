import { ProductsForm, CategoryForm } from "../../Components/FormsComponent";
import { RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BiCoffeeTogo } from "react-icons/bi";
import { ButtonFormTrigger } from "../../Components/ProductsViewComponent/ButtonFormTrigger";
import { Toaster } from "react-hot-toast";
import { useStore } from "../../Contexts/Store.context";
import { DataTable } from "../../Components/Table/data-table";
import { columns } from "../../Components/ProductTable/Columns";
import { BsFillBookmarkPlusFill, BsFillBagPlusFill } from "react-icons/bs";
import { CategoryList } from "../../Components/CategoryComponents/CategoryList.component";
import ProductView from "../../Components/ProductsViewComponent/ProductViewContent.component";
export function Productos() {
	const productList = useSelector(
		(state: RootState) => state.Products.products
	);
	const [isProductFormOpen, setisProductFormOpen] = useState(false);
	const [isCategoryFormOpen, setisCategoryFormOpen] = useState(false);
	const { isProductToEdit, productToEdit } = useStore();
	useEffect(() => console.log(isCategoryFormOpen), [isCategoryFormOpen]);
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
				{!isProductFormOpen && !isCategoryFormOpen && (
					<div className='mt-4 inline-flex w-screen justify-center gap-4'>
						<ButtonFormTrigger
							buttonIcon={<BsFillBagPlusFill />}
							buttonText='Agregar Producto'
							triggerFunction={() =>
								setisProductFormOpen(!isProductFormOpen)
							}
						/>
						<ButtonFormTrigger
							buttonText='Agregar Categoría'
							triggerFunction={() =>
								setisCategoryFormOpen(!isCategoryFormOpen)
							}
							buttonIcon={<BsFillBookmarkPlusFill />}
						/>
					</div>
				)}
				{isCategoryFormOpen && (
					<div>
						<CategoryForm
							setIsOpenForm={
								setisCategoryFormOpen
							}></CategoryForm>
						<CategoryList></CategoryList>
					</div>
				)}
				{isCategoryFormOpen == false && ((isProductFormOpen || isProductToEdit) ? (
					<div className='mt-6 flex flex-col items-center '>
						<ProductsForm setIsOpenForm={setisProductFormOpen} />
					</div>
				) : (
					<div className='mx-5 flex justify-center items-center gap-x-5'>
						<DataTable
							columns={columns}
							data={productList}
							key={productList.length}
						/>
					</div>
				))}
			</div>
			<Toaster />
		</div>
	);
}
