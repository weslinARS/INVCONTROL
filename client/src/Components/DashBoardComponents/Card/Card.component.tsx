import { BadgeDelta, Card, Metric, Title } from "@tremor/react";
interface CardProps {
	title: string;
	icon: React.ReactNode;
	value: number;
	badgeValue?: number;
}
export default function CardComp(props: CardProps) {
	return (
		<div className=''>
			<Card
				className='mx-auto max-w-xs bg-tremor-background-muted'
				decoration='top'
				decorationColor='indigo'>
				<div className='flex justify-between gap-2'>
					<Title>{props.title}</Title>
					{props?.badgeValue && (
						<BadgeDelta
							size='xs'
							deltaType='increase'>
							{props.badgeValue}
						</BadgeDelta>
					)}
				</div>
				<Metric>{props.value}</Metric>
			</Card>
		</div>
	);
}
