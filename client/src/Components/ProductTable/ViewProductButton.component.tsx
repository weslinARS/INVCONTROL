import { BsEyeFill } from "react-icons/bs";
import { IProduct } from "../../interfaces/IProduct.interface";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BsFillBoxFill } from "react-icons/bs";
interface IProps {
	productInfo: IProduct;
}
export function ViewProductButton({ productInfo }: IProps) {
	const mySwal = withReactContent(Swal);
	const handleView = (product: IProduct) => {
		mySwal.fire({
			title: (
				<div className=' prose flex flex-row content-center items-start justify-center gap-x-3 text-2xl font-bold'>
					<BsFillBoxFill />
					<span className='text-2xl'>Descripción del producto</span>
				</div>
			),
			html: (
				<div>
					<div className='prose flex flex-col items-start'>
						<span>
							{" "}
							<span className='font-bold text-primary'>
								Nombre del producto:
							</span>{" "}
							{product.productName}
						</span>
						<span>
							<span className='font-bold text-primary'>
								Descripcion del producto:
							</span>{" "}
							{product.productDescription}
						</span>
						<span>
							<span className='font-bold text-primary'>
								Precio del producto:
							</span>
							C$ {product.productPrice}
						</span>
						<span>
							<span className='font-bold text-primary'>
								Cantidad del producto:
							</span>
							{product.productStock}
						</span>
					</div>
				</div>
			),
		});
	};
	return (
		<>
			<span
				className='dropDownItem hover:cursor-pointer'
				onClick={() => handleView(productInfo)}>
				<BsEyeFill />
				&nbsp; Ver
			</span>
		</>
	);
}
