import ProductsForm from "./ProductsForm.component";
import { BarraBusqueda } from "../BarraBusqueda.component";
import { ButtonFormTrigger } from "./ButtonFormTrigger";
export function ProductFunctionalities() {
  return (
      <div className="flex flexrow gap-2 bg-slate-50 py-4 px-2 rounded-lg shadow-sm mx-auto ">
      <BarraBusqueda />
      <ButtonFormTrigger />
    </div>
  );
}