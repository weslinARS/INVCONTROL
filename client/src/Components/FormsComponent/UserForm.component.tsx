import { Button, Card, Flex, Text, Title } from "@tremor/react";
import { Form, Formik } from "formik";
import { HiTag } from "react-icons/hi";
import { useStore } from "../../Contexts/Store.context";
import { UserRegisterSchema } from "../../Validators/User.validator";
import { useUsers } from "../../hooks/useUsers.hook";
import { SelectObjectField, TextField } from "../InputsComponent/";
const roles = [
	{ value: "admin", label: "Administrador" },
	{ value: "seller", label: "Vendedor" },
];
type User = {
	userName: string;
	userLastName: string;
	userPassword: string;
	userRole: string;
	userEmail: string;
};
interface Props {
	formSatusFn: any;
	isFormOpen: boolean;
}
export function UserForm({ formSatusFn, isFormOpen }: Props) {
	const { isUserToEdit, userToEdit, setUserToEdit, setIsUserToEdit } =
		useStore();
	const { RegisterUser,UpdateUser } = useUsers();
	const initialValues = {
		userName: "",
		userLastName: "",
		userPassword: "",
		userRole: "",
		userEmail: "",
	};
	const handleSubmit = (values: User, action: any) => {
		if (isUserToEdit) {
      UpdateUser(userToEdit.userId,values);
      setIsUserToEdit(false);
      setUserToEdit(undefined);
		} else RegisterUser(values);
		formSatusFn(false);
	};
	return (
		isFormOpen && (
			<Card className='mt-4 w-fit'>
				<Title>{isUserToEdit ? 
          `Edicion de usuario ${userToEdit.userName}` : 
          "Registro de usuario"
         }</Title>
				<Text>{
          isUserToEdit ? "Formulario de edicion de usuario" : "Formulario de registro de usuarios"
          } </Text>
				<Formik
					validationSchema={UserRegisterSchema}
					onSubmit={(value: User, actions) => {
						handleSubmit(value, actions);
            actions.resetForm();
					}}
					initialValues={
						isUserToEdit
							? {
									userName: userToEdit.userName,
									userLastName: userToEdit?.userLastName,
									userPassword: userToEdit?.userPassword,
									userRole: userToEdit?.userRole,
									userEmail: userToEdit?.userEmail,
							}
							: initialValues
					}>
					{({ values, resetForm }) => (
						<Form>
							<TextField
								fieldName='userName'
								inputIcon={<HiTag />}
								label='Nombre'
								placeHolder='Nombre del usuario'
								value={values.userName}
								type='text'
							/>
							<TextField
								fieldName='userLastName'
								inputIcon={<HiTag />}
								label='Apellido'
								placeHolder='Apellido del usuario'
								value={values.userLastName}
								type='text'
							/>
							<TextField
								fieldName='userPassword'
								inputIcon={<HiTag />}
								label='Contraseña'
								placeHolder='********'
								value={values.userPassword}
								type='password'
							/>
							<TextField
								fieldName='userEmail'
								inputIcon={<HiTag />}
								label='Correo Electronico'
								placeHolder='Correo Electronico'
								value={values.userEmail}
								type='email'
							/>
							<SelectObjectField
								ObjectArray={roles}
								ObjectIdNameKey='value'
								fieldName='userRole'
								label='Rol de usuario'
								value={values.userRole}
							/>
							<Flex className='mt-4 gap-1'>
								<Button
									type='submit'
									color='indigo'>
									{isUserToEdit
										? "Editar Usuario"
										: "Registrar Usuario"}
								</Button>
								<Button
									variant='secondary'
									color='red'
									type='button'
									onClick={() => {
										resetForm();
										formSatusFn(false);
										setIsUserToEdit(false);
										setUserToEdit(undefined);
									}}>
									{isUserToEdit
										? "Cancelar Edicion"
										: "Cancelar Registro"}
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</Card>
		)
	);
}
