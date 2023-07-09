import { Formik, Form } from "formik";
import { TextField } from "../InputsComponent/";
import { BsFillPencilFill } from "react-icons/bs";
import {useCategories} from '../../hooks/'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from "yup";
import { toast } from "react-hot-toast";
interface IFormProps {
	setIsOpenForm: any;
}
import {IRawCategory} from '../../interfaces/ICategory'
export function CategoryForm({ setIsOpenForm }: IFormProps) {
  const {AddCategory} = useCategories();
  const MySwal = withReactContent(Swal);
	return (
		<div className='prose mx-auto w-fit bg-slate-200 p-4  shadow-md shadow-slate-500-50'>
			<h3 className=''>Registro de cateogorias </h3>
			<Formik
				initialValues={{
					categoryName: "",
				}}
				onSubmit={(values: IRawCategory, action) => {
					MySwal.fire({
            title: "¿Desea registrar esta categoria?",
            text: "Se registrara la categoria en la base de datos",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Registrar Categoria",
            cancelButtonText: "Cancelar Registro",
          }).then(async (result) =>{
            if(result.isConfirmed){
              const toastId = toast.loading("Registrando categoria...");
              const hasBeenAdded =await  AddCategory(values);
              if(hasBeenAdded){
                toast.remove(toastId);
                toast.success("Categoria registrada con exito");
                action.resetForm();
              }
            }
          })
					action.resetForm();
				}}
				validationSchema={Yup.object({
					categoryName: Yup.string().required(
						"El nombre de la categoria es requerido"
					).matches(/^[aA-zZ\s]+$/, "Solo se permiten letras")
          .max(15, "El nombre de la categoria es muy largo")
          .min(3, "El nombre de la categoria es muy corto"),
				})}>
				{({ handleSubmit, handleReset, values }) => (
					<Form className='flex flex-col md:flex-row content-center items-center justify-center gap-4'>
						<TextField
							fieldName='categoryName'
							inputIcon={<BsFillPencilFill />}
							placeHolder='eg. Reposteria'
							label='Nombre de la categoria'
							value={values.categoryName}
						/>
						<div className='flex flex-col gap-2'>
							<button
								className='btn-primary  btn btn-sm '
								type='submit'>
								Registrar categoria
							</button>
							<button
								className='btn-error  btn btn-sm '
								onClick={() => {
									setIsOpenForm(false);
									handleReset();
								}}>
								Cancelar Registro
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
