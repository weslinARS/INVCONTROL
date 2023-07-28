import { Field, ErrorMessage } from "formik";

interface ISelectProps {
	List: Array<object>;
	fieldName: string;
	Label: string;
	LabelOption: string;
	size?: string;
	readonly?: boolean;
	value: string;
}


export function BasicSelectField({fieldName, Label,LabelOption,List, value,readonly}: ISelectProps) {
	return (
		<div className='form-control'>
			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<label
						className='label-text'
						htmlFor={`${fieldName}`}>
						{Label}
					</label>
				</label>
				<Field
					name={fieldName}
					as='select'
					className={`select-bordered select w-full sm:select-sm md:select-md sm:max-w-xs md:max-w-md ${readonly && 'disabled'}`}
					value= {value}
					defaultValue={""}
					>
					<option
						value=''
						disabled={true}>
						{Label}
					</option>
					{List?.map((option) => (
						<option
							key={option["_id" as keyof object]}
							value={option[LabelOption as keyof object]}>
							{option[LabelOption as keyof object]}
						</option>
					))}
				</Field>
			</div>
			<ErrorMessage
				name={fieldName}
				component={"p"}
				className='font-semibold text-error text-sm'
			/>
		</div>
	);
}
