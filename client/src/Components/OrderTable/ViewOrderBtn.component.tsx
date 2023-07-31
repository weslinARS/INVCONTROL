import dayjs from "dayjs";
import { BsEyeFill } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
export function ViewOrderButton({ orderInfo }: IProps) {
	const mySwal = withReactContent(Swal);
	const handleView = (order: Order) => {
		mySwal.fire({
			title: (
				<div className=' prose flex flex-row content-center items-start justify-center gap-x-3 text-2xl font-bold'>
					<HiShoppingCart />
					<span className='text-2xl'>Descripción del producto</span>
				</div>
			),
			html: (
				<div>
					<div className='prose flex flex-col items-start justify-start'>
						<div className='flex flex-col items-start'>
							<span className='font-bold text-primary'>
								Fecha de pedido:
							</span>
							{dayjs(order.orderDate).format("DD/MM/YYYY")}
						</div>
						<div className='flex flex-col items-start'>
							<span className='font-bold text-primary'>
								Fecha de entrega de pedido:
							</span>
							{dayjs(order.orderDeliveryDate).format(
								"DD/MM/YYYY"
							)}
						</div>
						<div className='flex flex-col items-start'>
							<span className='font-bold text-primary'>
								Cantidad de productos:
							</span>
							{order.orderTotalOrderedProducts}
						</div>
            <div className='flex flex-col items-start'>
              <span className='font-bold text-primary'>
                Precio total:
              </span>
              {order.orderTotalPrice} C$
              </div>
              {
                //tabla con los productos ordenados y sus datos
              }
            <div className='flex flex-col items-start'>
              <span className='font-bold text-primary'>
                Productos:
              </span>
              <table className="table ">
                <thead >
                  <tr className="p-2">
                    <th className="text-white">Nombre</th>
                    <th className="text-white">Cantidad</th>
                    <th className="text-white">Precio</th>
                    <th className="text-white">Categoría</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderProducts.map((product) => (
                    <tr>
                      <td>{product.orderedProductName}</td>
                      <td>{product.orderedProductQuantity } unidades</td>
                      <td>{product.orderedProductPrice} C$</td>
                      <td>{product.orderedProductCategory}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
					</div>
				</div>
			),
		});
	};
	return (
		<span
			className='dropDownItem hover:cursor-pointer'
			onClick={() => handleView(orderInfo)}>
			<BsEyeFill />
			&nbsp; Ver
		</span>
	);
}
