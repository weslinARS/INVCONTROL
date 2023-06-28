import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getSuppliers } from "../api/suppliers.axios";
import { useState } from "react";
export const useSuppliers = () => {
	type booleanPromise = Promise<boolean>;
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindSuppliers = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			console.log("buscando ordenes");
			const ordersFound = await getSuppliers(user.userToken);
			if (ordersFound.status === 200) {
				dispatch({
					type: "Suppliers/SetSuppliers",
					payload: ordersFound.data,
				});
				return true;
			}
		}
		return false;
	};
	return {FindSuppliers};
};
