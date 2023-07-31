import { Button, Card, Text } from "@tremor/react";
import { useMemo, useState } from "react";
import { BsFillCartFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { uid } from "react-uid";
import { RootState } from "src/Store/store";
import { SaleForm } from "../../Components/FormsComponent/SaleForm.component";
import { columns } from "../../Components/SalesTable/colums";
import { DataTable } from "../../Components/Table/data-table";
import { useStore } from "../../Contexts/Store.context";
export function Ventas() {
	const { isSaleToEdit, setIsSaleToEdit, setSaleToEdit } = useStore();
	const saleList = useSelector((state: RootState) => state.Sales.sales);
	const saleMemo = useMemo(() => saleList, [saleList]);
	const [isAddSaleFormOpen, setisAddSaleFormOpen] = useState<boolean>(false);
	const handleFormClose = () => {
		setisAddSaleFormOpen((state) => !state);
	};
	return (
		<div className='p-4'>
			<main>
				<div className='prose'>
					<h1 className='text-nuetral inline-flex'>
						<BsFillCartFill /> &nbsp; Ventas
					</h1>
				</div>
				<Text className='text-primary'>
					{!isAddSaleFormOpen
						? "Visualizar Ventas"
						: "Registrar Venta"}
				</Text>

				<Card className='mt-6'>
					<div className='flex flex-col content-center items-center '>
						<div>
							{!isAddSaleFormOpen && (
								<Button
									icon={HiPlus}
									color='indigo'
									onClick={() => {
										setisAddSaleFormOpen((state) => !state);
									}}>
									Agregar Venta{" "}
								</Button>
							)}
						</div>
						<div>
							{isAddSaleFormOpen || isSaleToEdit ? (
								<SaleForm
									ButtonCloseForm={
										<Button
											type='button'
											color='red'
											onClick={() => {
												if (isSaleToEdit) {
													setIsSaleToEdit(
														!isSaleToEdit
													);
													setSaleToEdit({});
												}
												handleFormClose();
											}}>
											{isSaleToEdit
												? "Cancelar Edición"
												: "Cancelar Registro"}
										</Button>
									}
								/>
							) : (
								""
							)}
							{!isSaleToEdit && !isAddSaleFormOpen ? (
								<DataTable
									columns={columns}
									data={saleMemo}
									key={uid(saleMemo)}
								/>
							) : (
								""
							)}
						</div>
					</div>
				</Card>
			</main>
		</div>
	);
}
