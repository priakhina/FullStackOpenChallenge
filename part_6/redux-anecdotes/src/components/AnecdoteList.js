import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => {
		const filteredAnecdotes = state.anecdotes.filter((anecdote) =>
			anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
		);

		return filteredAnecdotes.sort((a, b) => b.votes - a.votes);
	});
	const dispatch = useDispatch();

	const vote = (id) => dispatch(voteAnecdote(id));

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}{" "}
						{anecdote.votes === 1 ? "vote" : "votes"}{" "}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</>
	);
};

export default AnecdoteList;
