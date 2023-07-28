import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import dayjs from "dayjs";
import { BsEyeFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type SoldProduct = {
	_id: string;
	soldProductName: string;
	soldProductId: string;
	soldProductQuantity: number;
	soldProductAmountCollected: number;
};

type Sale = {
	_id: string;
	saleDate: Date;
	saleSellerId: string;
	saleAmountCollected: number;
	saleProducts: Array<SoldProduct>;
};
interface IProps {
	saleInfo: Sale;
}
export function ViewSaleButton({ saleInfo }: IProps) {
	const mySwal = withReactContent(Swal);
	const handleView = (sale: Sale) => {
		mySwal.fire({
			title: (
				<div className=' prose flex flex-row content-center items-start justify-center gap-x-3 text-2xl font-bold'>
					<HiShoppingCart />
					<span className='text-2xl'>Descripción del producto</span>
				</div>
			),
			html: (
				<div>
					<div className='prose flex flex-col items-start'>
						<span>
							{" "}
							<span className='font-bold text-primary'>
								Fecha de la venta:
							</span>{" "}
							{dayjs(sale.saleDate).format("DD/MM/YYYY")}
						</span>
						<span>
							<span className='font-bold text-primary'>
								hora de la venta:
							</span>{" "}
							{dayjs(sale.saleDate).format("hh:mm:ss A")}
						</span>
						<span>
							<span className='font-bold text-primary'>
								Monto recolectado:
							</span>{" "}
							C$ {sale.saleAmountCollected}
						</span>
						<span>
							<span className='font-bold text-primary'>
								Productos vendidos:
							</span>
							<Table className="">
								<TableHead>
									<TableRow className='text-white'>
										<TableHeaderCell className='text-white'>
											Producto
										</TableHeaderCell>
										<TableHeaderCell className='text-white'>
											Cant. vendida
										</TableHeaderCell>
										<TableHeaderCell className='text-white'>
											Monto
										</TableHeaderCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sale.saleProducts.map((product) => (
										<TableRow>
											<TableCell>
												{product.soldProductName}
											</TableCell>
											<TableCell>
												{product.soldProductQuantity}
											</TableCell>
											<TableCell>
												{
													product.soldProductAmountCollected
												}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</span>
					</div>
				</div>
			),
		});
	};
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleView(saleInfo)}>
			<BsEyeFill />
			&nbsp; Editar
		</span>
	);
}
