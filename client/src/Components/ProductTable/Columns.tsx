import { createColumnHelper } from "@tanstack/react-table";
import { BadgeDelta } from "@tremor/react";
import { BsAsterisk } from "react-icons/bs";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import { DeleteProductBtn } from "./DeleteProductBtn.component";
import { EditProductBtn } from "./EditProductBtn.component";
import { ViewProductButton } from "./ViewProductButton.component";

type Product = {
	_id: string;
	productName: string;
	productDescription: string;
	productPrice: number;
	productStock: number;
	productCategory: string;
	productSupplierId: string;
	productStockPolicy: number;
	productIsOverPolicy: boolean;
};
const columnHelper = createColumnHelper<Product>();
export const columns = [
	columnHelper.accessor("productName", {
		header: ({ column }) => {
			return (
				<div className='font-bold text-white'>
					<button
						onClick={() =>
							column.toggleSorting(
								column.getIsSorted() === "desc"
							)
						}>
						^
					</button>
					&nbsp; Nombre
				</div>
			);
		},
		cell: ({ row }) => {
			const product = row.original;
			return (
				<div className='flex flex-col'>
					<div className='font-bold'>{product.productName}</div>
				</div>
			);
		},
	}),
	columnHelper.accessor("productCategory", {
		header: () => <div className='font-bold text-white'>Categoria</div>,
	}),
	columnHelper.accessor("productPrice", {
		header: () => (
			<div className='text-right  font-bold text-white'>Precio</div>
		),
		cell: ({ row }) => {
			const price = parseFloat(row.getValue("productPrice"));
			// formatting the price to cordobas
			const formatter = new Intl.NumberFormat("es-NI", {
				style: "currency",
				currency: "NIO",
			});
			return <div className='text-right'>{formatter.format(price)}</div>;
		},
	}),
	columnHelper.accessor("productStock", {
		cell: ({ row }) => {
			const stock = parseInt(row.getValue("productStock"));
			return <div className='text-right'>{stock}</div>;
		},
		header: () => (
			<div className='text-right font-bold text-white'>Stock</div>
		),
	}),
	columnHelper.display({
		id: "productIsOverPolicy",
		header: () => (
			<div className='text-right font-bold text-white'>Estado</div>
		),
		cell: ({ row }) => {
			const stockPolicy = row.original.productIsOverPolicy;
			return (
				<div className='text-right'>
					{stockPolicy ? (
						<BadgeDelta deltaType='moderateIncrease'>
							En existencia
						</BadgeDelta>
					) : (
						<BadgeDelta deltaType='moderateDecrease'>
							Agotandose
						</BadgeDelta>
					)}
				</div>
			);
		},
	}),
	columnHelper.display({
		id: "actions ",
		header: () => (
			<div className='text-center font-bold text-white'>Acciones</div>
		),
		cell: ({ row }) => {
			const product = row.original;
			return (
				<div className='text-center'>
					<DropdownMenu>
						<DropdownMenuTrigger>
							<span className='btn-neutral btn-sm btn hover:cursor-pointer'>
								<BsAsterisk />
							</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuLabel>
								{product.productName}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<EditProductBtn product={product} />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DeleteProductBtn id={product._id} />
							</DropdownMenuItem>
							<DropdownMenuItem>
								<ViewProductButton productInfo={product} />
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	}),
];
