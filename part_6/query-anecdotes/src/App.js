import { useQuery, useMutation, useQueryClient } from "react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, updateAnecdote } from "./requests";

const App = () => {
	const queryClient = useQueryClient();

	const updateAnecdoteMutation = useMutation(updateAnecdote, {
		onSuccess: (updatedAnecdote) => {
			const initialAnecdotes = queryClient.getQueryData("anecdotes");

			const updatedAnecdotes = initialAnecdotes.map((a) =>
				a.id !== updatedAnecdote.id ? a : updatedAnecdote
			);
			queryClient.setQueryData("anecdotes", updatedAnecdotes);
		},
	});

	const handleVote = (anecdote) => {
		updateAnecdoteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1,
		});
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
						has {anecdote.votes}{" "}
						{anecdote.votes === 1 ? "vote" : "votes"}{" "}
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
