/* eslint-disable react-refresh/only-export-components */
//redux toolkit slice
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface SideBarState {
  isOpen: boolean;
}
const initialState: SideBarState = {
  isOpen: false,
};
export const SideBarSlice = createSlice({
  name: "SideBar",
  initialState,
  reducers: {
    setSideBarState: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setSideBarState } = SideBarSlice.actions;
export default SideBarSlice.reducer;
