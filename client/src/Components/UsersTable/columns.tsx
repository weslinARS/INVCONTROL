import { createColumnHelper } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import { BsAsterisk } from "react-icons/bs";
import { DeleteUserBtn } from "./DeleteUserBtn.component";
import { EditUserBtn } from "./EditUserBtn.component";
type UserInfo = {
  userName : string,
  userLastName: string,
  userRole : string,
  userEmail : string,
  _id : string,
  userId : string
};

const columHelper = createColumnHelper<UserInfo>();

export const columns = [
  columHelper.accessor("userName", {
    header: "Nombre",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.userName} 
        </span>
      );
    },
  }),
  columHelper.accessor("userLastName", {
    header: "Apellido",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.userLastName} 
        </span>
      );
    },
  }),
  columHelper.accessor("userRole", {
    header: "Rol",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.userRole} 
        </span>
      );
    },
  }),
  columHelper.accessor("userEmail", {
    header: "Correo electrónico",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.userEmail} 
        </span>
      );
    },
  }),
  columHelper.display( {
		id: 'actions',
    header : 'Acciones',
    cell: ({row}) => {
      const userinfo = row.original
      return(
        <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className='btn-neutral btn-sm btn hover:cursor-pointer'>
              <BsAsterisk />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              {userinfo.userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteUserBtn id={userinfo.userId} email={userinfo.userEmail} _id={userinfo._id}/>  
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditUserBtn UserInfo={userinfo}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )
    }
  })
]