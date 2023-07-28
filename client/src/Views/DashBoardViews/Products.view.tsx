import {
	Card,
	Flex,
	Grid,
	Icon,
	Metric,
	TabGroup,
	TabPanel,
	TabPanels,
	Text,
	Title,
} from "@tremor/react";
import { useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiCoffeeTogo } from "react-icons/bi";
import { BsFillBagPlusFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { HiChevronDoubleDown, HiHashtag, HiTag } from "react-icons/hi";
import { useSelector } from "react-redux";
import { uid } from "react-uid";
import { getTotalBooleanValues } from "../../utilities/statFunctions.utilities";
import { CategoryList } from "../../Components/CategoryComponents/CategoryList.component";
import { CategoryForm, ProductsForm } from "../../Components/FormsComponent";
import { columns } from "../../Components/ProductTable/Columns";
import { ButtonFormTrigger } from "../../Components/ProductsViewComponent/ButtonFormTrigger";
import { DataTable } from "../../Components/Table/data-table";
import { useStore } from "../../Contexts/Store.context";
import { RootState } from "../../Store/store";
const useProductData = () => {
	const productList = useSelector(
		(state: RootState) => state.Products.products
	);
	const categoryList = useSelector(
		(state: RootState) => state.Products.CategoryList
	);
	const productMemo = useMemo(() => productList, [productList]);
	const categoryMemo = useMemo(() => categoryList, [categoryList]);
	const [isProductFormOpen, setisProductFormOpen] = useState(false);
	const [isCategoryFormOpen, setisCategoryFormOpen] = useState(false);
	const { isProductToEdit, productToEdit } = useStore();
	const memoTotalProducts = useMemo(() => {
		return productMemo.length;
	}, [productMemo]);
	const memoTotalCategories = useMemo(() => {
		return categoryMemo.length;
	}, [categoryMemo]);
	const memoUnderStockProducts = useMemo(
		() => getTotalBooleanValues(productMemo, "productIsOverPolicy", false),
		[productMemo]
	);
	return {
		productList,
		productMemo,
		isProductFormOpen,
		setisProductFormOpen,
		isCategoryFormOpen,
		setisCategoryFormOpen,
		isProductToEdit,
		productToEdit,
		memoTotalProducts,
		memoTotalCategories,
		memoUnderStockProducts,
	};
};
export function Productos() {
	const {
		productList,
		productMemo,
		isProductFormOpen,
		setisProductFormOpen,
		isCategoryFormOpen,
		setisCategoryFormOpen,
		isProductToEdit,
		memoTotalProducts,
		memoTotalCategories,
		memoUnderStockProducts,
	} = useProductData();
	return (
		<div className='p-4'>
			<main>
					<h1 className='flex flex-row text-4xl font-bold '>
						<BiCoffeeTogo />
						Productos
					</h1>
				<Text>
					{" "}
					<span className='ml-2 text-lg font-bold text-primary '>
						{isProductToEdit
							? "Editar Producto"
							: isProductFormOpen
							? "Registrar Productos"
							: "Visualizar Productos"}
					</span>
				</Text>
				<TabGroup className='mt-6'>
					<TabPanels>
						<TabPanel>
							<div
								className={` ${
									isProductFormOpen || isCategoryFormOpen
										? "hidden"
										: ""
								} `}>
								<Grid
									numItemsLg={3}
									className={`mt-6 gap-6  `}>
									<Card
										key={uid(HiHashtag)}
										decoration='top'
										decorationColor={"green"}>
										<Flex
											justifyContent='start'
											className='space-x-4'>
											<Icon
												icon={HiHashtag}
												variant='light'
												size='xl'
												color='green'
											/>
											<div className='truncate'>
												<Text>
													Productos Registrados
												</Text>
												<Metric className='truncate'>
													{memoTotalProducts}
												</Metric>
											</div>
										</Flex>
									</Card>
									<Card
										key={uid(HiTag)}
										decoration='top'
										decorationColor={"indigo"}>
										<Flex
											justifyContent='start'
											className='space-x-4'>
											<Icon
												icon={HiTag}
												variant='light'
												size='xl'
												color='indigo'
											/>
											<div className='truncate'>
												<Text>
													Categorias Registrados
												</Text>
												<Metric className='truncate'>
													{memoTotalCategories}
												</Metric>
											</div>
										</Flex>
									</Card>
									<Card
										key={uid(HiChevronDoubleDown)}
										decoration='top'
										decorationColor={"red"}>
										<Flex
											justifyContent='start'
											className='space-x-4'>
											<Icon
												icon={HiChevronDoubleDown}
												variant='light'
												size='xl'
												color='red'
											/>
											<div className='truncate'>
												<Text>
													Productos a Agotarse
												</Text>
												<Metric className='truncate'>
													{memoUnderStockProducts}
												</Metric>
											</div>
										</Flex>
									</Card>
								</Grid>
							</div>

							<div className='mt-6'>
								<Card>
									<div className=' py-4 '>
										<div className=''>
											{!isProductFormOpen &&
												!isCategoryFormOpen && (
													<div className='mt-4 flex flex-col md:flex-row w-full items-center justify-center gap-4'>
														<ButtonFormTrigger
															buttonIcon={
																<BsFillBagPlusFill />
															}
															buttonText='Agregar Producto'
															triggerFunction={() =>
																setisProductFormOpen(
																	!isProductFormOpen
																)
															}
														/>
														<ButtonFormTrigger
															buttonText='Agregar Categoría'
															triggerFunction={() =>
																setisCategoryFormOpen(
																	!isCategoryFormOpen
																)
															}
															buttonIcon={
																<BsFillBookmarkPlusFill />
															}
														/>
													</div>
												)}
											{isCategoryFormOpen && (
												<div>
													<CategoryForm
														setIsOpenForm={
															setisCategoryFormOpen
														}></CategoryForm>
													<CategoryList></CategoryList>
												</div>
											)}
											{isCategoryFormOpen == false &&
												(isProductFormOpen ||
												isProductToEdit ? (
													<div className='mt-6 flex flex-col items-center '>
														<ProductsForm
															setIsOpenForm={
																setisProductFormOpen
															}
														/>
													</div>
												) : (
													<div className='mx-5 flex items-center justify-center gap-x-5'>
														<DataTable
															columns={columns}
															data={productMemo}
															key={
																productList.length
															}
														/>
													</div>
												))}
										</div>
										<Toaster />
									</div>
								</Card>
							</div>
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</main>
		</div>
	);
}
