/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { IOrder } from "../interfaces/IOrder.interface";
import { PayloadAction } from "@reduxjs/toolkit";
export interface Orders {
	orders: Array<object>;
}
const initialState: Orders = {
	orders: [],
};
export const OrdersSlice = createSlice({
	name: "Orders",
	initialState,
	reducers: {
		SetOrders: (state, action: PayloadAction<Array<IOrder>>) => {
			state.orders = action.payload;
			console.log("el nuevo estado de las ordenes es: ", state);
		},
		ResetOrdersState : (state) => {
			state.orders= initialState.orders;
		}
	},
});

export const { SetOrders, ResetOrdersState } = OrdersSlice.actions;
export default OrdersSlice.reducer;
