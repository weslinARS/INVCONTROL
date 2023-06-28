import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage";
import "./index.scss";
import { ProtectedRoutes } from "./Routes/ProtectedRoutes";
import { DashBoard } from "./Pages/DashBoard";
import { DHome } from "./Pages/DashBoardViews/DHome";
import { Productos } from "./Pages/DashBoardViews/Products.view";
import { Ventas } from "./Pages/DashBoardViews/Ventas";
import { Usuarios } from "./Pages/DashBoardViews/Usuarios";
import { Proveedores } from "./Pages/DashBoardViews/Proveedores";
import { Abastecimiento } from "./Pages/DashBoardViews/Abastecimiento";
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
								<PrivateRoute hasRole={roles.admin}>
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
									<Usuarios />
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
