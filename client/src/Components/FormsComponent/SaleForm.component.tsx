/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Grid } from "@tremor/react";
import dayjs from "dayjs";
import { FieldArray, Form, Formik } from "formik";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { uid } from "react-uid";
import { RootState } from "src/Store/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useStore } from "../../Contexts/Store.context";
import { SaleValidator } from "../../Validators/Sale.validator";
import { useSales } from "../../hooks/";
import { DateField, SaleArrayItem } from "../InputsComponent/index";

interface SaleFormProps {
	ButtonCloseForm: JSX.Element;
}
export function SaleForm({ ButtonCloseForm }: SaleFormProps) {
	const { AddSales } = useSales();
	const { saleToEdit, isSaleToEdit } = useStore();
	const MySwal = withReactContent(Swal);
	const ProductList = useSelector(
		(state: RootState) => state.Products.products
	);
	const CategoryList = useSelector(
		(state: RootState) => state.Products.CategoryList
	);
	const CategoriesMemo = useMemo(() => CategoryList, [CategoryList]);
	const ProductsMemo = useMemo(() => ProductList, [ProductList]);
	const initialValues = {
								saleDate: '',
								saleProducts: [
									{
										soldProductName: "",
										soldProductQuantity:'',
										soldProductAmountCollected: '0',
										soldProductId: "",
										soldProductCategory: "",
									},
								],
						}
	return (
		<div className='prose mx-auto flex w-fit flex-col rounded-md bg-slate-200 px-4 py-4 shadow-md shadow-slate-500/50 '>
			<h2>Registro de ventas</h2>
			<Formik
				validationSchema={SaleValidator}
				initialValues={
					isSaleToEdit
						? {
								saleDate: dayjs(new Date).format("YYYY-MM-DD"),
								saleProducts: saleToEdit.saleProducts,
						}
						: initialValues
				}
				onReset={(values, actions) => {
					actions.resetForm();
				}}
				onSubmit={(values, actions) => {
					MySwal.fire({
						title: "¿Estas seguro?",
						text: "¿Deseas registrar esta venta?",
						icon: "warning",
						showCancelButton: true,
						confirmButtonText: "Si, registrar",
						cancelButtonText: "No, cancelar",
					}).then(async (result) => {
						if (result.isConfirmed) {
							const saleDate = dayjs(values.saleDate).toDate().toISOString();
							AddSales({...values, saleDate});
						}
					});
				}}>
				{({ values }) => {
					return (
						<Form>
							<div>
								<DateField
									fieldName='saleDate'
									label='Fecha de venta'
									value={values.saleDate}
								/>
								<div className='flex flex-col gap-x-1 gap-y-2'>
									<h3 className='font-bold text-neutral '>
										Produtos Vendidos
									</h3>
									<FieldArray name='saleProducts'>
										{({ remove, push }) => (
											<div>
												{values.saleProducts.length >
													0 &&
													values.saleProducts.map(
														(products, index) => (
															<SaleArrayItem
																productInfo={
																	products
																}
																key={uid(
																	products
																)}
																index={index}
																remove={remove}
																CategoriesMemo={
																	CategoriesMemo
																}
																ProductsMemo={
																	ProductsMemo
																}
																products={
																	products
																}
																values={values}
															/>
														)
													)}
												<button
													className='btn-neutral btn-sm btn my-2'
													type='button'
													onClick={() =>
														push({
															soldProductName: "",
															soldProductQuantity: 0,
															soldProductAmountCollected: 0,
															soldProductID: "",
															soldProductCategory:
																"",
														})
													}>
													+ Agregar Producto
												</button>
											</div>
										)}
									</FieldArray>
								</div>
							</div>
							<Grid
								numItemsMd={2}
								numItems={1}
								className='gap-2'>
								{ButtonCloseForm}
								<Button
									type='submit'
									color='indigo'
									size='sm'>
									{isSaleToEdit ? "Actualizar" : "Registrar"}
								</Button>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}
