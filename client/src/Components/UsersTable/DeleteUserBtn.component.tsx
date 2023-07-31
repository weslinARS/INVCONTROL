import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { BsFillTrashFill } from "react-icons/bs";
import { useUsers } from "../../hooks/useUsers.hook";
export function DeleteUserBtn ({id, email, _id}:{id:string, email:string, _id:string}) {
  const MySwal = withReactContent(Swal)
  const {DeleteUser} = useUsers();
  const handleDelete = (id:string, email:string) =>{
    MySwal.fire({
      title: 'Eliminar Usuario',
      text: '¿Estas seguro de eliminar este usuario? , tenga en cuenta que se borrarán todos los datos asociados a este usuario.',
      icon: 'warning',
      showCancelButton  : true,
      confirmButtonText : 'Si, eliminar',
      cancelButtonText : 'No, cancelar'
    }).then((result)=>{
      if(result.isConfirmed){
        DeleteUser(id,email,_id);
      }
    })
  }
  return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleDelete(id, email)}>
			<BsFillTrashFill />
			&nbsp;
			Eliminar
		</span>
  )
}