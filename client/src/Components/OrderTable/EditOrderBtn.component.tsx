import { BsFillPenFill } from "react-icons/bs";
import { useStore } from "../../Contexts/Store.context";

type OrderProduct = {
	_id: string;
	orderedProductName: string;
	orderedProductQuantity: string;
	orderedProductId: string;
	orderedProductPrice: string;
	orderedProductCategory: string;
};
type Order = {
	_id: string;
	orderDate: string;
	orderDeliveryDate: string;
	orderTotalOrderedProducts: string;
	orderTotalPrice: number;
	orderProducts: OrderProduct[];
};
interface IProps {
	orderInfo: Order;
}
export function EditOrderButton({ orderInfo }: IProps) {
	const {
		isOrderToEdit,
		setIsOrderToEdit,
		setOrderToEdit
	} = useStore();
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => {
				setOrderToEdit({ ...orderInfo });
				setIsOrderToEdit(!isOrderToEdit);
			}}>
			<BsFillPenFill />
			&nbsp; Editar
		</span>
	);
}
