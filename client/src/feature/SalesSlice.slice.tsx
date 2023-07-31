import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sortObjectArray } from "../utilities/SortFunctions.utilities";
import {
	Add,
	RemoveById,
	UpdateArray,
} from "../utilities/CRUDFunctions.utilities";

type soldProduct = {
	_id: string;
	soldProductId: string;
	soldProductName: string;
	solProductQuantity: number;
	soldProductAmountCollected: number;
};
type Sale = {
	_id: string;
	saleDate: string;
	saleAmountCollected: number;
	saleTotalSales: number;
	saleSellerId : string;
	saleProducts: soldProduct[];
};
export interface Sales {
	sales: Array<Sale>;
}
const initialState: Sales = {
	sales: [],
};
// eslint-disable-next-line react-refresh/only-export-components
const SalesSlice = createSlice({
	name: "Sales",
	initialState,
	reducers: {
		SetSales: (state, action: PayloadAction<Array<Sale>>) => {
			state.sales = sortObjectArray(action.payload,'saleDate','asc');
		},
		ResetSales: (state) => {
			state.sales = initialState.sales;
		},
		AddSale: (state, action: PayloadAction<Sale>) => {
			state.sales = Add(state.sales, action.payload);
			state.sales = sortObjectArray(state.sales,'saleDate','asc');
		},
		DeleteSale: (state, action: PayloadAction<string>) => {
			state.sales = RemoveById(state.sales, action.payload);
		},
		UpdateSales: (state, action: PayloadAction<Sale>) => {
			state.sales = UpdateArray(state.sales, action.payload);
		},
	},
});

export const { SetSales, ResetSales, AddSale, DeleteSale, UpdateSales } =
	SalesSlice.actions;
export default SalesSlice.reducer;
