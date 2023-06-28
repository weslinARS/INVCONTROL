import { configureStore  } from "@reduxjs/toolkit";
import SideBarReducer from "../feature/SideBarSlice.slice"
import ProductReducer from "../feature/ProductSlice.slice";
import UserReducer from "../feature/UserSlice.slice";
import SalesReducer from "../feature/SalesSlice.slice";
import SuppliersReducer from "../feature/SuppliersSlice.slice";
import OrderReducer from "../feature/OrdersSlice.slice"
export const store = configureStore({
    reducer: {
        SideBar: SideBarReducer,
        Products: ProductReducer,
        User: UserReducer,
        Sales: SalesReducer,
        Suppliers : SuppliersReducer, 
        Orders: OrderReducer
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch