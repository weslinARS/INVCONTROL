/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export const Login = async (userData: any) =>
  await axios.post("http://localhost:3000/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const Register = async (userData: any, userToken : string) =>
  await axios.post("http://localhost:3000/signup", userData,{
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`,
		},
	});

export const GetUsers = async (userToken : string ) =>
  await axios.get("http://localhost:3000/users",{
		headers: {
			Authorization: `Bearer ${userToken}`,
		},
	});


export const UpdateUserInfo = async (userData: any, idUser : string, userToken:string) :Promise<AxiosResponse>=>
  await axios.put(`http://localhost:3000/user/${idUser}`, userData,{
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${userToken}`,
		},
	});


export const DropUser = async (idUser : string, userToken:string) =>
	await axios.delete(`http://localhost:3000/user/${idUser}`,{
		headers:{
			Authorization: `Bearer ${userToken}`,
		}
	})