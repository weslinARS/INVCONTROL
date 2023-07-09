import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
export function PublicRoute({ children }: { children: ReactNode }) {
	const isSetUser = useSelector((state: RootState) => state.User.isSetUser);
	if (isSetUser !== null) {
		return <Navigate to='/dashboard'></Navigate>;
	}
	return <>{children}</>;
}
