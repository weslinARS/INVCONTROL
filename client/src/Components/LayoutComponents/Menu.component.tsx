import { BiExit } from "react-icons/bi";
import { useAuthenticacion } from "../../Contexts/Authenticacion.context";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { useEffect, useState } from "react";
interface MenuProps {
	children: React.ReactNode;
	sideBarContent: React.ReactNode;
}
export function Menu({ children, sideBarContent }: MenuProps) {
	const User = useSelector((state: RootState) => state.User);
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	const { LogOut } = useAuthenticacion();
	return (
		<div className='drawer '>
			<input
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<div className='drawer-content'>
				{/* Page content here */}
				<div className='navbar bg-dark-900 '>
					<div className='flex-none'>
						<label
							htmlFor='my-drawer'
							className='btn-ghost drawer-button btn'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								className='inline-block h-5 w-5 stroke-current text-white'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h16M4 18h16'></path>
							</svg>
						</label>
					</div>
					<div className='flex-1 '>
						<a className='btn-ghost btn text-xl normal-case text-white'>
							Inventory Control
						</a>
						<span
							className={`badge ${
								User.userRole == "admin"
									? "badge-primary"
									: "badge-warning"
							} font-bold+4z text-center align-baseline`}>
							{User.userRole == "admin"
								? "Administrador"
								: "Vendedor"}
						</span>
					</div>
					{windowWidth > 768 && (
						<div className='flex-none content-center items-center'>
							<button
								className='btn-error btn-sm btn font-bold'
								onClick={LogOut}>
								<BiExit />
								Salir
							</button>
						</div>
					)}
				</div>
				{children}
			</div>
			<div className='drawer-side '>
				<label
					htmlFor='my-drawer'
					className='drawer-overlay'></label>
				<div className=' menu h-full w-64 transform overflow-y-hidden bg-dark-900 transition-transform duration-300 ease-in-out'>
					{sideBarContent}
				</div>
			</div>
		</div>
	);
}
