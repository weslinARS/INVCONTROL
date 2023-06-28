import { Card } from "./Card/Card.component";
import { BsArrowRight, BsFillStarFill } from "react-icons/bs";
export function CardList() {
	return (
		<div className='px-4 w-full '>
			<h1 className='mb-4 inline-flex text-2xl uppercase'>
				<BsFillStarFill /> &nbsp; Resumen del dia
			</h1>
			<div className="sm:bg-indigo-500 md:bg-transparent md:flex md:flex-row  w-[100%]  justify-evenly">
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Productos Vendidos'
					value={20}
				></Card>
                <div className="divider divider-horizontal"></div>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Monto Recaudado'
					value={20}
				></Card>
                <div className="divider divider-horizontal"></div>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Ordenes Realizadas'
					value={20}
				></Card>
                <div className="divider divider-horizontal"></div>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Ventas Registradas'
					value={20}
				></Card>
			</div>
		</div>
	);
}
