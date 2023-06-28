/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import { uid } from "react-uid";
import { useProduct } from "../../hooks/useProducts.hook";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
interface ObjectProduct {
	[key: string]: any;
}
interface props {
	data: Array<ObjectProduct>;
	labels: object;
	objectIdKey: string;
}
export default function Table(props: props) {
	const MySwal = withReactContent(Swal);
	const { DeleteProduct } = useProduct();
	const labelsValues = useMemo(
		() => Object.values(props.labels),
		[props.labels]
	);
	const labelsKeys = useMemo(() => Object.keys(props.labels), [props.labels]);
	const handleDelete = (id: string) => {
		MySwal.fire({
			title: "Eliminar Registro",
			text: "¿Estas seguro de eliminar este registro?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Si, eliminar",
			cancelButtonText: "No, cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				DeleteProduct(id);
			}
		});
	};
	if (props.data.length === 0 || !props.data)
		return <div>No hay datos Para mostrar</div>;
	return (
		<div className='overflow-x-auto'>
			<table className='table w-full'>
				{/* head */}
				<thead>
					<tr>
						{labelsValues.map((label) => {
							return <th key={uid(label)}>{label}</th>;
						})}
						<th>Editar</th>
						<th>Eliminar</th>
						<th>Visualizar</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map((row: ObjectProduct) => {
						return (
							<tr key={uid(row)}>
								{labelsKeys.map((objectKey) => {
									return (
										<td key={uid(objectKey)}>
											{row[objectKey]}
										</td>
									);
								})}
								<td>
									<div
										className='tooltip'
										data-tip='Editar producto'>
										<button className='btn-neutral btn-xs btn mx-auto'>
											<BsFillPencilFill />
										</button>
									</div>
								</td>
								<td>
									<div
										className='tooltip'
										data-tip='Eliminar Producto'>
										<button
											className='btn-error btn-xs btn mx-auto'
											onClick={() => {
												handleDelete(row._id);
											}}>
											<BsFillTrashFill />
										</button>
									</div>
								</td>
								<td>
									<div
										className='tooltip'
										data-tip='Mostrar información'></div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
