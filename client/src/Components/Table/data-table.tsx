/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	ColumnFiltersState,
	getSortedRowModel,
	SortingState,
	FilterFn,
} from "@tanstack/react-table";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableHeader,
} from "../../src/components/ui/table.tsx";
import "../../styles/tableStyle.scss";
import  {BarraBusqueda} from '../BarraBusqueda.component.tsx'
import {  useState } from "react";
import useDebounce  from '../../hooks/useDebound.tsx'
import { rankItem } from "@tanstack/match-sorter-utils";
interface DataTableProps{
	columns: any[];
	data: object[];
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}
export function DataTable({ columns, data }: DataTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [globalFilter, setGlobalFilter] = useState<string>('');
	const debouncedValue = useDebounce(columnFilters, 500);
	const table = useReactTable({
		data,
		columns,
		state:{
			sorting,
			globalFilter,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		globalFilterFn : fuzzyFilter
	});
	return (
		<div className='flex justify-center'>
			<div className="flex flex-col gap-4 justify-center">
			<div className="flex items-center py-4">
				<BarraBusqueda
				value={columnFilters[0]?.value || ''}
				onChangeFn={(e:any)=>{
					console.log(e.target.value)
					table.setGlobalFilter(e.target.value)
				}}
				/>
      </div>
				<Table className='rounded-md border w-[90vw] mt-4'>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}>
									{row.getVisibleCells().map((cell) => (
										<TableCell>
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
