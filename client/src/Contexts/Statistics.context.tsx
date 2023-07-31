/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { TransformDate } from "../utilities/Pipes.utilities";
import { sortObjectArray } from "../utilities/SortFunctions.utilities";
import {
	filterObjectByMonth,
	filterObjectsByDate,
} from "../utilities/filterObjectArray.utilities";
import {
	getArrayReferencesFromArray,
	getFreqBoolean1Level,
	getFrequency1level,
	getTotal1level,
	getTotal2level,
} from "../utilities/statFunctions.utilities";
export interface StatisticProps {
	children: React.ReactNode;
}
const StatisticContext = createContext({} as any);

export const useStatisticContext = () => {
	const Context = useContext(StatisticContext);
	if (!Context) new Error("There si not a context here");
	return Context;
};
export function StatisticsProvider(props: StatisticProps) {
	//*----- from store
	const user = useSelector((state: RootState) => state.User);
	const sales = useSelector((state: RootState) => state.Sales.sales);
	const suppliers = useSelector(
		(state: RootState) => state.Suppliers.suppliers
	);
	const products = useSelector((state: RootState) => state.Products.products);
	const orders = useSelector((state: RootState) => state.Orders.orders);
	const CategoryList = useSelector(
		(state: RootState) => state.Products.CategoryList
	);	
	//*----- Memoized data
	const saleList = useMemo(() => sales, [sales]);
	const supplierList = useMemo(() => suppliers, [suppliers]);
	const productList = useMemo(() => products, [products]);
	const orderList = useMemo(() => orders, [orders]);
	//*----- States
	const [SalesTotalToday, setSalesTotalToday] = useState(0);
	const [salesAmountCollectedToday, setSalesAmountCollectedToday] =
		useState(0);
	const [soldProductCurrentMonth, setsoldProductCurrentMonth] = useState([]);
	const [totalSaleCurrentMonth, setTotalSaleCurrentMonth] = useState(0);
	const [
		totalSaleAmountCollectedCurrentMonth,
		setTotalSaleAmountCollectedCurrentMonth,
	] = useState(0);
	const [categoriesSalesCurrentMonth, setCategoriesSalesCurrentMonth] =
		useState([]);
	//*-- supplier statistics
	const [productsPerSupplier, setProductsPerSupplier] = useState([]);
	const [totalSupplier, setTotalSupplier] = useState(0);
	//*-- order statistics
	const [ordersCurrentMonth, setOrdersCurrentMonth] = useState([]);
	//*----- product statistics
	const [productsPerCategory, setProductsPerCategory] = useState([]);
	const [productsUnderStockPerCategory, setProductsUnderStockPerCategory] =
		useState([]);
	const [totalCategory, setTotalCategory] = useState(0);
	useEffect(() => {
		if (user.isSetUser) {
			//*-------------------------------- Suppplier --------------------------------
			//!---- cantidad de productos por proveedor
			setProductsPerSupplier(
				getArrayReferencesFromArray(
					productList,
					supplierList,
					"productSupplierId",
					"_id",
					"supplierName"
				)
			);
			//!---- cantidad de proveedores
			setTotalSupplier(supplierList.length);
			const ordersMonth = filterObjectByMonth(
				orderList,
				"orderDate",
				new Date().getMonth() + 1
			);
			//!---- ordernes del mes en curso
			setOrdersCurrentMonth(
				sortObjectArray(TransformDate(ordersMonth, "orderDate", "DD/MM/YYYY"), "orderDeliveryDate", "asc")
			);
			//*-------------------------------- Orders --------------------------------
			//!---- amount of products registered the actual month
		}
	}, [orderList, supplierList]);
	useEffect(() => {
		if (user.isSetUser) {
			//*-------------------------------- Products --------------------------------
			//!---- productos registrados por categoria
			setProductsPerCategory(
				getFrequency1level(productList, "productCategory")
			);
			//!---- productos a punto de quedarse sin stock por categoria
			setProductsUnderStockPerCategory(
				getFreqBoolean1Level(
					productList,
					"productIsOverPolicy",
					false,
					"productCategory"
				)
			);
			//!---- total de categorias
			setTotalCategory(CategoryList.length);
		}
	}, [productList,CategoryList]);
	useEffect(() => {
		if (user.isSetUser) {
			//*-------------------------------- TODAY SALES STATISTICS --------------------------------
			const salesToday = filterObjectsByDate(
				saleList,
				"saleDate",
				new Date()
			);
			setSalesTotalToday(getTotal1level(salesToday, "saleTotalSales"));
			setSalesAmountCollectedToday(
				getTotal1level(salesToday, "saleAmountCollected")
			);
			//*-------------------------------- MONTH SALES STATISTICS --------------------------------
			const salesMonth = filterObjectByMonth(
				saleList,
				"saleDate",
				new Date().getMonth() + 1
			);
			//!---- productos vendidos del mes en curso
			setsoldProductCurrentMonth(
				getTotal2level(
					salesMonth,
					"saleProducts",
					"soldProductQuantity",
					"soldProductName"
				)
			);
			//!---- total recolectado por ventas del mes en curso
			setTotalSaleCurrentMonth(
				getTotal1level(salesMonth, "saleAmountCollected")
			);
			//!---- total de ventas del mes en curso
			setTotalSaleAmountCollectedCurrentMonth(
				getTotal1level(salesMonth, "saleTotalSales")
			);
			//!---- ventas por categoria del mes en curso
			setCategoriesSalesCurrentMonth(
				getTotal2level(
					salesMonth,
					"saleProducts",
					"soldProductQuantity",
					"soldProductCategory"
				)
			);
		}
	}, [saleList]);

	const value = {
		SalesTotalToday,
		salesAmountCollectedToday,
		soldProductCurrentMonth,
		totalSaleCurrentMonth,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
		productsPerSupplier,
		ordersCurrentMonth,
		totalSupplier,
		productsPerCategory,
		productsUnderStockPerCategory,
		totalCategory,
	};
	return (
		<StatisticContext.Provider value={value}>
			{props.children}
		</StatisticContext.Provider>
	);
}
