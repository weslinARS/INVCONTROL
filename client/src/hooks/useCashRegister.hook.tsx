/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { getCashRegisters,createCashRegister, updateCashRegister } from "../Api/cashRegister.axios";
import { cashRegisterActionType } from "../utilities/reduxActions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";
export const useCashRegister = () => {
	const MySwal = withReactContent(Swal);
	const user = useSelector((state: RootState) => state.User);
  const cashRegister = useSelector((state: RootState) => state.CashRegister.cashRegister);
	const dispatch = useDispatch();
	const FindCashRegister = async () => {
		try {
			const cashRegisterFound = await getCashRegisters(user.userToken);
			if (cashRegisterFound.status === 200) {
				dispatch({
					type: cashRegisterActionType.OpenCashRegister,
					payload: cashRegisterFound.data,
				});
			}
		} catch (error: any) {
			const response = error.response;
			if (response.status === 404) {
				const errorMessage = response.data.message;
				MySwal.fire({
					icon: "warning",
          title: "No se encontró registros de caja",
					text: errorMessage,
				});
			}
		}
	};

  const AddCashRegister = async (cashRegister: object) => {
    const cashRegisterFormated = JSON.stringify(cashRegister);
    toast.loading("Agregando caja registradora");
    try {
      const response = await createCashRegister(cashRegisterFormated, user.userToken);
      if (response.status === 201) {
        dispatch({
          type: cashRegisterActionType.OpenCashRegister,
          payload: response.data,
        });
        toast.dismiss();
        toast.success("Caja registradora agregada correctamente");
      }
    } catch (error: any) {
      const response = error.response;
      if (response.status != 201) {
        const errorMessage = response.data.message;
        MySwal.fire({
          icon: "warning",
          title: "Error al agregar la caja registradora",
          text: errorMessage,
        });
      }
    }
  }

  const CloseCashRegister = async () => {
    toast.loading("Cerrando caja registradora");
    try {
      const response = await updateCashRegister(cashRegister._id, user.userToken);
      if (response.status === 201) {
        dispatch({
          type: cashRegisterActionType.CloseCashRegister,
          payload: response.data,
        });
        toast.dismiss();
        toast.success("Caja registradora cerrada correctamente");
      }
    } catch (error: any) {
      toast.dismiss();
      const response = error.response;
      if (response.status != 201) {
        const errorMessage = response.data.message;
        MySwal.fire({
          icon: "warning",
          title: "Error al cerrar la caja registradora",
          text: errorMessage,
        });
      }
    }
  }
	return { FindCashRegister, AddCashRegister, CloseCashRegister };
};
