import { Field, ErrorMessage } from "formik";
interface ITextInputProps {
	label: string;
	placeHolder: string;
	fieldName: string;
	inputIcon: JSX.Element;
	value: string;
	type ? : string; 
}
export function TextField(props: ITextInputProps) {
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
						type={props?.type ?  props.type : 'text'}
						name={props.fieldName}
						placeholder={props.placeHolder}
						className='input-bordered input  sm:input-group-sm  lg:input-md sm:max-w-xs md:max-w-md'
						value={props.value}
					/>
				</label>
			</div>
			<div className='form-control'>
				<label className='label'>
					<span className='label-text'></span>
				</label>
				<label className='input-group'>


				</label>
			</div>
			<ErrorMessage
				name={props.fieldName}
				component={"span"}
				className='font-semibold text-error text-sm'
			/>
		</div>
	);
}
