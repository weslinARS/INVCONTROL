/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const Login = async (userData: any) =>
  await axios.post("http://localhost:3000/login", userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const Register = async (userData: any) =>
  await axios.post("http://localhost:3000/signup", userData);
