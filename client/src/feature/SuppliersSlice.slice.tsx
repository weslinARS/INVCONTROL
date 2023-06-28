/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { ISuppliers } from "../interfaces/ISupplier.interface";
import { PayloadAction } from "@reduxjs/toolkit";
export interface Suppliers {
	suppliers: Array<object>;
}
const initialState: Suppliers = {
	suppliers: Array<object>(),
};

const SuppliersSlice = createSlice({
	name: "Suppliers",
	initialState,
	reducers: {
		SetSuppliers: (state, action: PayloadAction<Array<object>>) => {
			state.suppliers = action.payload;
			console.log("slice provedores :  ", state.suppliers);
		},
		ResetSuppliersState: (state) => {
			state.suppliers = initialState.suppliers;
		},
	},
});

export default SuppliersSlice.reducer;
export const { SetSuppliers, ResetSuppliersState } = SuppliersSlice.actions;
