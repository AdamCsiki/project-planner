import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout, { LayoutNoFooter } from "../Layouts/Layout/Layout";
import Home from "../pages/Home/Home";
import { Projects } from "../pages/Projects/Projects";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserPage from "../pages/UserPage/UserPage";
import BoardPage from "../pages/BoardPage/BoardPage";
import { ProjectLayout } from "../Layouts/Project/ProjectLayout";
import { ProjectProvider } from "../context/ProjectContext";

export default function Routing() {
	return (
		<BrowserRouter basename="/project-planner">
			<Routes>
				<Route element={<Layout />}>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="user/:name"
						element={<UserPage />}
					/>
				</Route>
				<Route element={<LayoutNoFooter />}>
					<Route
						path="login"
						element={<LoginPage />}
					/>
					<Route
						path="register"
						element={<RegisterPage />}
					/>
					<Route
						path="projects"
						element={<AuthenticatedRoute />}
					>
						<Route element={<ProjectProvider />}>
							<Route element={<ProjectLayout />}>
								<Route
									index
									element={<Projects />}
								/>

								<Route path=":projectId">
									<Route
										index
										element={<BoardPage />}
									/>
									<Route
										path="board"
										element={<BoardPage />}
									/>
									<Route path="details" />
								</Route>
							</Route>
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
