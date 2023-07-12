/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	Add,
	RemoveById,
	UpdateArray,
} from "../utilities/CRUDFunctions.utilities";
import { ICategory, IRawCategory } from "../interfaces/ICategory";
type Product = {
	_id: string;
	productName: string;
	productDescription: string;
	productPrice: number;
	productStock: number;
	productCategory: string;
	productSupplierId: string;
};
type Category = {
	_id: string;
	categoryName: string;
};
export interface Products {
	products: Array<Product>;
	CategoryList: Array<object>;
	productToEdit: Product | undefined;
	isProductToEdit: boolean;
	categoryToEdit: Category| undefined;
	isCategoryToEdit: boolean;
	productToView : Product;
	isProductToView : boolean;
}

const initialState: Products = {
	products: [],
	CategoryList: [],
	productToEdit: undefined,
	isProductToEdit: false,
	categoryToEdit: undefined,
	isCategoryToEdit: false,
	productToView : {
		_id: "",
		productName: "",
		productDescription: "",
		productPrice: 0,
		productStock: 0,
		productCategory: "",
		productSupplierId: "",
	},
	isProductToView : true,
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
		SetEditCategory: (state, action: PayloadAction<ICategory>) => {
			state.categoryToEdit = action.payload;
			state.isCategoryToEdit = true;
		},
		ResetEditCategory: (state) => {
			state.categoryToEdit = undefined;
			state.isCategoryToEdit = false;
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
	DeleteCategory,
	UpdateProduct,
	UdapteCategory,
	SetEditCategory,
	ResetEditCategory,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
