export interface IProduct {
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productCategory: string;
    _id: string;
    productSupplierId: string;
    productStockPolicy: number;
    productIsOverPolicy: boolean;
}

export interface IRawProduct {
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productCategory: string;
    productSupplierId: string;
    productStockPolicy: number;
    productIsOverPolicy: boolean;
}