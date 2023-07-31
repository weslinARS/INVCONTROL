import { Button, Card, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { HiCube } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { OrderForm } from "../../Components/FormsComponent/OrderForm.component";
import { columns } from "../../Components/OrderTable/columns";
import { DataTable } from "../../Components/Table/data-table";
import { useStore } from "../../Contexts/Store.context";
export function Abastecimiento() {
	const orders = useSelector((state: RootState) => state.Orders.orders);
	const { isOrderToEdit, setIsOrderToEdit, orderToEdit, setOrderToEdit } =
		useStore();
  useEffect(()=>{
    if(isOrderToEdit){
      setisAddOrderFormOpen(true)
    }
  },[isOrderToEdit])
	const [isAddOrderFormOpen, setisAddOrderFormOpen] =
		useState<boolean>(false);
	return (
		<main className='p-4'>
			<div className='prose'>
				<h1 className='text-nuetral inline-flex'>
					<HiCube /> &nbsp; Ordenes
				</h1>
			</div>
			<Text className='text-primary'>
				{!isAddOrderFormOpen ? (!isOrderToEdit ? "Visualizar Ordenes" : "Editar Orden") : "Registrar Orden"}
			</Text>
			{!isAddOrderFormOpen && (
				<Button
					color='indigo'
					onClick={() => setisAddOrderFormOpen(!isAddOrderFormOpen)}>
					+ Registar Orden
				</Button>
			)}

			<Card className='mt-6 flex flex-col items-center'>
				{isAddOrderFormOpen || isOrderToEdit ? (
					<OrderForm
						formSatusFn={setisAddOrderFormOpen}
						isFormOpen={isAddOrderFormOpen}
					/>
				) : (
					<DataTable
						columns={columns}
						data={orders}
					/>
				)}
			</Card>
		</main>
	);
}
