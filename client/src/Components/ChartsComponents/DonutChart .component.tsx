import {
	Card,
	Divider,
	DonutChart,
	Flex,
	Metric,
	Text,
	Title,
  Legend
} from "@tremor/react";

type arrayItem = {
	name: string;
	value: number;
	percentage: number;
};

interface IDonutChartProps {
	data: arrayItem[];
	showAnimation: boolean;
	title: string;
	tagValue: string;
	value: string;
	format: string;
}

export default function Example({
	data,
	showAnimation,
	title,
	value,
	tagValue,
	format,
}: IDonutChartProps) {
	const valueFormatter = (number: number) =>
		` ${Intl.NumberFormat("us").format(number).toString()} ${format}`;
	return (
		<Card className='mx-auto '>
			<Flex
				className='space-x-8'
				justifyContent='between'
				alignItems='center'>
				<Title>{title}</Title>
			</Flex>
			<Text className='mt-8'>{tagValue}</Text>
			<Metric>{value}</Metric>
			<Divider />
			<DonutChart
				data={data}
				showAnimation={showAnimation}
				category='counter'
				index='name'
				valueFormatter={valueFormatter}
				className='mt-6'
			/>
			<Divider />
      <Text className="font-bold">Leyendas</Text>
      <Legend categories={data.map((object) => object.name)}  />
		</Card>
	);
}
