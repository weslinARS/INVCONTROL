export interface IProduct {
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productCategory: string;
    _id: string;
    productSupplierId: string;
}

export interface IRawProduct {
    productName: string;
    productDescription: string;
    productPrice: number;
    productStock: number;
    productCategory: string;
    productSupplierId: string;
}