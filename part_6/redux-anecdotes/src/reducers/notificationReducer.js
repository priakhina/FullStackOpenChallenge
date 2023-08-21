import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: "notification",
	initialState: null,
	reducers: {
		setMessage(state, action) {
			return action.payload;
		},
		clearMessage(state, action) {
			return null;
		},
	},
});

export const setNotification = (text, timeout = 5) => {
	return (dispatch) => {
		dispatch(setMessage(text));
		setTimeout(() => dispatch(clearMessage()), timeout * 1000);
	};
};

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
