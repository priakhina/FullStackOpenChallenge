import { useReducer } from "react";
import { useQuery } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import NotificationContext from "./NotificationContext";
import { getAnecdotes } from "./requests";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case "SET_MESSAGE":
			return action.payload;
		case "CLEAR_MESSAGE":
			return "";
		default:
			return state;
	}
};

const App = () => {
	const [notification, notificationDispatch] = useReducer(
		notificationReducer,
		""
	);

	const {
		isLoading,
		isError,
		data: anecdotes,
		error,
	} = useQuery("anecdotes", getAnecdotes, {
		retry: 1,
		refetchOnWindowFocus: false,
	});

	if (isLoading) {
		return <div>Loading data...</div>;
	}

	if (isError) {
		return (
			<div>
				Anecdote service is not available due to problems communicating
				with the server (Error: {error.message})
			</div>
		);
	}

	return (
		<NotificationContext.Provider
			value={[notification, notificationDispatch]}
		>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />
			<AnecdoteList anecdotes={anecdotes} />
		</NotificationContext.Provider>
	);
};

export default App;
