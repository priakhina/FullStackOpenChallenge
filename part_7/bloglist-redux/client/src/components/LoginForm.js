import { useState } from "react";
import { useDispatch } from "react-redux";
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
			<form onSubmit={handleUserLogin}>
				<div>
					Username:{" "}
					<input
						type="text"
						value={username}
						name="username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					Password:{" "}
					<input
						type="password"
						value={password}
						name="password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
