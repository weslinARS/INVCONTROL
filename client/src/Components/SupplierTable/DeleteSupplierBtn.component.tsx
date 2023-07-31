import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useSuppliers } from "../../hooks"
import { BsFillTrashFill } from "react-icons/bs";
export function DeleteSupplierBtn ({id}:{id:string}) {
  const MySwal = withReactContent(Swal)
  const {DeleteSupplier} = useSuppliers();
  const handleDelete = (id:string) =>{
    MySwal.fire({
      title: 'Eliminar Proveedor',
      text: '¿Estas seguro de eliminar este proveedor?, al eliminar el proveedor, asegurese de actualizar los productos que esten asociados a este proveedor para evitar errores.',
      icon: 'warning',
      showCancelButton  : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'No, cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        DeleteSupplier(id);
      }
    })
  }
  return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleDelete(id)}>
			<BsFillTrashFill />
			&nbsp;
			Eliminar
		</span>
  )
}