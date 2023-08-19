import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: "Notification message here",
	reducers: {
		setNotification(state, action) {
			return state;
		},
	},
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
