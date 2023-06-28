import React from "react";
import { Field, ErrorMessage } from "formik";
interface SelectProps {
	ObjectArray: Array<object>;
	ObjectIdNameKey: string;
	label: string;
	fieldName: string;
}
export function SelectObjectField(props: SelectProps) {
	return (
		<div className='form-control'>
			<label htmlFor={`${props.fieldName}`}>{props.label}</label>
			<Field
				id=''
				as='select'
				name={props.fieldName}
				className='select-bordered select sm:select-sm md:select-md w-full sm:max-w-xs md:max-w-md '>
				<option
					value=''
					disabled={true}>
					{props.label}
				</option>
				{props.ObjectArray.map((object: object) => {
					return (
						<option
							value={object["_id" as keyof object]}
							key={object["_id" as keyof object]}>
							{object[props.ObjectIdNameKey as keyof object]}
						</option>
					);
				})}
			</Field>
			<ErrorMessage
				name={props.fieldName}
				component={"p"}
				className='font-semibold text-error'
			/>
		</div>
	);
}
