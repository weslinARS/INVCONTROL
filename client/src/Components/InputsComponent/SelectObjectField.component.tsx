import { ErrorMessage, Field } from "formik";
interface SelectProps {
	ObjectArray: Array<object>;
	ObjectIdNameKey: string;
	label: string;
	fieldName: string;
	value: string;
}
export function SelectObjectField(props: SelectProps) {
	return (
		<div className='form-control'>
			<div className='form-control w-full max-w-xs'>
				<label className='label'>
					<label htmlFor={`${props.fieldName}`}>{props.label}</label>
				</label>
				<Field
					id=''
					as='select'
					name={props.fieldName}
					className='select-bordered select w-full sm:select-sm md:select-md sm:max-w-xs md:max-w-md '
					value={props.value}
					defaultValue={""}
					>
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
			</div>
			<ErrorMessage
				name={props.fieldName}
				component={"span"}
				className='text-sm font-semibold text-error'
			/>
		</div>
	);
}
