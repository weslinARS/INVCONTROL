/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { Add, RemoveById, UpdateArray } from "../utilities/CRUDFunctions.utilities";
type orderedProduct = {
	_id: string;
	orderedProductId: string;
	orderedProductName: string;
	orderedProductPrice: number;
	orderedProductQuantity: number;
};
type Order = {
	_id: string;
	orderDate: string;
	orderDeliveryDate: string;
	orderProducts: Array<orderedProduct>;
};
interface Orders {
	orders: Order[];
}

const initialState: Orders = {
	orders: [],
};
export const OrdersSlice = createSlice({
	name: "Orders",
	initialState,
	reducers: {
		SetOrders: (state, action: PayloadAction<Array<Order>>) => {
			state.orders = action.payload;
		},
		ResetOrders: (state) => {
			state.orders = initialState.orders;
		},
		AddOrder: (state, action: PayloadAction<Order>) => {
			state.orders = Add(state.orders, action.payload);
		},
		DeleteOrder: (state, action: PayloadAction<string>) => {
			state.orders = RemoveById(state.orders, action.payload);
		},
		UpdateOrder: (state, action: PayloadAction<Order>) => {
			state.orders = UpdateArray(state.orders, action.payload);
		},
	},
});

export const { SetOrders, ResetOrders, AddOrder, DeleteOrder, UpdateOrder} =
	OrdersSlice.actions;
export default OrdersSlice.reducer;
