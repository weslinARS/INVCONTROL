import { BsFillPenFill } from "react-icons/bs";
import { useStore } from "../../Contexts/Store.context";

type Supplier = {
	_id: string;
	supplierName: string;
	supplierPhoneNumbers: string[];
	supplierEmail: string[];
	supplierAddress: string;
};

interface IProps {
	supplierInfo: Supplier;
}
export function EditSupplierButton({ supplierInfo }: IProps) {
	const {
		setSupplierToEdit,
		isSupplierToEdit,
		setIsSupplierToEdit,
		supplierToEdit,
	} = useStore();
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => {
				setSupplierToEdit({ ...supplierInfo });
				setIsSupplierToEdit(!isSupplierToEdit);
			}}>
			<BsFillPenFill />
			&nbsp; Editar
		</span>
	);
}
