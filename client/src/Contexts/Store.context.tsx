/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useSelector } from "react-redux";
import { ISuppliers } from "src/interfaces/ISupplier.interface";
import { RootState } from "../Store/store";
import { useCategories } from "../hooks/useCategories.hook";
import { useOrders } from "../hooks/useOrders.hook";
import { useProduct } from "../hooks/useProducts.hook";
import { useSales } from "../hooks/useSales.hook";
import { useSuppliers } from "../hooks/useSuppliers.hook";
import { useUsers } from "../hooks/useUsers.hook";
import { ICategory } from "../interfaces/ICategory";
import { IProduct } from "../interfaces/IProduct.interface";
import { IUserInfo } from "../interfaces/IUser.interface";
export const storeContext = createContext({} as any);
export const useStore = () => {
	const context = useContext(storeContext);
	if (!context) new Error("There is not an StoreProvider");
	return context;
};
export function StoreProvider({ children }: { children: ReactNode }) {
	const [LoadingData, setLoadingData] = useState<boolean>(true);
	const user = useSelector((state: RootState) => state.User);
	const { FindProducts } = useProduct();
	const { FindCategories } = useCategories();
	const { FindOrders } = useOrders();
	const { FindSales } = useSales();
	const { FindSuppliers } = useSuppliers();
	const { FindUsers } = useUsers();
	//*------------------- States to Edit-------------------
	//!--- Product
	const [productToEdit, setProductToEdit] = useState<IProduct | undefined>(
		undefined
	);
	const [isProductToEdit, setIsProductToEdit] = useState<boolean>(false);
	//!--- Category
	const [isCategoryToEdit, setIsCategoryToEdit] = useState<boolean>(false);
	const [categoryToEdit, setCategoryToEdit] = useState<ICategory | undefined>(
		undefined
	);
	//!--- Sale
	const [isSaleToEdit, setIsSaleToEdit] = useState<boolean>(false);
	const [saleToEdit, setSaleToEdit] = useState<any>(undefined);
	//!--- Supplier
	const [isSupplierToEdit, setIsSupplierToEdit] = useState<boolean>(false);
	const [supplierToEdit, setSupplierToEdit] = useState<
		ISuppliers | undefined
	>(undefined);
	//!--- User
	const [isUserToEdit, setIsUserToEdit] = useState<boolean>(false);
	const [userToEdit, setUserToEdit] = useState<IUserInfo | undefined>(
		undefined
	);
	//!--- Order
	const [isOrderToEdit, setIsOrderToEdit] = useState<boolean>(false);
	const [orderToEdit, setOrderToEdit] = useState<any|undefined>(undefined);
	useEffect(() => {
		if (user.isSetUser) {
			FindDocuments();
		}
	}, []);
	const FindDocuments = async () => {
		if (user.userRole === "seller") {
			const [res1, res2, res3, res4, res5] = await Promise.all([
				FindProducts(),
				FindCategories(),
				FindSales(),
				FindOrders(),
				FindSuppliers(),
			]);
			if (res1 && res2 && res3 && res4 && res5 ) setLoadingData(false);
		}
		if (user.userRole === "admin") {
			const [res1, res2, res3, res4, res5, res6] = await Promise.all([
				FindProducts(),
				FindCategories(),
				FindOrders(),
				FindSales(),
				FindSuppliers(),
				FindUsers(),
			]);
			if (res1 && res2 && res3 && res4 && res5 && res6)
				setLoadingData(false);
		}
	};
	const values = {
		FindDocuments,
		LoadingData,
		productToEdit,
		setProductToEdit,
		isProductToEdit,
		setIsProductToEdit,
		isCategoryToEdit,
		setIsCategoryToEdit,
		categoryToEdit,
		setCategoryToEdit,
		saleToEdit,
		setSaleToEdit,
		isSaleToEdit,
		setIsSaleToEdit,
		setSupplierToEdit,
		isSupplierToEdit,
		setIsSupplierToEdit,
		supplierToEdit,
		isUserToEdit,
		setIsUserToEdit,
		userToEdit,
		setUserToEdit,
		isOrderToEdit,
		setIsOrderToEdit,
		orderToEdit,
		setOrderToEdit
	};
	return (
		<storeContext.Provider value={values}>{children}</storeContext.Provider>
	);
}
