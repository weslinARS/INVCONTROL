
/**
 * Interface para la venta de productos
 */
export interface ISoldProduct{
    _id : string;
    soldProductId: string;
    soldProductName : string;
    soldProductQuantity : number;
    soldProductAmount: number;
}
export interface ISales{
    _id : string;
    saleDate: string;
    saleProducts: Array<ISoldProduct>;
}