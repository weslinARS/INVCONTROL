/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { filterObjectByMonth, filterObjectsByDate } from '../utilities/filterObjectArray.utilities';
import { getAverage2level, getFrequency1level, getTotal1level, getTotal2level, orderArrayByProperty,getFreqBoolean1Level } from "../utilities/statFunctions.utilities";
import { sortObjectArray } from "../utilities/SortFunctions.utilities";
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
	const user = useSelector((state: RootState) => state.User);
	const sales = useSelector((state: RootState) => state.Sales.sales);
	const products = useSelector((state: RootState) => state.Products.products);
	const saleList = useMemo(()=>sales, [sales]);
	const productList = useMemo(()=>products, [products]);
	const [SalesTotalToday, setSalesTotalToday] = useState(0);
	const [salesAmountCollectedToday, setSalesAmountCollectedToday] = useState(0);
	const [soldProductCurrentMonth, setsoldProductCurrentMonth] = useState([]);
	const [totalSaleCurrentMonth, setTotalSaleCurrentMonth] = useState(0);
	const [totalSaleAmountCollectedCurrentMonth, setTotalSaleAmountCollectedCurrentMonth] = useState(0); 
	const [categoriesSalesCurrentMonth, setCategoriesSalesCurrentMonth] = useState([]); // [{name: 'cat1', value: 100}, {name: 'cat2', value: 100}
	useEffect(() => {
		if (user.isSetUser) {
			//*-------------------------------- TODAY SALES STATISTICS --------------------------------
			const salesToday= filterObjectsByDate(saleList, "saleDate", new Date());
			setSalesTotalToday(getTotal1level(salesToday, "saleTotalSales"));
			setSalesAmountCollectedToday(getTotal1level(salesToday, "saleAmountCollected"));
			//*-------------------------------- MONTH SALES STATISTICS --------------------------------
			const salesMonth = filterObjectByMonth(saleList, "saleDate", new Date().getMonth()+1);
			setsoldProductCurrentMonth(getTotal2level(salesMonth, "saleProducts", "soldProductQuantity","soldProductName"));
			setTotalSaleCurrentMonth( getTotal1level(salesMonth, "saleAmountCollected"));
			setTotalSaleAmountCollectedCurrentMonth(getTotal1level(salesMonth, "saleTotalSales"));
			orderArrayByProperty(soldProductCurrentMonth, "counter", "asc");
			//!---- categories
			setCategoriesSalesCurrentMonth(getTotal2level(salesMonth, "saleProducts", "soldProductQuantity","soldProductCategory"));
			//*-------------------------------- Products --------------------------------
			//!---- amount of products registered per category
			console.log('cant.products por categoria',getFrequency1level(productList, "productCategory"));
			//!---- frequency of overstock products per category
			console.log('cant.products sobre stock por categoria',getFreqBoolean1Level(productList, "productIsOverPolicy",false,'productCategory'));
			//*-------------------------------- Suppplier --------------------------------
		}
	}, [user]);
	const value ={
		SalesTotalToday,
		salesAmountCollectedToday,
		soldProductCurrentMonth,
		totalSaleCurrentMonth,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth
	}
	return (
		<StatisticContext.Provider value={value}>
			{props.children}
		</StatisticContext.Provider>
	);
}
