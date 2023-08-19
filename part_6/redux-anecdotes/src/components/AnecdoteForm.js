import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = "";
		dispatch(createAnecdote(content));
		dispatch(setNotification(`Created a new anecdote "${content}"`));
		setTimeout(() => dispatch(removeNotification()), 5000);
	};

	return (
		<>
			<h2>Create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input
						name="anecdote"
						type="text"
						placeholder="Type your anecdote..."
					/>
				</div>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default AnecdoteForm;
