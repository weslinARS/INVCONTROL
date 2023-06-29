import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { getOrders } from "../api/orders.axios";
import {orderActionType} from '../utilities/reduxActions'
export const useOrders = () => {
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
	return {FindOrders};
};
