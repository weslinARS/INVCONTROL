import { createColumnHelper } from "@tanstack/react-table";
import {getTotal1level} from '../../utilities/statFunctions.utilities'
import { BsAsterisk } from "react-icons/bs";
import dayjs from 'dayjs';
import {DeleteSaleBtn} from './DeleteSaleBtn.component'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../../src/components/ui/dropdown-menu";
import {ViewSaleButton} from './ViewSaleButton.component'
import {EditProductButton} from './EditSaleButton.component'
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
	saleProducts: Array <SoldProduct>;
};
const columHelper = createColumnHelper<Sale>();

export const columns = [
	columHelper.accessor("saleDate", {
		header: "Fecha de venta",
		cell: ({ row }) => {
      const date = dayjs(row.original.saleDate).format('DD/MM/YYYY');
			return (
				<span>
					{date} 
				</span>
			);
		},
	}),
	columHelper.accessor("saleAmountCollected", {
		header: "Monto recolectado",
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue("saleAmountCollected"));
			const formatter = new Intl.NumberFormat("es-NI", {
				style: "currency",
				currency: "NIO",
			});
			return <span>{formatter.format(amount)}</span>;
		},
	}),
	columHelper.accessor("saleProducts", {
		header: "Cant. productos vendidos",
		cell: ({ row }) => {
			const cantSold = getTotal1level(row.original.saleProducts, 'soldProductQuantity');
			return <span>{cantSold}</span>;
		},
	}),
  columHelper.display( {
		id: 'actions',
    header : 'Acciones',
    cell: ({row}) => {
      const sale = row.original
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
              {dayjs(row.original.saleDate).format('DD/MM/YYYY')} 
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <ViewSaleButton saleInfo={sale}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DeleteSaleBtn id={sale._id}/>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditProductButton saleInfo={sale}/>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )
    }
  })
];
