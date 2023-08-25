const initialState = { type: "", message: "" };

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_MESSAGE": {
			return action.payload;
		}
		case "CLEAR_MESSAGE":
			return initialState;
		default:
			return state;
	}
};

export const setMessage = (type, message) => {
	return {
		type: "SET_MESSAGE",
		payload: { type, message },
	};
};

export const clearMessage = () => {
	return {
		type: "CLEAR_MESSAGE",
	};
};

export default notificationReducer;
