import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import "./index.scss";
import { DashBoard } from "./Pages/DashBoard";
import { DHome } from "./Views/DashBoardViews/DHome";
import { Productos } from "./Views/DashBoardViews/Products.view";
import { Ventas } from "./Views/DashBoardViews/Sales.view";
import { Users } from "./Views/DashBoardViews/Users.view";
import { Proveedores } from "./Views/DashBoardViews/Suppliers.view";
import { Abastecimiento } from "./Views/DashBoardViews/Orders.view";
import { StoreProvider } from "./Contexts/Store.context";
import { StatisticsProvider } from "./Contexts/Statistics.context";
import AuthenticacionProvider from "./Contexts/Authenticacion.context";
import { PrivateRoute } from "./Routes/PrivateRoute";
import { PublicRoute } from "./Routes/PublicRoute.component";
import { roles } from "./utilities/roles.utilities";
function App() {
	return (
		<AuthenticacionProvider>
			<StoreProvider>
				<Routes>
					<Route
						path='/'
						element={
							<PublicRoute>
								<LoginPage />
							</PublicRoute>
						}></Route>
					<Route
						path='/dashboard/*'
						element={
							<PrivateRoute hasRole='any'>
								<DashBoard />
							</PrivateRoute>
						}>
						<Route
							path=''
							element={
								<PrivateRoute hasRole='any'>
									<StatisticsProvider>
										<DHome />
									</StatisticsProvider>
								</PrivateRoute>
							}></Route>
						<Route
							path='Productos'
							element={
								<PrivateRoute hasRole= 'any'>
									<Productos />
								</PrivateRoute>
							}
						/>
						<Route
							path='Ventas'
							element={
								<PrivateRoute hasRole='any'>
									<Ventas />
								</PrivateRoute>
							}
						/>
						<Route
							path='Usuarios'
							element={
								<PrivateRoute hasRole={roles.admin}>
									<Users />
								</PrivateRoute>
							}
						/>
						<Route
							path='Proveedores'
							element={
								<PrivateRoute hasRole={roles.admin}>
									<Proveedores />
								</PrivateRoute>
							}
						/>
						<Route
							path='Abastecimiento'
							element={
								<PrivateRoute hasRole={roles.admin}>
									<Abastecimiento />
								</PrivateRoute>
							}
						/>
					</Route>
				</Routes>
			</StoreProvider>
		</AuthenticacionProvider>
	);
}
export default App;
