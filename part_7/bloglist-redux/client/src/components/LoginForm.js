import { useState } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Form, Button } from "react-bootstrap";
import { loginUser } from "../reducers/authReducer";

const LoginForm = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleUserLogin = async (event) => {
		event.preventDefault();
		dispatch(loginUser(username, password));
		setUsername("");
		setPassword("");
	};

	return (
		<div className="login-form">
			<h2>Log in to application</h2>
			<Form onSubmit={handleUserLogin}>
				<Row className="justify-content-center">
					<Col md={6} lg={5} xl={4}>
						<Form.Group className="mb-3" controlId="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter username"
								value={username}
								name="username"
								onChange={({ target }) => setUsername(target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={6} lg={5} xl={4}>
						<Form.Group className="mb-3" controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								value={password}
								name="password"
								onChange={({ target }) => setPassword(target.value)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="justify-content-center">
					<Col md={6} lg={5} xl={4}>
						<Button variant="primary" type="submit">
							Login
						</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};

export default LoginForm;
