import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { getSuppliers } from "../Api/suppliers.axios";
import { supplierActionType } from "../utilities/reduxActions";
export const useSuppliers = () => {
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
	return { FindSuppliers };
};
