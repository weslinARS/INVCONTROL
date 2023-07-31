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
	cashRegister: CashRegister|undefined;
  isCashRegisterOpen: boolean;
  isCashRegisterClosed: boolean;
}
const initialState: ICashRegister = {
  cashRegister:undefined,
  isCashRegisterOpen:false,
  isCashRegisterClosed:false,
};

export const CashRegisterSlice = createSlice({
  name: "CashRegister",
  initialState,
  reducers: {
    SetCashRegister: (state, action: PayloadAction<CashRegister>) => {
      state.cashRegister = action.payload;
      state.isCashRegisterOpen = true;
      if(state.cashRegister.endTime != null){
        state.isCashRegisterClosed = true;
      }
    },
    OpenCashRegister : (state, action : PayloadAction<CashRegister>) => {
      state.cashRegister = action.payload;
      state.isCashRegisterOpen = true;
    },
    CloseCashRegister: (state, action: PayloadAction<CashRegister>) => {
      state.cashRegister = action.payload;
      state.isCashRegisterClosed = true;
    },
    ResetCashRegister: (state) => {
      state.cashRegister = initialState.cashRegister;
      state.isCashRegisterOpen = initialState.isCashRegisterOpen;
    },
  }
})

export default CashRegisterSlice.reducer;
export const { SetCashRegister, ResetCashRegister,CloseCashRegister} = CashRegisterSlice.actions;