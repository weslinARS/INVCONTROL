/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { createSale, getSales } from "../Api/sales.axios";
import { salesActionType , productaActionType} from "../utilities/reduxActions";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { uid } from "react-uid";
import {deleteSale} from '../Api/sales.axios'
import {sortObjectArray} from '../utilities/SortFunctions.utilities'
type errorData = {
	message: string;
	field: string;
};
export const useSales = () => {
	type booleanPromise = Promise<boolean>;
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindSales = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const salesFound = await getSales(user.userToken);
			if (salesFound.status === 200) {
				dispatch({
					type: salesActionType.SetSales,
					payload: salesFound.data,
				});
				return true;
			}
		}
		return false;
	};
	const AddSales = async (sale: object) => {
    const mySwal = withReactContent(Swal);
		const saleFormated = JSON.stringify(sale);
		console.log(saleFormated);
		if (user.isSetUser !== null) {
			try {
        toast.loading("Agregando venta");
				const response = await createSale(saleFormated, user.userToken);
				console.log(response);
				if (response.status === 201) {
					const { sale, productUpdated } = response.data;
          dispatch({
            type: salesActionType.AddSale,
            payload: sale,
          })
          for(const product of productUpdated){
            dispatch(
              {
                type : productaActionType.UpdateProduct,
                payload : product
              }
            )
          }
          console.log(sale);
          console.log(productUpdated);
          toast.dismiss();
					toast.success("Venta agregada correctamente");
				}
			} catch (error: any) {
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
				}
			}
		}
	};

	const DeleteSale = async (saleId : string)=>{
		toast.loading("Eliminando venta");
		const response = await deleteSale(saleId,user.userToken);
		console.log(response);
		if(response.status === 200){
			dispatch({
				type: salesActionType.DeleteSale,
				payload: saleId,
			})
			const {productUpdated} = response.data;
			for(const product of productUpdated){
				dispatch(
					{
						type : productaActionType.UpdateProduct,
						payload : product
					}
				)
			}
			toast.dismiss();
			toast.success("Venta eliminada correctamente");
		}else{
			toast.dismiss();
			toast.error(response.data.message);
		}
	}
	return { FindSales, AddSales, DeleteSale };
};
