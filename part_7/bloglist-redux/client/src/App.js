import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser, logoutUser } from "./reducers/authReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import User from "./components/User";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
	const dispatch = useDispatch();
	const loggedUser = useSelector(({ auth }) => auth);

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeLoggedUser());
		dispatch(initializeAllUsers());
	}, []);

	const handleUserLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className="wrapper">
			<Notification />
			{!loggedUser && <LoginForm />}
			{loggedUser && (
				<>
					<h1>Blogs</h1>
					<div className="logout-block">
						<span>{loggedUser.name} logged in</span>{" "}
						<button onClick={handleUserLogout}>Logout</button>
					</div>
					<Routes>
						<Route path="/" element={<Blogs />} />
						<Route path="/users/:id" element={<User />} />
						<Route path="/users" element={<Users />} />
					</Routes>
				</>
			)}
		</div>
	);
};

export default App;
