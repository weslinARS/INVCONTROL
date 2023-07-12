import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useCategories } from "../../hooks";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import {categoryActionType} from '../../utilities/reduxActions'
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
interface CategoryListItemProps {
	category: any;
}
export function CategoryListItem({ category }: CategoryListItemProps) {
	const { DeleteCategory } = useCategories();
	const MySwal = withReactContent(Swal);
	const dispatch = useDispatch();
	const handleEdit = () => {
		alert("editando");
		dispatch({
			type: categoryActionType.SetEditCategory,
			payload: category,
		})
	}
	const handleDelete = () => {
		MySwal.fire({
			title: "¿Desea eliminar esta categoria?",
			text: "Se eliminara la categoria de la base de datos",
			icon: "question",
			showCancelButton: true,
			confirmButtonText: "Eliminar Categoria",
			cancelButtonText: "Cancelar Eliminacion",
		}).then(async (result) => {
			if (result.isConfirmed) {
				const deletedCategory = await DeleteCategory(category._id);
				if (deletedCategory) {
					toast.success("Categoria eliminada con exito");
				} else {
					toast.error("No se pudo eliminar la categoria");
				}
			}
		});
	};
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className='badge badge-neutral badge-lg gap-x-4 p-3 font-bold uppercase transition-colors hover:badge-primary hover:cursor-pointer '>
					{category.categoryName}{" "}
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{category.categoryName}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<span className='w-full px-2 py-1 transition-colors hover:text-primary hover:bg-indigo-100 rounded-md hover:cursor-pointer' onClick={()=>handleEdit()}>
						Editar
					</span>
					{/*<EditProductBtn product={product} />*/}
				</DropdownMenuItem>
				<DropdownMenuItem>
					<span
						className='w-full px-2 py-1 transition-colors hover:text-primary hover:bg-indigo-100 rounded-md hover:cursor-pointer'
						onClick={() => handleDelete()}>
						Eliminar
					</span>
					{/*<DeleteProductBtn id={product._id} />*/}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
