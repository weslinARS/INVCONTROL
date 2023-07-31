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
import {DeleteSupplierBtn} from './DeleteSupplierBtn.component'
import { ViewSupplierButton } from "./ViewSupplierBtn.component";
import { EditSupplierButton } from "./EditSupplierBtn.component";
type Supplier = {
	_id: string;
	supplierName: string;
	supplierPhoneNumbers: string[];
	supplierEmail: string[];
	supplierAddress: string;
};

const columHelper = createColumnHelper<Supplier>();

export const columns = [
	columHelper.accessor("supplierName", {
		header: "Nombre",
		cell: ({ row }) => {
			return <span>{row.original.supplierName}</span>;
		},
	}),
	columHelper.accessor("supplierAddress", {
		header: "Dirección",
		cell: ({ row }) => {
			return <span>{row.original.supplierAddress}</span>;
		},
	}),
	columHelper.accessor("supplierPhoneNumbers", {
		header: "Teléfono",
		cell: ({ row }) => {
			const cant = row.original.supplierPhoneNumbers.length;
			return (
				<span>
					{row.original.supplierPhoneNumbers[0]}{" "}
					{cant > 1 && (
						<span className='rounded-full bg-indigo-500 p-1 text-indigo-100'>
							+{cant - 1}
						</span>
					)}
				</span>
			);
		},
	}),
  columHelper.accessor("supplierEmail", {
    header: "Email",
    cell: ({ row }) => {
      const cant = row.original.supplierEmail.length;
      return (
        <span>
          {row.original.supplierEmail[0]}{" "}
          {cant > 1 && (
            <span className='rounded-full bg-indigo-500 p-1 text-indigo-100'>
              +{cant - 1}
            </span>
          )}
        </span>
      );
    },
  }),
  columHelper.display( {
		id: 'actions',
    header : 'Acciones',
    cell: ({row}) => {
      const supplier = row.original
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
              nombre
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ViewSupplierButton supplierInfo={supplier}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteSupplierBtn id={supplier._id}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <EditSupplierButton supplierInfo={supplier}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )
    }
  })
];
