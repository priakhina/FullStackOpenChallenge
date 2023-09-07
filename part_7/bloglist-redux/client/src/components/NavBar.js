import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../reducers/authReducer";

const NavBar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loggedUser = useSelector(({ auth }) => auth);

	const handleUserLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<div className="navbar">
			<Link to="/">blogs</Link>
			<Link to="/users">users</Link>
			<div className="logout-block">
				<span>{loggedUser.name} logged in</span>{" "}
				<button onClick={handleUserLogout}>Logout</button>
			</div>
		</div>
	);
};

export default NavBar;
