import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import Register from "./components/Register";
import TaskList from "./components/Tasks/TaskList";
import CreateTask from "./components/Tasks/CreateTask";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<AuthProvider>
					<Routes>
						<Route
							path="/"
							element={
								<PublicRoute>
									<Login />
								</PublicRoute>
							}
						/>
						<Route
							path="/register"
							element={
								<PublicRoute>
									<Register />
								</PublicRoute>
							}
						/>
						<Route
							path="/tasks"
							element={
								<ProtectedRoute>
									<TaskList />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/create-task"
							element={
								<ProtectedRoute>
									<CreateTask />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/edit-task/:id"
							element={
								<ProtectedRoute>
									<CreateTask />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</AuthProvider>
			</Router>
		</QueryClientProvider>
	);
}

export default App;
