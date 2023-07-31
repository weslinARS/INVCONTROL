/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Divider, Flex, Text, Title } from "@tremor/react";
import { FieldArray, Form, Formik } from "formik";
import {
	HiMail,
	HiOfficeBuilding,
	HiPhone,
	HiTag,
	HiTrash,
	HiUserAdd,
} from "react-icons/hi";
import { useStore } from "../../Contexts/Store.context";
import { SupplierSchema } from "../../Validators/Supplier.validator";
import { useSuppliers } from "../../hooks";
import { TextField } from "../InputsComponent/";
type Supplier = {
	supplierName: string;
	supplierPhoneNumbers: string[];
	supplierEmail: string[];
	supplierAddress: string;
};
interface Props {
	formSatusFn: any;
	isFormOpen: boolean;
}
export function SupplierForm({ formSatusFn, isFormOpen }: Props) {
	const { AddSupplier, UpdateSupplier } = useSuppliers();
	const {
		isSupplierToEdit,
		supplierToEdit,
		setIsSupplierToEdit,
		setSupplierToEdit,
	} = useStore();
	const initialValues = {
		supplierName: "",
		supplierPhoneNumbers: [""],
		supplierEmail: [""],
		supplierAddress: "",
	};
	const handleSubmit = (values: Supplier, action: any) => {
		if (isSupplierToEdit) {
			UpdateSupplier({ ...values, _id: supplierToEdit._id });
			setIsSupplierToEdit(false);
			setSupplierToEdit(undefined);
			formSatusFn(false);
		} else AddSupplier(values);
		action.resetForm(initialValues);
		formSatusFn(false);
	};
	return (
		isFormOpen && (
			<Card className=' mt-4 w-fit'>
				<Title>Registro de Proveedor</Title>
				<Text>Formulario de registro de proveedores </Text>
				<Formik
					validationSchema={SupplierSchema}
					onSubmit={(value: Supplier, actions) => {
						handleSubmit(value, actions);
					}}
					initialValues={
						isSupplierToEdit
							? {
									supplierName: supplierToEdit.supplierName,
									supplierPhoneNumbers:
										supplierToEdit.supplierPhoneNumbers,
									supplierEmail: supplierToEdit.supplierEmail,
									supplierAddress:
										supplierToEdit.supplierAddress,
							}
							: initialValues
					}>
					{({ values, resetForm }) => (
						<Form className='w-fit'>
							<TextField
								fieldName='supplierName'
								inputIcon={<HiTag />}
								placeHolder='Nombre del proveedor'
								label='Nombre del proveedor'
								value={values.supplierName}
							/>
							<TextField
								fieldName='supplierAddress'
								inputIcon={<HiOfficeBuilding />}
								placeHolder='Dirección del proveedor'
								label='Dirección del proveedor'
								value={values.supplierAddress}
							/>
							<Divider />
							<h1 className='my-3 text-base uppercase '>
								Correos Electronicos
							</h1>
							<FieldArray name='supplierEmail'>
								{({ remove, push }) => (
									<>
										{" "}
										<div>
											{values.supplierEmail.length > 0 &&
												values.supplierEmail.map(
													(email, index) => (
														<div key={index}>
															<Flex
																justifyContent='end'
																alignItems='end'
																className='gap-2'>
																<TextField
																	fieldName={`supplierEmail.${index}`}
																	placeHolder='Correo electrónico'
																	label='Correo electrónico'
																	inputIcon={
																		<HiMail />
																	}
																	value={
																		values
																			.supplierEmail[
																			index
																		]
																	}
																/>
																<Button
																	onClick={() =>
																		remove(
																			index
																		)
																	}
																	icon={
																		HiTrash
																	}
																	color='red'
																	tooltip='Eliminar Correo'
																	iconPosition='right'>
																	Eliminar
																</Button>
															</Flex>
														</div>
													)
												)}
										</div>
										<Button
											onClick={() => push("")}
											className='mt-4'
											variant='secondary'
											color='indigo'>
											Agregar
										</Button>
									</>
								)}
							</FieldArray>
							<Divider />
							<h1 className='my-3 text-base uppercase '>
								Números telefónicos
							</h1>
							<FieldArray
								name='supplierPhoneNumbers
'>
								{({ remove, push }) => (
									<>
										{" "}
										<div>
											{values.supplierPhoneNumbers
												.length > 0 &&
												values.supplierPhoneNumbers.map(
													(PhoneNumber, index) => (
														<div key={index}>
															<Flex
																justifyContent='end'
																alignItems='end'
																className='gap-2'>
																<TextField
																	fieldName={`supplierPhoneNumbers.${index}`}
																	placeHolder='21548796'
																	label='Teléfono'
																	inputIcon={
																		<HiPhone />
																	}
																	value={
																		values
																			.supplierPhoneNumbers[
																			index
																		]
																	}
																/>
																<Button
																	onClick={() =>
																		remove(
																			index
																		)
																	}
																	icon={
																		HiTrash
																	}
																	color='red'
																	tooltip='Eliminar Correo'
																	iconPosition='right'>
																	Eliminar
																</Button>
															</Flex>
														</div>
													)
												)}
										</div>
										<Button
											onClick={() => push("")}
											className='mt-4'
											variant='secondary'
											color='indigo'>
											Agregar
										</Button>
									</>
								)}
							</FieldArray>
							<Divider />
							<Flex>
								<Button icon={HiUserAdd}>
									{isSupplierToEdit? 'Actualizar Proveedor': 'Registrar Proveedor'}
								</Button>
								<Button
									variant='secondary'
									color='red'
									onClick={() => {
										if (isSupplierToEdit) {
											setIsSupplierToEdit(false);
											setSupplierToEdit(undefined);
										}
										resetForm();
										formSatusFn(false);
									}}>
									Cancelar Registro
								</Button>
							</Flex>
						</Form>
					)}
				</Formik>
			</Card>
		)
	);
}
