import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import {
	setNotification,
	removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
		);

		return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = (anecdote) => {
		dispatch(voteAnecdote(anecdote));

		const upvotedAnecdote = anecdotes.find(
			(a) => a.id === anecdote.id
		).content;
		dispatch(setNotification(`Upvoted "${upvotedAnecdote}"`));
		setTimeout(() => dispatch(removeNotification()), 5000);
	};

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}{" "}
						{anecdote.votes === 1 ? "vote" : "votes"}{" "}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
