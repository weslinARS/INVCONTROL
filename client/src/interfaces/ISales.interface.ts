
/**
 * Interface para la venta de productos
 */
export interface ISoldProduct{
    _id : string;
    soldProductId: string;
    soldProductName : string;
    soldProductQuantity : number;
    soldProductAmountCollected: number;
    soldProductCategory: string;
}
export interface ISales{
    _id : string;
    saleDate: Date;
    saleSellerId: string;
    saleAmountCollected : number;
    saleProducts: Array<ISoldProduct>;
}