import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import { initializeUser, logoutUser } from "./reducers/authReducer";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth);

	useEffect(() => {
		dispatch(initializeBlogs());
		dispatch(initializeUser());
	}, []);

	const handleUserLogout = () => {
		dispatch(logoutUser());
	};

	return (
		<div className="wrapper">
			<Notification />
			{!user && <LoginForm />}
			{user && (
				<>
					<h1>Blogs</h1>
					<div className="logout-block">
						<span>{user.name} logged in</span>{" "}
						<button onClick={handleUserLogout}>Logout</button>
					</div>
					<Blogs />
				</>
			)}
		</div>
	);
};

export default App;
