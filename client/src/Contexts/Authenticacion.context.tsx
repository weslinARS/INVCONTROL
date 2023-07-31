/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { useDispatch } from "react-redux";
import {
	UsersActionType,
	cashRegisterActionType,
	categoryActionType,
	orderActionType,
	productaActionType,
	salesActionType,
	supplierActionType,
	userActionType,
} from "../utilities/reduxActions";
import { useNavigate } from "react-router-dom";
import {  Login } from "../Api/users.axios";
const authcontext = createContext({} as any);

export const useAuthenticacion = () => {
	const context = useContext(authcontext);
	if (!context) return console.log("there's not an auth provider");
	return context;
};
export default function AuthenticacionProvider({
	children,
}: {
	children: ReactNode;
}) {
	//* STATE ===================================
	const [error, setError] = useState<null | string>(null);
	const [loading, setLoading] = useState<null | boolean>(null);
	//* HOOKS ===================================
	const navigate = useNavigate();
	const dispatch = useDispatch();
	//* READ LOCAL STORAGE ===================================
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			dispatch({
				type: userActionType.SetUserInfo,
				payload: { ...JSON.parse(user), isSetUser: true },
			});
		}
	}, []);
	//* LOGIN FUNCTION ===================================
	const LogIn = async ({
		userEmail,
		userPassword,
	}: {
		userEmail: string;
		userPassword: string;
	}) => {
		const jsonData = JSON.stringify({ userEmail, userPassword });
		setLoading(true);
		setError(null);
		const response = await Login(jsonData);
		if (response.status === 200) {
			setLoading(false);
			dispatch({
				type: userActionType.SetUserInfo,
				payload: { ...response.data, isSetUser: true },
			});
			localStorage.setItem("user", JSON.stringify(response.data));
			navigate("/dashboard/");
		}
	};
	//* LOGOUT FUNCTION ===================================
	const LogOut = () => {
		localStorage.removeItem("user");
		dispatch({ type: userActionType.ResetUserInfo });
		dispatch({ type: salesActionType.ResetSales });
		dispatch({ type: productaActionType.ResetProducts });
		dispatch({ type: categoryActionType.ResetCategories });
		dispatch({ type: supplierActionType.ResetSuppliers });
		dispatch({ type: orderActionType.ResetOrders });
		dispatch({type:cashRegisterActionType.ResetCashRegister})
		dispatch({type:UsersActionType.ResetUsers})
	};
	return (
		<authcontext.Provider value={{ LogIn, LogOut, error, loading }}>
			{children}
		</authcontext.Provider>
	);
}
