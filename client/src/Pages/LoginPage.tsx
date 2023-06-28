import "../styles/LoginPageStyle.scss";
import { Login } from "../Components/Login.component";
export function LoginPage() {
  return (
    <div className="background h-screen w-screen flex flex-col justify-center items-center">
      <Login />
    </div>
  );
}
