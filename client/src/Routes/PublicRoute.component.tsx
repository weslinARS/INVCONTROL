import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "src/app/store";
export function PublicRoute({ children }: { children: ReactNode }) {
	const isSetUser = useSelector((state: RootState) => state.User.isSetUser);
	if (isSetUser !== null) {
    console.log("isSetUser", isSetUser);
		return <Navigate to='/dashboard'></Navigate>;
	}
	return <>{children}</>;
}
