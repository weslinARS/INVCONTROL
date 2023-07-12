import { createColumnHelper } from "@tanstack/react-table";
import Moment from "react-moment"


type SoldProduct = {
  _id :string;
  soldProductName : string; 
  soldProductId: string; 
  soldProductAmount : number; 
  soldProductAmountCollected : number; 
}


type Sale = {	
  _id: string;
  saleDate: Date;
  SaleProducts : SoldProduct[];
}
const columHelper = createColumnHelper<Sale>(); 

export const columns = [
  columHelper.accessor("saleDate",{
    header : "Fecha de venta",
    cell : ({row}) => {
      const saleDate = row.getValue("saleDate");
      return(
        <span>
          <Moment></Moment>
        </span>
      )
    }
  })
]