/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Add,
	RemoveById,
	UpdateArray,
} from "../utilities/CRUDFunctions.utilities";

//TODO: add supplier hasOrder field t0 the supplier type
type Supplier = {
	_id: string;
	supplierName: string;
	supplierEmail: string[];
	supplierPhoneNumber: string[];
};
export interface Suppliers {
	suppliers: Supplier[];
}
const initialState: Suppliers = {
	suppliers: [],
};

const SuppliersSlice = createSlice({
	name: "Suppliers",
	initialState,
	reducers: {
		SetSuppliers: (state, action: PayloadAction<Array<Supplier>>) => {
			state.suppliers = action.payload;
		},
		ResetSuppliers: (state) => {
			state.suppliers = initialState.suppliers;
		},
		AddSupplier: (state, action: PayloadAction<Supplier>) => {
			state.suppliers = Add(state.suppliers, action.payload);
		},
		DeleteSupplier: (state, action: PayloadAction<string>) => {
			state.suppliers = RemoveById(state.suppliers, action.payload);
		},
		UpdateSuppliers: (state, action: PayloadAction<Supplier>) => {
			state.suppliers = UpdateArray(state.suppliers, action.payload);
		},
	},
});

export default SuppliersSlice.reducer;
export const {
	SetSuppliers,
	ResetSuppliers,
	AddSupplier,
	DeleteSupplier,
	UpdateSuppliers,
} = SuppliersSlice.actions;
