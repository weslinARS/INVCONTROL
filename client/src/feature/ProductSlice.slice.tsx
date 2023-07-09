/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Add,
	RemoveById,
	UpdateArray,
} from "../utilities/CRUDFunctions.utilities";
type Product = {
	_id: string;
	productName: string;
	productDescription: string;
	productPrice: number;
	productStock: number;
	productCategory: string;
	productSupplierId: string;
};
export interface Products {
	products: Array<Product>;
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
		SetProducts: (state, action: PayloadAction<Array<Product>>) => {
			state.products = action.payload;
		},
		ResetProductsState: (state) => {
			state.products = initialState.products;
		},
		AddProduct: (state, action: PayloadAction<Product>) => {
			state.products = Add(state.products, action.payload);
		},
		DeleteProduct: (state, action: PayloadAction<string>) => {
			state.products = RemoveById(state.products, action.payload);
		},
		UpdateProduct: (state, action: PayloadAction<Product>) => {
			state.products = UpdateArray(state.products, action.payload);
		},
		SetCategoryList: (state, action: PayloadAction<Array<object>>) => {
			state.CategoryList = action.payload;
		},
		ResetCategoryList: (state) => {
			state.CategoryList = initialState.CategoryList;
		},
		AddCategory: (state, action: PayloadAction<object>) => {
			state.CategoryList = Add(state.CategoryList, action.payload);
		},
		DeleteCategory: (state, action: PayloadAction<string>) => {
			state.CategoryList = RemoveById(state.CategoryList, action.payload);
		},
		UdapteCategory: (state, action: PayloadAction<object>) => {
			state.CategoryList = UpdateArray(
				state.CategoryList,
				action.payload
			);
		},
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
	DeleteCategory,
	UpdateProduct,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
