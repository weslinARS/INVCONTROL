import { BsFillCartFill } from "react-icons/bs";
import { useState } from "react";
import {SaleForm} from '../../Components/FormsComponent'
export function Ventas() {
	const [isAddSaleFormOpen, setisAddSaleFormOpen] = useState<boolean>(false);
	return (
		<div className='p-4'>
			<div className='prose flex flex-col items-start content-center '>
				<h1 className='inline-flex'>
					<BsFillCartFill /> &nbsp; Ventas
				</h1>
				<span className='text-primary'>
					{!isAddSaleFormOpen
						? "Visualizar Ventas"
						: "Registrar Venta"}
				</span>
				<SaleForm></SaleForm>
			</div>
		</div>
	);
}
