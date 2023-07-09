/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthenticacion } from "../../Contexts/Authenticacion.context";
import { BiExit } from "react-icons/bi";
import { useEffect, useState } from "react";
export function NavBar() {
	const { logOut } = useAuthenticacion();
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
	return (
		<div className='navbar bg-dark-900'>
			<div className='flex-none'>
				<button className='btn-ghost btn-square btn'>
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
				</button>
			</div>
			<div className='flex-1 '>
				<a className='btn-ghost btn text-xl normal-case text-white'>
					Inventory Control
				</a>
			</div>
			<div className='flex-none content-center items-center'>
				<button
					className={` ${windowWidth < 768 ? 'hidden' : 'block'} btn-error btn-sm btn hidden font-bold sm:block`}
					onClick={logOut}>
					<BiExit />
          {windowWidth }
					Salir
				</button>
			</div>
		</div>
	);
}
