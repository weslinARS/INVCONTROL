import { Button, Card, Flex, Icon } from "@tremor/react";
import { useEffect, useMemo, useState } from "react";
import { HiPlusSm, HiUserGroup } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "src/Store/store";
import { UserForm } from "../../Components/FormsComponent/UserForm.component";
import { DataTable } from "../../Components/Table/data-table";
import { columns } from "../../Components/UsersTable/columns";
import { useStore } from "../../Contexts/Store.context";
import { uid } from "react-uid";
export function Users() {
	const users = useSelector((state: RootState) => state.Users.users);
	const usersMemo = useMemo(() => users, [users]);
	const {isUserToEdit, setIsUserToEdit, setUserToEdit} = useStore();
	useEffect(()=>{
		if(isUserToEdit === true){
			setisAddUserFormOpen(true);
		}
	},[isUserToEdit])
	const [isAddUserFormOpen, setisAddUserFormOpen] = useState<boolean>(false);
	return (
		<main className='p-4 '>
			<Flex
				alignItems='center'
				justifyContent='start'>
				<Icon
					size='xl'
					className='text-neutral-800'
					icon={HiUserGroup}></Icon>
				<span className='prose'>
					<h1 className='uppercase text-neutral-800'>Usuarios</h1>
				</span>
			</Flex>
			{!isAddUserFormOpen && (
				<Button
					icon={HiPlusSm}
					color='indigo'
					className='mt-2'
					onClick={() => setisAddUserFormOpen(true)}>
					Registar Usuario
				</Button>
			)}
			<Card className='mt-6 flex flex-col items-center'>
				{isAddUserFormOpen || isUserToEdit ? (
					<UserForm
						formSatusFn={setisAddUserFormOpen}
						isFormOpen={isAddUserFormOpen}
					/>
				):''}
				{!isAddUserFormOpen && !isUserToEdit ?(
					<DataTable
						columns={columns}
						data={usersMemo}
						key={uid(usersMemo)}
					/>
				):''}
			</Card>
		</main>
	);
}
