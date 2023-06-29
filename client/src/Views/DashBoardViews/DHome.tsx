import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { LoadingView } from "../../Components/LoadingView.component";
import { useState } from "react";
import { CardList } from "../../Components/DashBoardComponents/CardList.component";
import { useStore } from "../../Contexts/Store.context";
export function DHome() {
	const isSetUser  = useSelector((state : RootState)=> state.User.isSetUser);
	const {LoadingData} = useStore();
	const User = useSelector((state: RootState) => state.User);
	const suppliersList = useSelector((state: RootState) => state.Suppliers);
  const [isMontoAdded , setIsMontoAdded] = useState <boolean>(false);
	if (LoadingData && isSetUser) return <LoadingView />;
	/*
  TODO: 
  *
  */
	return (
		<div className='w-screen flex flex-col content-center items-center  p-4 '>
      {
        //* Informacion de usuario
      }
			<div className='w-full bg-slate-200 px-2 py-4 shadow-md flex flex-row  justify-between '>
				<div className='prose'>
					<h3 className='inline-block font-semibold uppercase text-primary'>
						Buen Día
					</h3>
					<h1 className=''>
						Bienvenido {User.userName + " " + User.userLastName}
					</h1>
					<span
						className={`badge ${
							User.userRole == "admin"
								? "badge-primary"
								: "badge-warning"
						} font-bold+4z text-center align-baseline`}
					>
						{User.userRole == "admin"
							? "Administrador"
							: "Vendedor"}
					</span>
				</div>
        <div className="flex flex-col gap-y-3">
          <button className={`btn ${!isMontoAdded ? "" : "btn-error"} `}>{!isMontoAdded ? "Ingresar Monto de inicio" : "Realizar Corte" }</button>
          <span className="text-5xl font-bold">{"1000"} C$</span>
        </div>
			</div>
      {
        //* Cards
      }
      <div className="mt-8  w-[95vw] py-4 px-2 flex flex-row content-center " >
        <CardList></CardList>
      </div>
		</div>
	);
}
