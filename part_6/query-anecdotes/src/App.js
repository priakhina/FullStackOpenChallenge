import { useQuery } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import { NotificationContextProvider } from "./NotificationContext";
import { getAnecdotes } from "./requests";

const App = () => {
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
		<NotificationContextProvider>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />
			<AnecdoteList anecdotes={anecdotes} />
		</NotificationContextProvider>
	);
};

export default App;
