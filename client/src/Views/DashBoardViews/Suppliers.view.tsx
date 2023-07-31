import { Button, Card, Flex, Icon, Text } from "@tremor/react";
import { useEffect, useState } from "react";
import { FaTruckLoading } from "react-icons/fa";
import { SupplierForm } from "../../Components/FormsComponent/SupplierForm.component";
import { HiPlusSm } from "react-icons/hi";
import {DataTable} from '../../Components/Table/data-table'
import {columns} from '../../Components/SupplierTable/columns'
import {  useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "src/Store/store";
import { useMemo } from "react";
import { useStore } from "../../Contexts/Store.context";
export function Proveedores() {
	const { isSupplierToEdit, supplierToEdit, setIsSupplierToEdit, setSupplierToEdit } = useStore();
	useEffect(()=>{
		if(isSupplierToEdit){
			setisAddSupplierFormOpen(true)
		}
	},[isSupplierToEdit])
	//*states
	const [isAddSupplierFormOpen, setisAddSupplierFormOpen] =
		useState<boolean>(false);
	const supplierList = useSelector((state: RootState) => state.Suppliers.suppliers);
	const supplierMemo = useMemo(() => supplierList, [supplierList]);
	return (
		<>
			<main className='p-4 '>
				<Flex
					alignItems='center'
					justifyContent='start'>
					<Icon
						size='xl'
						className='text-neutral-800'
						icon={FaTruckLoading}></Icon>
					<span className='prose'>
						<h1 className='uppercase text-neutral-800'>
							Proveedores
						</h1>
					</span>
				</Flex>
				<p className="text-primary">
					{
						isAddSupplierFormOpen
							?(isSupplierToEdit ? "Actualizar Producto": "Registrar Proveedor")
							:"Visualizar Proveedores"
					}
				</p>
				{!isAddSupplierFormOpen && (
					<Button icon={HiPlusSm} color="indigo" className='mt-2' onClick={()=>setisAddSupplierFormOpen(true)}>Registar Proveedor</Button>
				)}
				<Card className='mt-6 flex items-center justify-center'>
					<SupplierForm formSatusFn={setisAddSupplierFormOpen} isFormOpen={isAddSupplierFormOpen}/>
					{!isAddSupplierFormOpen && (
					<DataTable
					columns={columns}
					data={supplierMemo}
					/>
				)}
				</Card>
			</main>
		</>
	);
}
