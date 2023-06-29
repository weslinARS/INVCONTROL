/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";
import { BsFillPencilFill, BsArchiveFill, BsFillTagFill } from "react-icons/bs";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useProduct } from "../../hooks/useProducts.hook";
import {
	BasicSelectField,
	NumberField,
	SelectObjectField,
	TextField,
} from "../InputsComponent";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductValidator } from "../../Validators/Product.validator";
export interface IFormValues {
	productName: string;
	productPrice: number;
	productStock: number;
	productSupplierId: string;
	productCategory: string;
	productDescription: string;
}
export function ProductsForm({
	setIsOpenForm,
}: {
	setIsOpenForm: any;
}) {
	const { AddProduct } = useProduct();
	// adapting sweet alert to react
	const MySwal = withReactContent(Swal);
	const CategoryList = useSelector(
		(state: RootState) => state.Products.CategoryList
	);
	const SupplierList = useSelector(
		(state: RootState) => state.Suppliers.suppliers
	);
	return (
		<div className='ml-2 w-fit rounded-md bg-slate-200 px-4 py-6 '>
			<p className=' py-2 sm:w-[35ch] md:w-[40ch]'>
				Agregue la informacion necesaria para registrar un producto en
				el &nbsp;
				<span className='max-w-[10px] font-semibold text-primary'>
					inventario
				</span>
			</p>
			<div>
				<Formik
					initialValues={{
						productName: "",
						productPrice: 0,
						productStock: 0,
						productSupplierId: "",
						productCategory: "",
						productDescription: "",
					}}
					onSubmit={(values: IFormValues, action: any) => {
						MySwal.fire({
							title: "Deseas agregar este producto",
							text: "Una vez agregado no podras modificarlo",
							icon: "question",
							showCancelButton: true,
							confirmButtonText: "Si, agregar",
							cancelButtonText: "Cancelar",
							confirmButtonColor: "bg-primary",
							didOpen: () => {
								console.log(values);
							},
						}).then(async (result) => {
							if (result.isConfirmed) {
								console.table(values);
								await AddProduct(values);
								action.resetForm({
									productName: "",
									productPrice: 0,
									productStock: 0,
									productSupplierId: "",
									productCategory: "",
									productDescription: "",
								});
								//handleSubmitProduct(getValues());
							}
						});
					}}
					validationSchema={ProductValidator}
					onReset={() => {
						setIsOpenForm(false);
					}}>
					{({ handleReset, values }) => (
						<Form className='grid  h-fit items-center justify-center  gap-0 '>
							{
								// * INPUTS PARA EL FORMULARIO DE PRODUCTOS
							}
							<div className='row-span-1 grid w-fit gap-4 p-4 sm:grid-cols-1 md:grid-cols-2'>
								{/*
								 *INPUT  NOMBRE DEL PRODUCTO
								 */}
								<TextField
									fieldName='productName'
									inputIcon={<BsFillPencilFill />}
									label={"Nombre del producto"}
									placeHolder={"Nombre del producto"}
									value={values.productName}
								/>{" "}
								{/*
								 *INPUT  CANTIDAD DEL PRODUCTO
								 */}
								<NumberField
									fieldName='productStock'
									inputIcon={<BsFillTagFill />}
									label={"Cantidad del producto"}
									placeHolder={"Cantidad del producto"}
									value={values.productStock}
								/>
								{/*
								 *INPUT PRECIO PRODUCT
								 */}
								<NumberField
									fieldName='productPrice'
									inputIcon={<BsFillTagFill />}
									label={"Precio del producto"}
									placeHolder={"Precio del producto"}
									value={values.productPrice}
								/>
								{
									// * INPUT DESCRIPCION PRODUCT
								}
								<div className='form-control'>
									<label
										htmlFor='productDescription'
										className='label-text'>
										Descripcion del producto
									</label>
									<Field
										name='productDescription'
										as='textarea'
										className='input-bordered input  sm:input-group-sm  lg:input-md sm:max-w-xs md:max-w-md'
										placeholder='Descripcion del producto'
									/>
									<ErrorMessage
										name='productDescription'
										component={"p"}
										className='font-semibold text-error'
									/>
								</div>
								{
									// * INPUT CATEGORIA PRODUCT
								}
								<BasicSelectField
									fieldName={"productCategory"}
									Label={"Categoria del producto"}
									LabelOption={"categoryName"}
									List={CategoryList}
								/>
								{
									// * INPUT PROVEEDOR PRODUCT
								}
								<SelectObjectField
									ObjectArray={SupplierList}
									ObjectIdNameKey='supplierName'
									fieldName='productSupplierId'
									label='Proveedor del producto'
								/>
							</div>
							{
								// * BOTONES PARA EL FORMULARIO DE PRODUCTOS
							}
							<div
								className='grid items-center justify-evenly gap-x-2  gap-y-4 
							py-4 sm:grid-rows-2 sm:grid-cols-1 md:grid-cols-2 md:grid-rows-1 '>
								<button
									className='btn-primary btn'
									type='submit'>
									agregar producto
								</button>
								<button
									className='btn-error btn '
									onClick={() => {
										handleReset();
									}}>
									Cancelar Registro
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}
