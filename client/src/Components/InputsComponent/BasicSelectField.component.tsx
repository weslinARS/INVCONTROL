import React from "react";
import { Field, ErrorMessage, useFormikContext } from "formik";

interface ISelectProps {
	List: Array<object>;
	fieldName: string;
	Label: string;
	LabelOption: string;
}
export function BasicSelectField(props: ISelectProps) {
	return (
		<div className='form-control'>
			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<label
						className='label-text'
						htmlFor={`${props.fieldName}`}>
						{props.Label}
					</label>
				</label>
				<Field
					name={props.fieldName}
					as='select'
					className='select-bordered select w-full sm:select-sm md:select-md sm:max-w-xs md:max-w-md'>
					<option
						value=''
						disabled={true}>
						{props.Label}
					</option>
					{props.List?.map((option) => (
						<option
							key={option["_id" as keyof object]}
							value={option[props.LabelOption as keyof object]}>
							{option[props.LabelOption as keyof object]}
						</option>
					))}
				</Field>
			</div>
			<ErrorMessage
				name={props.fieldName}
				component={"p"}
				className='font-semibold text-error text-sm'
			/>
		</div>
	);
}
