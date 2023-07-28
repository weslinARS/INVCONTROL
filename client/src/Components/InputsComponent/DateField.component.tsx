import { Field, ErrorMessage } from "formik";
import {BsFillCalendarWeekFill} from 'react-icons/bs';
interface DateFieldProps {
	label: string;
	fieldName: string;
  value: Date;
	readonly?: boolean;
}
export function DateField({label,fieldName,value,readonly} : DateFieldProps) {
	return (
		<div>
			<div className='form-control'>
				<div className='form-control'>
					<label className='label'>
						<span className='label-text'>{label}</span>
					</label>
					<label className='input-group'>
						<span className="bg-dark-900 font-semibold text-slate-50"><BsFillCalendarWeekFill/></span>
						<Field
							type='date'
							className={`input-bordered input input-sm input-group-sm md:input-group-md md:input-md sm:max-w-xs md:max-w-md ${readonly && 'disabled'} `}
              name={fieldName}
              value={value}
						/>
					</label>
				</div>
				<ErrorMessage
					name={fieldName}
					component={"span"}
					className='text-sm font-semibold text-error'
				/>
			</div>
		</div>
	);
}
