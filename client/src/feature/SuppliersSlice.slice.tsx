/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface Suppliers {
	suppliers: Array<object>;
}
const initialState: Suppliers = {
	suppliers:[],
};

const SuppliersSlice = createSlice({
	name: "Suppliers",
	initialState,
	reducers: {
		SetSuppliers: (state, action: PayloadAction<Array<object>>) => {
			state.suppliers = action.payload;
		},
		ResetSuppliers: (state) => {
			state.suppliers = initialState.suppliers;
		},
		AddSupplier: (state, action: PayloadAction<object>) => {
			state.suppliers = [...state.suppliers, action.payload];
		},
		DeleteSupplier: (state, action: PayloadAction<string>) => {
			state.suppliers = state.suppliers.filter(
				(supplier: object) =>
					supplier["_id" as keyof object] !== action.payload
			);
		},
	},
});

export default SuppliersSlice.reducer;
export const {
	SetSuppliers,
	ResetSuppliers,
	AddSupplier,
	DeleteSupplier,
} = SuppliersSlice.actions;
