import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeLoggedUser } from "./reducers/authReducer";
import { initializeAllUsers } from "./reducers/userReducer";
import Container from "react-bootstrap/Container";
import NavBar from "./components/NavBar";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
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

	if (!loggedUser) {
		return (
			<Container>
				<Notification />
				<LoginForm />
			</Container>
		);
	}

	return (
		<Container>
			<NavBar />
			<Notification />
			<h1>Blogs</h1>
			<Routes>
				<Route path="/" element={<Blogs />} />
				<Route path="/blogs/:id" element={<Blog />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<User />} />
			</Routes>
		</Container>
	);
};

export default App;
