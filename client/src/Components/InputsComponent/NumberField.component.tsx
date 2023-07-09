import { Field, ErrorMessage } from "formik";
interface IProps {
	fieldName: string;
	label: string;
	placeHolder: string;
	inputIcon: JSX.Element;
	value: number;
}
export function NumberField(props: IProps) {
	return (
		<div className='form-control'>
			<div className='form-control'>
				<label className='label'>
					<span className='label-text'>{props.label}</span>
				</label>
				<label className='input-group'>
				<span className='bg-dark-900 font-semibold text-slate-50'>
					{props.inputIcon}
				</span>
					<Field
						type='number'
						name={props.fieldName}
						placeholder={props.placeHolder}
						className='input-bordered input  sm:input-group-sm  lg:input-md sm:max-w-xs md:max-w-md'
						value={props.value}
					/>
				</label>
			</div>

			<label className='input-group'>

			</label>
			<ErrorMessage
				name={props.fieldName}
				component={"span"}
				className='text-sm font-semibold text-error'
			/>
		</div>
	);
}
