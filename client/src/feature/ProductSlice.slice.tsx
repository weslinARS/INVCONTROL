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
			console.log("ahora los products son: ", state.products);
		},
		ResetProductsState: (state) => {
			state.products = initialState.products;
		},
		AddProduct: (state, action: PayloadAction<object>) => {
			console.table(action.payload);
			state.products = [...state.products, action.payload];
			console.table(state.products);
		},
		DeleteProduct: (state , action : PayloadAction<string>) =>{
			console.log("eliminando un producto de la lista de productos");
			state.products = state.products.filter((product : object ) => product["_id" as keyof object] !== action.payload);
			console.log("el nuevo estado es ")
			console.log(state.products); 
		},
		SetCategoryList: (state, action: PayloadAction<Array<object>>) => {
			state.CategoryList = action.payload;
		},
		ResetCategoryList: (state) => {
			state.CategoryList = initialState.CategoryList;
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
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
