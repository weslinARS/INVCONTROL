import {
	Bold,
	Card,
	Color,
	Flex,
	Grid,
	List,
	ListItem,
	Text,
	Title,
} from "@tremor/react";
import { uid } from "react-uid";

type TransactionCategory = {
	name: string;
	color: Color;
	numTransactions: number;
	amount: string;
};

const march: TransactionCategory[] = [
	{
		name: "Groceries",
		color: "sky",
		numTransactions: 24,
		amount: "$ 230",
	},
	{
		name: "IT & Office",
		color: "orange",
		numTransactions: 4,
		amount: "$ 990",
	},
	{
		name: "Travel",
		color: "pink",
		numTransactions: 11,
		amount: "$ 2,345",
	},
	{
		name: "Insurance",
		color: "emerald",
		numTransactions: 2,
		amount: "$ 1,450",
	},
];

const april: TransactionCategory[] = [
	{
		name: "Food",
		color: "teal",
		numTransactions: 32,
		amount: "$ 490",
	},
	{
		name: "Travel",
		color: "pink",
		numTransactions: 3,
		amount: "$ 678",
	},
	{
		name: "IT & Office",
		color: "orange",
		numTransactions: 2,
		amount: "$ 120",
	},
	{
		name: "Transport",
		color: "indigo",
		numTransactions: 12,
		amount: "$ 560",
	},
];

const may: TransactionCategory[] = [
	{
		name: "Sports",
		color: "rose",
		numTransactions: 89,
		amount: "$ 2,300.90",
	},
	{
		name: "Groceries",
		color: "emerald",
		numTransactions: 9,
		amount: "$ 1,087",
	},
	{
		name: "Travel",
		color: "pink",
		numTransactions: 19,
		amount: "$ 1,030",
	},
	{
		name: "Restaurants",
		color: "amber",
		numTransactions: 8,
		amount: "$ 129",
	},
];

const months = [
	{
		name: "March 2022",
		data: march,
	},
];
const colors = ["bg-slate-800", "bg-indigo-800", "bg-blue-500", "bg-red-500"];
type arrayItem = {
	name: string;
	counter: number;
	percentage: number;
};
interface DBCardListProps {
	title: string;
	date?: string;
	data: arrayItem[];
}
//chose random color from colors array
export function DBCardTopList({ title, date, data }: DBCardListProps) {
	const slicedData = data.slice(0, 4);
	return (
		<Grid className='gap-6'>
			<Card key={uid(data)}>
				<Title>{title}</Title>
				<Text>{date}</Text>
				<List className='mt-4'>
					{slicedData.map((item, index) => (
						<ListItem key={item.name}>
							<Flex
								justifyContent='start'
								className='space-x-4 truncate'>
								<span
									className={`${colors[index]} rounded-md p-4 text-xl font-bold text-slate-50 `}>
									{index + 1}
								</span>
								<div className='truncate'>
									<Text className='truncate'>
										<Bold>{item.name}</Bold>
									</Text>
									<Text className='truncate'>
										{`${item.counter} items`}
									</Text>
								</div>
							</Flex>
							<Text>{item.percentage}%</Text>
						</ListItem>
					))}
				</List>
			</Card>
		</Grid>
	);
}
