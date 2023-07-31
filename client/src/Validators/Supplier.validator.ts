import * as yup from "yup";

export const SupplierSchema = yup.object({
	supplierName: yup.string().required("Nombre requerido"),
	supplierAddress: yup.string().required("Dirección requerida"),
	supplierPhoneNumbers: yup
		.array()
		.of(
			yup
				.string()
				.required("Teléfono requerido")
				.min(1, "Debe ingresar al menos un teléfono")
		),
	supplierEmail: yup
		.array()
		.of(
			yup
				.string()
				.email("Email inválido")
				.required("Correo requerido")
				.min(1, "Debe ingresar al menos un correo")
		),
});
