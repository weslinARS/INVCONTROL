import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { BsFillTrashFill } from "react-icons/bs";
import { useOrders } from "../../hooks";
export function DeleteOrderBtn ({orderId}:{orderId:string}) {
  const MySwal = withReactContent(Swal)
  const {DeleteOrder} = useOrders();
  const handleDelete = (orderId:string) =>{
    MySwal.fire({
      title: 'Eliminar Orden',
      text: '¿Estas seguro de eliminar esta orden? , tenga en cuenta que se borrarán todos los datos asociados a esta orden.',
      icon: 'warning',
      showCancelButton  : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'No, cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        DeleteOrder(orderId);
      }
    })
  }
  return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleDelete(orderId)}>
			<BsFillTrashFill />
			&nbsp;
			Eliminar
		</span>
  )
}