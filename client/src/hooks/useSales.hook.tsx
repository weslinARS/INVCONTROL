import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { getSales } from "../api/sales.axios";
import { useState } from "react";


export const useSales = () => {
  type booleanPromise = Promise<boolean>;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  const FindSales = async (): booleanPromise => {
    if (user.isSetUser !== null) {
      console.log("buscando ventas");
      const salesFound = await getSales(user.userToken);
      if (salesFound.status === 200) {
        dispatch({
          type: "Sales/SetSales",
          payload: salesFound.data,
        });
        return true;
      }
    }
    return false;
  };
  return {FindSales};
}