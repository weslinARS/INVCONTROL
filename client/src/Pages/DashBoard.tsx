/* eslint-disable react-hooks/exhaustive-deps */
import {Outlet} from "react-router-dom";
import { SideBarItems } from "../Components/LayoutComponents/SideBarItems.component";
import { useStore } from "../Contexts/Store.context";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store";
import { useEffect } from "react";
import { LoadingView } from "../Components/LoadingView.component";
import {Menu} from "../Components/LayoutComponents";
export function DashBoard() {
	const { FindDocuments, LoadingData } = useStore();
	const user = useSelector((state: RootState) => state.User);
	useEffect(() => {
		if (user.isSetUser !== null) FindDocuments(user.userRole);
	}, [user.isSetUser]);
	if (LoadingData && user.isSetUser == true) return <LoadingView />;
	return (
		<div>
			<Menu sideBarContent={<SideBarItems />}>
				<Outlet></Outlet>
			</Menu>
		</div>
	);
}
