import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ISales } from '../interfaces/ISells.interface';

export interface Sales{
    sales: Array<object>;
}
const initialState : Sales = {
    sales : []
};
// eslint-disable-next-line react-refresh/only-export-components
const SalesSlice = createSlice({
    name: 'Sales',
    initialState,
    reducers:{
        SetSales: (state, action:PayloadAction<Array<ISales>>  ) => {
            state.sales= action.payload;
            console.log("el nuevo estado de las ventas es: ", state.sales);
        },
        ResetSalesState : (state) => {
            state.sales = initialState.sales;
        }
    }
})

export const {SetSales, ResetSalesState} = SalesSlice.actions
export default SalesSlice.reducer
