import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { uid } from "react-uid";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { createSupplier, dropSupplier, getSuppliers, updateSupplier } from "../Api/suppliers.axios";
import { RootState } from "../Store/store";
import { supplierActionType } from "../utilities/reduxActions";
type errorData = {
	message: string;
	field: string;
};
export const useSuppliers = () => {
	const mySwal = withReactContent(Swal);
	type booleanPromise = Promise<boolean>;
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindSuppliers = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const ordersFound = await getSuppliers(user.userToken);
			if (ordersFound.status === 200) {
				dispatch({
					type: supplierActionType.SetSuppliers,
					payload: ordersFound.data,
				});
				return true;
			}
		}
		return false;
	};
	const AddSupplier = async (supplier: any) => {
		if (user.isSetUser !== null) {
			try {
				toast.loading("Agregando proveedor");
				const supplierFormatted = JSON.stringify(supplier);
				console.info(supplierFormatted);
				const response = await createSupplier(
					supplierFormatted,
					user.userToken
				);
				if (response.status === 201) {
					dispatch({
						type: supplierActionType.AddSupplier,
						payload: response.data,
					});
				}
				toast.dismiss();
				toast.success("Proveedor agregado correctamente");
			} catch (error:any) {
				const response = error.response;
				if (response.status === 400) {
					const errors = response.data.PropertiesErrors;
					console.log(errors);
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
				}else{
					toast.dismiss();
					toast.error(response.data.message);
				}
			}
		}
	};
	const DeleteSupplier = async (idSupplier : string) => {
		toast.loading("Eliminando proveedor");
		const response = await dropSupplier(idSupplier, user.userToken);
		if(response.status === 200){
			toast.dismiss();
			toast.success("Proveedor eliminado correctamente");
			dispatch({
				type : supplierActionType.DeleteSupplier,
				payload : idSupplier
			})
		}else{
			toast.dismiss();
			toast.error(response.data.message);
		}
	};

	const UpdateSupplier = async (supplier : any) => {
		toast.loading("Actualizando proveedor");
		const supplierFormatted = JSON.stringify(supplier);
		const response = await updateSupplier(supplier._id,supplierFormatted, user.userToken);
		if(response.status === 200){
			toast.dismiss();
			toast.success("Proveedor actualizado correctamente");
			console.log(response.data);
			dispatch({
				type : supplierActionType.UpdateSupplier,
				payload : response.data
			})
		}else{
			toast.dismiss();
			toast.error(response.data.message);
		}
	}
	return { FindSuppliers, AddSupplier,DeleteSupplier,UpdateSupplier };
};
