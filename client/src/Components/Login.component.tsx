/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuthenticacion } from "../Contexts/Authenticacion.context";
import { BsExclamationCircleFill } from "react-icons/bs";
/*
todo:
* colocar alertas de los posibles errores al verficar el usuario
*/
export function Login() {
	/* hook para navegar entre paginas */
	const [Error, setError] = useState<string>("");
	/* variables de estado para el usuario */
	const [user, setUser] = useState<object>({
		userEmail: "",
		userPassword: "",
	});
	const handleChange = ({
		target: { name, value },
	}: {
		target: { name: string; value: string };
	}) => {
		setUser({ ...user, [name]: value });
	};
	const { LogIn } = useAuthenticacion();
	useEffect(() => {
		console.log(Error);
	}, [Error]);
	// creando el dispatch
	/**
	 * description: funcion para enviar los datos del formulario y comprobar si corresponde a un usuario
	 * @param data: object
	 * @returns void
	 */
	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			console.table(user);
			await LogIn(user);
		} catch (error: any) {
			console.log(error);
			setError(error.response.data.message);
		}
		setUser({ userEmail: "", userPassword: "" });
	};
	return (
		<div className='prose rounded-md bg-slate-50 px-5 py-3 md:w-[50%] lg:w-[25%] '>
			<h2 className=''>Control de Inventario</h2>
			<h3 className=''>Iniciar Sesion</h3>
			<span className={`${Error === "" && "hidden"} flex flex-row items-center justify-evenly bg-red-200 text-error font-semibold text-sm py-2 px-1 rounded-md`}>
				<BsExclamationCircleFill className="inline-block" /> &nbsp;
				{Error !== "" && Error}
			</span>
			<form
				action=''
				className='flex flex-col gap-2 '
				onSubmit={onSubmit}>
				{
					// *UserName input
				}
				<div className='flex flex-col gap-1'>
					<label htmlFor='User'>Usuario</label>
					<input
						type='text'
						id='User'
						name='userEmail'
						placeholder='EjemploUsuario'
						className='input-bordered input-primary  input input-md'
						onChange={handleChange}
						autoComplete='on'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='Password'>Contraseña</label>
					<input
						type='password'
						id='Password'
						name='userPassword'
						placeholder='********'
						className='input-bordered input-primary  input input-md'
						onChange={handleChange}
					/>
				</div>
				<input
					type='submit'
					className='btn-primary btn drop-shadow-md '
					value={"Iniciar Sesion"}
				/>
			</form>
		</div>
	);
}
