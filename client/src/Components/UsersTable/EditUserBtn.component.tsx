import { BsFillPenFill } from "react-icons/bs";
import { useStore } from "../../Contexts/Store.context";

type UserInfo = {
  userName : string,
  userLastName: string,
  userRole : string,
  userEmail : string,
  _id : string,
  userId : string
};

interface IProps {
	UserInfo: UserInfo;
}
export function EditUserBtn({ UserInfo}: IProps) {
	const {
    setUserToEdit,
    isUserToEdit,
    setIsUserToEdit,
	} = useStore();
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => {
				setUserToEdit({...UserInfo});
				setIsUserToEdit(!isUserToEdit);
			}}>
			<BsFillPenFill />
			&nbsp; Editar
		</span>
	);
}
