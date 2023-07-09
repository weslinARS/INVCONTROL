import React from "react";

interface CardProps {
	title: string;
	icon: React.ReactNode;
	value: number;
	badgeValue: number;
}
export function Card(props: CardProps) {
	return (
		<div className="carousel-item ">
			<div className='stat rounded-md bg-slate-200 shadow-md shadow-indigo-500/40'>
				<div className='stat-figure text-primary'>{props.icon}</div>
				<div className='stat-title'>{props.title}</div>
				<div className='stat-value'>{props.value}</div>
				<div className='stat-desc'>↗︎ 400 (22%)</div>
			</div>
		</div>
	);
}
