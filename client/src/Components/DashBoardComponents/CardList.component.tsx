import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useStatisticContext } from "../../Contexts/Statistics.context";
import Card from "./Card/Card.component";

export function CardList() {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { SalesTotalToday, salesAmountCollectedToday } =
		useStatisticContext();
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
		<>
			<Card
				badgeValue={0.8}
				icon={<BsArrowRight />}
				title='Productos Vendidos'
				value={SalesTotalToday}></Card>
			<Card
				badgeValue={0.8}
				icon={<BsArrowRight />}
				title='Monto Recaudado '
				value={salesAmountCollectedToday}></Card>
			<Card
				badgeValue={0.8}
				icon={<BsArrowRight />}
				title='Ordenes Realizadas'
				value={20}></Card>
		</>
	);
}
