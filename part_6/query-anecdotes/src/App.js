import { useQuery } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes } from "./requests";

const App = () => {
	const handleVote = (anecdote) => {
		console.log("vote");
	};

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
		<div>
			<h3>Anecdote app</h3>
			<Notification />
			<AnecdoteForm />
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>
							vote
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
