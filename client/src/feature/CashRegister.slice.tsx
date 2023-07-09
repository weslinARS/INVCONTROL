import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Add, RemoveById, UpdateArray } from "../utilities/CRUDFunctions.utilities";

//TODO: finish the cashRgister Slice 

type CashRegister = {
	_id: string;
	startTime: string;
	startingAmount: number;
	endTime: string;
	endingAmount: number;
	totalSales: number;
};

export interface ICashRegister {
	cashRegister: Array<CashRegister>;
}
const initialState: ICashRegister = {
  cashRegister: [],
};

export const CashRegisterSlice = createSlice({
  name: "CashRegister",
  initialState,
  reducers: {
    SetCashRegister: (state, action: PayloadAction<Array<CashRegister>>) => {
      state.cashRegister = action.payload;
    },
    ResetCashRegister: (state) => {
      state.cashRegister = initialState.cashRegister;
    },
  }
})

export default CashRegisterSlice.reducer;
export const { SetCashRegister, ResetCashRegister } = CashRegisterSlice.actions;