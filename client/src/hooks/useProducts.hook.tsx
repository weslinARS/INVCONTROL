import {
	deleteProduct,
	getProducts,
	createProduct,
	updateProduct,
} from "../Api/products.axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { toast } from "react-hot-toast";
import { productaActionType } from "../utilities/reduxActions";
import { IProduct } from "../interfaces/IProduct.interface";
export const useProduct = () => {
	type booleanPromise = Promise<boolean>;
	const user = useSelector((state: RootState) => state.User);

	const dispatch = useDispatch();
	/**
	 * funcion para buscar productos en la base de datos
	 * @returns {boolean} - true si se encontraron productos, false si hubo un error en la busqueda
	 */
	const FindProducts = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const productsFound = await getProducts(user.userToken);
			if (productsFound.status === 200) {
				dispatch({
					type: productaActionType.SetProducts,
					payload: productsFound.data,
				});
				return true;
			}
		}
		return false;
	};
	const AddProduct = async (product: object) => {
		const productFormated = JSON.stringify(product);
		const response = await createProduct(productFormated, user.userToken);
		if (response.status === 201) {
			dispatch({
				type: productaActionType.AddProduct,
				payload: response.data,
			});
			toast.success("Producto agregado correctamente");
		}
	};
	const DeleteProduct = async (productId: string) => {
		const response = await deleteProduct(productId, user.userToken);
		if (response.status === 200) {
			dispatch({
				type: productaActionType.DeleteProduct,
				payload: productId,
			});
			toast.success("Producto eliminado correctamente");
		}
	};
	const UpdateProduct = async (product: IProduct) => {
		console.table(product);
		const formattedProduct = JSON.stringify(product);
		const response = await updateProduct(
			product._id,
			formattedProduct,
			user.userToken
		);
		if (response.status === 200) {
			dispatch({
				type: productaActionType.UpdateProduct,
				payload: product,
			});
			toast.success("Producto actualizado!");
		}
	};

	return {
		FindProducts,
		AddProduct,
		DeleteProduct,
		UpdateProduct,
	};
};
