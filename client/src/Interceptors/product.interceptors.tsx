import axios from "axios";
import { getValidationErrors } from "../utilities/getValidationErrors.utilities";

export const ProductInterceptor = () => {
	axios.interceptors.response.use(
		(response) => {
			console.log(response);
			return response;
		},
		(error) => {
			// termina la respuesta
			return Promise.reject(() => getValidationErrors(error.code));
		}
	);
};
