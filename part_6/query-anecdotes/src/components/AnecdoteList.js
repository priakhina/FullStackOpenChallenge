import { useMutation, useQueryClient } from "react-query";
import { updateAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const Anecdote = ({ anecdote, handleVote }) => {
	const { content, votes } = anecdote;

	return (
		<div>
			<div>{content}</div>
			<div>
				has {votes} {votes === 1 ? "vote" : "votes"}{" "}
				<button onClick={handleVote}>vote</button>
			</div>
		</div>
	);
};

const AnecdoteList = ({ anecdotes }) => {
	const dispatch = useNotificationDispatch();

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
		dispatch({
			type: "SET_MESSAGE",
			payload: `Upvoted "${anecdote.content}"`,
		});
		setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 5000);
	};

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<Anecdote
					key={anecdote.id}
					anecdote={anecdote}
					handleVote={() => handleVote(anecdote)}
				/>
			))}
		</div>
	);
};

export default AnecdoteList;
