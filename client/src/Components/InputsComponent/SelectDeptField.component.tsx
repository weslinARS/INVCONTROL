/* eslint-disable react-hooks/exhaustive-deps */
import { SelectObjectField } from "./SelectObjectField.component";
import { useFormikContext, Field,ErrorMessage} from "formik";
import { useEffect, useState } from "react";
import { filterObjectArray } from "../../utilities/filterObjectArray.utilities";
import { IProduct } from "../../interfaces/IProduct.interface";
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
interface SelectDepFieldProps {
	index: number;
	fieldName: string;
	value: string;
	label: string;
	ObjectArray: any[];
  ObjectIdNameKey: string;
}
export function SelectDepField(props: SelectDepFieldProps) {
	const { values } = useFormikContext<FormFields>();
	const [filterArray, setfilterArray] = useState<IProduct[]>([]);
	useEffect(() => {
    console.log('cambio')
		if (values.saleProducts[props.index].soldProductCategory != "") {
			const filterArray = filterObjectArray(
				props.ObjectArray,
				"productCategory",
				values.saleProducts[props.index].soldProductCategory
			);
      console.log(filterArray)
			setfilterArray(filterArray);
		}
	}, [values.saleProducts[props.index].soldProductCategory]);
	return (
		<div className={`form-control `}>
			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<label htmlFor={`${props.fieldName}`}>{props.label}</label>
				</label>
				<Field
					id=''
					as='select'
					name={props.fieldName}
					className={`select-bordered select w-full sm:select-sm md:select-md sm:max-w-xs md:max-w-md `}
          disabled = {values.saleProducts[props.index].soldProductCategory == "" ?true:false}
					value={props.value}
					defaultValue={""}
          >
					<option
						value=''
						disabled={true}>
						{props.label}
					</option>
					{filterArray.map((object: object) => {
						return (
							<option
								value={object["_id" as keyof object]}
								key={object["_id" as keyof object]}>
								{object[props.ObjectIdNameKey as keyof object]}
							</option>
						);
					})}
				</Field>
			</div>
			<ErrorMessage
				name={props.fieldName}
				component={"span"}
				className='text-sm font-semibold text-error'
			/>
		</div>
	);
}
