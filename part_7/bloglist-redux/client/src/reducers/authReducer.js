import { createSlice } from "@reduxjs/toolkit";
import { setNotification } from "./notificationReducer";
import blogService from "../services/blogs";
import loginService from "../services/login";

const authSlice = createSlice({
	name: "auth",
	initialState: null,
	reducers: {
		setUser(state, action) {
			return action.payload;
		},
	},
});

export const initializeUser = () => {
	return (dispatch) => {
		const loggedUserJSON = window.localStorage.getItem("loggedBloglistAppUser");
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			blogService.setToken(user.token);
			dispatch(setUser(user));
		}
	};
};

export const loginUser = (username, password) => {
	return async (dispatch) => {
		try {
			const user = await loginService.login({
				username,
				password,
			});

			window.localStorage.setItem(
				"loggedBloglistAppUser",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			dispatch(setUser(user));
		} catch (error) {
			dispatch(setNotification("failure", "Wrong username or password"));
		}
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		window.localStorage.removeItem("loggedBloglistAppUser");
		blogService.setToken(null);
		dispatch(setUser(null));
	};
};

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
