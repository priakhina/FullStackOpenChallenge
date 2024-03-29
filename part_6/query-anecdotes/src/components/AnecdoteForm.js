import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch();

	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			// Invalidating the query anecdotes causes React Query to automatically update a query
			// with the key anecdotes (i.e. fetch the anecdotes from the server) by making a new GET request.
			// Without it, the new anecdote is saved on the server but is not updated on the screen.

			// queryClient.invalidateQueries("anecdotes");

			// It is possible to optimize performance by manually updating the query state maintained by React Query as follows:
			const anecdotes = queryClient.getQueryData("anecdotes");
			queryClient.setQueryData(
				"anecdotes",
				anecdotes.concat(newAnecdote)
			);

			dispatch({
				type: "SET_MESSAGE",
				payload: `Created a new anecdote "${newAnecdote.content}"`,
			});
			setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 5000);
		},
		onError: (error) => {
			dispatch({
				type: "SET_MESSAGE",
				payload: `${error.response.data.error}`,
			});
			setTimeout(() => dispatch({ type: "CLEAR_MESSAGE" }), 5000);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		newAnecdoteMutation.mutate({ content, votes: 0 });
	};

	return (
		<div>
			<h3>Create new</h3>
			<form onSubmit={onCreate}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
