import { Button, Card, Divider, Grid, Text, Title } from "@tremor/react";
import dayjs from "dayjs";
import { FieldArray, Form, Formik } from "formik";
import { uid } from "react-uid";
import { useStore } from "../../Contexts/Store.context";
import { OrderSchema } from "../../Validators/Order.validator";
import { useOrders } from "../../hooks";
import { DateField } from "../InputsComponent";
import OrderArrayItem from "../InputsComponent/OrderArrayItem.component";
type OrderProduct = {
	orderedProductName: string;
	orderedProductQuantity: string;
	orderedProductId: string;
	orderedProductPrice: string;
	orderedProductCategory: string;
};
type Order = {
	orderDate: string;
	orderDeliveryDate: string;
	orderProducts: OrderProduct[];
};
interface Props {
	formSatusFn: any;
	isFormOpen: boolean;
}
export function OrderForm({ formSatusFn, isFormOpen }: Props) {
	const { isOrderToEdit, setIsOrderToEdit, orderToEdit, setOrderToEdit } =
		useStore();
	const initialValues = {
		orderDate: "",
		orderDeliveryDate: "",
		orderProducts: [
			{
				orderedProductName: "",
				orderedProductQuantity: "",
				orderedProductCategory: "",
				orderedProductId: "",
				orderedProductPrice: "",
			},
		],
	};
	const { CreateOrder, UpdateOrder } = useOrders();
	const handleSubmit = (values: Order) => {
		const orderDate = dayjs(values.orderDate)
			.locale("es")
			.toDate()
			.toISOString();
		const orderDeliveryDate = dayjs(values.orderDeliveryDate)
			.locale("es")
			.toDate()
			.toISOString();
		const orderMan: Order = {
			orderDate,
			orderDeliveryDate,
			orderProducts: values.orderProducts,
		};
		if (isOrderToEdit) {
			UpdateOrder(orderMan, orderToEdit._id);
			setIsOrderToEdit(!isOrderToEdit);
			setOrderToEdit(undefined);
		} else CreateOrder(orderMan);
		formSatusFn(false);
	};
	return (
		<Card className='w-fit'>
			<Title>Registrar Orden</Title>
			<Text>Ingrese los datos de la orden</Text>
			<Formik
				validationSchema={OrderSchema}
				initialValues={
					isOrderToEdit
						? {
								orderDate: dayjs(orderToEdit.orderDate).format(
									"YYYY-MM-DD"
								),
								orderDeliveryDate: dayjs(
									orderToEdit.orderDeliveryDate
								).format("YYYY-MM-DD"),
								orderProducts: orderToEdit.orderProducts,
						}
						: initialValues
				}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}>
				{({ values, resetForm }) => (
					<Form>
						<DateField
							fieldName='orderDate'
							label='Fecha de Orden'
							value={values.orderDate}
						/>
						<DateField
							fieldName='orderDeliveryDate'
							label='Fecha de Entrega'
							value={values.orderDeliveryDate}
						/>
						<Divider />
						<Text>Lista de productos a ordenar</Text>
						<FieldArray name='orderProducts'>
							{({ push, remove }) => (
								<>
									<div>
										{values.orderProducts.length > 0 &&
											values.orderProducts.map(
												(orderProduct, index) => (
													<OrderArrayItem
														key={uid(orderProduct)}
														index={index}
														remove={remove}
														values={values}
													/>
												)
											)}
										<Button
											type='button'
											variant='secondary'
											className='mt-2'
											onClick={() =>
												push({
													orderedProductName: "",
													orderedProductQuantity: "",
													orderedProductCategory: "",
													orderedProductId: "",
													orderedProductPrice: "",
												})
											}>
											+ Agregar Producto
										</Button>
									</div>
								</>
							)}
						</FieldArray>
						<Grid
							numItems={1}
							numItemsMd={2}
							className='gap-2'>
							<Button
								type='submit'
								variant='primary'
								className='mt-2'
								color='indigo'>
								{isOrderToEdit ? "Editar Orden" : "Crear Orden"}
							</Button>
							<Button
								type='button'
								variant='secondary'
								className='mt-2'
								color='red'
								onClick={() => {
									if (isOrderToEdit) {
										setOrderToEdit(undefined);
										setIsOrderToEdit(false);
									}
									resetForm();
									formSatusFn(false);
								}}>
								Cancelar
							</Button>
						</Grid>
					</Form>
				)}
			</Formik>
		</Card>
	);
}
