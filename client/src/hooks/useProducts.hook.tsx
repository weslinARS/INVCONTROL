import { useStore } from "../Contexts/Store.context";
import { deleteProduct, getProducts } from "../api/products.axios";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
import { createProduct } from "../api/products.axios";
import { toast } from "react-hot-toast";
export const useProduct = () => {
	type booleanPromise = Promise<boolean>;
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.User);
	const dispatch = useDispatch();
	console.table(user);
	const FindProducts = async (): booleanPromise => {
		if (user.isSetUser !== null) {
			const productsFound = await getProducts(user.userToken);
			if (productsFound.status === 200) {
				console.log(productsFound.data);
				dispatch({
					type: "Products/SetProducts",
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
				type: "Products/AddProduct",
				payload: response.data,
			});
			toast.success("Producto agregado correctamente");
		}
	};
	const DeleteProduct = async (productId : string) =>{
		console.log("borrando producto con id: ", productId);
		const response = await deleteProduct(productId, user.userToken);
		if(response.status === 200){
			dispatch({
				type: "Products/DeleteProduct",
				payload: productId,
			});
			toast.success("Producto eliminado correctamente");
		}
	}
	return { isProcessing, FindProducts, AddProduct, DeleteProduct };
};
