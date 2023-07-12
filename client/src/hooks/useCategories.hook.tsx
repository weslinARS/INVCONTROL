import { getCategories, createCategory, deleteCategory } from "../Api/categories.axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { categoryActionType } from "../utilities/reduxActions";
import {IRawCategory} from '../interfaces/ICategory'
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
	const AddCategory = async (category : IRawCategory): booleanPromise => {
		if (user.isSetUser !== null) {
			const categoryAdded = await createCategory(
				category,
				user.userToken,
			);
			if (categoryAdded.status === 201) {
				dispatch({
					type: categoryActionType.AddCategory,
					payload: categoryAdded.data,
				});
				return true;
			}
		}
		return false;
	};
	/**
	 * funcion para llamar a la api y eliminar una categoria
	 * @param id 
	 * @returns {object} - devuelve una promesa y en su contenido el elemento elimninado
	 */
	const DeleteCategory = async (id: string): booleanPromise => {
		if(user.isSetUser!== null){
			const categoryDeleted = await deleteCategory(id, user.userToken);
			if(categoryDeleted.status === 204){
				dispatch({
					type: categoryActionType.DeleteCategory,
					payload: id,
				})
				return true;
			}
		}
		return false;
	}
	return { FindCategories, AddCategory , DeleteCategory};
};
