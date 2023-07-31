import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { roles } from ".././utilities/roles.utilities";
import {
	DropUser,
	GetUsers,
	Register,
	UpdateUserInfo,
} from "../Api/users.axios";
import { RootState } from "../Store/store";
import { UsersActionType, userActionType } from "../utilities/reduxActions";
type errorData = {
	message: string;
	field: string;
};
export const useUsers = () => {
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	type booleanPromise = Promise<boolean>;
	const mySwal = withReactContent(Swal);
	const FindUsers = async (): booleanPromise => {
		if (user.isSetUser === null && user.userRole !== roles.admin)
			return false;
		const response = await GetUsers(user.userToken);
		if (response.status === 200) {
			dispatch({
				type: "Users/SetUsers",
				payload: response.data,
			});
			return true;
		}
		return false;
	};
	const RegisterUser = async (newUser: any) => {
		if (user.isSetUser === null && user.userRole !== roles.admin)
			return false;
		try {
			const response = await Register(newUser, user.userToken);
			if (response.status === 201) {
				dispatch({
					type: UsersActionType.AddUser,
					payload: response.data,
				});
				toast.success("Usuario registrado correctamente");
			}
		} catch (error) {
			const response = error.response;
			if (response.status === 400) {
				const errors = response.data.PropertiesErrors;
				mySwal.fire({
					title: "Error en los datos",
					icon: "error",
					html: (
						<div className='prose text-left'>
							<h3 className='text-error'>Errores encontrados</h3>
							<ul>
								{errors.map((error: errorData) => (
									<li key={uid(error.message)}>
										{error.message}
									</li>
								))}
							</ul>
						</div>
					),
				});
			} else {
				toast.error(response.data.message);
			}
		}
	};
	const DeleteUser = async (id: string, userEmail: string, _id: string) => {
		if (user.isSetUser === null && user.userRole !== roles.admin)
			return false;
		alert(userEmail + "  " + id);
		if (user.userEmail === userEmail) {
			mySwal.fire({
				title: "Error",
				icon: "error",
				text: "No puedes eliminar tu propio usuario",
			});
		}
		try {
			const response = await DropUser(id, user.userToken);
			if (response.status === 204) {
				dispatch({
					type: UsersActionType.DeleteUser,
					payload: _id,
				});
				toast.success("Usuario eliminado correctamente");
			}
		} catch (error) {
			const response = error.response;
			toast.error(response.data.message);
		}
	};
	const UpdateUser = async (_id: string, userData: any) => {
		toast.loading("Actualizando usuario");
		if (user.isSetUser === null && user.userRole !== roles.admin) {
      toast.dismiss();
			toast.error("No tienes permisos para realizar esta acción");
		}
		try {
			const response = await UpdateUserInfo(
				userData,
				_id,
				user.userToken
			);
			if (response.status === 200) {
				const userU = response.data.updatedUser;
        const userIdFromToken = response.data.userIdFromToken;
        alert(userU.userId+" vs "+userIdFromToken)
				if (userU.userId === userIdFromToken) {
          toast.dismiss();
					dispatch({
						type: UsersActionType.UpdateUser,
						payload: userU,
					});
          mySwal.fire({
            title: "Actualización exitosa",
            icon: "success",
            text: "Se ha actualizado tu información correctamente, cierra sesión para ver los cambios",
          })
				} else {
					dispatch({
						type: UsersActionType.UpdateUser,
						payload: userU,
					});
				}
        toast.dismiss();
				toast.success("Usuario Actualizado correctamente");
			}
		} catch (error : any) {
      alert("error")
			const response = error.response;
			toast.dismiss();
			toast.error(response.data.message);
		}
	};
	return { FindUsers, RegisterUser, DeleteUser, UpdateUser };
};
