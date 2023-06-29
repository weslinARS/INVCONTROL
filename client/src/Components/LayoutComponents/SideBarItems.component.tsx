/* eslint-disable @typescript-eslint/no-explicit-any */
import { RiDashboardLine } from "react-icons/ri";
import { NavLinkComponent } from "../NavLink.component";
import { useSelector } from "react-redux";
import {
	HiArchive,
	HiCurrencyDollar,
	HiShoppingCart,
	HiUsers,
	HiClipboardList,
} from "react-icons/hi";
import { RootState } from "src/Store/store";
export function SideBarItems() {
	const role = useSelector((state : RootState) => state.User.userRole)
	return (
		<div className='h-screen'>
			<div className={``}>
				<div className='flex items-center justify-between border-b p-4'>
					<div className='text-2xl font-bold text-secondary'>
						Menu
					</div>
				</div>
				<div
					className='mt-4 '
					id='sidebar'
				>
					<NavLinkComponent
						Text={"DashBoard"}
						Icon={<RiDashboardLine />}
						NavigateTo='/dashboard/'
					/>
					<NavLinkComponent
						Text={"Productos"}
						Icon={<HiArchive />}
						NavigateTo='/dashboard/Productos'
					/>
					<NavLinkComponent
						Text={"Ventas"}
						Icon={<HiCurrencyDollar />}
						NavigateTo='/dashboard/Ventas'
					/>
					{role === "admin" && (
						<NavLinkComponent
							Text={"Abastecimiento"}
							Icon={<HiShoppingCart />}
							NavigateTo='/dashboard/Abastecimiento'
						/>
					)}
					{role === "admin" && (
						<NavLinkComponent
							Text={"Proveedores"}
							Icon={<HiClipboardList />}
							NavigateTo='/dashboard/Proveedores'
						/>
					)}
					{role === "admin" && (
						<NavLinkComponent
							Text={"Usuarios"}
							Icon={<HiUsers />}
							NavigateTo='/dashboard/Usuarios'
						/>
					)}
				</div>
			</div>
		</div>
	);
}
