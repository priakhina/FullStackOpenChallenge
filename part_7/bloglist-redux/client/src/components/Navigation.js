import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { logoutUser } from "../reducers/authReducer";

const Navigation = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loggedUser = useSelector(({ auth }) => auth);

	const handleUserLogout = () => {
		dispatch(logoutUser());
		navigate("/");
	};

	return (
		<Navbar collapseOnSelect expand="md" bg="primary" data-bs-theme="dark">
			<Container>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link href="#" as="span">
							<Link to="/">Blogs</Link>
						</Nav.Link>
						<Nav.Link href="#" as="span">
							<Link to="/users">Users</Link>
						</Nav.Link>
					</Nav>
					<div className="logout-block">
						<span>
							<strong>{loggedUser.name}</strong> logged in
						</span>{" "}
						<Button variant="outline-light" onClick={handleUserLogout}>
							Logout
						</Button>
					</div>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
