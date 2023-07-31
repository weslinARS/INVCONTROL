import { Button, Card, Grid, Title } from "@tremor/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { DBCardTopList } from "../../Components/CardListComponent/DBCardTopList.component";
import { AreaChartComp } from "../../Components/ChartsComponents/AreaChart.component";
import DonutChartComp from "../../Components/ChartsComponents/DonutChart .component";
import { CardList } from "../../Components/DashBoardComponents/CardList.component";
import KpiSales from "../../Components/DashBoardComponents/KpiSales/KpiSales.component";
import { CashRegisterForm } from "../../Components/FormsComponent";
import { LoadingView } from "../../Components/LoadingView.component";
import { useStatisticContext } from "../../Contexts/Statistics.context";
import { useStore } from "../../Contexts/Store.context";
import { RootState } from "../../Store/store";
import { useCashRegister } from "../../hooks";
import { TransformDate } from "../../utilities/Pipes.utilities";
import { sortObjectArray } from "../../utilities/SortFunctions.utilities";
const useDhome = () => {
	const cashRegister = useSelector(
		(state: RootState) => state.CashRegister.cashRegister
	);
	const isSetUser = useSelector((state: RootState) => state.User.isSetUser);
	const { LoadingData } = useStore();
	const User = useSelector((state: RootState) => state.User);
	const saleList = useSelector((state: RootState) => state.Sales.sales);
	const suppliersList = useSelector((state: RootState) => state.Suppliers);
	const [isMontoAdded, setIsMontoAdded] = useState<boolean>(false);
	const { FindCashRegister } = useCashRegister();
	const {
		SalesTotalToday,
		salesAmountCollectedToday,
		soldProductCurrentMonth,
		totalSaleCurrentMonth,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
		productsPerSupplier,
		ordersCurrentMonth,
		totalSupplier,
		productsPerCategory,
		productsUnderStockPerCategory,
		totalCategory
	} = useStatisticContext();
	return {
		isSetUser,
		LoadingData,
		User,
		saleList,
		suppliersList,
		isMontoAdded,
		setIsMontoAdded,
		cashRegister,
		FindCashRegister,
		SalesTotalToday,
		salesAmountCollectedToday,
		soldProductCurrentMonth,
		totalSaleCurrentMonth,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
		productsPerSupplier,
		ordersCurrentMonth,
		totalSupplier,
		productsPerCategory,
		productsUnderStockPerCategory,
		totalCategory
	};
};
export function DHome() {
	const {
		isSetUser,
		LoadingData,
		User,
		saleList,
		cashRegister,
		FindCashRegister,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
		productsPerSupplier,
		ordersCurrentMonth,
		totalSupplier,
		productsPerCategory,
		productsUnderStockPerCategory,
		totalCategory
	} = useDhome();
	useEffect(() => {
		FindCashRegister();
	}, []);
	if (LoadingData && isSetUser) return <LoadingView />;
	/*
  TODO: 
  *
  */
	return (
		<>
			<main className='p-4'>
				<div className='mx-2 flex flex-col justify-between p-2 py-4  md:mx-5  md:flex-row '>
					<div className='prose'>
						<h3 className='inline-block font-semibold uppercase text-primary'>
							Buen Día
						</h3>
						<h1 className=''>
							Bienvenido {User.userName + " " + User.userLastName}
						</h1>
					</div>
					<div className='mt-4 flex flex-row gap-x-2 gap-y-3 sm:mt-0 md:flex-col md:gap-x-0'>
						<CashRegisterForm />
						<span className='text-5xl font-bold'>
							{cashRegister?.startingAmount} C$
						</span>
					</div>
				</div>
				<div className='mx-5 mt-8'>
					<h1 className='mb-4 inline-flex text-2xl uppercase'>
						<BsFillStarFill /> &nbsp; Resumen del dia
					</h1>
				</div>
				<Grid
					numItems={1}
					numItemsMd={2}
					numItemsLg={3}
					className='mt-6 gap-6'>
					<CardList></CardList>
				</Grid>
				<div className='mt-6'>
					<Card>
						{/* DB BODY */}
						<div className='overflow-x-hidden py-4 '>
							{
								//! Informacion de usuario
							}
							<div className='flex flex-row  items-center justify-center  px-2  py-4'></div>
							<div className='mx-5 mt-8'>
								<h1 className='mb-4 inline-flex text-2xl uppercase'>
									<BsFillStarFill /> &nbsp; Estadisticas
								</h1>
							</div>
							<div className='flex flex-col items-start justify-center  px-2 py-4'>
								<h2 className='mx-5 mb-5 text-2xl font-semibold uppercase'>
									Ventas
								</h2>
								<div className='flex w-full flex-col items-center justify-start'>
									<Grid
										numItems={1}
										numItemsMd={2}
										className='w-[90%] gap-2'>
										<AreaChartComp
											data={TransformDate(
												saleList,
												"saleDate",
												"DD/MM/YYYY"
											)}
											index='saleDate'
											title='Ventas del mes actual'
											categories={["saleAmountCollected"]}
										/>
										<KpiSales />
										<DonutChartComp
											data={categoriesSalesCurrentMonth}
											title='Ventas por categoria'
											showAnimation={true}
											tagValue='Total de ventas'
											value={
												totalSaleAmountCollectedCurrentMonth
											}
											format='Unidades'
										/>
										<DBCardTopList
											data={sortObjectArray(
												categoriesSalesCurrentMonth,
												"percentage",
												"desc"
											)}
											title='Top Categorias mas vendidas'
											date={dayjs().format("MMMM,YYYY")}
										/>
									</Grid>
								</div>
							</div>
							<div className='mt-4'>
								<h2 className='mx-5 mb-5 text-2xl font-semibold uppercase'>
									Proveedores y compras
								</h2>
								<div className='flex w-full flex-col items-center justify-start'>
									<Grid
										numItems={1}
										numItemsMd={2}
										className='w-[90%] gap-2'>
										<DonutChartComp
											data={productsPerSupplier}
											title='Productos por proveedor'
											showAnimation={true}
											tagValue='Total de proveedores registrados'
											value={totalSupplier}
											format='Productos'
										/>
										<DBCardTopList
											data={sortObjectArray(
												productsPerCategory,
												"percentage",
												"desc"
											)}
											title='Top Categoria con mas productos registrados'
											date={dayjs().format("MMMM,YYYY")}
										/>
										<Card>
											<Title>
												Ordenes para el mes actual
											</Title>
											{ordersCurrentMonth.map((order) => (
												<Card
													decoration='left'
													decorationColor='indigo'
													className='mt-2'>
													<p>
														<span className='font-semibold text-primary'>
															Fecha de llegada:
														</span>{" "}
														{dayjs(
															order.orderDeliveryDate
														).format("DD/MM/YYYY")}
													</p>
													<p>
														<span className='font-semibold text-primary'>
															Productos ordenados:
														</span>{" "}
														{
															order.orderTotalOrderedProducts
														}{" "}
														{order.orderTotalOrderedProducts >
														1
															? " productos"
															: " producto"}
													</p>
													<p>
														<span className='font-semibold text-primary'>
															Total a pagar:
														</span>{" "}
														{order.orderTotalPrice}{" "}
														C$
													</p>
												</Card>
											))}
											<Button
												variant='secondary'
												color='indigo'
												className='mt-4'>
												Ver detalles
											</Button>
										</Card>
										<AreaChartComp
											categories={["orderTotalPrice"]}
											data={ordersCurrentMonth}
											index='orderDate'
											title='Total invertido en ordenes del mes actual'
										/>
										<DonutChartComp
											data={productsUnderStockPerCategory}
											title='Productos con stock bajo por categoria'
											showAnimation={true}
											tagValue='Categorias registrados'
											value={totalCategory}
											format='Productos'
										/>
									</Grid>
								</div>
							</div>
						</div>
					</Card>
				</div>
			</main>
		</>
	);
}
