export interface IOrderedProduct{
    orderedProductId : string, 
    orderedProductName : string, 
    orderProductQuantity : number,
    orderedProductPrice : number,
}

export interface IOrder{
    orderProducts : Array<IOrderedProduct>,
    orderId : string , 
    orderDate : string,
    orderDeliveryDate : string,
}
