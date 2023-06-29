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
        ResetSales : (state) => {
            state.sales = initialState.sales;
        },
        AddSale : (state , action : PayloadAction<object>) =>{          
            state.sales = [...state.sales , action.payload]
        },
        DeleteSale : (state , action : PayloadAction<string>) =>{
            state.sales = state.sales.filter((sale : object ) => sale["_id" as keyof object] !== action.payload);
        }
    }
})

export const {SetSales, ResetSales,AddSale,DeleteSale} = SalesSlice.actions
export default SalesSlice.reducer
