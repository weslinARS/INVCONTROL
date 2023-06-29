import ProductsForm from "../../Components/ProductsViewComponent/ProductsForm.component";
import Table from "../../Components/Table/Table.component";
import { RootState } from "../../app/store";
import { tableDataProducts } from "../../utilities/tableData";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BiCoffeeTogo } from "react-icons/bi";
import { BarraBusqueda } from "../../Components/BarraBusqueda.component";
import { ButtonFormTrigger } from "../../Components/ProductsViewComponent/ButtonFormTrigger";
import { Toaster } from "react-hot-toast";
export function Productos() {
	const productList = useSelector(
		(state: RootState) => state.Products.products
	);
	const [isFormOpen, setIsFormOpen] = useState(false);
	return (
		<div className='w-full px-8 py-4'>
			<div className=''>
				<h1 className='flex flex-row text-4xl font-bold '>
					<BiCoffeeTogo />
					Productos
				</h1>
				<span className='ml-2 text-lg font-bold text-primary '>
					{!isFormOpen
						? "Visualizar Productos"
						: "Registrar Productos"}
				</span>
				{isFormOpen ? (
					<div className='mt-6 flex flex-col items-center'>
						<ProductsForm
							setIsOpenForm={setIsFormOpen}
						/>
					</div>
				) : (
					<div className='flex flex-col  items-center  justify-center p-4 '>
						<div className='flexrow mx-auto flex gap-2 rounded-lg bg-slate-50 px-2 py-4 shadow-sm '>
							<BarraBusqueda />
							<ButtonFormTrigger
								triggerFunction={() =>
									setIsFormOpen(!isFormOpen)
								}
							/>
						</div>
						<Table
							objectIdKey='productId'
							labels={tableDataProducts}
							data={productList}
						/>
					</div>
				)}
			</div>
			<Toaster />
		</div>
	);
}
