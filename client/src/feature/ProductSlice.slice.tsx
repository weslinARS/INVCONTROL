/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Products {
	products: Array<object>;
	CategoryList: Array<object>;
}

const initialState: Products = {
	products: [],
	CategoryList: [],
};

export const ProductsSlice = createSlice({
	name: "Products",
	initialState,
	reducers: {
		SetProducts: (state, action: PayloadAction<Array<object>>) => {
			state.products = action.payload;
		},
		ResetProductsState: (state) => {
			state.products = initialState.products;
		},
		AddProduct: (state, action: PayloadAction<object>) => {
			state.products = [...state.products, action.payload];
		},
		DeleteProduct: (state , action : PayloadAction<string>) =>{
			state.products = state.products.filter((product : object ) => product["_id" as keyof object] !== action.payload);
		},
		SetCategoryList: (state, action: PayloadAction<Array<object>>) => {
			state.CategoryList = action.payload;
		},
		ResetCategoryList: (state) => {
			state.CategoryList = initialState.CategoryList;
		},
		AddCategory : (state , action : PayloadAction<object>) =>{
			state.CategoryList = [...state.CategoryList , action.payload]
		},
		DeleteCategory : (state , action : PayloadAction<string>) =>{
			state.CategoryList = state.CategoryList.filter((category : object ) => category["_id" as keyof object] !== action.payload);
		}
	},
});


export const {
	SetProducts,
	ResetProductsState,
	SetCategoryList,
	ResetCategoryList,
	AddProduct,
	DeleteProduct,
	AddCategory,
	DeleteCategory
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
