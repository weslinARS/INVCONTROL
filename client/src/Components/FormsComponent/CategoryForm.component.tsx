/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Formik } from "formik";
import { toast } from "react-hot-toast";
import { BsFillPencilFill } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { useCategories } from "../../hooks/";
import { TextField } from "../InputsComponent/";
import { useStore } from "../../Contexts/Store.context";
import { useEffect } from "react";
interface IFormProps {
	setIsOpenForm: any;
}
type Category ={
	categoryName:string
}
export function CategoryForm({ setIsOpenForm }: IFormProps) {
	const {
		isCategoryToEdit,
		setIsCategoryToEdit,
		categoryToEdit,
		setCategoryToEdit,
	} = useStore();
	useEffect(() => {
		if (isCategoryToEdit) console.log(categoryToEdit.categoryName);
	}, [isCategoryToEdit]);
	const { AddCategory } = useCategories();
	const MySwal = withReactContent(Swal);
	const initialValues: Category = {
		categoryName: "",
	};
	return (
		<div className='shadow-slate-500-50 prose mx-auto w-fit bg-slate-200  p-4 shadow-md'>
			<h3 className=''>{isCategoryToEdit? "Editar Categoria":"Registrar Categoria" } </h3>
			<Formik
				initialValues={
					isCategoryToEdit
						? { categoryName: categoryToEdit.categoryName }
						: initialValues
				}
				onSubmit={(values: Category, action) => {
					MySwal.fire({
						title: "¿Desea registrar esta categoria?",
						text: "Se registrara la categoria en la base de datos",
						icon: "question",
						showCancelButton: true,
						confirmButtonText: "Registrar Categoria",
						cancelButtonText: "Cancelar Registro",
					}).then(async (result) => {
						if (result.isConfirmed) {
							const toastId = toast.loading(
								"Registrando categoria..."
							);
							const hasBeenAdded = await AddCategory(values);
							if (hasBeenAdded) {
								toast.remove(toastId);
								toast.success("Categoria registrada con exito");
								action.resetForm();
							}
						}
					});
					action.resetForm();
				}}
				validationSchema={Yup.object({
					categoryName: Yup.string()
						.required("El nombre de la categoria es requerido")
						.matches(/^[aA-zZ\s]+$/, "Solo se permiten letras")
						.max(15, "El nombre de la categoria es muy largo")
						.min(3, "El nombre de la categoria es muy corto"),
				})}>
				{({ values, handleReset }) => (
					<Form className='flex flex-col content-center items-center justify-center gap-4 md:flex-row'>
						<TextField
						value={values.categoryName}
						fieldName="categoryName"
						label="Nombre de la categoria"
						inputIcon={<BsFillPencilFill />}
						placeHolder="Ej: Reposteria"
						/>
						<div className='flex flex-col gap-2'>
							<button
								className='btn-primary  btn-sm btn '
								type='submit'>
								{isCategoryToEdit ? "Editar" : "Registrar"}
							</button>
							<button
								className='btn-error  btn-sm btn '
								onClick={() => {
									if(isCategoryToEdit){
										setIsCategoryToEdit(false);
										setCategoryToEdit(undefined);
									}
									setIsOpenForm(false);
									handleReset();
								}}>
								{isCategoryToEdit ? "Cancelar Edicion" : "Cancelar Registro"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
