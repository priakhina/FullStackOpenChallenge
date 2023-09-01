import PropTypes from "prop-types";

const LoginForm = ({
	username,
	password,
	onUsernameChange,
	onPasswordChange,
	onUserLogin,
}) => (
	<div className="login-form">
		<h2>Log in to application</h2>
		<form onSubmit={onUserLogin}>
			<div>
				Username:{" "}
				<input
					type="text"
					value={username}
					name="username"
					onChange={onUsernameChange}
				/>
			</div>
			<div>
				Password:{" "}
				<input
					type="password"
					value={password}
					name="password"
					onChange={onPasswordChange}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
);

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	onUsernameChange: PropTypes.func.isRequired,
	onPasswordChange: PropTypes.func.isRequired,
	onUserLogin: PropTypes.func.isRequired,
};

export default LoginForm;
