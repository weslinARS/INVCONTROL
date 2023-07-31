import axios from "axios";

export const getCashRegisters = async (userToken: string) =>
	axios.get("http://localhost:3000/cashRegister", {
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
	});

export const createCashRegister = async (
	cashRegister: any,
	userToken: string
) => {
	console.log(cashRegister);
	return axios.post("http://localhost:3000/cashRegister", cashRegister, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`,
		},
	});
};
export const updateCashRegister = async (
	cashRegisterId: string,
	userToken: string
) =>
	axios.put(
		`http://localhost:3000/cashRegister/${cashRegisterId}`,
		{},
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userToken}`,
			},
		}
	);