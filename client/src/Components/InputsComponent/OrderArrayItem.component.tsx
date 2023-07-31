/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Flex, Text } from "@tremor/react";
import { useFormikContext } from "formik";
import { useEffect, useMemo, useState } from "react";
import { HiTag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { GetObjectFromArray } from "../../utilities/GetObjectFromArray.utilities";
import { filterObjectArray } from "../../utilities/filterObjectArray.utilities";
import { BasicSelectField, NumberField, TextField } from "./";
import { BsCheckLg } from "react-icons/bs";
interface Props {
	remove: any;
	index: number;
	values: any;
}
type OrderProduct = {
	orderedProductName: string;
	orderedProductQuantity: number;
	orderedProductId: string;
	orderedProductPrice: number;
	orderedProductCategory: string;
};
type FormField = {
	orderDate: Date;
	orderDeliveryDate: Date;
	orderProducts: OrderProduct[];
};
interface DepFieldProps {
	index: number;
	fieldName: string;
	value: string;
	productMemo: any[];
}
export function DepField({
	index,
	fieldName,
	value,
	productMemo,
}: DepFieldProps) {
	const { values, setFieldValue } = useFormikContext<FormField>();
	useEffect(() => {
		if (values.orderProducts[index].orderedProductName != "") {
			const product = GetObjectFromArray(
				productMemo,
				"productName",
				values.orderProducts[index].orderedProductName
			);
			setFieldValue(
				`orderProducts[${index}].orderedProductId`,
				product._id
			);
		}
	}, [values.orderProducts[index].orderedProductName]);
	return (
		<TextField
			placeHolder='Id del producto'
			fieldName={fieldName}
			label='Id del producto'
			value={value}
			readonly={true}
			inputIcon={<HiTag />}
		/>
	);
}
export default function OrderArrayItem({ remove, index, values }: Props) {
	const products = useSelector((state: RootState) => state.Products.products);
	const productMemo = useMemo(() => products, [products]);
	const categories = useSelector(
		(state: RootState) => state.Products.CategoryList
	);
	const categoryMemo = useMemo(() => categories, [categories]);
	const [isEditingItem, setIsEditingItem] = useState(true);
	return (
		isEditingItem ? (
			<Card className='mt-2'>
        <Flex>
          <Text className=''>Producto {index + 1}</Text>
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
        </Flex>
				<div>
					<BasicSelectField
						Label='Categoria del producto'
						LabelOption='categoryName'
						List={categoryMemo}
						fieldName={`orderProducts.${index}.orderedProductCategory`}
						value={
							values.orderProducts[index].orderedProductCategory
						}
					/>
					{values.orderProducts[index].orderedProductCategory !=
						"" && (
						<>
							{" "}
							<BasicSelectField
								Label='Producto Ordenado'
								LabelOption='productName'
								List={filterObjectArray(
									productMemo,
									"productCategory",
									values.orderProducts[index]
										.orderedProductCategory
								)}
								fieldName={`orderProducts.${index}.orderedProductName`}
								value={
									values.orderProducts[index]
										.orderedProductName
								}
							/>
							<DepField
								fieldName={`orderProducts.${index}.orderedProductId`}
								index={index}
								productMemo={productMemo}
								value={
									values.orderProducts[index].orderedProductId
								}
							/>
							<NumberField
								fieldName={`orderProducts.${index}.orderedProductQuantity`}
								inputIcon={<HiTag />}
								label='Cantidad ordenada'
								placeHolder='12'
								value={
									values.orderProducts[index]
										.orderedProductQuantity
								}
							/>
							<NumberField
								fieldName={`orderProducts.${index}.orderedProductPrice`}
								inputIcon={<HiTag />}
								label='Precio del producto'
								placeHolder='12'
								value={
									values.orderProducts[index]
										.orderedProductPrice
								}
							/>
						</>
					)}
				</div>
			</Card>
		):          <div
    className='group relative m-2 flex flex-row  items-center justify-start gap-x-4 rounded-full bg-neutral-100 px-4 py-1 transition-colors hover:cursor-pointer hover:bg-neutral'
    onClick={() =>
      setIsEditingItem((isEditingItem) => !isEditingItem)
    }>
    {values.orderProducts[index].orderedProductName != "" ? (
      <>
        <span className='font-semibold text-neutral-800 group-hover:text-white'>
          {values.orderProducts[index].orderedProductName}
        </span>
        <span className='font-bold text-neutral group-hover:text-white'>
          {values.orderProducts[index].orderedProductQuantity}
        </span>
      </>
    ) : (
      <span className='font-bold group-hover:text-white'>
        info no disponible (llene los campos)
      </span>
    )}
  </div>
	);
}
