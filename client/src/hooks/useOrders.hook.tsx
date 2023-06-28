import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getOrders } from "../api/orders.axios";
import { useState } from "react";
export const useOrders = () => {
	type booleanPromise = Promise<boolean>;
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindOrders = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			console.log("buscando ordenes");
			const ordersFound = await getOrders(user.userToken);
			if (ordersFound.status === 200) {
				dispatch({
					type: "Orders/SetOrders",
					payload: ordersFound.data,
				});
				return true;
			}
		}
		return false;
	};
	return {FindOrders};
};
