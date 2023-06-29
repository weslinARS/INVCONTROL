/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
interface props {
	children: any;
	hasRole: string;
}
export function PrivateRoute({ children, hasRole }: props) {
	const user = useSelector((state: RootState) => state.User);
	if (user.isSetUser == null) return <Navigate to='/'></Navigate>;
	if (
		(hasRole && user?.userRole !== hasRole) ||
		(hasRole === "any" &&
			(user?.userRole === "admin" || user?.userRole === "seller"))
	)
		<Navigate to='/'></Navigate>;
	return <>{children}</>;
}
