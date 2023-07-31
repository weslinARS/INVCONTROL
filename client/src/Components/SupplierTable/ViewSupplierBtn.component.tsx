import { BsEyeFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
export function ViewSupplierButton({ supplierInfo }: IProps) {
	const mySwal = withReactContent(Swal);
	const handleView = (supplier: Supplier) => {
		mySwal.fire({
			title: (
				<div className=' prose flex flex-row content-center items-start justify-center gap-x-3 text-2xl font-bold'>
					<HiShoppingCart />
					<span className='text-2xl'>Descripción del producto</span>
				</div>
			),
			html: (
				<div>
					<div className='prose flex flex-col items-start justify-start'>
						<div className="flex flex-col items-start">
							<span className='font-bold text-primary'>
								Nombre del proveedor:
							</span>
							{supplier.supplierName}
						</div>
						<div className="flex flex-col items-start">
							<span className='font-bold text-primary'>
								Dirección del proveedor:
							</span>
							{supplier.supplierAddress}
						</div>
						<div className="flex flex-col items-start">
							<span className='font-bold text-primary'>
								Correo electrónico:
							</span>
							<ul>
								{supplier.supplierEmail.map((email) => (
									<li>{email}</li>
								))}
							</ul>
						</div>
						<div className="flex flex-col items-start">
							<span className='font-bold text-primary'>
								Números de teléfono:
							</span>{" "}
							<ul>
								{supplier.supplierPhoneNumbers.map((phone) => (
									<li>{phone}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			),
		});
	};
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleView(supplierInfo)}>
			<BsEyeFill />
			&nbsp; Ver
		</span>
	);
}
