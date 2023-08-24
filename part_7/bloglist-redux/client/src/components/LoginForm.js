import PropTypes from "prop-types";

const LoginForm = ({
	username,
	password,
	handleUsernameChange,
	handlePasswordChange,
	handleSubmit,
}) => (
	<div className="login-form">
		<h2>Log in to application</h2>
		<form onSubmit={handleSubmit}>
			<div>
				Username:{" "}
				<input
					type="text"
					value={username}
					name="username"
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				Password:{" "}
				<input
					type="password"
					value={password}
					name="password"
					onChange={handlePasswordChange}
				/>
			</div>
			<button type="submit">Login</button>
		</form>
	</div>
);

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
