import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Add,
  RemoveById,
  UpdateArray,
} from "../utilities/CRUDFunctions.utilities";
import { IUserInfo } from "../interfaces/IUser.interface";

type UserInfo = {
  userName : string,
  userLastName: string,
  userRole : string,
  userEmail : string,
  _id : string,
};

export interface Users {
  users: Array<UserInfo>;
}
const initialState: Users = {
  users: [],
};

export const UsersSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    SetUsers: (state, action: PayloadAction<Array<UserInfo>>) => {
      state.users = action.payload;
    },
    AddUser: (state, action: PayloadAction<UserInfo>) => {
      state.users = Add(state.users, action.payload);
    },
    UpdateUser: (state, action: PayloadAction<UserInfo>) => {
      state.users = UpdateArray(state.users, action.payload);
    },
    DeleteUser: (state, action: PayloadAction<string>) => {
      state.users = RemoveById(state.users, action.payload);
    },
    ResetUsers : (state) => {
      state.users = []
    }
  },
});

export const { SetUsers, AddUser, UpdateUser, DeleteUser, ResetUsers } = UsersSlice.actions;
export default UsersSlice.reducer;
