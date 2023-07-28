import {
	Card,
	Grid,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
} from "@tremor/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
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
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
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
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
	};
};
export function DHome() {
	const {
		isSetUser,
		LoadingData,
		User,
		saleList,
		isMontoAdded,
		setIsMontoAdded,
		cashRegister,
		FindCashRegister,
		categoriesSalesCurrentMonth,
		totalSaleAmountCollectedCurrentMonth,
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
				<TabGroup className='mt-6'>
					<TabList>
						<Tab>Ventas</Tab>
						<Tab>Productos y Ordenes</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
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
												<BsFillStarFill /> &nbsp;
												Estadisticas
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
														data={saleList}
														index='saleDate'
														title='Ventas del mes actual'
														categories={[
															"saleAmountCollected",
														]}
													/>
													<KpiSales />
													<DonutChartComp
														data={
															categoriesSalesCurrentMonth
														}
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
														date={dayjs().format(
															"MMMM,YYYY"
														)}
													/>
												</Grid>
											</div>
										</div>
									</div>
								</Card>
							</div>
						</TabPanel>
						<TabPanel>
							<div className='mt-6'>
								<Card>
									<div className='h-96' />
								</Card>
							</div>
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</main>
			<Toaster />
		</>
	);
}
