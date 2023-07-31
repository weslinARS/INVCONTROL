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
import { DeleteOrderBtn } from "./DeleteOrderBtn.component";
import { ViewOrderButton } from "./ViewOrderBtn.component";
import { EditOrderButton } from "./EditOrderBtn.component";
import dayjs from "dayjs";

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

const columHelper = createColumnHelper<Order>();

export const columns = [
  columHelper.accessor("orderDate", {
    header: "Fecha de pedido",
    cell: ({ row }) => {
      return (
        <span>
          {dayjs(row.original.orderDate).format("DD/MM/YYYY")}
        </span>
      );
    },
  }),
  columHelper.accessor("orderDeliveryDate", {
    header: "Fecha de entrega",
    cell: ({ row }) => {
      return (
        <span>
          {dayjs(row.original.orderDeliveryDate).format("DD/MM/YYYY")} 
        </span>
      );
    },
  }),
  columHelper.accessor("orderTotalOrderedProducts", {
    header: "Productos ordenados",
    cell: ({ row }) => {
      return (
        <span>
          {row.original.orderTotalOrderedProducts} 
        </span>
      );
    },
  }),
  columHelper.accessor("orderTotalPrice", {
    header: "Precio total",
    cell: ({ row }) => {
      return (
        <span>
          C${row.original.orderTotalPrice} 
        </span>
      );
    },
  }),
  columHelper.display( {
		id: 'actions',
    header : 'Acciones',
    cell: ({row}) => {
      const order = row.original
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
              {dayjs(order.orderDate).format("DD/MM/YYYY")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <DeleteOrderBtn orderId={order._id} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <EditOrderButton orderInfo={order} />
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ViewOrderButton orderInfo={order} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      )
    }
  })
]