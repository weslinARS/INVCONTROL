import { Card, Metric, Text, List, ListItem, ProgressBar, Grid } from "@tremor/react";
import { useSelector } from "react-redux";
import { useStatisticContext } from "../../../Contexts/Statistics.context";
import { RootState } from "src/Store/store";
const locationA = [
  {
    name: "Product A",
    share: 34,
    amount: "$ 11,715",
  },
  {
    name: "Product B",
    share: 24,
    amount: "$ 8,269",
  },
  {
    name: "Product C",
    share: 11,
    amount: "$ 3,790",
  },
  {
    name: "Product D",
    share: 10,
    amount: "$ 3,445",
  },
  {
    name: "Product E",
    share: 8,
    amount: "$ 2,756",
  },
];




export default function Example() {
  const {soldProductCurrentMonth, totalSaleCurrentMonth} = useStatisticContext();
  const categories = [
    {
      title: "Ventas del mes",
      metric: "C$"+ totalSaleCurrentMonth,
      data: soldProductCurrentMonth,
    },
  ];
  return (
    <>
      {categories.map((item) => (
        <Card key={item.title} >
          <Text>{item.title}</Text>
          <Metric>{item.metric}</Metric>
          <List className="mt-4">
            {item.data.map((product) => (
              <ListItem key={product.name}>
                <div className="w-full">
                  <Text>{product.name}</Text>
                  <ProgressBar
                    value={product.percentage}
                    label={`${product.percentage}%`}
                    tooltip={`${product.counter} Unidades`}
                  />
                </div>
              </ListItem>
            ))}
          </List>
        </Card>
      ))}
    </>
  );
}