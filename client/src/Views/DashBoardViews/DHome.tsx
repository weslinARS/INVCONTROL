import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { LoadingView } from "../../Components/LoadingView.component";
import { useState } from "react";
import { CardList } from "../../Components/DashBoardComponents/CardList.component";
import { useStore } from "../../Contexts/Store.context";
import { Carousel } from "../../Components/carousel.component";
import { BsFillStarFill } from "react-icons/bs";
export function DHome() {
	const isSetUser = useSelector((state: RootState) => state.User.isSetUser);
	const { LoadingData } = useStore();
	const User = useSelector((state: RootState) => state.User);
	const suppliersList = useSelector((state: RootState) => state.Suppliers);
	const [isMontoAdded, setIsMontoAdded] = useState<boolean>(false);
	if (LoadingData && isSetUser) return <LoadingView />;
	/*
  TODO: 
  *
  */
	return (
		<div className='overflow-x-hidden py-4 '>
			{
				//* Informacion de usuario
			}
			<div className='mx-2 flex flex-col justify-between  bg-slate-200 p-2 py-4 shadow-md md:mx-5  md:flex-row '>
				<div className='prose'>
					<h3 className='inline-block font-semibold uppercase text-primary'>
						Buen Día
					</h3>
					<h1 className=''>
						Bienvenido {User.userName + " " + User.userLastName}
					</h1>
				</div>
				<div className='mt-4 flex flex-row md:flex-col gap-x-2 md:gap-x-0 gap-y-3 sm:mt-0'>
					<button
						className={`btn ${
							!isMontoAdded ? "btn-primary" : "btn-error"
						} `}>
						{!isMontoAdded
							? "Ingresar Monto de inicio"
							: "Realizar Corte"}
					</button>
					<span className='text-5xl font-bold'>{"1000"} C$</span>
				</div>
			</div>
			<div className='mt-8 mx-5'>
				<h1 className='mb-4 inline-flex text-2xl uppercase'>
					<BsFillStarFill /> &nbsp; Resumen del dia
				</h1>
			</div>
			<div className='flex w-screen flex-row  items-center justify-center  px-2  py-4'>
				<CardList></CardList>
			</div>
		</div>
	);
}
