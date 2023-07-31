/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUser.interface";
const initialState: IUser | null = {
	userName: "",
	userLastName: "",
	userToken: "",
	userRole: "",
	isSetUser: null,
	userEmail: "",
};
export const UserSlice = createSlice({
	name: "User",
	initialState: initialState,
	reducers: {
		SetUserInfo: (state, action: PayloadAction<IUser>) => {
			state.userName = action.payload.userName;
			state.userLastName = action.payload.userLastName;
			state.userToken = action.payload.userToken;
			state.userRole = action.payload.userRole;
			state.isSetUser = action.payload.isSetUser;
			state.userEmail = action.payload.userEmail;

		},
		ResetUserInfo: (state) => {
      state.userName = "";
      state.userLastName = "";
      state.userToken = "";
      state.userRole = "";
      state.isSetUser = null;
      state.userEmail = "";
		},
	},
});
export const { SetUserInfo, ResetUserInfo } = UserSlice.actions;
export default UserSlice.reducer;
