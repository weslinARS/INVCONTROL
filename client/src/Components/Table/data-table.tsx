/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,

} from "@tanstack/react-table";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title,
  Badge,
} from "@tremor/react";

import "../../styles/tableStyle.scss";
import { uid } from "react-uid";
interface DataTableProps{
	columns: any[];
	data: object[];
}

export function DataTable({ columns, data }: DataTableProps) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getCoreRowModel(),
	});
	return (
		<div className='flex justify-center'>
			<div className="flex flex-col gap-4 justify-center">
			<div className="flex items-center py-4">
      </div>
				<Table className='rounded-md border w-[70vw] mt-4' key={uid(data)}>
					<TableHead className="" >
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={uid(headerGroup.id)}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHeaderCell key={uid(header.id)} className=" text-white">
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												)}
										</TableHeaderCell>
									);
								})}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={uid(row.id)}
									data-state={
										row.getIsSelected() && "selected"
									}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={uid(cell)}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'>
									No hay datos para mostrar
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
				<div className='flex items-start gap-2 px-2'>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className='btn-primary btn-sm btn '>
						Anterior
					</button>
					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className='btn-primary btn-sm btn'>
						Siguiente
					</button>
				</div>
			</div>
		</div>
	);
}
