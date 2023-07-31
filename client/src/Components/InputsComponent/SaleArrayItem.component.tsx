/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import {
	BsCheckLg,
	BsEyeFill,
	BsFillBagFill,
	BsFillCalculatorFill,
} from "react-icons/bs";
import { GetObjectFromArray } from "../../utilities/GetObjectFromArray.utilities";
import { filterObjectArray } from "../../utilities/filterObjectArray.utilities";
import {
	BasicSelectField,
	NumberField,
	SelectObjectField,
} from "../InputsComponent";
import { Card } from "@tremor/react";
type FormFields = {
	saleDate: Date;
	saleProducts: {
		soldProductName: string;
		soldProductQuantity: number;
		soldProductAmountCollected: number;
		soldProductId: string;
		soldProductCategory: string;
	}[];
};
interface depFieldProps {
	index: number;
	fieldName: string;
	value: number;
	inputIcon: JSX.Element;
	label: string;
	placeHolder: string;
	Array: any[];
}
export function DepField(props: depFieldProps) {
	const { values, setFieldValue, setFieldError } = useFormikContext<FormFields>();
	useEffect(() => {
		if (
			values.saleProducts[props.index].soldProductId != "" &&
			values.saleProducts[props.index].soldProductQuantity != 0
		) {
			const object = GetObjectFromArray(
				props.Array,
				"_id",
				values.saleProducts[props.index].soldProductId
			);
			if(values.saleProducts[props.index].soldProductQuantity  > object.productStock){
				setFieldError(`saleProducts.${props.index}.soldProductQuantity`,"La cantidad supera el stock");
			}
			const Amount =
				object.productPrice *
				values.saleProducts[props.index].soldProductQuantity;
			setFieldValue(
				`saleProducts[${props.index}].soldProductAmountCollected`,
				Amount
			);
			setFieldValue(
				`saleProducts[${props.index}].soldProductName`,
				object.productName
			);
		}
	}, [
		values.saleProducts[props.index].soldProductName,
		values.saleProducts[props.index].soldProductQuantity,
	]);
	return (
		<NumberField
			placeHolder={props.placeHolder}
			fieldName={props.fieldName}
			label={props.label}
			inputIcon={props.inputIcon}
			value={values.saleProducts[props.index].soldProductAmountCollected}
			readonly={true}
		/>
	);
}

type SaleArrayItemProps = {
	productInfo: any;
	remove: any;
	products: any;
	index: number;
	CategoriesMemo: any;
	ProductsMemo: any;
	values: any;
};
export function SaleArrayItem({
	productInfo,
	remove,
	index,
	products,
	CategoriesMemo,
	values,
	ProductsMemo,
}: SaleArrayItemProps) {
	const [isEditingItem, setIsEditingItem] = useState(true);
	return (
		<div>
			{isEditingItem ? (
					<Card
						key={products.soldProductId}
						className='flex flex-row items-start  my-2'>
						<div
							className='py-2'
							key={index}>
							<BasicSelectField
								Label='Categoria del producto'
								LabelOption='categoryName'
								List={CategoriesMemo}
								fieldName={`saleProducts.${index}.soldProductCategory`}
								value={values.saleProducts[index].soldProductCategory}
							/>
							{values.saleProducts[index].soldProductCategory !=
								"" && (
								<SelectObjectField
									label='Producto Vendido'
									ObjectIdNameKey='productName'
									ObjectArray={filterObjectArray(
										ProductsMemo,
										"productCategory",
										values.saleProducts[index]
											.soldProductCategory
									)}
									fieldName={`saleProducts.${index}.soldProductId`}
									value={values.saleProducts[index].soldProductId}
								/>
							)}
							<div className=''>
								<NumberField
									fieldName={`saleProducts[${index}].soldProductQuantity`}
									label='Cantidad vendida'
									placeHolder='12'
									inputIcon={<BsFillBagFill />}
									value={
										values.saleProducts[index].soldProductQuantity
									}
								/>
								<DepField
									Array={ProductsMemo}
									fieldName={`saleProducts.${index}.soldProductAmountCollected`}
									index={index}
									inputIcon={<BsFillCalculatorFill />}
									label='Monto recaudado'
									placeHolder='C$ 0.00'
									value={
										values.saleProducts[index]
											.soldProductAmountCollected
									}
								/>
							</div>
						</div>
						<div className=' flex w-fit flex-row items-center justify-center rounded-full bg-neutral  p-2 gap-x-2'>
							<button
								className='btn-error btn-xs btn-circle flex items-center justify-center text-xl font-bold'
								type='button'
								onClick={() => remove(index)}>
								-
							</button>
							<button
								className='btn-xs btn-circle flex items-center justify-center bg-lime-600 text-xl font-bold text-white'
								type='button'
								onClick={() =>
									setIsEditingItem(
										(isEditingItem) => !isEditingItem
									)
								}>
								<BsCheckLg />
							</button>
						</div>
					</Card>
			) : (
				<div
					className='group relative m-2 flex flex-row  items-center justify-start gap-x-4 rounded-full bg-neutral-100 px-4 py-1 transition-colors hover:cursor-pointer hover:bg-neutral'
					onClick={() =>
						setIsEditingItem((isEditingItem) => !isEditingItem)
					}>
					{productInfo.soldProductName != "" ? (
						<>
							<span className='font-semibold text-neutral-800 group-hover:text-white'>
								{productInfo.soldProductName}
							</span>
							<span className='font-bold text-neutral group-hover:text-white'>
								C$ {productInfo.soldProductQuantity}
							</span>
							<span className='absolute right-4 hidden text-2xl text-white group-hover:block'>
								<BsEyeFill />
							</span>
						</>
					) : (
						<span className='font-bold group-hover:text-white'>
							info no disponible (llene los campos)
						</span>
					)}
				</div>
			)}
		</div>
	);
}
