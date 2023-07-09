/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useProduct } from "../hooks/useProducts.hook";
import { useCategories } from "../hooks/useCategories.hook";
import { useOrders } from "../hooks/useOrders.hook";
import { useSales } from "../hooks/useSales.hook";
import { useSuppliers } from "../hooks/useSuppliers.hook";
import { useState } from "react";
import { IProduct } from "../interfaces/IProduct.interface";
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
	const [productToEdit, setProductToEdit] = useState<IProduct | undefined>(
		undefined
	);
	const [isProductToEdit, setIsProductToEdit] = useState<boolean>(false);
	useEffect(() => {
		if (user.isSetUser) {
			FindDocuments();
		}
	}, []);
	const FindDocuments = async () => {
		if (user.userRole === "seller") {
			console.log("seller");
			const [res1, res2, res3] = await Promise.all([
				FindProducts(),
				FindCategories(),
				FindSales(),
			]);
			if (res1 && res2 && res3) setLoadingData(false);
		}
		if (user.userRole === "admin") {
			console.log("admin");
			const [res1, res2, res3, res4, res5] = await Promise.all([
				FindProducts(),
				FindCategories(),
				FindOrders(),
				FindSales(),
				FindSuppliers(),
			]);
			if (res1 && res2 && res3 && res4 && res5) setLoadingData(false);
		}
	};
	const values = {
		FindDocuments,
		LoadingData,
		productToEdit,
		setProductToEdit,
		isProductToEdit,
		setIsProductToEdit,
	};
	return (
		<storeContext.Provider value={values}>{children}</storeContext.Provider>
	);
}
