
/**
 * Interface para la venta de productos
 */
export interface ISoldProduct{
    soldProductId: string;
    soldProductName : string;
    soldProductQuantity : number;
    soldProductAmount: number;
}
export interface ISales{
    saleId: string;
    saleDate: string;
    saleProducts: Array<ISoldProduct>;
}