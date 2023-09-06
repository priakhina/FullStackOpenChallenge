import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";
import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
	reducer: {
		blogs: blogReducer,
		notification: notificationReducer,
		auth: authReducer,
		users: userReducer,
	},
});

export default store;
