import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import { useMemo } from "react";
import { RootState } from "src/Store/store";
import { CategoryListItem } from "./CategoryListItem.component";
export function CategoryList() {
	const CategoryList = useSelector(
		(state: RootState) => state.Products.CategoryList
	);
	const CategoryMemo = useMemo(() => CategoryList, [CategoryList]);
	return (
		<div className='p-4 mx-5 '>
			<div className='prose'>
				<h3>Categorías Registradas</h3>
				<span>
					Haz clic en cada categoria para visualizar sus opciones{" "}
				</span>
			</div>
			<div className='mt-5 flex flex-row flex-wrap gap-4  p-4'>
				{CategoryMemo.map((category) => {
					return (
						<CategoryListItem
							key={category["_id" as keyof object]}
							category={category}></CategoryListItem>
					);
				})}
			</div>
		</div>
	);
}
