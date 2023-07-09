import { useEffect, useState } from "react";
import { Card } from "./Card/Card.component";
import { BsArrowRight, BsFillStarFill } from "react-icons/bs";

export function CardList() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);
	return (
		<div className='px-4'>
			<div
				className={`${
					windowWidth < 768
						? "carousel-center carousel rounded-box bg-slate-300 "
						: ""
				} md-flex-row min-w-[250px] max-w-[600px] space-x-4  p-4 md:flex md:w-[90vw]  md:justify-center`}>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Productos Vendidos'
					value={windowWidth}></Card>
				<div className='divider divider-horizontal'></div>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Monto Recaudado'
					value={20}></Card>
				<div className='divider divider-horizontal'></div>
				<Card
					badgeValue={0.8}
					icon={<BsArrowRight />}
					title='Ordenes Realizadas'
					value={20}></Card>
			</div>
		</div>
	);
}
