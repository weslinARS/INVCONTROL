import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@tremor/react";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { HiCurrencyDollar } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";
import { useCashRegister } from "../../hooks/useCashRegister.hook";
import { NumberField } from "../InputsComponent";
export function CashRegisterForm() {
	const MySwal = withReactContent(Swal);
	const { AddCashRegister, CloseCashRegister } = useCashRegister();
	const isCashRegisterOpen = useSelector(
		(state: RootState) => state.CashRegister.isCashRegisterOpen
	);
	const isCashRegisterClosed = useSelector(
		(state: RootState) => state.CashRegister.isCashRegisterClosed
	);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	function closeModal() {
		setIsOpen(false);
	}
	function openModal() {
		setIsOpen(true);
	}
	function closeCashRegister() {
		MySwal.fire({
			title: "Realizar cierre de caja",
			icon: "warning",
			text: "¿Estas seguro de realizar el cierre de caja?, se procedera con el guardado definitivo del monto final de la caja y se cerrara la caja del dia.",
			showCancelButton: true,
			confirmButtonText: "Realizar cierre de caja",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.isConfirmed) {
				CloseCashRegister();
			}
		});
	}
	return (
		<>
			<Button
				onClick={isCashRegisterOpen ? closeCashRegister : openModal}
				color={`${isCashRegisterOpen ? "red" : "indigo"}`}
				className={`${isCashRegisterClosed ? 'btn-disabled' : ''}`}
				icon={HiCurrencyDollar}>
				{isCashRegisterClosed
					? "Caja Cerrada"
					: !isCashRegisterOpen
					? "Ingresar Monto de inicio"
					: "Realizar Corte"}
			</Button>
			<Transition
				appear
				show={isOpen}
				as={Fragment}>
				<Dialog
					as='div'
					className='relative z-10'
					onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>
					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-center p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'>
								<Dialog.Panel className='modal-box'>
									<Dialog.Title
										as='h3'
										className='text-lg font-medium leading-6 text-gray-900'>
										Payment successful
									</Dialog.Title>
									<div className='mt-2'>
										<Formik
											initialValues={{
												startingAmount: 0,
											}}
											validationSchema={Yup.object({
												startingAmount: Yup.number()
													.positive(
														"el monto debe ser un numero positivo"
													)
													.required(
														"El monto de inicio es requerido"
													),
											})}
											onSubmit={(values, actions) => {
												AddCashRegister(values);
												actions.resetForm();
												closeModal();
											}}>
											{({ values }) => (
												<Form method='dialog'>
													<div className='flex flex-col items-start gap-4'>
														<span>
															Ingrese el monto de
															inicio que se
															encuentra en caja.
														</span>
														<NumberField
															fieldName='startingAmount'
															label='Monto de inicio'
															inputIcon={
																<HiCurrencyDollar />
															}
															placeHolder='Monto de inicio'
															value={
																values.startingAmount
															}
														/>
														<Button
															color='indigo'
															size='md'
															type='submit'>
															Iniciar Dia
														</Button>
													</div>
												</Form>
											)}
										</Formik>
									</div>
									<div className='mt-4'>
										<Button
											type='button'
											color='red'
											onClick={closeModal}>
											Cancelar
										</Button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
