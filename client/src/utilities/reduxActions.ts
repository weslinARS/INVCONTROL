export const cashRegisterActionType = {
  OpenCashRegister: "CashRegister/OpenCashRegister",
  ResetCashRegister: "CashRegister/ResetCashRegister",
  CloseCashRegister: "CashRegister/CloseCashRegister",
  SetCashRegister: "CashRegister/SetCashRegister",
};

export const productaActionType = {
  SetProducts: "Products/SetProducts",
  ResetProducts: "Products/ResetProductsState",
  AddProduct: "Products/AddProduct",
  DeleteProduct: "Products/DeleteProduct",
  UpdateProduct: "Products/UpdateProduct",
};
export const categoryActionType = {
  SetCategories: "Products/SetCategoryList",
  ResetCategories: "Products/ResetCategoryList",
  AddCategory: "Products/AddCategory",
  DeleteCategory: "Products/DeleteCategory",
  UpdateCategory: "Products/UpdateCategory",
  SetEditCategory: "Products/SetEditCategory",
  ResetEditCategory: "Products/ResetEditCategory",
};

export const userActionType = {
  SetUserInfo: "User/SetUserInfo",
  ResetUserInfo: "User/ResetUserInfo",
};
export const salesActionType = {
  SetSales: "Sales/SetSales",
  ResetSales: "Sales/ResetSales",
  AddSale: "Sales/AddSale",
  DeleteSale: "Sales/DeleteSale",
};
export const supplierActionType = {
  SetSuppliers: "Suppliers/SetSuppliers",
  ResetSuppliers: "Suppliers/ResetSuppliers",
  AddSupplier: "Suppliers/AddSupplier",
  DeleteSupplier: "Suppliers/DeleteSupplier",
};
export const orderActionType = {
  SetOrders: "Orders/SetOrders",
  ResetOrders: "Orders/ResetOrders",
  AddOrder: "Orders/AddOrder",
  DeleteOrder: "Orders/DeleteOrder",
}