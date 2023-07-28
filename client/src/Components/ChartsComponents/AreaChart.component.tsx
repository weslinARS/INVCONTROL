import { Card, Title , AreaChart} from "@tremor/react";

interface AreaChartProps {
  title: string;
  data: any[];
  index: string;
  categories: string[];
}
export function AreaChartComp({title,data,index,categories}: AreaChartProps) {
	return (
		<Card>
			<Title>{title}</Title>
			<AreaChart
				className=''
				data={data}
				index={index}
				categories={categories}
				colors={["indigo", "cyan"]}
			/>
		</Card>
	);
}
