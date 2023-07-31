import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { useSales } from "../../hooks"
import { BsFillTrashFill } from "react-icons/bs";
export function DeleteSaleBtn ({id}:{id:string}) {
  const MySwal = withReactContent(Swal)
  const {DeleteSale} = useSales();
  const handleDelete = (id:string) =>{
    MySwal.fire({
      title: 'Eliminar Venta',
      text: '¿Estas seguro de eliminar esta venta?, al eliminar la venta se restauran los productos vendidos a su anterior estado.',
      icon: 'warning',
      showCancelButton  : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'No, cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        DeleteSale(id);
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