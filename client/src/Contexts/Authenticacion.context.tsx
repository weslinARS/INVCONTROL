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
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "src/app/store";
import { Register, Login } from "../api/users.axios";
const authcontext = createContext({} as any);

interface IUserinfo {
	userEmail: string;
	userName: string;
	userLastName: string;
	userPassword: string;
	userRole: string;
}
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
	console.log("desde el nuevo provider auth");
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
				type: "User/setUserInfo",
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
				type: "User/setUserInfo",
				payload: { ...response.data, isSetUser: true },
			});
			localStorage.setItem("user", JSON.stringify(response.data));
			navigate("/dashboard/");
		}
	};
	//* LOGOUT FUNCTION ===================================
	const LogOut = () => {
		localStorage.removeItem("user");
		dispatch({ type: "User/resetUserInfo" });
		dispatch({ type: "Sales/ResetSalesState" });
		dispatch({ type: "Products/ResetProductsState" });
		dispatch({ type: "Suppliers/ResetSuppliersState" });
		dispatch({ type: "Orders/ResetOrdersState" });
	};
	//* SIGNUP FUNCTION ===================================
	const SignUp = async (userData: IUserinfo) => {
		const jsonData = JSON.stringify(userData);
		setLoading(true);
		setError(null);
		const response = await Register(jsonData);
		if (response.status !== 200) {
			setLoading(false);
			setError(response.data.message);
		} else if (response.status === 200) {
			setLoading(false);
		}
	};
	return (
		<authcontext.Provider value={{ LogIn, LogOut, SignUp, error, loading }}>
			{children}
		</authcontext.Provider>
	);
}
