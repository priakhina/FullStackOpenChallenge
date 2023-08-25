import { createSlice } from "@reduxjs/toolkit";

const initialState = { type: "", message: "" };

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setMessage(state, action) {
			return action.payload;
		},
		clearMessage() {
			return initialState;
		},
	},
});

export const setNotification = (type, message, timeout = 5) => {
	return (dispatch) => {
		dispatch(setMessage({ type, message }));
		setTimeout(() => dispatch(clearMessage()), timeout * 1000);
	};
};

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
