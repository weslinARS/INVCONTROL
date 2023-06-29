import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store";
import { getSales } from "../api/sales.axios";
import {salesActionType} from '../utilities/reduxActions'

export const useSales = () => {
  type booleanPromise = Promise<boolean>;
  const user = useSelector((state: RootState) => state.User);
  const dispatch = useDispatch();
  const FindSales = async (): booleanPromise => {
    if (user.isSetUser !== null) {
      const salesFound = await getSales(user.userToken);
      if (salesFound.status === 200) {
        dispatch({
          type: salesActionType.SetSales,
          payload: salesFound.data,
        });
        return true;
      }
    }
    return false;
  };
  return {FindSales};
}