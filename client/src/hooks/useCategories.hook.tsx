import { getCategories } from "../api/categories.axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { categoryActionType } from "../utilities/reduxActions";
export const useCategories = () => {
	type booleanPromise = Promise<boolean>;
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindCategories = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const categoriesFound = await getCategories(user.userToken);
			if (categoriesFound.status === 200) {
				dispatch({
					type: categoryActionType.SetCategories,
					payload: categoriesFound.data,
				});
				return true;
			}
		}
		return false;
	};
	return {FindCategories};
};
