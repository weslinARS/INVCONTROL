import { getCategories } from "../api/categories.axios";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";

export const useCategories = () => {
	type booleanPromise = Promise<boolean>;
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	const FindCategories = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			console.log("buscando categorias");
			const categoriesFound = await getCategories(user.userToken);
			if (categoriesFound.status === 200) {
				console.log(categoriesFound.data);
				dispatch({
					type: "Products/SetCategoryList",
					payload: categoriesFound.data,
				});
				return true;
			}
		}
		return false;
	};
	return {FindCategories};
};
