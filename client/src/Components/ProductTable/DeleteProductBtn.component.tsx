import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useProduct } from "../../hooks";
import { BsFillTrashFill } from "react-icons/bs";

export function DeleteProductBtn({ id }: { id: string }) {
	const MySwal = withReactContent(Swal);
	const { DeleteProduct } = useProduct();
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
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleDelete(id)}>
			<BsFillTrashFill />
			&nbsp;
			Eliminar
		</span>
	);
}
