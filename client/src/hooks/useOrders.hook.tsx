import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { createOrder, deleteOrder, getOrders, updateOrder } from "../Api/orders.axios";
import {orderActionType} from '../utilities/reduxActions'
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uid } from "react-uid";
type errorData = {
	message: string;
	field: string;
};
export const useOrders = () => {
	const mySwal = withReactContent(Swal);
	type booleanPromise = Promise<boolean>;
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindOrders = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const ordersFound = await getOrders(user.userToken);
			if (ordersFound.status === 200) {
				dispatch({
					type: orderActionType.SetOrders,
					payload: ordersFound.data,
				});
				return true;
			}
		}
		return false;
	};
	const CreateOrder = async (order: any) =>{
		if (user.isSetUser !== null) {
			try{
				toast.loading('Creando orden...')
				const orderFormatted = JSON.stringify(order);
				const orderCreated = await createOrder(orderFormatted,user.userToken);
				if (orderCreated.status === 201) {
					dispatch({
						type: orderActionType.AddOrder,
						payload: orderCreated.data,
					});
					toast.dismiss();
					toast.success('Orden creada')
				}
			}catch(error: any){
				const response = error.response;
				if (response.status === 400) {
					const errors = response.data.PropertiesErrors;
					mySwal.fire({
						title: "Error en los datos",
						icon: "error",
						html: (
							<div className='prose text-left'>
								<h3 className='text-error'>
									Errores encontrados
								</h3>
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
				}else {
					toast.error('Error al crear la orden')
				}
			}
		}
	}
	const DeleteOrder = async (id:string)=>{
		if (user.isSetUser !== null) {
			try{
				toast.loading('Eliminando orden...')
				const orderDeleted = await deleteOrder(id,user.userToken);
				if (orderDeleted.status === 200) {
					dispatch({
						type: orderActionType.DeleteOrder,
						payload: id,
					});
					toast.dismiss();
					toast.success('Orden eliminada')
				}
			}catch(error: any){
				toast.error('Error al eliminar la orden')
			}
		}
	}
	const UpdateOrder = async (order: any, _id:string) =>{
		if (user.isSetUser !== null) {
			try{
				toast.loading('Actualizando orden...')
				const orderFormatted = JSON.stringify(order);
				const orderUpdated = await updateOrder(_id,orderFormatted,user.userToken);
				if (orderUpdated.status === 200) {
					dispatch({
						type: orderActionType.UpdateOrder,
						payload: orderUpdated.data,
					});
					toast.dismiss();
					toast.success('Orden actualizada')
				}
			}catch(error: any){
				const response = error.response;
				if (response.status === 400) {
					const errors = response.data.PropertiesErrors;
					mySwal.fire({
						title: "Error en los datos",
						icon: "error",
						html: (
							<div className='prose text-left'>
								<h3 className='text-error'>
									Errores encontrados
								</h3>
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
				}else {
					toast.error('Error al crear la orden')
				}
			}
		}
	}
	return {FindOrders,CreateOrder,DeleteOrder,UpdateOrder};
};
