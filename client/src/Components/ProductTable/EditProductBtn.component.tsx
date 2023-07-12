import { BsFillPencilFill } from "react-icons/bs";
import { IProduct } from "../../interfaces/IProduct.interface";
import { useStore } from "../../Contexts/Store.context";
export interface IProps {
	product: IProduct;
}
export function EditProductBtn({ product }: IProps) {
	const { setProductToEdit ,setIsProductToEdit,isProductToEdit} = useStore();
	return (
		<>
			<span
				className='dropDownItem hover:cursor-pointer'
				onClick={() => {
					setProductToEdit({ ...product });
          setIsProductToEdit(!isProductToEdit);
				}}>
				<BsFillPencilFill />
				&nbsp;
				Editar
			</span>
		</>
	);
}
