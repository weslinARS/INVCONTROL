import { BsFillPenFill } from "react-icons/bs";
import { useStore } from "../../Contexts/Store.context";
type SoldProduct = {
	_id: string;
	soldProductName: string;
	soldProductId: string;
	soldProductQuantity: number;
	soldProductAmountCollected: number;
};
type Sale = {
	_id: string;
	saleDate: Date;
	saleSellerId: string;
	saleAmountCollected: number;
	saleProducts: Array<SoldProduct>;
};
interface IProps {
  saleInfo: Sale;
}
export function EditProductButton({saleInfo}: IProps) {
  const {setIsSaleToEdit,setSaleToEdit,isSaleToEdit} = useStore();
  return (<span
  className='dropDownItem hover:cursor-pointer'
  onClick={() => {
    setSaleToEdit({...saleInfo});
    setIsSaleToEdit(!isSaleToEdit);
  }}>
  <BsFillPenFill />
  &nbsp;
  Editar
</span>)
}
