/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAuthenticacion } from "../Contexts/Authenticacion.context";
import { BsExclamationCircleFill } from "react-icons/bs";
import { Formik, Form } from "formik";
import { TextField } from "./InputsComponent/";
import { userLoginSchema } from "../Validators/UserLogin.validator";
import { BsFillEnvelopeFill, BsFillLockFill } from "react-icons/bs";
/*
todo:
* colocar alertas de los posibles errores al verficar el usuario
*/
export function Login() {
	/* hook para navegar entre paginas */
	const [Error, setError] = useState<string>("");
	const { LogIn } = useAuthenticacion();
	return (
		<div className='prose w-[50%] rounded-md bg-slate-50 px-5 py-3 md:w-fit '>
			<h2 className=''>Control de Inventario</h2>
			<h3 className=''>Iniciar Sesion</h3>
			<span
				className={`${
					Error === "" && "hidden"
				} flex flex-row items-center justify-evenly rounded-md bg-red-200 px-1 py-2 text-sm font-semibold text-error`}>
				<BsExclamationCircleFill className='inline-block' /> &nbsp;
				{Error !== "" && Error}
			</span>
			<Formik
				initialValues={{
					userEmail: "",
					userPassword: "",
				}}
				onSubmit={async (values, action: any) => {
					try {
						await LogIn(values);
						action.resetForm();
					} catch (error:any) {
						setError(error.response.data.message);
					}
				}}
				onReset={( action: any) => {
					action.resetForm();
				}}
				validationSchema={userLoginSchema}>
				{({ values }) => (
					<Form>
						<TextField
							fieldName='userEmail'
							inputIcon={<BsFillEnvelopeFill />}
							label='Correo de usuario'
							type='email'
							value={values.userEmail}
							placeHolder='ejemplo@email.com'
						/>
						<TextField
							fieldName='userPassword'
							inputIcon={<BsFillLockFill />}
							label='Contraseña'
							type='password'
							value={values.userPassword}
							placeHolder='********'
						/>
						<button
							type='submit'
							className='btn-primary btn-block btn my-4'>
							Iniciar Sesion
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}
