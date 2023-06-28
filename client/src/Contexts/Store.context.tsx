/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { useProduct } from "../hooks/useProducts.hook";
import { useCategories } from "../hooks/useCategories.hook";
import { useOrders } from "../hooks/useOrders.hook";
import { useSales } from "../hooks/useSales.hook";
import { useSuppliers } from "../hooks/useSuppliers.hook";
import { useState } from "react";
export const storeContext = createContext({} as any);
export const useStore = () => {
	const context = useContext(storeContext);
	if (!context) new Error("There is not an StoreProvider");
	return context;
};
export function StoreProvider({ children }: { children: ReactNode }) {
	const dispatch = useDispatch();
	const [LoadingData, setLoadingData] = useState<boolean>(true);
	const user = useSelector((state: RootState) => state.User);
	const { FindProducts } = useProduct();
	const { FindCategories } = useCategories();
	const { FindOrders } = useOrders();
	const { FindSales } = useSales();
	const { FindSuppliers } = useSuppliers();
	useEffect(() => {
		if (user.isSetUser) {
			FindDocuments();
		}
	}, []);

	const FindDocuments = async () => {
		const res1 = await FindProducts();
		const res2 = await FindCategories();
		const res3 = await FindOrders();
		const res4 = await FindSales();
		const res5 = await FindSuppliers();
		if (res1 && res2 && res3 && res4 && res5) setLoadingData(false);
	};
	const values = {
		FindDocuments,
		LoadingData,
	};
	return (
		<storeContext.Provider value={values}>{children}</storeContext.Provider>
	);
}